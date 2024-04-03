
    const questions = document.querySelectorAll('.question');

    function showQuestion(index) {
        questions.forEach(question => {
            question.classList.add('hidden');
        });
        questions[index].classList.remove('hidden');
    }

    function answerQuestion(button) {
        const questionIndex = button.closest('.question').dataset.questionIndex;
        const answerIndex = button.dataset.answerIndex;
        // Handle user's answer here
        // You can implement your logic to process the answer

        // Hide the current question
        questions[questionIndex].classList.add('hidden');
        
        // Show the next question if available
        const nextQuestionIndex = parseInt(questionIndex) + 1;
        if (nextQuestionIndex < questions.length) {
            showQuestion(nextQuestionIndex);
        } else {
            // All questions are answered, you can display result or do something else
            // For example:
            alert('Quiz completed!');
        }
    }

    // Show the first question initially
    showQuestion(0);

const formInput = document.getElementById('formInput');
