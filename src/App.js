import { useState, useEffect } from "react";
import Keyboard from "./components/Keyboard";
import ThemeSwitcher from "./components/ThemeSwitcher";
import ResetGame from "./components/ResetGame";
import Loader from "react-loader-spinner";

function App() {
  const maxChances = 6;

  const fetchWord = async () => {
    setLoading(true);
    const response = await fetch("https://random-words-api.vercel.app/word");
    const data = await response.json();

    const hiddenWord = data[0].word
      .split("")
      .map((letter) => {
        letter = "_";
        return letter;
      })
      .join("");

    const clue = data[0].definition;

    setWord(hiddenWord);
    setGuessingWord(data[0].word.toLowerCase());
    setClue(clue);

    setLoading(false);
  };

  // Disable a button after click
  const disable = (key) => {
    document.querySelector(`#${key}`).setAttribute("disabled", true);
  };

  const handleClick = (key) => {
    disable(key);

    let letterIndex = [];
    let newWord = word.split("");

    if (guessingWord.includes(key)) {
      for (let i in guessingWord.split("")) {
        if (guessingWord.split("")[i] === key) {
          letterIndex = [...letterIndex, i];
        }
      }

      for (let i in letterIndex) {
        newWord[letterIndex[i]] = guessingWord.split("")[letterIndex[i]];
      }

      setWord(newWord.join(""));
    } else {
      setImage(image + 1);
      setChancesLeft(chancesLeft - 1);
    }
  };

  const resetGame = () => {
    setChancesLeft(maxChances);
    setImage(0);
    fetchWord();
    setGameLost(false);
    setGameWon(false);
  };

  // States
  const [image, setImage] = useState(0);
  const [chancesLeft, setChancesLeft] = useState(maxChances);
  const [word, setWord] = useState("");
  const [guessingWord, setGuessingWord] = useState("");
  const [clue, setClue] = useState("");
  const [loading, setLoading] = useState(true);
  const [gameLost, setGameLost] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Initial fetching word
  useEffect(() => {
    fetchWord();
  }, []);

  // Game Lost Effect
  useEffect(() => {
    if (chancesLeft === 0) {
      setGameLost(true);
    }
  }, [chancesLeft]);

  // Game Won Effect
  useEffect(() => {
    if (word !== "" && word === guessingWord) {
      setGameWon(true);
    }
  }, [word, guessingWord]);

  return (
    <>
      <h1>Hangman</h1>
      <div className="switch-wrap">
        <ThemeSwitcher />
      </div>
      <div>
        {loading && (
          <div className="loader-wrap">
            <Loader type="TailSpin" color="var(--text-color)" width="100" height="100" />
          </div>
        )}
        {!loading && (
          <>
            <div className="chances-left">Chances Left: {chancesLeft}</div>
            <div className="clue">Clue: {clue}</div>
            <div className="hangman-img">
              <img src={`assets/${image}.jpg`} alt="Hangman" />
            </div>
            <div className="word">{word}</div>
          </>
        )}
        {(gameLost || gameWon) && (
          <div className="msg">
            {gameLost && (
              <div className="msg msg--lost">
                You Lost <br></br>
                <span>The word was: {guessingWord}</span>
              </div>
            )}
            {gameWon && (
              <div className="msg msg--won">
                Congrat's! <br></br>
                <span>You Won!</span>
              </div>
            )}
          </div>
        )}

        {!gameLost && !gameWon && !loading && <Keyboard handleClick={handleClick} />}

        {!loading && <ResetGame resetGame={resetGame} />}
      </div>
    </>
  );
}

export default App;
