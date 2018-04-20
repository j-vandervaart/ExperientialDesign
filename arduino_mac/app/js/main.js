var Readable = require('stream').Readable  
var util = require('util')  
var five = require('johnny-five')

// require('events').EventEmitter.prototype._maxListeners = 1;

util.inherits(MyStream, Readable)  
function MyStream(opt) {  
  Readable.call(this, opt)
}
MyStream.prototype._read = function() {};  
process.__defineGetter__('stdin', function() {  
  if (process.__stdin) return process.__stdin
  process.__stdin = new MyStream()
  return process.__stdin
})

// Global Vars

var game = document.querySelector("#mainGamePlay");

// Array Vars for Page Changing
var pageNumber = 0;
var arr = ['loadpage3', 'loadpage4', 'loadpage5', 'loadpage6', 'loadpage7', 'loadpageIntroVideo', 'loadpage8', 'loadpage11'];
var dog;

// Load in page One

// Creating Board Instances
new five.Boards(["A", "B"]).on("ready", function(){

	var b1 = this[0];
	var b2 = this[1];

	game.innerHTML = page1;

	var functions = {
	// loadpage1: function() {
	// 	game.innerHTML = page1;
	// 	StopSound();
	// },

	loadpage2: function() {
		game.innerHTML = page2;
	},

	loadpage3: function() {
  		game.innerHTML = page3;

  		SpeedStart();
	},

	loadpage4: function() {
  		game.innerHTML = page4;
	},

	loadpage5: function() {
  		game.innerHTML = page5;
	},

	loadpage6: function() {
  		game.innerHTML = page6;
	},

	loadpage7: function() {
  		game.innerHTML = page7;
  		StopSound();
	},

	loadpage12: function() {
  		game.innerHTML = page12;
	},

	loadpage11: function() {
  		game.innerHTML = page11;
	},

	loadpageIntroVideo: function() {
  		game.innerHTML = pageIntroVideo;
  		setTimeout(function() {
  			functions[arr[6]]()
  		}, 25000);
	},

	loadpage8: function() {
		game.innerHTML = page8;
		
		SpeedRound();
		var lifeLine = true;
		var lifeLine2 = true;
		var lifeLine3 = true;

		// Answer Vars
  		

		// Orange Box vars 
		

		// Switching Motors vars
		var servoSwitch = 0;
		var servo = [];
		servo.push(stepper, stepper2);
		
		// Quiz vars
		var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, chD, correct = 0;
		var randNum;

		// Grab Element
		function _(x){
			return document.getElementById(x);
		}

		var floatingBox = 9;
		// var currentPos = pos; 

		function renderQuestion(test4, posCat, randNumCat){
			if(pos >= 0 && pos <= 2) {
				console.log('1');
  				SpeedRound();
	  		}else if(pos >= 3 && pos <= 5) {
	  			console.log('2');
	  			MiddleRound();
	  		}else if(pos >= 6 && pos <= 8) {
	  			DeepRound();
	  		}else if(pos = 9) {
	  			MillionRound();
	  		}
			var winner = [];
			var choice1 = document.querySelector('.st5');
			var choice2 = document.querySelector('.st3');
			var choice3 = document.querySelector('.st2');
			var choice4 = document.querySelector('.st4');
			winner.push(choice1, choice2, choice3, choice4);

			buttonred.on("down", function() {
		  		console.log('sdfsdf');
		    	for(var i = 0; i < winner.length; i++) {
		    		winner[i].style.fill = "url(#Path_8_1_)";
		    	}
		    	winner[0].style.fill = "yellow";
		    	var one = document.querySelector("#one0");
		    	one.checked = true;
		  	});

		  	buttonblue.on("down", function() {

		    	for(var i = 0; i < winner.length; i++) {
		    		winner[i].style.fill = "url(#Path_8_1_)";
		    	}
		    	winner[1].style.fill = "yellow";
		    	var two = document.querySelector("#one1");
		    	two.checked = true;
		  	});

		  	buttonyellow.on("down", function() {

		    	for(var i = 0; i < winner.length; i++) {
		    		winner[i].style.fill = "url(#Path_8_1_)";
		    	}
		    	winner[2].style.fill = "yellow";
		    	var three = document.querySelector("#one2");
		    	three.checked = true;
		  	});

		  	buttongreen.on("down", function() {

		    	for(var i = 0; i < winner.length; i++) {
		    		winner[i].style.fill = "url(#Path_8_1_)";
		    	}
		    	winner[3].style.fill = "yellow";
		    	var four = document.querySelector("#one3");
		    	four.checked = true;
		  	});

			var orange = document.querySelectorAll(".orange");
			randNum = Math.floor(Math.random()*3);

				if(test4) {
					pos = posCat;
					randNum = randNumCat;
				}
				if(test4) {
					floatingBox = test4;
					// turtle[3].style.backgroundColor = "red";
				}

				// Setting Color of Orange Box 
				for(var i = 0; i < orange.length; i++) {
					orange[i].style.backgroundColor = "transparent";
					orange[i].style.borderRadius = "20px";
					orange[i].style.borderRadius = "150px";
				}
				orange[floatingBox].style.backgroundColor = "orange";
				orange[floatingBox].style.color = "white";

				// test = _("test");
				var text1 = document.querySelector("#text1");
				var text2 = document.querySelector("#text2");
				var text3 = document.querySelector("#text3");
				var text4 = document.querySelector("#text4");
				var text5 = document.querySelector("#text5");

				// Reset all Answers to Gradient
				for(var i = 0; i < winner.length; i++) {
					winner[i].style.fill = "url(#Path_8_1_)";
		    	}

		    	// If there's a Winner
				if(pos >= questions.length){
					pos = 0;
					correct = 0;
					floatingBox = 9;
					servo[servoSwitch].cw().step(5000, function() {
		   			});
		   			servoSwitch++;
					return false;
				}
			
				// Setting Questions and Answers
				test = _('test');
				var textArr = [];
				question = questions[pos][randNum][0];
				chA = questions[pos][randNum][1];
				chB = questions[pos][randNum][2];
				chC = questions[pos][randNum][3];
				chD = questions[pos][randNum][4];
				text1.innerHTML = question;
				text2.innerHTML = chA;
				text4.innerHTML = chB;
				text3.innerHTML = chC;
				text5.innerHTML = chD;
				textArr.push(text2, text4, text3, text5);
				test.innerHTML = "<h3>"+question+"</h3>";
				test.innerHTML += "<input id='one0' type='radio' name='choices' value='A'>"+chA+"<br>";
				test.innerHTML += "<input id='one1' type='radio' name='choices' value='B'>"+chB+"<br>";
				test.innerHTML += "<input id='one2' type='radio' name='choices' value='C'>"+chC+"<br>";
				test.innerHTML += "<input id='one3' type='radio' name='choices' value='D'>"+chD+"<br><br>";
				var valueArr = ['A', 'B', 'C', 'D'];


				//50/50

	  			if(lifeLine == true) {
	  				buttonblack1.on("down", testFun);

	  				function testFun() {
						var fifty = document.querySelector('.fiftyfifty');
						fifty.src = "images/5050used.png"; 
						StopSound();
						setTimeout(FiftyFiftyLifeline(), 1000);
						setTimeout(SpeedRound(), 4000);
	  					
	  					var rand1 = Math.floor(Math.random()*3);
	  					var rand2 = Math.floor(Math.random()*3);

	  					if(rand1 != rand2 && valueArr[rand1] != questions[pos][randNum][5] && valueArr[rand2] != questions[pos][randNum][5]) {
	  						textArr[rand1].innerHTML = "";
	  						textArr[rand2].innerHTML = "";
	  						return;
	  					} else {
	  						testFun();
	  					}

	  					lifeLine = false;
	  					buttonblack1.removeListener("down", testFun);
	  				}
	  			}

	  			if(lifeLine2 == true) {
		  			buttonblack2.on("down", cats2);
		  			function cats2() {
						var audience = document.querySelector('.audience');
						audience.src = "images/audienceused.png"; 
						StopSound();
						setTimeout(AudienceLifeline(), 1000);
						setTimeout(SpeedRound(), 10000);  
		  				var test4 = floatingBox;
		  				var posCat = pos;
		  				var randNumCat = randNum;
						lifeLine3 = false;
		  				document.querySelector('#p12').style.display = "block";
		  				
		  					
		  					// game.innerHTML = page12;
		  					var horse = document.querySelector("#countDownAudience");
		  					if(horse) {
							var audienceTimeLeft = 60;
							var audienceGameTimer = setInterval(function(){
								audienceTimeLeft--;
								horse.innerHTML = audienceTimeLeft;
								if(audienceTimeLeft == 0) {
									document.querySelector('#p12').style.display = "none";
									clearInterval(audienceGameTimer);
								}
								},1000);

							setTimeout(function(){
								lifeLine3 = true;
								// renderQuestion(test4, posCat, randNumCat);
								// return;
							}, 60000);
						}
						lifeLine2 = false;
						buttonblack2.removeListener("down", cats2);
		  			}
		  		}


	  				var cat1 = document.querySelector('#countDown');
					var timeLeft;
					timeLeft = 26;

					var gameTimer = setInterval(function(){
				    	timeLeft--;
				    	cat1.textContent = timeLeft;
				    	if(lifeLine3 == false) {
				    		clearInterval(gameTimer);
				    		setTimeout(function() {
				    			gameTimer = setInterval(function() {
				    				timeLeft--;
				    				cat1.textContent = timeLeft;
				    				if(timeLeft == 0) {
				    					console.log(timeLeft);
				    					clearInterval(gameTimer);
				    					lucasSucks();
				    				}
				    			}, 1000);
				    			
				    		}, 60000);
				    	}

				    	if(timeLeft == 0) {
				    		lucasSucks();
				    	}
				    	function lucasSucks() {
				    		clearInterval(gameTimer);
							console.log(questions[pos][randNum][5]);
							var answer1 = document.querySelector("#one0");
							var answer2 = document.querySelector("#one1");
							var answer3 = document.querySelector("#one2");
							var answer4 = document.querySelector("#one3");

							// Checks in radio input is checked
							if(answer1.checked){
								choice = answer1.value;
								var selected = answer1.id.charAt(3);
							}else if (answer2.checked) {
								choice = answer2.value;
								var selected = answer2.id.charAt(3);
							}else if (answer3.checked) {
								choice = answer3.value;
								var selected = answer3.id.charAt(3);
							}else if (answer4.checked) {
								choice = answer4.value;
								var selected = answer4.id.charAt(3);
							}else{
								pos = 0;
								pageNumber = 0;
								correct = 0;
								choice = null;
								if(pos >= 0 && pos <= 2) {
									console.log('1');
					  				SpeedLose();
						  		}else if(pos >= 3 && pos <= 5) {
						  			console.log('2');
						  			MiddleLose();
						  		}else if(pos >= 6 && pos <= 8) {
						  			DeepLose();
						  		}else if(pos = 9) {
						  			MillionLose();
						  		}
								setTimeout(functions[arr[7]], 5000);
								setTimeout(function() {
									StopSound();
									game.innerHTML = page1;
								}, 10000);
								return;
							}

							// If the answer is RIGHT
							if(choice == questions[pos][randNum][5]){
								correct++;
								for(var i = 0; i < winner.length; i++) {
				    			winner[i].style.fill = "url(#Path_8_1_)";
				    			}	
				    			if(selected) {	
									winner[selected].style.fill = "green";
									// _("showRight").innerHTML = "right";
								}
								floatingBox--;
								StopSound();
								if(pos >= 0 && pos <= 2) {
									console.log('1');
					  				SpeedWin();
						  		}else if(pos >= 3 && pos <= 5) {
						  			console.log('2');
						  			MiddleWin();
						  		}else if(pos >= 6 && pos <= 8) {
						  			DeepWin();
						  		}else if(pos = 9) {
						  			MillionWin();
						  		}
								pos++;

							// If the answer is WRONG
							}else if(choice != questions[pos][randNum][5]){
								// SpeedLose();
								if(pos >= 0 && pos <= 2) {
									console.log('1');
					  				SpeedLose();
						  		}else if(pos >= 3 && pos <= 5) {
						  			console.log('2');
						  			MiddleLose();
						  		}else if(pos >= 6 && pos <= 8) {
						  			DeepLose();
						  		}else if(pos = 9) {
						  			MillionLose();
						  		}
								for(var i = 0; i < winner.length; i++) {
									winner[i].style.fill = "url(#Path_8_1_)";
				    			}	
								winner[selected].style.fill = "red";
								pos = 0;
								correct = 0;
								pageNumber = 0;
								floatingBox = 9;
								setTimeout(functions[arr[7]], 5000);
								setTimeout(function() {
									StopSound();
									game.innerHTML = page1;
								}, 10000);
								// _("showRight").innerHTML = "";
								
								
								return false;
							}
							setTimeout(renderQuestion, 5000);
					}
					},1000);
				}
				
			renderQuestion();
		}
	}

var buttonred = new five.Button({
	pin:2,
	board: b1
});

var buttonblue = new five.Button({
	pin:3,
	board: b1			
});

var buttonyellow = new five.Button({
	pin:4,
	board: b1
});

var buttongreen = new five.Button({
	pin:5,
	board: b1
});	

var buttonblack1 = new five.Button({
	pin:2,
	board: b2
});

var buttonblack2 = new five.Button({
	pin:3,
	board: b2
});

var stepper = new five.Stepper({
    type: five.Stepper.TYPE.FOUR_WIRE,
    stepsPerRev: 150,
    pins: [6,7,8,9],
    board: b1
});

var stepper2 = new five.Stepper({
    type: five.Stepper.TYPE.FOUR_WIRE,
    stepsPerRev: 150,
    pins: [10,11,12,13],
    board: b1  
});

// function moveCC() {
//   stepper.cw().step(5000, function() {
//     console.log("done");
//   });
// }

buttonblack1.on("down", function() {
  	if(pageNumber <= 5)
  	functions[arr[pageNumber++]]();
  });

// buttonblack2.on("up", function() {
//   });

});