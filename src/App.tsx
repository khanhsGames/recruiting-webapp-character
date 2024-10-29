import { useState } from 'react';
import './App.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from './consts';
import { useAttributes, calculateModifier, calculateSkillPoints } from './attributesUtils';
import { meetsClassRequirements, classClick, useSelectedClass, closeRequirements} from './classUtil';
import { useSkillPoints } from './skillPoints';

function App() {
  const { attributes, incrementAttribute, decrementAttribute } = useAttributes();
  const { selectedClass, setSelectedClass } = useSelectedClass();
  const { skillPointsSpent, updateSkillPoints } = useSkillPoints();
  const totalSkillPoints = calculateSkillPoints(attributes.Intelligence);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Recruiting webapp character</h1>
      </header>
      <section className="App-section">
        <h2>Attributes</h2>
        {ATTRIBUTE_LIST.map((attribute) => {
          const attributeValue = attributes[attribute as keyof typeof attributes];
          const modifier = calculateModifier(attributeValue); 
          
          return (
            <div key={attribute}>
              <span>{attribute}: {attributeValue} (Modifier: {modifier >= 0 ? `+${modifier}` : modifier})</span>
              <button onClick={() => incrementAttribute(attribute as keyof typeof attributes)}>+</button>
              <button onClick={() => decrementAttribute(attribute as keyof typeof attributes)}>-</button>
            </div>
          );
        })}
      </section>

      <section className="App-section">
        <h2>Skills</h2>
        <p>Total Skill Points Available: {totalSkillPoints}</p>
        {SKILL_LIST.map(({ name, attributeModifier }) => {
          const modifier = calculateModifier(attributes[attributeModifier as keyof typeof attributes]);
          const pointsSpent = skillPointsSpent[name];
          const totalSkillValue = pointsSpent + modifier;

          return (
            <div key={name}>
              <span>{name} - Points: {pointsSpent} (Modifier: {modifier}) Total: {totalSkillValue}</span>
              <button onClick={() => updateSkillPoints(name, 1, totalSkillPoints)}>+</button>
              <button onClick={() => updateSkillPoints(name, -1, totalSkillPoints)}>-</button>
            </div>
          );
        })}
      </section>

      <section className="App-section">
        <h2>Classes</h2>
        {Object.keys(CLASS_LIST).map((className) => (
          <div
            key={className}
            className={`class-item ${meetsClassRequirements(className, attributes) ? 'class-met' : 'class-not-met'}`}
            onClick={() => classClick(className, setSelectedClass)}
          >
            {className}
          </div>
        ))}

        {selectedClass && (
          <div className="class-requirements">
            <div className="close-button"
            onClick={() => closeRequirements(setSelectedClass)}>
              X
            </div>
            <h3>Requirements for {selectedClass}</h3>
            <ul>
              {Object.entries(CLASS_LIST[selectedClass as keyof typeof CLASS_LIST]).map(([attr, value]) => (
                <li key={attr}>
                  {attr}: {value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>

    
  );
}

export default App;
