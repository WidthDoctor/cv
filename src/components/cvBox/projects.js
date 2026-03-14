import React, { useState, useEffect } from "react";
import "../../styles/profile.css";
import "../../styles/mobile.css";
const ProjectsLog = ({ exit }) => {
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
      typeText("[>>> SCANNING PROJECT LOG <<<]", setText2, () => {
        typeText("[>>> RETRIEVING PROJECT DATA <<<]", setText3, () => {
          typeText("[>>> PROJECTS LOG UPDATED <<<]", setText4, () => {
            typeText("Tiana Landing", setText12, () => {
              typeText(
                ": [VAULT-TEC STATUS: WEDDING ATELIER WEBSITE IS CURRENTLY UNDER ACTIVE DEVELOPMENT. PLEASE STAND BY, WASTELANDER. BUT STILL CHECK IT OUT.]",
                setText13,
                () => {
                  typeText("Restoration Site", setText5, () => {
                    typeText(
                      ": Web restoration service showcasing portfolio and client testimonials.",
                      setText6,
                      () => {
                        typeText("RSS Shelter Project", setText7, () => {
                          typeText(
                            ": A learning project focused on basic JavaScript functionalities and interactivity.",
                            setText8,
                            () => {
                              typeText("Calculator App", setText9, () => {
                                typeText(
                                  ": Field calculator for counting ghouls in abandoned labs and tracking wasteland incident totals.",
                                  setText10,
                                  () => {
                                    typeText(
                                      "DaGrasso Work Calculator",
                                      setText15,
                                      () => {
                                        typeText(
                                          ": Salary calculator built for DaGrasso manager to compute daily wages of pizzeria staff.",
                                          setText16,
                                          () => {
                                            typeText(
                                              "Wasteland Meme Slider",
                                              setText17,
                                              () => {
                                                typeText(
                                                  ": A joke meme slider page. [VAULT-TEC MORALE PROTOCOL: APPROVED FOR WASTELAND LAUGHS.]",
                                                  setText18,
                                                  () => {
                                                    typeText(
                                                      "Virtual Keyboard",
                                                      setText19,
                                                      () => {
                                                        typeText(
                                                          ": Fully functional virtual keyboard. [DESIGN NOTE: OUR DESIGNER WAS EITHER TAKEN OUT BY A BOMB OR EATEN BY A DEATHCLAW.]",
                                                          setText20,
                                                          () => {
                                                            typeText(
                                                              "Momentum",
                                                              setText21,
                                                              () => {
                                                                typeText(
                                                                  ": Project recovered from old archives.",
                                                                  setText22,
                                                                  () => {
                                                                    typeText(
                                                                      "Gem Puzzle",
                                                                      setText23,
                                                                      () => {
                                                                        typeText(
                                                                          ": Old archive build from my very first Level 1 days in the wasteland.",
                                                                          setText24,
                                                                          () => {
                                                                            typeText(
                                                                              "[EXIT]",
                                                                              setText14,
                                                                            );
                                                                          },
                                                                        );
                                                                      },
                                                                    );
                                                                  },
                                                                );
                                                              },
                                                            );
                                                          },
                                                        );
                                                      },
                                                    );
                                                  },
                                                );
                                              },
                                            );
                                          },
                                        );
                                      },
                                    );
                                  },
                                );
                              });
                            },
                          );
                        });
                      },
                    );
                  });
                },
              );
            });
          });
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
        <span>
          <a href="https://widthdoctor.github.io/tiana/">{text12}</a>
          {text13}
        </span>
        <span>
          <a href="https://restavracija.by/">{text5}</a>
          {text6}
        </span>
        <span>
          <a href="https://rolling-scopes-school.github.io/widthdoctor-JSFE2023Q1/shelter/">
            {text7}
          </a>
          {text8}
        </span>
        <span>
          <a href="https://widthdoctor.github.io/calculator/">{text9}</a>
          {text10}
        </span>
        <span>
          <a href="https://widthdoctor.github.io/workcalculator/">{text15}</a>
          {text16}
        </span>
        <span>
          <a href="https://widthdoctor.github.io/cssMemeSlider/cssMemeSlider/">
            {text17}
          </a>
          {text18}
        </span>
        <span>
          <a href="https://widthdoctor.github.io/virtual-keyboard/">{text19}</a>
          {text20}
        </span>
        <span>
          <a href="https://widthdoctor.github.io/momentum/momentum/">
            {text21}
          </a>
          {text22}
        </span>
        <span>
          <a href="https://widthdoctor.github.io/gem-puzzle/">{text23}</a>
          {text24}
        </span>
      </div>
      <span onClick={exit} className="exit">
        {text14}
      </span>
    </div>
  );
};

export default ProjectsLog;
