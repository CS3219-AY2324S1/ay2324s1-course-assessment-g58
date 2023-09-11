import React from 'react';

function DescriptionModal() {
    return (
        <div id="detailsModal" className="modal">
            <div className="modal-content">
                <span className="close-btn">&times;</span>
                <h2>Question Details</h2>
                <p id="modalDetails"></p>
            </div>
        </div>
    );
}

export default DescriptionModal;

