import Keyboard from "./components/Keyboard";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  const handleClick = (key) => {
    console.log(key);
  };

  return (
    <div>
      <h1>Hangman</h1>
      <div className="switch-wrap">
        <ThemeSwitcher />
      </div>
      <Keyboard handleClick={handleClick} />
    </div>
  );
}

export default App;
