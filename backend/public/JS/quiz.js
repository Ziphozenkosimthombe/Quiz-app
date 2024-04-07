let questionsByTopic = {}; // Object to store questions by topic

document.getElementById("lang").addEventListener("change", function() {
    const selectedTopic = this.value;
    document.getElementById("selectedTopic").innerText = "Selected Topic: " + (selectedTopic ? selectedTopic : "All Topics");
    
    const questions = document.querySelectorAll('.question');
    questions.forEach(question => {
        const topic = question.dataset.topic;
        if (!selectedTopic || topic === selectedTopic) {
            question.classList.remove('hidden');
        } else {
            question.classList.add('hidden');
        }
    });
    
    // Store questions related to the selected topic in the object
    if (selectedTopic) {
        questionsByTopic[selectedTopic] = document.querySelectorAll(`.question[data-topic="${selectedTopic}"]`);
    } else {
        // Clear questionsByTopic object if no topic is selected
        questionsByTopic = {};
    }
});

function answerQuestion(span) {
    const questionIndex = span.closest('.question').dataset.questionIndex;
    const answerIndex = span.dataset.answerIndex;
    // Handle user's answer here
    // You can implement your logic to process the answer
    
    // Hide the current question
    const currentQuestion = span.closest('.question');
    currentQuestion.classList.add('hidden');
    
    // Show the next question if available
    const nextQuestionIndex = parseInt(questionIndex) + 1;
    const questions = questionsByTopic[currentQuestion.dataset.topic] || document.querySelectorAll('.question');
    if (nextQuestionIndex < questions.length) {
        questions[nextQuestionIndex].classList.remove('hidden');
    } else {
        // All questions for this topic are answered
        alert(`All questions for the topic ${currentQuestion.dataset.topic} are answered!`);
    }
}

// Show all questions initially
const questions = document.querySelectorAll('.question');
questions.forEach(question => {
    question.classList.remove('hidden');
});