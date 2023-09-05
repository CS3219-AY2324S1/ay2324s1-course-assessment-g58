const ALL_QUESTIONS = 'allQuestions';

// Event Listeners for various buttons
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('questionForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get all questions from local storage
        var questions = JSON.parse(localStorage.getItem(ALL_QUESTIONS));
        // If there are no questions, create an empty array
        if (questions === null) {
            questions = [];
        }

        // Get question title
        var questionTitle = document.getElementById('questionTitle').value;
        
        // Get question category
        var questionCategory = document.getElementById('questionCategory').value;

        // Set question id
        const questionId = questions.length + 1;

        // Get question difficulty
        var questionDifficulty = document.getElementById('questionComplexity').value;

        // Get question description
        var questionDescription = document.getElementById('questionDescription').value;

        // Validate if any fields are empty
        if (questionTitle === '' || questionCategory === '' || questionDifficulty === '' || questionDescription === '') {
            alert('Please fill in all fields');
            return;
        }   

        const question = {
            id: questionId,
            title: questionTitle,
            difficulty: questionDifficulty,
            category: questionCategory,
            description: questionDescription
          };

        // Append the new question to the existing array
        questions.push(question);

        // Store the updated array in local storage
        localStorage.setItem(ALL_QUESTIONS, JSON.stringify(questions));
        
        // Clear all the input fields
        document.getElementById('questionTitle').value = '';
        document.getElementById('questionCategory').value = '';
        document.getElementById('questionComplexity').value = '';
        document.getElementById('questionDescription').value = '';

        // Update table
        populateTable();

        alert('Question added successfully');
    });

    // Event Listener for Clear All button
    var clearAllButton = document.getElementById('clearAllButton');

    clearAllButton.addEventListener('click', function() {
        // Clear all questions from local storage
        localStorage.setItem(ALL_QUESTIONS, JSON.stringify([]));

        // Clear the table (assuming you have a function to do this)
        populateTable();

        alert('All questions cleared successfully');
    });

    // Get the table body element
    var tableBody = document.getElementById('questionTableBody');

    // Add a click event listener to the table body for event delegation
    tableBody.addEventListener('click', function(event) {
        console.log("here");
        if (event.target.classList.contains('delete')) {
            console.log("there");
            // Get all questions from local storage
            var questions = JSON.parse(localStorage.getItem(ALL_QUESTIONS));

            // Get the id of the question to be deleted
            const idToDelete = parseInt(event.target.getAttribute('data-id'), 10);

            // Delete the question from the array
            const updatedQuestions = questions.filter(question => question.id !== idToDelete);

            // Update local storage
            localStorage.setItem(ALL_QUESTIONS, JSON.stringify(updatedQuestions));

            // Repopulate the table
            populateTable();

            // Alert the user
            alert('Question deleted successfully');
        }
    });

});
  
// Function to populate the question table
function populateTable() {
    // Get all questions from local storage
    var questions = JSON.parse(localStorage.getItem(ALL_QUESTIONS));

    // Get the table body element
    var tableBody = document.getElementById('questionTableBody');

    // Clear the table body
    tableBody.innerHTML = '';

    // Update the table body with the questions
    if (questions !== null) {
        questions.forEach(question => {
            var row = document.createElement('tr');
            row.innerHTML = `
                <td>${question.id}</td>
                <td>${question.title}</td>
                <td>${question.difficulty}</td>
                <td>${question.category}</td>
                <td>${question.description}</td>
                <td><a href="#" class="btn btn-danger btn-sm delete" data-id="${question.id}">X</a></td>
            `;
            tableBody.appendChild(row);
        });
    }
}

// Populate the table initially
populateTable();

