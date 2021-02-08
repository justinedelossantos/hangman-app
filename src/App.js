import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from "./components/Word";
import Notif from "./components/Notif";
import Popup from "./components/Popup";
import './App.css';
import {showNotif as show} from './helpers/helpers';

const words = ['schrute', 'scott', 'beesly', 'halpert', 'assistant', 
'bankruptcy', 'teapot', 'benihana', 'pretzel', 'parkour', 
'chilis', 'cornell', 'sensei', 'prank', 'sprinkles', 
'wuphf', 'belsnickel'];

let selectedWord = words[Math.floor(Math.random() * words.length)];



function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const handleKeyDown = event => {
      const { key, keyCode} = event;
     
        if (playable && keyCode >= 65 && keyCode <= 90) {
          const letter = key.toLowerCase();
    
          if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              setCorrectLetters(currentLetters => [...currentLetters, letter]);
            } else {
              show(setShowNotif);
            }
          } else {
            if (!wrongLetters.includes(letter)) {
              setWrongLetters(wrongLetters => [...wrongLetters, letter]);
            } else {

              show(setShowNotif);
            }
          }
        }

      }
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain(){
    setPlayable (true);

    //Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = [Math.floor(Math.random() * words.length)];
    selectedWord = words[random];
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters}/>
        <WrongLetters wrongLetters={wrongLetters}/>
        <Word selectedWord ={selectedWord} correctLetters ={correctLetters}/>
      
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord= 
      {selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
        <Notif showNotif={showNotif} />
    </>
  );
}

export default App;
