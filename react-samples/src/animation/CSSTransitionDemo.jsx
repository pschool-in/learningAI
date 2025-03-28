import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Container, Button, Alert } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";

import "bootstrap/dist/css/bootstrap.min.css";
//import "./styles.css";

const Styled = styled.div`
  .alert-enter {
    opacity: 0;
    transform: scale(0.9);
  }
  .alert-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms, transform 300ms;
  }
  .alert-exit {
    opacity: 1;
  }
  .alert-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }
  

`

export default function Example() {
  const [showButton, setShowButton] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const nodeRef = useRef(null);
  return (
    <Styled>
    <Container style={{ paddingTop: "2rem" }}>
      {showButton && (
        <Button onClick={() => setShowMessage(true)} size='lg'>
          Show Message
        </Button>
      )}
      <CSSTransition
        in={showMessage}
        nodeRef={nodeRef}
        timeout={300}
        classNames='alert'
        unmountOnExit
        onEnter={() => {
          console.log('OnEnter')
          setShowButton(false)
        }}
        onExited={() => {
          console.log('OnExited')
          setShowButton(true)
        }}>
        <Alert
          ref={nodeRef}
          variant='primary'
          dismissible
          onClose={() => setShowMessage(false)}>
          <Alert.Heading>Animated alert message</Alert.Heading>
          <p>This alert message is being transitioned in and out of the DOM.</p>
          <Button variant='primary' onClick={() => setShowMessage(false)}>
            Close
          </Button>
        </Alert>
      </CSSTransition>
    </Container>
    </Styled>
  );
}

/*
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Example />);
*/
