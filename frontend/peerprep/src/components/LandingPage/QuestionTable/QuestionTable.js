import React from 'react';
import styles from './questiontable.styles';

function QuestionTable() {
    return (
        <table id="questionTable" style={styles.table}>
            <thead>
                <tr>
                    <th style={styles.th}>Question Id</th>
                    <th style={styles.th}>Question Title</th>
                    <th style={styles.th}>Question Complexity</th>
                    <th style={styles.th}>Question Category</th>
                    <th style={styles.th}>Question Description</th>
                    <th style={styles.th}>Details</th>
                    <th style={styles.th}>Delete</th>
                </tr>
            </thead>
            <tbody id="questionTableBody"></tbody>
      </table>
    );
}

export default QuestionTable;
