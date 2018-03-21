var five = require("johnny-five");
var board = new five.Board({ repl: false });

// var valueDiv = document.querySelector("#test2");

board.on("ready", function() {

var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, chD, correct = 0;
var winner = document.querySelectorAll('.winner');

function _(x){
	return document.getElementById(x);
}

function renderQuestion(){
	test = _("test");
	for(var i = 0; i < winner.length; i++) {
		winner[i].style.backgroundColor = "transparent";
    }
	if(pos >= questions.length){
		test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
		_("test_status").innerHTML = "WINNER!";
		pos = 0;
		correct = 0;
		stepper.cw().step(5000, function() {
    		console.log("done");
   		});
   		stepper2.cw().step(5000, function() {
    		console.log("done");
   		});
		return false;
	}
	_("test_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;
	var cat = Math.floor(Math.random()*3);
	question = questions[pos][cat][0];
	chA = questions[pos][cat][1];
	chB = questions[pos][cat][2];
	chC = questions[pos][cat][3];
	chD = questions[pos][cat][4];
	document.querySelector("#question").innerHTML = question;
	winner[0].innerHTML = chA;
	winner[1].innerHTML = chB;
	winner[2].innerHTML = chC;
	winner[3].innerHTML = chD;
	test.innerHTML = "<h3>"+question+"</h3>";
	test.innerHTML += "<input id='one0' type='radio' name='choices' value='A'> "+chA+"<br>";
	test.innerHTML += "<input id='one1' type='radio' name='choices' value='B'> "+chB+"<br>";
	test.innerHTML += "<input id='one2' type='radio' name='choices' value='C'> "+chC+"<br>";
	test.innerHTML += "<input id='one3' type='radio' name='choices' value='D'> "+chD+"<br><br>";
	// test.innerHTML += "<button id='tested'>Submit Answer</button>";


	setTimeout(function() {
			console.log(cat);
			// choices = document.getElementsByName("choices");
			var dog1 = document.querySelector("#one0");
			var dog2 = document.querySelector("#one1");
			var dog3 = document.querySelector("#one2");
			var dog4 = document.querySelector("#one3");
			// for(var i = 0; i<choices.length; i++){
			if(dog1.checked){
				choice = dog1.value;
				console.log('one');
				var dog = dog1.id.charAt(3);
			}else if (dog2.checked) {
				choice = dog2.value;
				console.log('two');
				var dog = dog2.id.charAt(3);
			}else if (dog3.checked) {
				choice = dog3.value;
				console.log('three');
				var dog = dog3.id.charAt(3);
			}else if (dog4.checked) {
				choice = dog4.value;
				console.log('four');
				var dog = dog4.id.charAt(3);
			}else{
				pos = 0;
				correct = 0;
				console.log
				_("showRight").innerHTML = "no answer";
				setTimeout(renderQuestion, 5000);
				return;
			}
			// 	}else{
			// 		_("showRight").innerHTML = "no answer";
			// 		pos = 0;
			// 		correct = 0;
			// 		setTimeout(renderQuestion, 5000);
			// 		return;
			// 	}
			// }
			if(choice == questions[pos][cat][5]){
				correct++;
				for(var i = 0; i < winner.length; i++) {
    			winner[i].style.backgroundColor = "transparent";
    			}	
    			if(dog) {	
					winner[dog].style.backgroundColor = "green";
					_("showRight").innerHTML = "right";
				}
				pos++;
			}else {
				_("showRight").innerHTML = "wrong";
				pos = 0;
				correct = 0;
				renderQuestion();
				_("showRight").innerHTML = "";
				return false;
			}
			setTimeout(renderQuestion, 1000);
	}, 10000);
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

var buttonblack2 = new five.Button(1);

var buttonred = new five.Button(2);

var buttonblue = new five.Button(3);

var buttonyellow = new five.Button(4);

var buttongreen = new five.Button(5);



var stepper = new five.Stepper({
    type: five.Stepper.TYPE.FOUR_WIRE,
    stepsPerRev: 150,
    pins: [6,7,8,9]
  });

var stepper2 = new five.Stepper({
    type: five.Stepper.TYPE.FOUR_WIRE,
    stepsPerRev: 150,
    pins: [10,11,12,13]
  });

// function moveCC() {
//   stepper.cw().step(5000, function() {
//     console.log("done");
//   });
// }

// button.on("press", function() {
//  info.innerHTML += "button pushed. ";

  buttonblack2.on("hold", function() {
  	console.log('3453453');
  });

  buttonred.on("hold", function() {
    // buttonInfo.innerHTML += "Red button pushed";
    //console.log('red');
    // stepper.cw().step(5000, function() {
    // console.log("done");
    // });
    for(var i = 0; i < winner.length; i++) {
    	winner[i].style.backgroundColor = "transparent";
    }
    winner[0].style.backgroundColor = "yellow";
    var one = document.querySelector("#one0");
    one.checked = true;
  });

  buttonblue.on("hold", function() {
    // buttonInfo.innerHTML += "Blue button pushed";
    // //console.log('blue');
    for(var i = 0; i < winner.length; i++) {
    	winner[i].style.backgroundColor = "transparent";
    }
    winner[1].style.backgroundColor = "yellow";
    var two = document.querySelector("#one1");
    two.checked = true;
  });

  buttonyellow.on("hold", function() {
    // buttonInfo.innerHTML += "Yellow button pushed";
    // //console.log('yellow');
    for(var i = 0; i < winner.length; i++) {
    	winner[i].style.backgroundColor = "transparent";
    }
    winner[2].style.backgroundColor = "yellow";
    var three = document.querySelector("#one2");
    three.checked = true;
  });

  buttongreen.on("hold", function() {
    // buttonInfo.innerHTML += "Green button pushed";
    // //console.log('green');
    for(var i = 0; i < winner.length; i++) {
    	winner[i].style.backgroundColor = "transparent";
    }
    winner[3].style.backgroundColor = "yellow";
    var four = document.querySelector("#one3");
    four.checked = true;
  });


});



