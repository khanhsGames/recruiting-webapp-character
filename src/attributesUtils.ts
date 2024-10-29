import { useState } from 'react';
import { ATTRIBUTE_LIST } from './consts';
import { Attributes } from './types';

// hook to manage attribute states
export const useAttributes = () => {
  const [attributes, setAttributes] = useState<Attributes>({
    Strength: 0,
    Dexterity: 0,
    Constitution: 0,
    Intelligence: 0,
    Wisdom: 0,
    Charisma: 0,
  });

  // Function to increment an attribute
  const incrementAttribute = (attribute: keyof Attributes) => {
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: prevAttributes[attribute] + 1,
    }));
  };

  // Function to decrement an attribute
  const decrementAttribute = (attribute: keyof Attributes) => {
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: prevAttributes[attribute] > 0 ? prevAttributes[attribute] - 1 : 0,
    }));
  };

  return { attributes, incrementAttribute, decrementAttribute };
};

export const calculateModifier = (value: number): number => {
    return Math.floor((value - 10) / 2);
};

export const calculateSkillPoints = (intelligence: number): number => {
    const modifier = calculateModifier(intelligence);
    return 10 + 4 * modifier;
};