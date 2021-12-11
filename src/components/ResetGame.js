import React from "react";

function ResetGame({ resetGame }) {
  return (
    <button className="reset" onClick={resetGame}>
      Reset
    </button>
  );
}

export default ResetGame;
