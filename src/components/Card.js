import './Card.css';

const Card = ({ card, onChoose, flipped, disabled }) => {
    const handleClick = () => {
      if(!disabled) {
        onChoose(card);
      }
    };

    return (
        <div className="card">
          <div className={flipped ? 'flipped' : ''}>
            <img src={card.src} className="front" alt="card front" onClick={handleClick}  />
            <img src="/img/cover.png" className="back" alt="card back" onClick={handleClick} />
          </div>
        </div>
      )
};

export default Card;