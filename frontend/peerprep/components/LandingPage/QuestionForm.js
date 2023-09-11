import React from 'react';

function QuestionForm() {
    return (
        <form id="questionForm">          
            <label htmlFor="questionTitle">Enter Question Title:</label>
            <input type="text" id="questionTitle" name="questionTitle" />
            <br /><br />
    
            <label htmlFor="questionDescription" className="block-label">Enter Question Description:</label>
            <textarea id="questionDescription" name="questionDescription" rows="10" cols="50"></textarea>
            <br /><br />
    
            <label htmlFor="questionCategory">Enter Question Category:</label>
            <input type="text" id="questionCategory" name="questionCategory" />
            <br /><br />
    
            <label htmlFor="questionComplexity">Enter Question Complexity:</label>
            <input type="text" id="questionComplexity" name="questionComplexity" />
            <br /><br />
    
            <button type="submit">Add</button>
            <button id="clearAllButton" type="button">Clear All</button>
        </form>
    );
}

export default QuestionForm;
