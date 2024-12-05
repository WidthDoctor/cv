import React, { useState, useEffect } from "react";
import "../styles/terminal.css";

// Функция для генерации случайного шестнадцатеричного значения
const generateHex = () => {
  return Math.random().toString(16).substr(2, 4).toUpperCase(); // Четыре символа (0-9, A-F)
};

// Функция для генерации случайного символа
const generateRandomSymbol = () => {
  const symbols = "^&#%*{}[]()?=+@$!<>".split(""); // Дополненный набор символов
  return symbols[Math.floor(Math.random() * symbols.length)];
};

// Функция для генерации комбо (с добавлением символов < > и других)
const generateCombo = () => {
  const brackets = ["{}", "[]", "()", "<>"]; // Доступные скобки для начала комбо
  const bracketType = brackets[Math.floor(Math.random() * brackets.length)];

  // Генерируем контент внутри скобок. Он может быть пустым, содержать символы или еще одну пару скобок
  let comboContent = generateRandomSymbol(); // Обязательно хотя бы один символ
  if (Math.random() < 0.5) { // 50% шанс добавить дополнительные символы или скобки
    const additionalContent = generateRandomSymbol() + generateRandomSymbol();
    comboContent += additionalContent; // Добавляем еще 2 символа
  }

  return `${bracketType[0]}${comboContent}${bracketType[1]}`;
};

const TerminalLines = () => {
  const vocabulary = [
    "RETINA", "RETAIN", "RATINE", "EOLIAN", "TONIER", "ORNATE", "ORIENT", "NORITE",
    "ATONER", "AUNTIE", "RATION", "ARIOSE", "TRIODE", "DOTIER", "EDITOR", "IRONES"
  ];

  const [lines, setLines] = useState([]);

  useEffect(() => {
    const totalLines = 20; // Общее количество строк
    const maxWords = 5; // Максимум слов
    const maxCombos = 5; // Максимум комбо
    let usedWords = []; // Храним использованные слова
    let wordLines = []; // Строки, в которых будут слова
    let comboLines = []; // Строки, в которых будут комбо

    // Выбираем строки для слов
    while (wordLines.length < maxWords) {
      const randomLine = Math.floor(Math.random() * totalLines);
      if (!wordLines.includes(randomLine)) {
        wordLines.push(randomLine);
      }
    }

    // Выбираем строки для комбо
    while (comboLines.length < maxCombos) {
      const randomLine = Math.floor(Math.random() * totalLines);
      if (!comboLines.includes(randomLine)) {
        comboLines.push(randomLine);
      }
    }

    const generateRandomElements = (count, isComboLine, isWordLine) => {
      let elements = [];
      let comboAdded = false;
      let wordAdded = false;

      for (let i = 0; i < count; i++) {
        if (isComboLine && !comboAdded) {
          // Добавляем комбо, если линия для комбо и комбо ещё не добавлено
          elements.push(
            <span className="Kombo" key={`combo-${i}-${Math.random()}`}>
              {generateCombo()}
            </span>
          );
          comboAdded = true;
        } else if (isWordLine && !wordAdded) {
          // Добавляем слово, если линия для слова и слово ещё не добавлено
          const randomWord = getUniqueWord();
          if (randomWord) {
            elements.push(
              <span className="word" key={`word-${Math.random()}`}>
                {randomWord}
              </span>
            );
            wordAdded = true;
          }
        } else {
          // Обычный случайный символ
          elements.push(
            <span className="symbol" key={`symbol-${i}-${Math.random()}`}>
              {generateRandomSymbol()}
            </span>
          );
        }
      }

      return elements;
    };

    const getUniqueWord = () => {
      if (usedWords.length >= vocabulary.length) return null; // Если все слова использованы
      let word;
      do {
        word = vocabulary[Math.floor(Math.random() * vocabulary.length)];
      } while (usedWords.includes(word)); // Повторять, пока слово уже использовано
      usedWords.push(word); // Добавляем слово в список использованных
      return word;
    };

    // Функция для подсчета длины элементов
    const getComboLength = (combo) => {
      return combo.length; // Считаем длину комбо
    };

    // Функция для подсчета длины строки
    const getLengthOfString = (elements) => {
      let length = 0;
      elements.forEach(el => {
        if (el.props.children && el.props.children.length) {
          length += el.props.children.length; // Если это слово, то учитываем длину каждого символа
        } else if (el.props.className === "Kombo") {
          length += getComboLength(el.props.children); // Если это комбо, учитываем длину
        }
      });
      return length;
    };

    const generateLine = (lineIndex) => {
      const firstHex = generateHex();
      const secondHex = generateHex();

      // Проверяем, должна ли эта строка содержать слово или комбо
      const isWordLine = wordLines.includes(lineIndex);
      const isComboLine = comboLines.includes(lineIndex);

      // Генерация элементов до второго HEX
      let elementsBeforeWord = generateRandomElements(12, isComboLine, isWordLine);

      // Проверка, чтобы общая длина не превышала 12
      let totalLengthBeforeWord = getLengthOfString(elementsBeforeWord);
      while (totalLengthBeforeWord > 12) {
        elementsBeforeWord.pop(); // Обрезаем, если длина превышает 12
        totalLengthBeforeWord = getLengthOfString(elementsBeforeWord);
      }

      // Добавляем второй блок после второго HEX
      let elementsAfterSecondHex = generateRandomElements(12, isComboLine, isWordLine);
      let totalLengthAfter = getLengthOfString(elementsAfterSecondHex);
      while (totalLengthAfter > 12) {
        elementsAfterSecondHex.pop(); // Обрезаем, если длина превышает 12
        totalLengthAfter = getLengthOfString(elementsAfterSecondHex);
      }

      return (
        <div className="line" key={`line-${lineIndex}`}>
          <span className="hex">0x{firstHex}</span>
          <div className="container">
            {elementsBeforeWord}
          </div>
          <span className="hex">0x{secondHex}</span>
          <div className="container">
            {elementsAfterSecondHex}
          </div>
        </div>
      );
    };

    // Генерируем 20 строк
    const generatedLines = Array.from({ length: totalLines }, (_, index) =>
      generateLine(index)
    );
    setLines(generatedLines);
  }, []);

  return <div className="terminal-lines">{lines}</div>;
};

export default TerminalLines;
