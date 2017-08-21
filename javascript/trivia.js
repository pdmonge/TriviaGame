// Trivia Game

// The correct answer is the 0 item in the answers array
var questions = [
	{Question: 'The Mau Mau were terrorists in which country late 50s early 60s?',
		Answers: ['Kenya','Sudan','Malaysia','Ghana']},
	{Question: 'What was the name of the atom bomb dropped on Hiroshima?',
		Answers: ['Little Boy','Bad Boy','Fat Boy','Good Boy']},
	{Question: 'Which English Monarch succeeded William III of Orange?',
		Answers: ['Mary II','James II','James I','Charles II']},
	{Question: 'What are the cannibalistic beasts called in H.G. Wells book The Time Machine?',
		Answers: ['Morlocks','Warlocks','Yahoos','Triffids']},
	{Question: 'Whose autobiography was entitled "The Long Walk To Freedom"?',
		Answers: ['Nelson Mandela','Mahatma Gandhi','Lenin','Martin Luther King']},
	{Question: 'Who does Mr Brownlow rescue?',
		Answers: ['Oliver Twist','Tom Jones','Huckleberry Finn','Tom Brown']},
	{Question: 'In which book is there an inn called Admiral Benbow?',
		Answers: ['Treasure Island','Peter Pan','Lord of the Rings','Gullivers Travels']},
	{Question: 'In the book The Last Of The Mohicans what was the name of Chingachgook'+"'"+'s only son?',
		Answers: ['Uncas','Mingo','Lightfoot','Magua']},
	{Question: 'In which Italian city do Romeo and Juliet live?',
		Answers: ['Verona','Naples','Milano','Pisa']},
	{Question: 'Who managed the punk group The Sex Pistols?',
		Answers: ['Malcolm McClaren','John Lydon','Sid Vicious','They were unmanagable']},
	{Question: 'Barry Manilow had a hit with which song?',
		Answers: ['Mandy','Randy','Candy','Dandy']},
	{Question: 'Which ship was a hit for the Beach Boys?',
		Answers: ['Sloop John B.','Proud Mary','Mississippi Quenn','Rainbow Warrior']},
	{Question: 'Who appeared a record 106 times on Top Of The Pops?',
		Answers: ['Status Quo','Adam and the Ants','T-Rex','The England World Cup Squad']},
	{Question: 'What was a hit for the Pretenders?',
		Answers: ['Stop your sobbing','Crying in the rain','Tears on my pillow','Tears of a clown']},
	{Question: 'Which animal was a hit for Jefferson Airplane?',
		Answers: ['White Rabbit','White Horses ','White Dove','Ride a white Swan']},
	{Question: 'What is Smokey Robinson'+"'"+'s real name?',
		Answers: ['William Robinson','Joe Robinson','Smokey Robinson','Samuel Robinson']},
	{Question: 'Which band was not a trio?',
		Answers: ['Wings','America','ELP','Cream']},
	{Question: 'What lives in a Formicarium?',
		Answers: ['Ants','Turtles','Apes','Butterflies']},
	{Question: 'Who said "nature abhors a vacuum?"',
		Answers: ['Galileo','Einstein','Aristotle','Newton']},
	{Question: 'Which of the following animals are not rodents?',
		Answers: ['Hedgehogs','Rats','Gophers','Chipmunks']},
	{Question: 'A Blue Whale has a heart roughly the size of a what?',
		Answers: ['VW Beetle','Basketball','Grapefruit','Peanut']},
	{Question: 'How many holes are there on a ten pin bowling ball?',
		Answers: ['3','4','2','5']},
	{Question: 'How many Olympic gold medals did mark Spitz win in Munich in 1972?',
		Answers: ['7','8','6','5']},
	{Question: 'Which sport is played at Hickstead?',
		Answers: ['Show Jumping','Rally Car Racing','Cricket','Polo']},
	{Question: '"Wedel" is a term in which sport?',
		Answers: ['Skiing','Darts','Chess','Formula One']},
	{Question: 'Figure skating champion Elvis Stojko was from which country?',
		Answers: ['Canada','Russia','USA','Bulgaria']},
	{Question: 'Which NHL hockey team has won the most Stanley Cups?',
		Answers: ['Montreal Canadiens','Toronto Maple Leafs','Boston Bruins','New York Rangers']},
	{Question: 'A "Miller" is a move in which sport?',
		Answers: ['Trampolining','Diving','Chess','Ice Hockey']},
	{Question: 'Who was dubbed the Elephant Man?',
		Answers: ['John Merrick','John McCririck','John McEnroe','John Martin']},
	{Question: 'Duchess is a cat in which film?',
		Answers: ['Aristocats','Lethal Weapon','101 Dalmatians','Men In Black']},
	{Question: 'Which of the following was not a character in Disney'+"'"+'s Pocahontas?',
		Answers: ['Mooky','Flit','Chief Powhatan','Lon']}];

var gameQuestions = [];
var maxQuestions = 5;
var timeLimit = 30; // Game time limit in seconds
var questionsDiv;

function timeConverter(t) {
// Formats time in seconds to mm:ss
// does not work for hours
  var minutes = Math.floor(t / 60);
  var seconds = t - (minutes * 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes === 0) {
    minutes = "00";
  }
  else if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return minutes + ":" + seconds;
}

function checkAnswers() {
	var numRight = 0;
	var numWrong = 0;
	var qAndAList = questionsDiv.children('div');
	var statsHtml = $('<div>');
	var p1 = $('<p>');
	var p2 = $('<p>');

	for (var i = 0,len=qAndAList.length; i < len; i++) {
		var answerText = qAndAList.eq(i).children('ul').children('.selection').text()

		if (answerText === gameQuestions[i].Answers[0]) {
			numRight++;
		}	else {
			numWrong++;
		}
	}

	p1.text('Right Answers: '+numRight);
	statsHtml.append(p1);
	p2.text('Wrong Answers: '+numWrong);
	statsHtml.append(p2);
	$('#announce').append(statsHtml);
	questionsDiv.empty();
}

$(document).ready(function() {
	questionsDiv = $("#questions");
	questionsDiv.empty();

	// randomly pick a number of questions specified by maxQuestions
	for (var i = 0; i < maxQuestions; i++) {
		randomIndex = Math.floor(Math.random()*questions.length)
		gameQuestions.push(questions[randomIndex]);
		questions.splice(randomIndex, 1); // prevent duplicates by removing selected questions
	}

	// Add the selected questions and answers to the HTML page
	for (var i = 0,len = gameQuestions.length; i < len; i++) {
		var newHtml = $('<div>');
		var tempAnswers = gameQuestions[i].Answers.slice();
		newHtml.attr('id','q'+i);
		p = $('<p>');
		p.text(gameQuestions[i].Question);
		newHtml.append(p)
		list = $('<ul>');

		// Shuffle the answers for display
		tempAnswers.sort(function(a, b){return 0.5 - Math.random()});
		for (var j = 0,len2=tempAnswers.length; j < len2; j++) {
			var listItem = $('<li>');
			listItem.attr('id','q'+i+'a'+j);
			listItem.text(tempAnswers[j]);
			list.append(listItem);
		}
		newHtml.append(list);
		questionsDiv.append(newHtml);
	}

	$('li').click(function(event){
		$(this).addClass('selection');
		$(this).siblings().removeClass('selection');
	});

	var aTimer = setInterval(function(){
		if (timeLimit > 0) {
			timeLimit--;
			$('#timer').text(timeConverter(timeLimit));
		} else {
			$('#announce').text('Time'+"'"+'s Up!');
			clearInterval(aTimer);
			checkAnswers();
		}
	},1000);

});
