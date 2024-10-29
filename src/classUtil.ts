import { Attributes } from './types';
import { CLASS_LIST } from './consts';
import { useState } from 'react';

export const meetsClassRequirements = (className: string, attributes: Attributes) => {
  const requiredAttributes = CLASS_LIST[className as keyof typeof CLASS_LIST];
  return Object.keys(requiredAttributes).every(
    (attr) => attributes[attr as keyof Attributes] >= requiredAttributes[attr as keyof Attributes]
  );
};

export const classClick = (className: string, setSelectedClass: (className: string) => void) => {
    console.log(`I clicked on ${className}`)
    setSelectedClass(className);
};

export const useSelectedClass = () => {
    const [selectedClass, setSelectedClass] = useState<string | null>(null);

    return { selectedClass, setSelectedClass };
};

export const closeRequirements = (setSelectedClass: (className: string) => void) => {
    setSelectedClass(null);
};