import React from 'react';
import Question from '@/types/Question';

interface QuestionTableProps {
    questions: Question[];
}

function QuestionTable({ questions }: QuestionTableProps) {
    console.log("refreshing question table", questions);
    return (
        <table id="questionTable" 
            className='w-full border-collapse border-4 border-black my-5'
        >
            <thead>
                <tr>
                    <th 
                        className='bg-gray-200 text-left p-3 border border-black'
                    >Question Title</th>
                    <th
                        className='bg-gray-200 text-left p-3 border border-black'
                    >Question Complexity</th>
                    <th
                        className='bg-gray-200 text-left p-3 border border-black'                    
                    >Question Category</th>
                    <th
                        className='bg-gray-200 text-left p-3 border border-black'                    
                    >Question Description</th>
                    <th
                        className='bg-gray-200 text-left p-3 border border-black'                    
                    >Details</th>
                    <th
                        className='bg-gray-200 text-left p-3 border border-black'                    
                    >Delete</th>
                </tr>
            </thead>
            <tbody id="questionTableBody">
                {Array.isArray(questions) && questions.map(question => (
                    <tr key={question.title}>
                        <td
                            className='text-left p-3 border border-black truncate w-36'
                        >{question.title}</td>
                        <td
                            className='text-left p-3 border border-black truncate w-36'
                        >{question.difficulty}</td>
                        <td
                            className='text-left p-3 border border-black truncate w-36'
                        >{question.category}</td>
                        <td
                            className='text-left p-3 border border-black truncate w-36'
                        >{question.description}</td>
                        <td
                            className='text-left p-3 border border-black truncate w-36'
                        >Details Button</td> {/* You can replace this with an actual button or link */}
                        <td
                            className='text-left p-3 border border-black truncate w-36'
                        >Delete Button</td> {/* You can replace this with an actual button or link */}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default QuestionTable;