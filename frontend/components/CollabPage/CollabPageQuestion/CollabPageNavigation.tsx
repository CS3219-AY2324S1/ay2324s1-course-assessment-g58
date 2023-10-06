import React from "react";
import NextQnHandshakeModal from "./NextQnHandshakeModal";

interface CollabPageNavigationProps {
    handleNextQuestion: () => void;
    isNextQnHandshakeOpen: boolean;
    setIsNextQnHandshakeOpen: (isOpen: boolean) => void;
    handleIPressedAccept: () => void;
    handleIPressedReject: () => void;
}

function CollabPageNavigation(
        { handleNextQuestion,
        isNextQnHandshakeOpen,
        setIsNextQnHandshakeOpen,
        handleIPressedAccept,
        handleIPressedReject }: CollabPageNavigationProps) {
    
    const NextQnHandshakeModalProps = {
        isNextQnHandshakeOpen: isNextQnHandshakeOpen,
        setIsNextQnHandshakeOpen: setIsNextQnHandshakeOpen,
        handleIPressedAccept: handleIPressedAccept,
        handleIPressedReject: handleIPressedReject,
    }        
    //Navigation bar with next question button
    return (
        <div>
            <NextQnHandshakeModal {...NextQnHandshakeModalProps} />
            <button
                type="submit"
                onClick={handleNextQuestion}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
                Next Question
            </button>
        </div>
    );

}

export default CollabPageNavigation;
