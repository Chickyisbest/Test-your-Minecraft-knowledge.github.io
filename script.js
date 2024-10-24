//create data storage here
//a list that holds multiple dictionaries {key-value pairs}
//a dictionary represents a question set
const database = [
    {
        question:"Which entity has six arms?",
        options : ["Distorted Alex","The blood golem","Entity that thing","Entity 303"],
        answer : "Entity that thing"
    },

    {
        question:"Which entity drains all lights?",
        options : ["Headless steve","The black ghast","The null","The blood villager"],
        answer : "The black ghast"
    },

    {
        question:"Which entity has a rake?",
        options : ["The farlands man","The spine villager","Entity 404","Bash 2313"],
        answer : "The farlands man"
    },

    {
        question:"Which entity comes together with the cross moon?",
        options : ["Giant alex","Herobrine","Entity 505","The black golem"],
        answer : "The black golem"
    },

    {
        question:"Which entity is the soul of a fired minecraft employee?",
        options : ["Cat 666","The blood golem","Lunar moon","The blood villager"],
        answer : "Cat 666"
    },

    {
        question:"Which entity deletes your minecraft data?",
        options : ["One red eye","Entity 404","The ghost player","Entity can't sleep"],
        answer : "One red eye"
    },

    {
        question:"Which entity haunts you until it is killed?",
        options : ["Acid skinned","Account 671","Blue steve","Entity 0"],
        answer : "Acid skinned"
    },

    {
        question:"Which entity can change its own code?",
        options : ["Amnesia","Entity 0","Giant Steve","The blood cow"],
        answer : "Entity 0"
    },
];

const startButton = document.getElementById('start-btn');
const questionLabel = document.getElementById('question');
const timerTextLabel = document.getElementById('countdownText');
const timerElement = document.getElementById('timer');
const progressbarcontainer = document.getElementById('progress-bar-container');
const progressbarfill = document.getElementById('progress-bar-fill');
const optionContainer = document.getElementById("option-container");
const scoreLabel = document.getElementById('score');

progressbarfill.style.width = '0%';

let currentQuestionNo = 1;
let timer = 0;
let score = 0;

// Triggers
startButton.addEventListener('click', StartQuiz);

function StartQuiz()
{
    startButton.style.display = 'none';
    LoadNextQuestion();
}

function LoadNextQuestion()
{
    // Reset timer
    clearInterval(timer);

    if(currentQuestionNo <= database.length)
    {
        // Update the progress bar
        progressbarfill.style.width = `${((currentQuestionNo) / database.length) * 100}%`;4

        const currentQuestionSet = database[currentQuestionNo - 1];
        questionLabel.textContent = currentQuestionSet.question;

        // Set initial countdown value
        timerTextLabel.textContent = 10;

        // Remove all previous button clones
        optionContainer.innerHTML = '';

        // Clone 4 option buttons for a question
        currentQuestionSet.options.forEach((option) => {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            button.textContent = option;
            optionContainer.appendChild(button);
            button.addEventListener('click', () => {
                disableOptionButtons();
                chechAnswer(option);
            });
        });

        // Start the countdown timer
        // Define in {} what to do if timer fires
        timer = setInterval(() => {
            timerTextLabel.textContent = parseInt(timerTextLabel.textContent) - 1;

            // Stop counting down when it hits zero
            if(parseInt(timerTextLabel.textContent) === 0){
                // Reset timer
                clearInterval(timer);
                currentQuestionNo = currentQuestionNo + 1;
                LoadNextQuestion();

            }
        }, 1000);
    } else 
    {
        EndQuiz()
    }
}

function EndQuiz()
{
    clearInterval(timer);
    timerElement.style.display = 'none';
    questionLabel.textContent = 'Quiz has ended!';
    optionContainer.style.display = 'none';
}

function disableOptionButtons()
{
    const allOptionButtons = document.querySelectorAll('.option-btn');
    // Disable all option buttons with a for-each loop
    allOptionButtons.forEach(button => {
        button.disabled = true;
    });
}

function enableOptionButtons()
{
    const allOptionButtons = document.querySelectorAll('.option-btn');
    // Disable all option buttons with a for-each loop
    allOptionButtons.forEach(button => {
        button.disabled = false;
    });
}

function chechAnswer(option)
{
    // Retrieve answer key of a question set from the database
    const answer = database[currentQuestionNo - 1].answer;
    if(option === answer)
    {
        score = score + 1
    }
    scoreLabel.textContent = `You scored ${score} point(s)`;
    currentQuestionNo = currentQuestionNo + 1;
    LoadNextQuestion();
}