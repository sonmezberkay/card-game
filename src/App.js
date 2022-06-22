import "./App.css";
import { useEffect, useState } from "react";
import Card from "./components/Card";

const cardImages = [
  { src: "/img/potion.png", matched: false },
  { src: "/img/ring.png", matched: false },
  { src: "/img/scroll.png", matched: false },
  { src: "/img/shield.png", matched: false },
  { src: "/img/sword.png", matched: false },
  { src: "/img/helmet.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };



  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };



  useEffect(() => {
    const checkCards = () => {
      if (choiceOne && choiceTwo) {
        setDisabled(true);
        if (choiceOne.src === choiceTwo.src) {
          console.log("cards matches!");
          setCards(prevCard => {
            return prevCard.map(card => {
              if (card.src === choiceOne.src) {
                return {...card, matched: true}
              } else {
                return card
              }
            })
          })
          resetTurn();
        }
        if (choiceOne.src !== choiceTwo.src) {
          console.log("cards do not match!");
          
          setTimeout(() => {
            resetTurn();
          },500);
        }
      }
    };

    checkCards();
  }, [choiceOne, choiceTwo]);

  console.log(cards)



  

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            id={card.id}
            onChoose={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
