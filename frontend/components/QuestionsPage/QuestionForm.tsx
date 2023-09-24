import { fetchPost, fetchGet } from "@/utils/apiHelpers";
import React, { FormEvent, useState } from 'react';
import Question from '@/types/Question';

interface QuestionFormProps {
    addQuestion: (newQuestion: Question) => Promise<number>;
}

function QuestionForm({ addQuestion }: QuestionFormProps) {
    const [ questionTitle, setQuestionTitle ] = React.useState("");
    const [ questionDescription, setQuestionDescription ] = React.useState("");
    const [ questionCategory, setQuestionCategory ] = React.useState("");
    const [ questionComplexity, setQuestionComplexity ] = React.useState("");

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        // Handle null values
        if (questionTitle == "") {
            alert("Please enter a question title.");
            return;
        }
        if (questionDescription == "") {
            alert("Please enter a question description.");
            return;
        }
        if (questionCategory == "") {
            alert("Please enter a question category.");
            return;
        }
        if (questionComplexity == "") {
            alert("Please enter a question complexity.");
            return;
        }
        const newQuestion: Question = {
            title: questionTitle,
            description: questionDescription,
            difficulty: questionComplexity,
            category: questionCategory            
        };
        const status = await addQuestion(newQuestion);
    
        if (status === 201) {
            // Reset the state values to clear input fields
            setQuestionTitle("");
            setQuestionDescription("");
            setQuestionCategory("");
            setQuestionComplexity("");
        };
            
    };

    return (
        <form id="questionForm" onSubmit={handleSubmit}>          
            <label htmlFor="questionTitle">Enter Question Title:</label>
            <input 
                type="text"
                id="questionTitle"
                name="questionTitle" 
                placeholder="Question Title"
                value={questionTitle}
                onChange={e => {setQuestionTitle(e.target.value)}}
            />
            <br /><br />
    
            <label htmlFor="questionDescription" className="block">Enter Question Description:</label>
            <textarea
                id="questionDescription"
                name="questionDescription"
                placeholder='Question Description...'
                value={questionDescription}
                onChange={e => {setQuestionDescription(e.target.value)}}
                rows={10}
                cols={50}
                className="whitespace-pre-wrap break-words resize-y">
            </textarea>
            <br /><br />
    
            <label htmlFor="questionCategory">Enter Question Category:</label>
            <input 
                type="text"
                id="questionCategory"
                name="questionCategory"
                placeholder='Question Category'
                value={questionCategory}
                onChange={e => {setQuestionCategory(e.target.value)}}
            />
            <br /><br />
    
            <label htmlFor="questionComplexity">Enter Question Complexity:</label>
            <input 
                type="text"
                id="questionComplexity"
                name="questionComplexity"
                placeholder='Question Complexity'
                value={questionComplexity}
                onChange={e => {setQuestionComplexity(e.target.value)}}
            />
            <br /><br />
    
            <button
                type='submit'
                onClick={handleSubmit}
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