import { useState } from 'react';
import { SKILL_LIST } from './consts';

export const useSkillPoints = () => {
  const [skillPointsSpent, setSkillPointsSpent] = useState<Record<string, number>>(
    Object.fromEntries(SKILL_LIST.map(skill => [skill.name, 0]))
  );

  const updateSkillPoints = (skill: string, delta: number, totalSkillPoints: number) => {
    setSkillPointsSpent((prev) => {
      const newPoints = Math.max(0, prev[skill] + delta); 
      const totalSpent = Object.values(prev).reduce((acc, curr) => acc + curr, 0);

      if (totalSpent - prev[skill] + newPoints <= totalSkillPoints) {
        return { ...prev, [skill]: newPoints };
      }
      return prev; 
    });
  };

  return { skillPointsSpent, updateSkillPoints };
};
