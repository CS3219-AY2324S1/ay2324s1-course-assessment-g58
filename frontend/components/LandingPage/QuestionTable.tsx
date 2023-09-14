import React from 'react';

interface QuestionTableProps {}

import { CSSProperties } from 'react';

const styles: Record<string, CSSProperties> = {
    table: {
        borderCollapse: 'collapse',
        width: '100%',
        border: '3px solid black',
        marginTop: '20px',
        marginBottom: '20px'
    },
    th: {
        backgroundColor: '#f2f2f2',
        textAlign: 'left',
        padding: '12px',
        border: '1px solid black'
    },
    td: {
        textAlign: 'left',
        padding: '12px',
        border: '1px solid black'
    },
    truncate: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '150px'
    }
};

function QuestionTable(props: QuestionTableProps) {
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