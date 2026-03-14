import React, { useEffect, useRef, useState } from "react";
import "../styles/terminal.css";
import "../styles/mobile.css";
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
  const [isLocked, setIsLocked] = useState(false);
  const [lockSeconds, setLockSeconds] = useState(0);
  const [sessionId, setSessionId] = useState(0);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isAccessSequence, setIsAccessSequence] = useState(false);
  const [typedAccessText, setTypedAccessText] = useState("");
  const [typedXpText, setTypedXpText] = useState("");
  const sequenceTimers = useRef([]);

  const clearSequenceTimers = () => {
    sequenceTimers.current.forEach((timerId) => {
      clearInterval(timerId);
      clearTimeout(timerId);
    });
    sequenceTimers.current = [];
  };

  const runTypewriterLine = (text, setter, onComplete, speed = 28) => {
    let index = 0;
    setter("");

    const intervalId = setInterval(() => {
      index += 1;
      setter(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(intervalId);
        if (onComplete) onComplete();
      }
    }, speed);

    sequenceTimers.current.push(intervalId);
  };

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
    typeText(
      "Welcome to CV Anton Popov Industries(TM) TermLink",
      setText1,
      () => {
        typeText("Password Required", setText2, () => {
          typeText("Attempts remaining: ", setText3, () => {
            setShowTerminal(true); // Когда печать завершена, показываем игру
          });
        });
      },
    );
  }, []);

  useEffect(() => {
    if (!isLocked) return;

    const lockTime = 5000;
    const startedAt = Date.now();
    setLockSeconds(5);

    const timerInterval = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const remainingMs = Math.max(lockTime - elapsed, 0);
      setLockSeconds(Math.ceil(remainingMs / 1000));
    }, 100);

    const timerTimeout = setTimeout(() => {
      clearInterval(timerInterval);
      setIsLocked(false);
      setLockSeconds(0);
      setSessionId((prevSessionId) => prevSessionId + 1);
    }, lockTime);

    return () => {
      clearInterval(timerInterval);
      clearTimeout(timerTimeout);
    };
  }, [isLocked]);

  useEffect(() => {
    return () => {
      clearSequenceTimers();
    };
  }, []);

  const handleLockout = () => {
    if (isLocked || isVictory) return;
    setIsLocked(true);
  };

  const handleVictory = () => {
    if (isVictory || isAccessSequence) return;

    clearSequenceTimers();
    setIsHelpOpen(false);
    setShowTerminal(false);
    setIsAccessSequence(true);
    setTypedAccessText("");
    setTypedXpText("");

    const gainedXp = Math.floor(Math.random() * 81) + 20;

    runTypewriterLine("ACCESS GRANTED", setTypedAccessText, null, 30);

    const xpStartTimer = setTimeout(() => {
      runTypewriterLine(`+${gainedXp} XP`, setTypedXpText, null, 34);
    }, 140);
    sequenceTimers.current.push(xpStartTimer);

    const xpCleanupTimer = setTimeout(() => {
      setTypedXpText("");
    }, 4700);
    sequenceTimers.current.push(xpCleanupTimer);

    const finishTimer = setTimeout(() => {
      setIsAccessSequence(false);
      setTypedAccessText("");
      setIsVictory(true);
    }, 2000);
    sequenceTimers.current.push(finishTimer);
  };

  const showVictoryOverlay = isAccessSequence || Boolean(typedXpText);

  return (
    <div className={`terminal-background ${isLocked ? "locked" : ""}`}>
      <div className="textContainer">
        {showVictoryOverlay && (
          <div className="victory-sequence-overlay">
            <span className="victory-access">{typedAccessText}</span>
            <span className={`victory-xp ${typedXpText ? "is-visible" : ""}`}>
              {typedXpText}
            </span>
          </div>
        )}

        {isHelpOpen && (
          <div
            className="help-popup-overlay"
            onClick={() => setIsHelpOpen(false)}
          >
            <div
              className="help-popup"
              onClick={(event) => event.stopPropagation()}
            >
              <span className="help-title">MINI-GAME HELP</span>
              <span>1) Choose words and find the correct password.</span>
              <span>
                2) Wrong word shows Likeness (matching letters in place).
              </span>
              <span>
                3) On PC: hover and click bracket combos like {"{} [] () <>"}.
              </span>
              <span>
                4) On mobile: combo blocks have a soft pulse glow. If not, your
                Hacker skill perk will guide you ;)
              </span>
              <span>
                5) Combo can remove a wrong word or restore all attempts.
              </span>
              <span>6) You have 5 attempts before lockout.</span>
              <span>7) After lockout terminal resets in 5 seconds.</span>
              <button
                type="button"
                className="help-close"
                onClick={() => setIsHelpOpen(false)}
              >
                CLOSE
              </button>
            </div>
          </div>
        )}

        {!isVictory && !isAccessSequence && (
          <div className="terminal-header">
            {showTerminal && (
              <div className="terminal-header-actions">
                <button
                  type="button"
                  className="help-button"
                  onClick={() => setIsHelpOpen(true)}
                  aria-label="How to play"
                >
                  ?
                </button>
              </div>
            )}
            <span className="greet">{text1}</span>
            <span className="greet">{text2}</span>
            <span className="triesLeft">{text3}</span>
            {isLocked && (
              <span className="lock-status">
                TERMINAL LOCKED... REINITIALIZING {lockSeconds}
              </span>
            )}
          </div>
        )}
        {showTerminal && !isVictory && !isAccessSequence && (
          <div
            className={`terminal-playground ${isLocked || isHelpOpen ? "is-locked" : ""}`}
          >
            <TerminalLines key={`lines-${sessionId}`} />
            <Game
              key={`game-${sessionId}`}
              onVictory={handleVictory}
              onLockout={handleLockout}
              isLocked={isLocked}
            />
          </div>
        )}
        {isVictory && <CV />}
      </div>
    </div>
  );
};

export default Terminal;
