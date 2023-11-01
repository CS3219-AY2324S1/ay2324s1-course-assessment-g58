import React from 'react';
import Modal from 'react-modal';

const ResponseModal = ({ isOpen, onRequestClose, response }) => {
 return (
   <Modal
     isOpen={isOpen}
     onRequestClose={onRequestClose}
     contentLabel="Response Modal"
   >
     <h2>Response</h2>
     <p>{response}</p>
     <button onClick={onRequestClose}>Close</button>
   </Modal>
 );
};

export default ResponseModal;
