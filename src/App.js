import { useState, useEffect } from "react";
import Keyboard from "./components/Keyboard";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  const maxChances = 6;

  const fetchWord = async () => {
    const response = await fetch("https://random-words-api.vercel.app/word");
    const data = await response.json();

    setWord(data[0].word);
  };

  const handleClick = (key) => {
    setImage(image + 1);
    setChancesLeft(chancesLeft - 1);
  };

  useEffect(() => {
    fetchWord();
  }, []);

  const [image, setImage] = useState(0);
  const [chancesLeft, setChancesLeft] = useState(maxChances);
  const [word, setWord] = useState("");

  return (
    <div>
      <h1>Hangman</h1>
      <div className="switch-wrap">
        <ThemeSwitcher />
      </div>
      <div className="chances-left">Chances Left: {chancesLeft}</div>
      <div className="hangman-img">
        <img src={`assets/${image}.jpg`} alt="Hangman" />
      </div>
      <div className="word">{word}</div>
      <Keyboard handleClick={handleClick} />
    </div>
  );
}

export default App;
