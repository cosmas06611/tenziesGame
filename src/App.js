import React, { useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./App.css";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rollCount, setRollCount] = useState(0);

  useEffect(
    function () {
      const allHeld = dice.every((die) => die.isHeld);
      const firstValue = dice[0].value;
      const allSameValue = dice.every((die) => die.value === firstValue);
      if (allHeld && allSameValue) {
        setTenzies(true);
      }
    },
    [dice]
  );

  function generateNewDieObject() {
    const randomDiceNum = Math.floor(Math.random() * 6) + 1;
    return { value: randomDiceNum, isHeld: false, id: nanoid() };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDieObject());
    }

    return newDice;
  }

  // function rollDice() {
  //   if(!tenzies){
  //     setDice((prevAllNewDiceState) =>
  //       prevAllNewDiceState.map((die) =>
  //         die.isHeld ? die : generateNewDieObject()
  //       )
  //     );
  //   }else{
  //     setTenzies(false)
  //     setDice(allNewDice())
  //   }
    
  // }

  function rollDice() {
    if (!tenzies) {
      setDice((prevAllNewDiceState) =>
        prevAllNewDiceState.map((die) =>
          die.isHeld ? die : generateNewDieObject()
        )
      );
      setRollCount((prevCount) => prevCount + 1); // Increment roll count
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setRollCount(0); // Reset roll count for a new game
    }
  }

  function holdDice(id) {
    setDice((prevAllNewDiceState) =>
      prevAllNewDiceState.map((die) => {
        return die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti /> }
      <h1 className="title">Khosi Tenzy Game</h1>
      <p className="instructions">
        Roll until all dice are the same. click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button onClick={rollDice} className="roll-dice">
        {tenzies === true ? "New Game" : "Roll"}
      </button>

      <p className="roll-count">Roll Count: {rollCount}</p>
    </main>
  );
}

export default App;
