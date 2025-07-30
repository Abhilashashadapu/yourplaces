import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";

import "./Modal.css";

const ModalOverlay = (props) => {
  // Create a ref for CSSTransition to eliminate findDOMNode usage
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="modal"
      unmountOnExit
      mountOnEnter
      nodeRef={nodeRef} // <-- IMPORTANT for React 18+
    >
      <div className="modal" ref={nodeRef} style={props.style}>
        <header className="modal__header">
          <h2>{props.header}</h2>
        </header>
        <form
          onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()}
        >
          <div className="modal__content">{props.children}</div>
          <footer className="modal__footer">{props.footer}</footer>
        </form>
      </div>
    </CSSTransition>
  );
};

const Modal = (props) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      {ReactDOM.createPortal(
        <ModalOverlay {...props} />,
        document.getElementById("modal-hook")
      )}
    </>
  );
};

export default Modal;
