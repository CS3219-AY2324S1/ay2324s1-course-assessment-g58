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
        
        // Check that question title is not a duplicate, even if case is different
        const duplicateQuestion = questions.find(q => q.title.toLowerCase() === questionTitle.toLowerCase());
        if (duplicateQuestion !== undefined) {
            alert('Question title already exists');
            return;
        }

        // Get question category
        var questionCategory = document.getElementById('questionCategory').value;

        // Set question id
        const questionId = getNextId();

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
        resetIds();
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
        if (event.target.classList.contains('details')) {
            // Get all questions from local storage
            var questions = JSON.parse(localStorage.getItem(ALL_QUESTIONS));
    
            // Get the id of the question whose details are to be displayed
            const idToDisplay = parseInt(event.target.getAttribute('data-id'), 10);
    
            // Find the question from the array
            const questionToDisplay = questions.find(question => question.id === idToDisplay);
    
            // Display the details
            displayDetails(questionToDisplay);
        }
    });

    // Get the modal and the close button
    var modal = document.getElementById('detailsModal');
    var closeBtn = document.querySelector('.close-btn');

    // When the user clicks on the close button, close the modal
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
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
                <td class="truncate">${question.category}</td>
                <td class="truncate">${question.description}</td>
                <td><button class="btn btn-info btn-sm details" data-id="${question.id}">Details</button></td>
                <td><a href="#" class="btn btn-danger btn-sm delete" data-id="${question.id}">X</a></td>
            `;
            tableBody.appendChild(row);
        });
    }
}

function displayDetails(question) {
    // Replace newline characters with <br> for HTML formatting
    const formattedDescription = question.description.replace(/\n/g, '<br>');

    document.getElementById('modalDetails').innerHTML = `
        <strong>Title:</strong> ${question.title}<br>
        <strong>Description:</strong> ${formattedDescription}<br>
        <strong>Category:</strong> ${question.category}<br>
        <strong>Complexity:</strong> ${question.difficulty}
    `;
    
    // Display the modal
    document.getElementById('detailsModal').style.display = "block";
}

function getNextId() {
    var lastId = localStorage.getItem('LAST_ID') || 0;
    var newId = parseInt(lastId) + 1;
    localStorage.setItem('LAST_ID', newId);
    return newId;
}

function resetIds() {
    localStorage.setItem('LAST_ID', 0);
}
// Populate the table initially
populateTable();

