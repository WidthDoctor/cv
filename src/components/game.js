import React, { useEffect, useState } from "react";

const Game = ({onVictory}) => {
  const [randomWord, setRandomWord] = useState(""); // Загаданное слово
  const [words, setWords] = useState([]); // Список слов
  const [tries, setTries] = useState(5); // Количество оставшихся попыток
  const [triesText, setTriesText] = useState("█████"); // Текст для .triesLeft
  const [hoveredText, setHoveredText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Функция для нахождения всех слов и выбора случайного
    const findWords = () => {
      const wordElements = Array.from(document.querySelectorAll(".word"));
      const wordText = wordElements.map((el) => el.textContent.trim());
      setWords(wordText);

      if (wordText.length > 0) {
        const randomIndex = Math.floor(Math.random() * wordText.length);
        setRandomWord(wordText[randomIndex]);
        console.log("Случайно выбранное слово:", wordText[randomIndex]);
      } else {
        console.log("Нет слов для выбора.");
      }
    };

    // Ждем 100 мс перед выполнением, чтобы элементы были отрисованы
    const timeoutId = setTimeout(() => {
      findWords();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleMouseOver = (event) => {
      const target = event.target;

      if (
        target.classList.contains("word") ||
        target.classList.contains("Kombo") ||
        target.classList.contains("symbol")
      ) {
        setHoveredText(target.textContent.trim());
      }
    };

    const handleMouseOut = () => {
      setHoveredText(""); // Сбрасываем текст при уходе курсора
    };

    const container = document.querySelector(".terminal-background");
    if (container) {
      container.addEventListener("mouseover", handleMouseOver);
      container.addEventListener("mouseout", handleMouseOut);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseover", handleMouseOver);
        container.removeEventListener("mouseout", handleMouseOut);
      }
    };
  }, []);

  useEffect(() => {
    const handleClick = (event) => {
      const target = event.target;

      // Если кликнули на комбо
      if (target.classList.contains("Kombo")) {
        target.style.pointerEvents = "none"; // Делаем комбо некликабельным

        // Заменяем случайное слово на точки
        const wordElements = Array.from(document.querySelectorAll(".word"));
        const validWords = wordElements.filter(
          (el) => el.textContent.trim() !== randomWord
        );

        if (validWords.length > 0) {
          const randomIndex = Math.floor(Math.random() * validWords.length);
          const wordToReplace = validWords[randomIndex];
          wordToReplace.textContent = "......";
          wordToReplace.classList.remove("word");
          wordToReplace.classList.add("symbol");
        }
      }

      // Если кликнули на слово
      if (target.classList.contains("word")) {
        const clickedWord = target.textContent.trim();

        if (!randomWord) return; // Если слово еще не загадано, ничего не делаем

        if (clickedWord !== randomWord) {
          // Уменьшаем количество попыток
          setTries((prevTries) => {
            const newTries = prevTries - 1;
            if (newTries >= 0) {
              setTriesText("█".repeat(newTries)); // Обновляем текст с "█"
            }
            return newTries;
          });

          // Выводим количество совпадающих букв
          const matchingLetters = clickedWord
            .split("")
            .filter((letter, index) => letter === randomWord[index]).length;
          console.log(
            `Неверное слово: ${clickedWord}. Совпадающих букв: ${matchingLetters}`
          );
          setMessages((prevMessages) => [
            ...prevMessages,
            `>${clickedWord}`,
            ">Entry denied",
            `>Likeness = ${matchingLetters}`,
          ]);
        }
        if (clickedWord === randomWord) {
          console.log('pobeda');
          onVictory();
        }
      }
    };

    // Навешиваем обработчик событий
    const container = document.querySelector(".terminal-background");
    if (container) {
      container.addEventListener("click", handleClick);
    }

    return () => {
      if (container) {
        container.removeEventListener("click", handleClick);
      }
    };
  }, [randomWord]);

  useEffect(() => {
    // Обновляем текст в элементе .triesLeft
    const triesElement = document.querySelector(".triesLeft");
    if (triesElement) {
      triesElement.textContent = `Attempts remaining: ${triesText}`;
    }
  }, [triesText]);

  return (
    <div className="hover-display">
      {messages.map((message, index) => (
        <span key={index}>{message}</span>
      ))}
      <span>{hoveredText ? `>${hoveredText}` : ">" + "█"}</span>
    </div>
  );
};

export default Game;
