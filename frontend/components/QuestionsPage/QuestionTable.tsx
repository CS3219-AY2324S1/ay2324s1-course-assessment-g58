// import React from "react";
// import Question from "@/types/Question";
// import { useAuth } from "@/contexts/AuthContext";

// interface QuestionTableProps {
//     questions: Question[];
//     deleteQuestion: (question: Question) => Promise<number>;
//     openModal: (question: Question) => void;
// }

// function QuestionTable({
//     questions,
//     deleteQuestion,
//     openModal,
// }: QuestionTableProps) {
//     // checks if user is admin
//     const { admin } = useAuth();

//     const handleDelete = async (question: Question) => {
//         try {
//             const status = await deleteQuestion(question);
//         } catch (error) {
//             console.error("Error deleting question:", error);
//         }
//     };

//     return (
//         <table
//             id="questionTable"
//             className="w-full border-collapse border-4 border-black my-5 table-fixed"
//         >
//             <thead>
//                 <tr>
//                     <th className="bg-gray-200 text-left p-3 border border-black">
//                         No.
//                     </th>
//                     <th className="bg-gray-200 text-left p-3 border border-black">
//                         Question Title
//                     </th>
//                     <th className="bg-gray-200 text-left p-3 border border-black">
//                         Question Complexity
//                     </th>
//                     <th className="bg-gray-200 text-left p-3 border border-black">
//                         Question Category
//                     </th>
//                     <th className="bg-gray-200 text-left p-3 border border-black">
//                         Question Description
//                     </th>
//                     <th className="bg-gray-200 text-left p-3 border border-black">
//                         Details
//                     </th>
//                     {admin && (
//                         <th className="bg-gray-200 text-left p-3 border border-black">
//                             Delete
//                         </th>
//                     )}
//                 </tr>
//             </thead>
//             <tbody id="questionTableBody">
//                 {Array.isArray(questions) &&
//                     questions.map((question, index) => (
//                         <tr key={question._id}>
//                             <td className="text-left p-3 border border-black truncate w-10">
//                                 {index + 1}
//                             </td>
//                             <td className="text-left p-3 border border-black truncate w-36">
//                                 {question.title}
//                             </td>
//                             <td className="text-left p-3 border border-black truncate w-36">
//                                 {question.difficulty}
//                             </td>
//                             <td className="text-left p-3 border border-black truncate w-36">
//                                 {question.category}
//                             </td>
//                             <td className="text-left p-3 border border-black truncate w-36">
//                                 {question.description}
//                             </td>
//                             <td className="text-left p-3 border border-black">
//                                 <button
//                                     id="detailsButton"
//                                     type="button"
//                                     className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
//                                     onClick={() => openModal(question)}
//                                 >
//                                     Details
//                                 </button>
//                             </td>
//                             {admin && (
//                                 <td className="text-left p-3 border border-black">
//                                     <button
//                                         id="deleteButton"
//                                         type="button"
//                                         className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
//                                         onClick={() => handleDelete(question)}
//                                     >
//                                         Delete
//                                     </button>
//                                 </td>
//                             )}
//                         </tr>
//                     ))}
//             </tbody>
//         </table>
//     );
// }

// export default QuestionTable;
import React from "react";
import Question from "@/types/Question";
import { useAuth } from "@/contexts/AuthContext";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button
} from "@mui/material";

interface QuestionTableProps {
    questions: Question[];
    deleteQuestion: (question: Question) => Promise<number>;
    openModal: (question: Question) => void;
}

function QuestionTable({
    questions,
    deleteQuestion,
    openModal,
}: QuestionTableProps) {
    const { admin } = useAuth();

    const handleDelete = async (question: Question) => {
        try {
            const status = await deleteQuestion(question);
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table id="questionTable">
                <TableHead>
                    <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell>Question Title</TableCell>
                        <TableCell>Question Complexity</TableCell>
                        <TableCell>Question Category</TableCell>
                        <TableCell>Question Description</TableCell>
                        <TableCell>Details</TableCell>
                        {admin && <TableCell>Delete</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody id="questionTableBody">
                    {Array.isArray(questions) &&
                        questions.map((question, index) => (
                            <TableRow key={question._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{question.title}</TableCell>
                                <TableCell>{question.difficulty}</TableCell>
                                <TableCell>{question.category}</TableCell>
                                <TableCell>{question.description}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => openModal(question)}>
                                        Details
                                    </Button>
                                </TableCell>
                                {admin && (
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => handleDelete(question)}>
                                            Delete
                                        </Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default QuestionTable;
