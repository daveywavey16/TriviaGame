
$( document ).ready(function() {

// this game object holds all of the questions, possible answers, and then the index of the correct answer for each
	var game = {
		questions: [
		{
	   		question: 'What is the capital of Vermont?',
	   		possibles: ['Battleboro', 'Montpelier', 'Barre City', 'Burlington'],
	   		id: 'question-one',
	   		answer: 1
		}, {
			question: 'What is the capital of Illinois?',
			possibles: ['Springfield', 'Chicago', 'Rockford', 'Joliet', 'Evanston'],
			id: 'question-two',
			answer: 0
		}, {
			question: 'What is the capital of California?',
			possibles: ['San Francisco', 'Los Angeles', 'Mendocino', 'San Diego', 'Sacramento'],
			id: 'question-three',
			answer: 4
		}, {
			question: 'What is the capital of Indiana?',
			possibles: ['Fort Wayne', 'Indianapolis', 'Terre Haute', 'Bloomington', 'Indianapolis'],
			id: 'question-four',
			answer: 1
		}, {
			question: 'What is the capital of Alabama?',
			possibles: ['Montgomery', 'Birmingham', 'Mobile', 'Tuscaloosa', 'Gulf Shores'],
			id: 'question-five',
			answer: 0
		}, {
			question: 'What is the capital of Colorado?',
			possibles: ['Boulder', 'Denver', 'Vale', 'Fort Collins', 'Grand Junction'],
			id: 'question-six',
			answer: 1

		}, {
			question: 'What is the capital of Delaware?',
			possibles: ['Wilmington', 'Newark', 'Dover', 'Lewes', 'Middletown'],
			id: 'question-seven',
			answer: 2
		}, {
			question: 'What is the capital of Florida?',
			possibles: ['Miami', 'Tampa', 'Jacksonville', 'Daytona Beach', 'Talahassee'],
			id: 'question-eight',
			answer: 4
		}, {
			question: 'What is the capital of Idaho?',
			possibles: ['Coeur dAlene', 'Idaho Falls', 'Boise', 'Meridian', 'Twin Falls'],
			id: 'question-nine',
			answer: 2
		}, {
			question: 'What is the capital of Michigan?',
			possibles: ['Macinack Island', 'Lansing', 'Grand Rapids', 'Ann Arbor', 'Flint'],
			id: 'question-ten',
			answer: 1
		}, {
			question: 'What is the capital of Washington State?',
			possibles: ['Seattle', 'Bellevue', 'Spokane', 'Olympia', 'Bellingham'],
			id: 'question-eleven',
			answer: 3
		}, {
			question: 'What is the best kind of coffee?',
			possibles: ['Intelligentsia', 'Blue Bottle', 'Starbucks', 'Caribou', 'none of the above'],
			id: 'question-twelve',
			answer: 4
		}
		]}


	var message = 'Game Over!';



// This initializes the button that starts the game 
    $(".startGame").on("click", function (){
// when the start button clicked, the div with the questions that was hidden is shown
		$('.wrapper').show();
		console.log('hello');

		$(this).hide();
	});

 // These events start the timer: set the number of seconds the guesser has    

    $('#timeLeft').on('click', endTime);
    
    
	var endTime;
	var number = 30;

	// This function enables the number of seconds to decrease with setTimout, and to display
	// the result of that decrease until time is up. 
    function countDown(){
	    
	   number--;
	    
	    if (number >= 0) {
		        
		  	endTime = setTimeout(countDown, 1000);
		  	// Decrease number by one.
        
        	// Show the number in the #timeLeft div.
        	$('#timeLeft').html('<h2>' + number + " seconds"+'</h2>');
	    }
	    
       else {
	       
		$('.message').html('time up!');
		
        // Checks to see what you answered after timeout
        checkAnswers();
        
        }
    }
    // Triggers the timer function to begin counting down 
    countDown();
      



// this function dynamically creates the inputs needed for the form and relates them to the
// items held within the game object 
function formTemplate(data) {
// the first variable relates the form field for question with the data in the object for
// each question so that the questions can be inputed into that form field
	var qString = "<form id='questionOne'>"+ data.question +"<br>";
// this variable to access the question object's possibles array needed to answer each question
	var possibles = data.possibles;
// a for loop to go through the possibles array for each question to add the values of each possibles
// array and using qString, add them as radio buttons to the question to which they are
// associated
	for (var i = 0; i < possibles.length; i++) {
		var possible = possibles[i];
		console.log(possible);
		qString = qString + "<input type='radio' name='"+data.id+"' value="+ i +">"+possible;

	}
	return qString + "</form>";
}
window.formTemplate = formTemplate;

// this function takes the template created in the last function and by appending it,
// allows it to be displayed on the page
function buildQuestions(){
	var questionHTML = ''
	for (var i = 0; i<game.questions.length; i++) {
		questionHTML = questionHTML + formTemplate(game.questions[i]);
	}
	$('#questions-container').append(questionHTML);

}

// function that 
function isCorrect(question){
	var answers = $('[name='+question.id+']');
	var correct = answers.eq(question.answer);
	var isChecked = correct.is(':checked');
	return isChecked;
}

// call the buildQuestions function
buildQuestions();

// function to build the display of guesser results
function resultsTemplate(question){
	var htmlBlock = '<div>'
	htmlBlock = htmlBlock + question.question + ': ' + isChecked;
	return htmlBlock + "</div>";
}

// function to tabulate the guesser results
function checkAnswers (){

// variables needed to hold results
	var resultsHTML = '';
	var guessedAnswers = [];
	var correct = 0;
	var incorrect = 0;
	var unAnswered =0

// for loop iterates through each question and passes the questions at each index first into
// the isCorrect function to see if they match the indices of correct answers, and if they do,
// increments up the correct score
	for (var i = 0; i<game.questions.length; i++) {
		if (isCorrect(game.questions[i])) {
			correct++;
		} else {
// then this statement runs the questions at each index through the checkAnswered function
// to determine whether the user clicked an answer, or did not click an answer, so that
// incorrect and unAnswered scores can be delineated from each other
			if (checkAnswered(game.questions[i])) {
				incorrect++;
			} else {
				unAnswered++;
			}
		}

	}
// display the results of the function in the results div and use strings of text to relate the
// results of the for loop with their corresponding values
	$('.results').html('correct: '+correct+ "<br>" +'incorrect: '+incorrect+ "<br>" +'unanswered: '+unAnswered);
}

// this function checks whether the guesser actually checked an answer for each of the 
// questions
function checkAnswered(question){
	var anyAnswered = false;
	var answers = $('[name=' + question.id + ']');
// the for loop creates a condition to check if the buttons were checked and and then sets
// the anyAnswered variable to true if they were
	for (var i = 0; i < answers.length; i++) {
		if (answers[i].checked) {
			anyAnswered = true;
		}
	}
// then return the anyAnswered variable so it can be tabulated in the last function to distinguish
// between incorrect answers and those answers that were not attempted
	return anyAnswered;

}

// create a function with an onclick event for the doneButton that both checks the Answers 
// and endtime function is triggered when "done" button is pressed
	$('#doneButton').on('click', function() {
	checkAnswers();
	clearTimeout(endTime);
	$("#messageDiv").html("Game Over!");
	})
});