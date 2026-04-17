import styles from "./app.module.css";
import { useEffect, useState } from "react";
import { WORDS } from "./utils/words";
import type { Challenge } from "./utils/words";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Tip } from "./components/Tip";
import { Letter } from "./components/Letters";
import { Header } from "./components/Header";
import { LettersUsed, type LettersUsedProps } from "./components/LettersUsed";

export default function App() {
  const [score, setScore] = useState(0);

  const [letter, setLetter] = useState("");
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [shake, setShake] = useState(false);

  const ATTEMPTS = 3;

  const totalLettersToGuess = challenge?.word.replace(/\s/g, "").length || 0;

  function handleRestartGame() {
    const isConfirm = window.confirm("Voce tem certeza que deseja reiniciar?");
    if (isConfirm) {
      startGame();
    }
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const randomWord = WORDS[index];

    setChallenge(randomWord);

    setScore(0);

    setLetter("");

    setLettersUsed([]);
  }

  function handleConfirm() {
    if (!challenge) {
      return;
    }

    if (!letter.trim()) {
      return alert("Digite uma letra!");
    }

    const value = letter.toUpperCase();
    const exists = lettersUsed.find(
      (used) => used.value.toUpperCase() === value,
    );

    if (exists) {
      setLetter("");
      return alert("Voce ja tentou essa letra!");
    }

    const hits = challenge.word
      .toUpperCase()
      .split("")
      .filter((char) => char === value).length;

    const correct = hits > 0;

    const currentScore = score + hits;

    setLettersUsed((prevState) => [...prevState, { value, correct }]);

    if (correct) {
      setScore((prev) => prev + hits);
    }

    setScore(currentScore);
    setLetter("");

    if (!correct) {
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
  }

  function endGame(message: string) {
    alert(message);
    startGame();
  }

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    if (!challenge) {
      return;
    }

    setTimeout(() => {
      if (score === totalLettersToGuess && totalLettersToGuess > 0) {
        return endGame("Parabéns! Você descobriu o filme!");
      }

      const attemptLimit = totalLettersToGuess + ATTEMPTS;

      if (lettersUsed.length === attemptLimit) {
        return endGame("Que pena voce usou todas as tentativas!");
      }
    }, 500);
  }, [score, lettersUsed.length]);

  if (!challenge) {
    return;
  }

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={lettersUsed.length}
          max={challenge.word.length + ATTEMPTS}
          onRestart={handleRestartGame}
        />

        <Tip tip={challenge.tip} />

        <div className={`${styles.word} ${shake && styles.shake}`}>
          {challenge.word.split("").map((letter, index) => {
            const letterUsed = lettersUsed.find(
              (used) => used.value.toUpperCase() == letter.toUpperCase(),
            );
            return (
              <Letter
                key={index}
                value={letterUsed?.value}
                color={letterUsed?.correct ? "correct" : "default"}
              />
            );
          })}
        </div>

        <h4>Palpite</h4>

        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
          />
          <Button onClick={handleConfirm}>Confirmar</Button>
        </div>

        <LettersUsed data={lettersUsed} />
      </main>
    </div>
  );
}
