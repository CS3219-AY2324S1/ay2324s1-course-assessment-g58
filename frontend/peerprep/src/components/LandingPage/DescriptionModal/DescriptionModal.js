import React from 'react';
import styles from './descriptionmodal.style';

function DescriptionModal() {
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

