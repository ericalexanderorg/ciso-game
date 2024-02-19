// GameOver.js
import React from 'react';

const GameOver = ({ score }) => {
  return (
    <div>
      <h1>Game Over!</h1>
      <p>Your final score is: {score}</p>
    </div>
  );
};

export default GameOver;
