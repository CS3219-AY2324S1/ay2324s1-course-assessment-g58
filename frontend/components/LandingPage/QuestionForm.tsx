import React from 'react';

interface QuestionFormProps {}

const styles = {
    textarea: {
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word', 
        resize: 'vertical' as 'vertical',
    }
};

function QuestionForm(props: QuestionFormProps) {
    return (
        <form id="questionForm">          
            <label htmlFor="questionTitle">Enter Question Title:</label>
            <input type="text" id="questionTitle" name="questionTitle" />
            <br /><br />
    
            <label htmlFor="questionDescription" className="block">Enter Question Description:</label>
            <textarea
                id="questionDescription"
                name="questionDescription"
                rows={10}
                cols={50}
                style={styles.textarea as React.CSSProperties}>
            </textarea>
            <br /><br />
    
            <label htmlFor="questionCategory">Enter Question Category:</label>
            <input type="text" id="questionCategory" name="questionCategory" />
            <br /><br />
    
            <label htmlFor="questionComplexity">Enter Question Complexity:</label>
            <input type="text" id="questionComplexity" name="questionComplexity" />
            <br /><br />
    
            <button
                type="submit"
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >Add</button>
            <button 
                id="clearAllButton"
                type="button"
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >Clear All</button>
        </form>
    );
}

export default QuestionForm;