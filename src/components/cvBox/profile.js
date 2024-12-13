import React, { useState, useEffect } from "react";
import "../../styles/profile.css";
import "../../styles/mobile.css";
const ProfileLog = ({exit}) => {
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

    // Последовательно запускаем анимацию для всех строк
    //       [>>> USER AUTHENTICATION SUCCESSFUL <<<]
    // [>>> ACCESSING DEVELOPER DATABASE <<<]
    // [>>> PROFILE LOADED: JUNIOR DEVELOPER <<<]
    typeText("Vault-Tec Personnel Terminal", setText1, () => {
      typeText("[>>> USER AUTHENTICATION SUCCESSFUL <<<]", setText2, () => {
        typeText("[>>> ACCESSING DEVELOPER DATABASE <<<]", setText3, () => {
          typeText(
            "[>>> PROFILE LOADED: JUNIOR DEVELOPER <<<]",
            setText4,
            () => {
              typeText("[JUNIOR DEVELOPER PROFILE]", setText5, () => {
                typeText("NAME: [ANTON POPOV]", setText6, () => {
                  typeText("TITLE: Junior Frontend Developer", setText7, () => {
                    typeText(
                      "CLEARANCE LEVEL: Open to Opportunities",
                      setText8,
                      () => {
                        typeText("OVERVIEW:", setText9, () => {
                          typeText(
                            "Self-taught developer with a strong foundation in web development, passionate about creating responsive and interactive user interfaces. Eager to contribute to real-world projects while continuing to grow skills in modern technologies.",
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
        <span>{text5}</span>
        <span>{text6}</span>
        <span>{text7}</span>
        <span>{text8}</span>
        <span>{text9}</span>
        <span>{text10}</span>
      </div>
      <span onClick={exit} className="exit">{text11}</span>
    </div>
  );
};

export default ProfileLog;
