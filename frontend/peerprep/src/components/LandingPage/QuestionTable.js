// src/components/QuestionTable.js
import React from 'react';

function QuestionTable() {
    return (
        <table id="questionTable">
            <thead>
                <tr>
                    <th>Question Id</th>
                    <th>Question Title</th>
                    <th>Question Complexity</th>
                    <th>Question Category</th>
                    <th>Question Description</th>
                    <th>Details</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody id="questionTableBody"></tbody>
      </table>
    );
}

export default QuestionTable;
