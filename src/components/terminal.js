import React, { useState, useEffect } from "react";
import "../styles/terminal.css";
import TerminalLines from "./TerminalLines";
import Game from "./game";
import CV from "./cvBox/menu";
// Импортируем Game компонент

const Terminal = () => {
  const [text1, setText1] = useState(""); // Для первого спана
  const [text2, setText2] = useState(""); // Для второго спана
  const [text3, setText3] = useState(""); // Для третьего спана
  const [showTerminal, setShowTerminal] = useState(false); // Управляем состоянием отображения игры
  const [isVictory, setIsVictory] = useState(false);

  useEffect(() => {
    const asciiSymbol = "█";
    const delay = 60; // Задержка между символами

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
    typeText(
      "Welcome to CV Anton Popov Industries(TM) TermLink",
      setText1,
      () => {
        typeText("Password Required", setText2, () => {
          typeText("Attempts remaining: ", setText3, () => {
            setShowTerminal(true); // Когда печать завершена, показываем игру
          });
        });
      }
    );
  }, []);

  return (
    <div className="terminal-background">
      <div className="textContainer">
        {!isVictory && (
          <>
            <span className="greet">{text1}</span>
            <span className="greet">{text2}</span>
            <span className="triesLeft">{text3}</span>
          </>
        )}
        {showTerminal && !isVictory && (
          <>
            <TerminalLines />
            <Game onVictory={() => setIsVictory(true)} />
          </>
        )}
        {isVictory && <CV />}
      </div>
    </div>
  );
};

export default Terminal;
