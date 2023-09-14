import React from 'react';

// If you have props, define their types here
interface DescriptionModalProps {}

const styles = {
  modal: {
    display: 'none',
    position: 'fixed' as 'fixed',
    zIndex: 1,
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#fefefe',
    margin: '15% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '80%',
  },
  closeBtn: {
    color: '#aaa',
    cssFloat: 'right',
    fontSize: '28px',
    fontWeight: 'bold',
  },
};

function DescriptionModal(props: DescriptionModalProps) {
  return (
    <div id="detailsModal" style={styles.modal}>
      <div style={styles.modalContent}>
        <span style={styles.closeBtn}>&times;</span>
        <h2>Question Details</h2>
        <p id="modalDetails"></p>
      </div>
    </div>
  );
}

export default DescriptionModal;
