import React, { useEffect, useState } from "react";

const Game = ({ onVictory, onLockout, isLocked }) => {
  const [randomWord, setRandomWord] = useState("");
  const [tries, setTries] = useState(5);
  const [hoveredText, setHoveredText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const findWords = () => {
      const wordElements = Array.from(document.querySelectorAll(".word"));
      const wordText = wordElements.map((el) => el.textContent.trim());

      if (wordText.length > 0) {
        const randomIndex = Math.floor(Math.random() * wordText.length);
        setRandomWord(wordText[randomIndex]);
      }
    };

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
      setHoveredText("");
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
      if (isLocked) return;

      const target = event.target;

      if (
        target.classList.contains("word") ||
        target.classList.contains("Kombo") ||
        target.classList.contains("symbol")
      ) {
        setHoveredText(target.textContent.trim());
      }

      if (target.classList.contains("Kombo")) {
        const comboText = target.textContent.trim();
        target.style.pointerEvents = "none";

        const wordElements = Array.from(document.querySelectorAll(".word"));
        const validWords = wordElements.filter(
          (el) => el.textContent.trim() !== randomWord,
        );

        const canRemoveDud = validWords.length > 0;
        const canRestoreAttempts = tries < 5;

        let comboAction = "none";
        if (canRemoveDud && canRestoreAttempts) {
          comboAction = Math.random() < 0.5 ? "remove-dud" : "restore-attempts";
        } else if (canRemoveDud) {
          comboAction = "remove-dud";
        } else if (canRestoreAttempts) {
          comboAction = "restore-attempts";
        }

        if (comboAction === "remove-dud") {
          const randomIndex = Math.floor(Math.random() * validWords.length);
          const wordToReplace = validWords[randomIndex];
          const removedWord = wordToReplace.textContent.trim();
          wordToReplace.textContent = "......";
          wordToReplace.classList.remove("word");
          wordToReplace.classList.add("symbol");

          setMessages((prevMessages) => [
            ...prevMessages,
            `>${comboText}`,
            ">Bracket sequence detected",
            `>Wrong word removed: ${removedWord}`,
          ]);
        }

        if (comboAction === "restore-attempts") {
          setTries(5);
          setMessages((prevMessages) => [
            ...prevMessages,
            `>${comboText}`,
            ">Bracket sequence detected",
            ">Attempts restored",
          ]);
        }

        if (comboAction === "none") {
          setMessages((prevMessages) => [
            ...prevMessages,
            `>${comboText}`,
            ">Bracket sequence detected",
            ">No additional effect",
          ]);
        }
      }

      if (target.classList.contains("word")) {
        const clickedWord = target.textContent.trim();

        if (!randomWord) return;

        if (clickedWord !== randomWord) {
          setTries((prevTries) => {
            if (prevTries <= 0) return 0;

            const newTries = prevTries - 1;

            if (newTries === 0 && onLockout) {
              onLockout();
            }

            return newTries;
          });

          const matchingLetters = clickedWord
            .split("")
            .filter((letter, index) => letter === randomWord[index]).length;

          setMessages((prevMessages) => [
            ...prevMessages,
            `>${clickedWord}`,
            ">Entry denied",
            `>Likeness = ${matchingLetters}`,
          ]);
        }

        if (clickedWord === randomWord) {
          onVictory();
        }
      }
    };

    const container = document.querySelector(".terminal-background");
    if (container) {
      container.addEventListener("click", handleClick);
    }

    return () => {
      if (container) {
        container.removeEventListener("click", handleClick);
      }
    };
  }, [isLocked, onLockout, onVictory, randomWord, tries]);

  useEffect(() => {
    const triesElement = document.querySelector(".triesLeft");
    if (triesElement) {
      const triesCells = Array.from({ length: tries }, (_, index) => {
        return `<span class="tries-cell" data-index="${index}">█</span>`;
      }).join("");

      triesElement.innerHTML = `Attempts remaining:<span class="tries-meter">${triesCells}</span>`;
    }
  }, [tries]);

  return (
    <div className="hover-display" data-tries={tries}>
      {messages.map((message, index) => (
        <span key={index}>{message}</span>
      ))}
      <span>{hoveredText ? `>${hoveredText}` : ">█"}</span>
    </div>
  );
};

export default Game;
