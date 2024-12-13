import React, { useState, useEffect } from "react";
import "../../styles/cv.css";
import ProfileLog from "./profile";
import SkillLog from "./skills.js"
import ProjectsLog from "./projects.js";
import ExperienceLog from "./experience.js";
import "../../styles/mobile.css";

const CV = () => {
  const [text1, setText1] = useState(""); // Для первого спана
  const [text2, setText2] = useState(""); // Для второго спана
  const [text3, setText3] = useState(""); // Для третьего спана
  const [text4, setText4] = useState("");
  const [text5, setText5] = useState("");
  const [text6, setText6] = useState("");
  const [text7, setText7] = useState("");
  const [Menu, setMenu] = useState(true);
  const [Profile, setProfile] = useState(false);
  const [Skill, setSkill] = useState(false);
  const [Projects, setProjects] = useState(false);
  const [Experience, setExperience] = useState(false);

  useEffect(() => {
    const asciiSymbol = "█";
    const delay = 30; // Задержка между символами

    // Функция для анимации печати текста
    const typeText = (text, setter, callback) => {
      let i = 0;
      let displayText = ""; // Храним корректный результат
      const interval = setInterval(() => {
        if (i < text.length) {
          displayText += text[i]; // Добавляем новую букву
          setter(displayText + asciiSymbol); // Показываем текст с символом
          i++;
        } else {
          setter(displayText); // Убираем символ после завершения строки
          clearInterval(interval);
          if (callback) callback(); // Переход к следующему спану
        }
      }, delay);
    };

    // Последовательно запускаем анимацию для всех строк
    typeText("Vault-Tec Personnel Terminal ACCESSING...", setText1, () => {
      typeText("WELCOME, USER. PLEASE SELECT AN ENTRY:", setText2, () => {
        typeText("1. [JUNIOR DEVELOPER PROFILE]", setText3, () => {
          typeText("2. [SKILLS INVENTORY]", setText4, () => {
            typeText("3. [CURRENT PROJECTS]", setText5, () => {
              typeText("4. [EXPERIENCE LOG]", setText6, () => {
              });
            });
          });
        });
      });
    });
  }, []); // Обязательно закрыть массив зависимостей

  return (
    <div className="cv-container">
      {Menu && (
        <>
          <span className="greet">{text1}</span>
          <span className="greet">{text2}</span>
          <div className="menu-container">
            <span
              onClick={() => {
                setMenu(false);
                setProfile(true);
              }}
            >
              {text3}
            </span>
            <span
              onClick={() => {
                setSkill(true);
                setMenu(false);
              }}
            >
              {text4}
            </span>
            <span onClick={() => {setProjects(true); setMenu(false)}}>{text5}</span>
            <span onClick={() => {setExperience(true); setMenu(false)}}>{text6}</span>
            <span>{text7}</span>
          </div>
        </>
      )}
      {Profile && (
        <ProfileLog
          exit={() => {
            setMenu(true);
            setProfile(false);
          }}
        />
      )}
      {Skill && (<SkillLog exit={() => {setMenu(true); setSkill(false)}} />)}
      {Projects && (<ProjectsLog exit={() => {setMenu(true); setProjects(false)}} />)}
      {Experience && (<ExperienceLog exit={() => {setMenu(true); setExperience(false)}} />)}
    </div>
  );
};

export default CV;
