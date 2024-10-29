import { useState } from 'react';
import { ATTRIBUTE_LIST } from './consts';
import { Attributes } from './types';

const ATTRIBUTE_MAX_TOTAL = 70;

// hook to manage attribute states
export const useAttributes = () => {
  const defaultAttributes: Attributes = {
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
  };

  const [attributes, setAttributes] = useState<Attributes>(defaultAttributes);

  // Function to increment an attribute
  const incrementAttribute = (attribute: keyof Attributes) => {
    if (calculateTotalAttributes(attributes) < ATTRIBUTE_MAX_TOTAL) {
      setAttributes((prevAttributes) => ({
        ...prevAttributes,
        [attribute]: prevAttributes[attribute] + 1,
      }));
    }
  };

  // Function to decrement an attribute
  const decrementAttribute = (attribute: keyof Attributes) => {
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: Math.max(0, prevAttributes[attribute] - 1),
    }));
  };
const setAttributesWrapper = (newAttributes: Attributes) => {
    console.log("Setting attributes:", newAttributes); // Log attributes when setting
    setAttributes(newAttributes);
  };
  const calculateTotalAttributes = (attributes: Attributes): number =>
    Object.values(attributes).reduce((total, value) => total + value, 0);

  return { attributes, incrementAttribute, decrementAttribute, setAttributes: setAttributesWrapper };
};

export const calculateModifier = (value: number): number => {
    return Math.floor((value - 10) / 2);
};

export const calculateSkillPoints = (intelligence: number): number => {
    const modifier = calculateModifier(intelligence);
    return 10 + 4 * modifier;
};