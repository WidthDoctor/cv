import React, { useState, useEffect } from "react";
import "../../styles/profile.css";
import "../../styles/mobile.css";
const ProjectsLog = ({exit}) => {
  const [text1, setText1] = useState(""); // Для первого спана
  const [text2, setText2] = useState(""); // Для второго спана
  const [text3, setText3] = useState(""); // Для третьего спана
  const [text4, setText4] = useState("");
  const [text5, setText5] = useState("");
  const [text6, setText6] = useState("");
  const [text7, setText7] = useState("");
  const [text8, setText8] = useState("");
  const [text9, setText9] = useState("");
  const [text10, setText10] = useState("");
  const [text11, setText11] = useState("");

  useEffect(() => {
    const asciiSymbol = "█";
    const delay = 10; // Задержка между символами

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
// 2. React.js (learning)
// 3. Figma pixel-perfect implementations

    typeText("Vault-Tec Personnel Terminal", setText1, () => {
      typeText("[>>> SCANNING PROJECT LOG <<<]", setText2, () => {
        typeText("[>>> RETRIEVING PROJECT DATA <<<]", setText3, () => {
          typeText(
            "[>>> PROJECTS LOG UPDATED <<<]",
            setText4,
            () => {
              typeText("Restoration Site", setText5, () => {
                typeText(": Web restoration service showcasing portfolio and client testimonials.", setText6, () => {
                  typeText("RSS Shelter Project", setText7, () => {
                    typeText(
                      ": A learning project focused on basic JavaScript functionalities and interactivity.",
                      setText8,
                      () => {
                        typeText("Calculator App", setText9, () => {
                          typeText(
                            ": A simple calculator built with JavaScript for basic arithmetic operations.",
                            setText10, () =>{
                              typeText("[EXIT]", setText11)
                            }
                          );
                        });
                      }
                    );
                  });
                });
              });
            }
          );
        });
      });
    });
  }, []); // Обязательно закрыть массив зависимостей

  return (
    <div className="profile-container">
      <span className="greet">{text1}</span>
      <span className="greet">{text2}</span>
      <span className="greet">{text3}</span>
      <span className="greet">{text4}</span>
      <div className="info-container">
        <span><a href="https://restavracija.by/">{text5}</a>{text6}</span>
        <span><a href="https://rolling-scopes-school.github.io/widthdoctor-JSFE2023Q1/shelter/">{text7}</a>{text8}</span>
        <span><a href="https://widthdoctor.github.io/calculator/">{text9}</a>{text10}</span>
      </div>
      <span onClick={exit} className="exit">{text11}</span>
    </div>
  );
};

export default ProjectsLog;
