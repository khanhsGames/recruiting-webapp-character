import { useState } from 'react';
import { SKILL_LIST } from './consts';

export const useSkillPoints = () => {
  const [skillPointsSpent, setSkillPointsSpent] = useState<Record<string, number>>(
    Object.fromEntries(SKILL_LIST.map(skill => [skill.name, 0]))
  );

  const updateSkillPoints = (skill: string, delta: number, totalSkillPoints: number) => {
    setSkillPointsSpent((prev) => {
    const initialSkillPoints = Object.fromEntries(SKILL_LIST.map(skill => [skill.name, 0]));

    const currentPoints = Object.keys(prev).length === 0 ? initialSkillPoints : prev;

    const newPoints = Math.max(0, currentPoints[skill] + delta); 
    const totalSpent = Object.values(currentPoints).reduce((acc, curr) => acc + curr, 0);

    if (totalSpent - currentPoints[skill] + newPoints <= totalSkillPoints) {
      return { ...currentPoints, [skill]: newPoints };
    }
    return currentPoints; 
    });
  };

  return { skillPointsSpent, updateSkillPoints, setSkillPointsSpent };
};