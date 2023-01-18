import React from 'react'
const Modal = ({ children, onClose }) => (
  <div>
    <div>{children}</div>
    <button onClick={onClose}>Close</button>
  </div>
);
export default Modal;
