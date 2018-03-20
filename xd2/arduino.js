var five = require("johnny-five");
var board = new five.Board({ repl: false });

// var valueDiv = document.querySelector("#test2");

board.on("ready", function() {

var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, chD, correct = 0;
var questions = [
    [
    	["What is one of the reasons Java is different to Javascript?", "Java is compiled before it runs and isn't limited to being on a web browser", "Javascript is compiled before it runs and isn't limited to being on a web browser", "Javascript is barely used anymore since Java came out", "Java is just short for javascript", "B"],
    	["What is the newest version of HTML being developed?", "HTML4", "HTML3", "HTML5", "There is only type of HTML", "C"],
    	["What does HTML stand for?", "Hyper type marked language", "Hyper text markup language", "Hyped terrain mock language", "Hyper typeface main loop", "B"]
    ],
    [
    	["What is one of the reasons Java is different to Javascript?", "Java is compiled before it runs and isn't limited to being on a web browser", "Javascript is compiled before it runs and isn't limited to being on a web browser", "Javascript is barely used anymore since Java came out", "Java is just short for javascript", "B"],
    	["What is the newest version of HTML being developed?", "HTML4", "HTML3", "HTML5", "There is only type of HTML", "C"],
    	["What does HTML stand for?", "Hyper type marked language", "Hyper text markup language", "Hyped terrain mock language", "Hyper typeface main loop", "B"]
    ],
    [
    	["What is one of the reasons Java is different to Javascript?", "Java is compiled before it runs and isn't limited to being on a web browser", "Javascript is compiled before it runs and isn't limited to being on a web browser", "Javascript is barely used anymore since Java came out", "Java is just short for javascript", "B"],
    	["What is the newest version of HTML being developed?", "HTML4", "HTML3", "HTML5", "There is only type of HTML", "C"],
    	["What does HTML stand for?", "Hyper type marked language", "Hyper text markup language", "Hyped terrain mock language", "Hyper typeface main loop", "B"]
    ],
    [
    	["What is one of the reasons Java is different to Javascript?", "Java is compiled before it runs and isn't limited to being on a web browser", "Javascript is compiled before it runs and isn't limited to being on a web browser", "Javascript is barely used anymore since Java came out", "Java is just short for javascript", "B"],
    	["What is the newest version of HTML being developed?", "HTML4", "HTML3", "HTML5", "There is only type of HTML", "C"],
    	["What does HTML stand for?", "Hyper type marked language", "Hyper text markup language", "Hyped terrain mock language", "Hyper typeface main loop", "B"]
    ],
];

function _(x){
	return document.getElementById(x);
}

function renderQuestion(){
	test = _("test");
	if(pos >= questions.length){
		test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
		_("test_status").innerHTML = "WINNER!";
		pos = 0;
		correct = 0;
		stepper.cw().step(5000, function() {
    		console.log("done");
   		});
		return false;
	}
	_("test_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;
	var cat = Math.floor(Math.random()*3);
	console.log(cat);
	question = questions[pos][cat][0];
	chA = questions[pos][cat][1];
	chB = questions[pos][cat][2];
	chC = questions[pos][cat][3];
	chD = questions[pos][cat][4];
	test.innerHTML = "<h3>"+question+"</h3>";
	test.innerHTML += "<input id='one' type='radio' name='choices' value='A'> "+chA+"<br>";
	test.innerHTML += "<input id='two' type='radio' name='choices' value='B'> "+chB+"<br>";
	test.innerHTML += "<input id='three' type='radio' name='choices' value='C'> "+chC+"<br>";
	test.innerHTML += "<input id='four' type='radio' name='choices' value='D'> "+chD+"<br><br>";
	test.innerHTML += "<button id='tested'>Submit Answer</button>";


	document.querySelector("#tested").addEventListener("click", function() {
			console.log(cat);
			choices = document.getElementsByName("choices");
			for(var i=0; i<choices.length; i++){
				if(choices[i].checked){
					choice = choices[i].value;
				}
			}
			if(choice == questions[pos][cat][5]){
				correct++;
				_("showRight").innerHTML = "right";
			}else {
				_("showRight").innerHTML = "wrong";
				pos = 0;
				correct = 0;
				renderQuestion();
			_("showRight").innerHTML = "";
				return false;
			}
		pos++;
		renderQuestion();
	});
}

// function checkAnswer(random){
// 	console.log(random);
// 	choices = document.getElementsByName("choices");
// 	for(var i=0; i<choices.length; i++){
// 		if(choices[i].checked){
// 			choice = choices[i].value;
// 		}
// 	}
// 	if(choice == questions[pos][1][5]){
// 		correct++;
// 		_("showRight").innerHTML = "right";
// 	}else {
// 		_("showRight").innerHTML = "wrong";
// 		pos = 0;
// 		correct = 0;
// 		renderQuestion();
// 		_("showRight").innerHTML = "";
// 		return false;
// 	}
// 	pos++;
// 	renderQuestion();
// }


// window.addEventListener("load", renderQuestion, false);
renderQuestion();


var buttonred = new five.Button(2);

var buttonblue = new five.Button(3);

var buttonyellow = new five.Button(4);

var buttongreen = new five.Button(5);



var stepper = new five.Stepper({
    type: five.Stepper.TYPE.FOUR_WIRE,
    stepsPerRev: 150,
    pins: [ 8, 9, 10, 11]
  });

// function moveCC() {
//   stepper.cw().step(5000, function() {
//     console.log("done");
//   });
// }

// button.on("press", function() {
//  info.innerHTML += "button pushed. ";

  buttonred.on("hold", function() {
    // buttonInfo.innerHTML += "Red button pushed";
    //console.log('red');
    // stepper.cw().step(5000, function() {
    // console.log("done");
    // });
    var one = document.querySelector("#one");
    one.checked = true;
  });

  buttonblue.on("hold", function() {
    // buttonInfo.innerHTML += "Blue button pushed";
    // //console.log('blue');
    var two = document.querySelector("#two");
    two.checked = true;
  });

  buttonyellow.on("hold", function() {
    // buttonInfo.innerHTML += "Yellow button pushed";
    // //console.log('yellow');
    var three = document.querySelector("#three");
    three.checked = true;
  });

  buttongreen.on("hold", function() {
    // buttonInfo.innerHTML += "Green button pushed";
    // //console.log('green');
    var four = document.querySelector("#four");
    four.checked = true;
  });


});



