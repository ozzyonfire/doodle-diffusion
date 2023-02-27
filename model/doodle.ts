import { Collection, ObjectId } from "mongodb";
import connect from "./_connect";
import { DateTime } from 'luxon';

export interface Doodle {
  date: string,
  prompt: string,
  predictionId: string,
  input: string, // base64 encoded image
  output: string, // base64 encoded image
  userId: string,
  upvotes: string[], // user ids
  downvotes: string[], // user ids
}

let collection: Collection<Doodle>;

async function getCollection() {
  const db = await connect();
  return db.collection<Doodle>("doodles");
}

export async function getDoodle(id: string) {
  if (!collection) {
    collection = await getCollection();
  }

  return collection.findOne({ _id: new ObjectId(id) });
}

export async function getDoodleForUser(userId: string) {
  // get the doodle that matches today's date and the user's id
  if (!collection) {
    collection = await getCollection();
  }

  const today = new Date();

  const result = await collection.findOne({
    userId,
    date: {
      $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString(),
      $lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString()
    }
  });

  return result;
}

export async function saveDoodle(doodle: Doodle) {
  if (!collection) {
    collection = await getCollection();
  }

  const result = await collection.findOneAndUpdate({ predictionId: doodle.predictionId }, { $set: doodle }, { upsert: true, returnDocument: "after" });

  return result.value;
}

export async function upvote(doodleId: string, userId: string) {
  if (!collection) {
    collection = await getCollection();
  }

  const result = await collection.findOneAndUpdate({
    _id: new ObjectId(doodleId)
  }, {
    $addToSet: { upvotes: userId },
    $pull: { downvotes: userId }
  }, {
    returnDocument: "after"
  });

  return result.value;
}

export async function downvote(doodleId: string, userId: string) {
  if (!collection) {
    collection = await getCollection();
  }

  const result = await collection.findOneAndUpdate({
    _id: new ObjectId(doodleId)
  }, {
    $addToSet: { downvotes: userId },
    $pull: { upvotes: userId }
  }, {
    returnDocument: "after"
  });

  return result.value;
}

export async function getScore(doodleId: string) {
  if (!collection) {
    collection = await getCollection();
  }

  try {
    const aggregateCursor = collection.aggregate([{
      $match: {
        _id: new ObjectId(doodleId),
      }
    }, {
      $project: {
        upvotes: { $size: "$upvotes" },
        downvotes: { $size: "$downvotes" },
      }
    }, {
      $limit: 1
    }, {
      $project: {
        score: { $subtract: ["$upvotes", "$downvotes"] }
      }
    }]);
    const result = await aggregateCursor.next();

    console.log('result', result);

    aggregateCursor.close();
    return (result?.score as number) ?? 0;
  } catch (e) {
    // usually this means that the upvotes/downvotes fields are not arrays
    await collection.updateOne({ _id: new ObjectId(doodleId) }, { $set: { upvotes: [], downvotes: [] } });
    return 0;
  }
}

export async function getVoteFromUser(doodleId: string, userId: string) {
  if (!collection) {
    collection = await getCollection();
  }

  const aggregateCursor = collection.aggregate([{
    $match: {
      _id: new ObjectId(doodleId)
    }
  }, {
    $project: {
      upvotes: { $in: [userId, "$upvotes"] },
      downvotes: { $in: [userId, "$downvotes"] },
    }
  }, {
    $limit: 1
  }, {
    $project: {
      vote: { $cond: { if: "$upvotes", then: 1, else: { $cond: { if: "$downvotes", then: -1, else: 0 } } } }
    }
  }]);

  const result = await aggregateCursor.next();

  aggregateCursor.close();
  return result?.vote ?? 0;
}

export async function getTopDoodles(date: string) {
  if (!collection) {
    collection = await getCollection();
  }

  // get the top 12 doodles for a given date, we should query for the start and end of the day
  const startOfDay = DateTime.fromISO(date).startOf('day').toISO();
  const endOfDay = DateTime.fromISO(date).endOf('day').toISO();

  const aggregateCursor = collection.aggregate([{
    $match: {
      date: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    }
  }, {
    $project: {
      score: { $subtract: [{ $size: "$upvotes" }, { $size: "$downvotes" }] },
      predictionId: 1,
      input: 1,
      output: 1,
      userId: 1,
      upvotes: 1,
      downvotes: 1,
    }
  }, {
    $sort: {
      score: -1
    }
  }, {
    $limit: 12
  }]);

  const result = await aggregateCursor.toArray();

  aggregateCursor.close();
  return result;
}