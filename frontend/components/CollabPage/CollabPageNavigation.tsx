interface CollabPageNavigationProps {
    handleNextQuestion: () => void;
}

function CollabPageNavigation({ handleNextQuestion }: CollabPageNavigationProps) {
    //Navigation bar with next question button
    return (
        <div>
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
