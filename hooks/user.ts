import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export function useUserId() {
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    // store a uuid to track the user in the database
    if (!localStorage.getItem("userId")) {
      const uuid = uuidv4();
      localStorage.setItem("userId", uuid);
    }
    setUserId(localStorage.getItem("userId"));
  }, []);

  return userId;
}