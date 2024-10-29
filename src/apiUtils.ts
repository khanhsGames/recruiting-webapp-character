import { useEffect } from 'react';
import { Attributes } from './types';

interface CharacterData {
    attributes: Attributes;
    selectedClass: string | null;
    skillPointsSpent: Record<string, number>;
  }

  const defaultAttributes: Attributes = {
    Strength: 10,
    Dexterity: 10,
    Constitution: 10,
    Intelligence: 10,
    Wisdom: 10,
    Charisma: 10,
  };
  
  export const useCharacterData = (
    setAttributes: (attributes: Attributes) => void,
    setSelectedClass: (className: string | null) => void,
    setSkillPointsSpent: (skillPoints: Record<string, number>) => void,
  ) => {
    const loadCharacter = async () => {
        try {
          const data = await fetchCharacterData();
          if (data) {
            
        console.log(`Loading3 ${JSON.stringify(data)}`)
        // console.log(`Loading7 ${data.body.attributes}`)
            const attributes = { ...defaultAttributes, ...data.body.attributes };
            setAttributes(attributes);
            setSelectedClass(data.body.selectedClass || null);
            setSkillPointsSpent(data.body.skillPointsSpent);
          } else {
            
            setAttributes(defaultAttributes);
          }
        } catch (error) {
          console.error("Failed to load character data:", error);
          setAttributes(defaultAttributes);
        }
      };
  
    const saveCharacter = async (characterData: CharacterData) => {
      await saveCharacterData(characterData);
    };
  
    const handleSaveClick = async (characterData: CharacterData) => {
      await saveCharacter(characterData);
    };
  
    const saveCharacterHandler = async (
      attributes: Attributes,
      selectedClass: string | null,
      skillPointsSpent: Record<string, number>
    ) => {
      const characterData = {
        attributes,
        selectedClass,
        skillPointsSpent,
      };
      await handleSaveClick(characterData);
    };
  
    useEffect(() => {
      loadCharacter();
    }, []);
  
    return { saveCharacter, loadCharacter, saveCharacterHandler };
  };

const API_BASE_URL = 'https://recruiting.verylongdomaintotestwith.ca/api/{khanhsGames}';

const fetchCharacterData = async (): Promise<any | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/character`);
    if (!response.ok) throw new Error('Failed to fetch character data');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const saveCharacterData = async (data: CharacterData): Promise<void> => {
  try {
    await fetch(`${API_BASE_URL}/character`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('Failed to save character data:', error);
  }
};
