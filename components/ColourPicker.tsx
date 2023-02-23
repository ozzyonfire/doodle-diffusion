'use client';

import { useState } from 'react';
import { SketchPicker } from 'react-color';

export default function ColourPicker(props: {
  label: string,
  colour: string,
  onChange: (colour: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-1 w-full">
      <label htmlFor="colour" className="mr-2 flex-grow">{props.label}</label>
      <div
        id="colour"
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-5 cursor-pointer rounded-sm m-1 p-1 bg-white"
      >
        <div className="w-full h-full rounded-sm" style={{ backgroundColor: props.colour }} />
      </div>
      {isOpen && (
        <div className="absolute z-10">
          <div
            className="fixed inset-0"
            onClick={() => setIsOpen(false)}
          />
          <SketchPicker
            color={props.colour}
            onChange={(colour) => props.onChange(colour.hex)}
          />
        </div>
      )}
    </div>
  );
}