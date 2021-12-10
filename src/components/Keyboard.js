import React from "react";

function Keyboard({ handleClick }) {
  const letters = "abcdefghijklmnopqrstuvwxyz";

  return (
    <div className="keyboard">
      {letters.split("").map((key) => {
        return (
          <button className="button" key={key} onClick={() => handleClick(key)}>
            {key}
          </button>
        );
      })}
    </div>
  );
}

export default Keyboard;
