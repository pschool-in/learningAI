import React, { useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./styles.css";

const ButtonList = () => {
  const [movedButtons, setMovedButtons] = useState([true, true, true, true, true]);
  
  const handleClick = (index) => {
    //return;
    setMovedButtons((prev) => {
      let newState = [...prev];
      newState[index] = !newState[index]
      return newState
    });
  };
  console.log('movedButtons =', movedButtons)

  return (
    <div style={{height: 500, backgroundColor: 'pink', position: 'absolute', padding: 50}}>
 <div className="button-container">
    <TransitionGroup style={{display: 'flex', flexDirection: 'column'}}>
      {[...Array(5)].map((_, index) => (
        <CSSTransition 
          key={index}
          in={movedButtons[index]}
          timeout={2000}
          classNames="fade"
          onEnter={() => {
            console.log('onEntered');
          }}
          onExit={() => {
            console.log('onEntered');
          }}
        >
          <button
            onClick={() => handleClick(index)}
            className={`button`}
          >
            Button {index + 1}
          </button>
        </CSSTransition>
      ))}
    </TransitionGroup>
     
    </div>

    </div>
   
  );
};

export default ButtonList;
