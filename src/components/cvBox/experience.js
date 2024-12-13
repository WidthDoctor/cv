import React, { useState, useEffect } from "react";
import "../../styles/profile.css";
import "../../styles/mobile.css";
const ExperienceLog = ({ exit }) => {
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
  const [text12, setText12] = useState("");
  const [text13, setText13] = useState("");
  const [text14, setText14] = useState("");
  const [text15, setText15] = useState("");
  const [text16, setText16] = useState("");
  const [text17, setText17] = useState("");
  const [text18, setText18] = useState("");
  const [text19, setText19] = useState("");
  const [text20, setText20] = useState("");
  const [text21, setText21] = useState("");
  const [text22, setText22] = useState("");
  const [text23, setText23] = useState("");
  const [text24, setText24] = useState("");
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
      typeText("*** TERMINAL ENTRY LOG ***", setText2, () => {
        typeText("*** ACCESSING USER PROFILE ***", setText3, () => {
          typeText(
            "> LOG INITIALIZED: Experience Log [Candidate #24601 - Junior Dev. Trying to Center a Div Since 2018]",
            setText4,
            () => {
              typeText("> SYSTEM RECORDS:", setText5, () => {
                typeText(
                  "  - Glinka College of Music [Access Verified]",
                  setText6,
                  () => {
                    typeText(
                      "    - FIELD OF STUDY: Door and Furniture Restoration Course [Archive Reference #2020]",
                      setText7,
                      () => {
                        typeText(
                          "> ACADEMIC AND SKILL DEVELOPMENT:",
                          setText8,
                          () => {
                            typeText(
                              '  - 2020 - RS Schools Course: "JavaScript/Front-End"',
                              setText9,
                              () => {
                                typeText(
                                  "> STATUS: Training Completed",
                                  setText10,
                                  () => {
                                    typeText(
                                      "    - 2022 - EPAM Upskill Me",
                                      setText11,
                                      () => {
                                        typeText(
                                          "> STATUS: Advanced Programming Skills Acquired [Log Updated]",
                                          setText12,
                                          () => {
                                            typeText(
                                              '  - 2023 - RS Schools Course: "JavaScript/Front-End Pre-School (Stage #0)"',
                                              setText13,
                                              () => {
                                                typeText(
                                                  "> STATUS: Orientation Complete [Milestone Achieved]",
                                                  setText14,
                                                  () => {
                                                    typeText(
                                                      '  - 2023 - RS Schools Course: "JavaScript/Front-End Pre-School (Stage #1)"',
                                                      setText15,
                                                      () => {
                                                        typeText(
                                                          "> STATUS: COMPLETED Successfully [Verified: 100% Progress]",
                                                          setText16,
                                                          () => {
                                                            typeText(
                                                              '  - 2023 - RS Schools Course: "JavaScript/Front-End Pre-School (Stage #2)"',
                                                              setText17,
                                                              () => {
                                                                typeText(
                                                                  "> STATUS: UNKNOWN [Last Seen in the Glowing Sea, Pursued by Radscorpions]",
                                                                  setText18,
                                                                  () => {
                                                                    typeText(
                                                                      "*** SYSTEM NOTICE ***",
                                                                      setText19,
                                                                      () => {
                                                                        typeText(
                                                                          "> Vault-Tec Overseer Notes:",
                                                                          setText20,
                                                                          () => {
                                                                            typeText(
                                                                              "  - Candidate demonstrates consistent skill progression in Front-End Development.",
                                                                              setText21,
                                                                              () => {
                                                                                typeText(
                                                                                  "    - Additional tasks needed for Stage #2 completion. It’s time to unlock that “Lucky” perk, Vault Dweller!",
                                                                                  setText22,
                                                                                  () => {
                                                                                    typeText(
                                                                                      "*** PLEASE EXIT WHEN DONE ***",
                                                                                      setText23,
                                                                                      () => {
                                                                                        typeText(
                                                                                          "EXIT",
                                                                                          setText24,
                                                                                          () => {}
                                                                                        );
                                                                                      }
                                                                                    );
                                                                                  }
                                                                                );
                                                                              }
                                                                            );
                                                                          }
                                                                        );
                                                                      }
                                                                    );
                                                                  }
                                                                );
                                                              }
                                                            );
                                                          }
                                                        );
                                                      }
                                                    );
                                                  }
                                                );
                                              }
                                            );
                                          }
                                        );
                                      }
                                    );
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                );
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
        <span>{text11}</span>
        <span>{text12}</span>
        <span>{text13}</span>
        <span>{text14}</span>
        <span>{text15}</span>
        <span>{text16}</span>
        <span>{text17}</span>
        <span>{text18}</span>
        <div className="system-notice">
          <span>{text19}</span>
          <span>{text20}</span>
          <span>{text21}</span>
          <span>{text22}</span>
          <span>{text23}</span>
        </div>
      </div>
      <span onClick={exit} className="exit">
        {text24}
      </span>
    </div>
  );
};

export default ExperienceLog;
