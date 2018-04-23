var Readable = require('stream').Readable  
var util = require('util')  
var five = require('johnny-five')
var mysql = require('mysql');
var mysql = require('mysql-wrapper');
var pixel = require("node-pixel");

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
var conn = mysql({
  host: "localhost",
  user: "root",
  password: "root",
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  port: '8889',
  database: 'proxima'
});

var barcode = document.getElementById('barcode');
var valid = document.getElementById('valid');
var primary = document.getElementById("primary");
var secondary = document.getElementById("secondary");
var isPlaying = false; 

var game = document.querySelector("#mainGamePlay");

// Array Vars for Page Changing
var pageNumber = 0;
var arr = ['loadpage2', 'loadpage3', 'loadpage4', 'loadpage5', 'loadpage6', 'loadpage7', 'loadpageIntroVideo', 'loadpage8', 'loadpage11'];
var dog;

var strip = null;
var fps = 20; 

// Load in page One
// var ports = [
//   { id: "A", port: "/dev/cu.usbmodem14141" },
//   { id: "B", port: "/dev/cu.usbmodem14131" }
// Creating Board Instances
new five.Boards(["A", "B", "C"]).on("ready", function(){


	var b1 = this[0];
	var b2 = this[1];
	var b3 = this[2];

	strip = new pixel.Strip({
        data: 6,
        length: 120,
        color_order: pixel.COLOR_ORDER.GRB,
        board: b3,
        controller: "FIRMATA",
    });

	game.innerHTML = page1;

	var functions = {
	// loadpage1: function() {
	// 	game.innerHTML = page1;
	// 	StopSound();
	// },

	loadpage2: function() {
		game.innerHTML = page2;


		var conn = mysql({
		  host: "localhost",
		  user: "root",
		  password: "root",
		  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
		  port: '8889',
		  database: 'proxima'
		});

		  //Variables Defining
		// var title = document.getElementById('title');
		// var valid = document.getElementById('valid');
		var barcode = document.getElementById('barcode');

		function catchcode(){
		  console.log(this.value);
		  var code = this.value;
		  // title.innerHTML = 'Barcode Scan: ' + this.value;
		  barcode.value = "";
		  // valid.innerHTML = "";
		  checkcode(code);
		}

		function checkcode(codes) {
		    console.log('Checking code validity...');
		    conn.query('SELECT * FROM codes {{where data}}', {
		      data: {
		        codes: codes
		      }
		    }, function (err, result) {
		      console.log(err, result);
		      if (result[0]) {
		       if(result[0].active == 0) {
		       	game.innerHTML = pagebarcodeGood;
		       	setTimeout(function() {
		       		pageNumber = 3;
				    functions[arr[2]]();
		       	}, 5000);
		        // valid.innerHTML = 'Code is valid. The game will now start.';
		        updatecode(codes);
		       } else {
		       	game.innerHTML = pagebarcodeBad;
		       	setTimeout(function() {
		       		pageNumber = 0;
					game.innerHTML = page1;
		       	}, 5000);
		        // valid.innerHTML = 'This code has already been used. The game can only be played once per card.';
		       }
		      } else {
		        // valid.innerHTML = 'This code is not valid, please try again';
		      }
		    });
		}

		function updatecode(codes) {
		    console.log('Updating code validity...');
		    conn.query('UPDATE codes {{set data}} {{where find}}', {
		      data: {
		        active: 0
		      },
		      find: {
		        codes: codes
		      },
		    }, function (err, result) {
		      console.log(err, result);
		    });
		}

		barcode.addEventListener('change', catchcode);
	},

	loadpage3: function() {
  		game.innerHTML = page3;
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
  			functions[arr[7]]()
  		}, 100);
	},

	loadpage8: function() {
		game.innerHTML = page8;

		var lifeLine = true;
		var lifeLine2 = true;
		var lifeLine3 = true;

		// Answer Vars
  		

		// Orange Box vars 
		

		// Switching Motors vars
		var servoSwitch = 0;
		var servo = [];
		// servo.push(stepper, stepper2);
		
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
  				SpeedStart();
	  		}else if(pos >= 3 && pos <= 5) {
	  			console.log('2');
	  			MiddleStart();
	  		}else if(pos >= 6 && pos <= 8) {
	  			DeepStart();
	  		}else if(pos = 9) {
	  			MillionStart();
	  		}
			var winner = [];
			var choice1 = document.querySelector('.st5');
			var choice2 = document.querySelector('.st3');
			var choice3 = document.querySelector('.st2');
			var choice4 = document.querySelector('.st4');
			winner.push(choice1, choice2, choice3, choice4);


			// buttonred.on("down", function() {
		 //  		console.log('sdfsdf');
		 //    	for(var i = 0; i < winner.length; i++) {
		 //    		winner[i].style.fill = "url(#Path_8_1_)";
		 //    	}
		 //    	winner[0].style.fill = "yellow";
		 //    	var one = document.querySelector("#one0");
		 //    	one.checked = true;
		 //  	});

		 //  	buttonblue.on("down", function() {

		 //    	for(var i = 0; i < winner.length; i++) {
		 //    		winner[i].style.fill = "url(#Path_8_1_)";
		 //    	}
		 //    	winner[1].style.fill = "yellow";
		 //    	var two = document.querySelector("#one1");
		 //    	two.checked = true;
		 //  	});

		 //  	buttonyellow.on("down", function() {

		 //    	for(var i = 0; i < winner.length; i++) {
		 //    		winner[i].style.fill = "url(#Path_8_1_)";
		 //    	}
		 //    	winner[2].style.fill = "yellow";
		 //    	var three = document.querySelector("#one2");
		 //    	three.checked = true;
		 //  	});

		 //  	buttongreen.on("down", function() {

		 //    	for(var i = 0; i < winner.length; i++) {
		 //    		winner[i].style.fill = "url(#Path_8_1_)";
		 //    	}
		 //    	winner[3].style.fill = "yellow";
		 //    	var four = document.querySelector("#one3");
		 //    	four.checked = true;
		 //  	});

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
					game.innerHTML = page9;
					// servo[servoSwitch].cw().step(5000, function() {
		   // 			});
		   // 			servoSwitch++;
					// return false;
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
	  					if(fifty) {
	  						fifty.src = "images/5050used.png"; 
	  					}
						
						
						// StopSound();
						setTimeout(FiftyFiftyLifeline(), 1000);
						// setTimeout(SpeedRound(), 4000);
	  					
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
						// setTimeout(SpeedRound(), 10000);  
		  				var test4 = floatingBox;
		  				var posCat = pos;
		  				var randNumCat = randNum;
						lifeLine3 = false;
		  				document.querySelector('#p12').style.display = "block";
		  				
		  					
		  					// game.innerHTML = page12;
		  					var horse = document.querySelector("#countDownAudience");
		  					if(horse) {
							var audienceTimeLeft = 30;
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
							}, 30000);
						}
						lifeLine2 = false;
						buttonblack2.removeListener("down", cats2);
		  			}
		  		}

		  	var cat1 = document.querySelector('#countDown');
			var timeLeft;
			timeLeft = 26;


	  		buttonred.on("down", function() {
		  		console.log('sdfsdf');
		    	for(var i = 0; i < winner.length; i++) {
		    		winner[i].style.fill = "url(#Path_8_1_)";
		    	}
		    	winner[0].style.fill = "yellow";
		    	var one = document.querySelector("#one0");
		    	one.checked = true;
		    	timeLeft = 1;
		  	});

		  	buttonblue.on("down", function() {

		    	for(var i = 0; i < winner.length; i++) {
		    		winner[i].style.fill = "url(#Path_8_1_)";
		    	}
		    	winner[1].style.fill = "yellow";
		    	var two = document.querySelector("#one1");
		    	two.checked = true;
		    	timeLeft = 1;
		  	});

		  	buttonyellow.on("down", function() {

		    	for(var i = 0; i < winner.length; i++) {
		    		winner[i].style.fill = "url(#Path_8_1_)";
		    	}
		    	winner[2].style.fill = "yellow";
		    	var three = document.querySelector("#one2");
		    	three.checked = true;
		    	timeLeft = 1;
		  	});

		  	buttongreen.on("down", function() {

		    	for(var i = 0; i < winner.length; i++) {
		    		winner[i].style.fill = "url(#Path_8_1_)";
		    	}
		    	winner[3].style.fill = "yellow";
		    	var four = document.querySelector("#one3");
		    	four.checked = true;
		    	timeLeft = 1;
		  	});


	  		
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
				    			
				    		}, 30000);
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
									StopSound();
					  				SpeedLose();
						  		}else if(pos >= 3 && pos <= 5) {
						  			console.log('2');
						  			StopSound();
						  			MiddleLose();
						  		}else if(pos >= 6 && pos <= 8) {
						  			DeepLose();
						  			StopSound();
						  		}else if(pos = 9) {
						  			StopSound();
						  			MillionLose();
						  		}
								setTimeout(functions[arr[8]], 5000);
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
								// StopSound();
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
								StopSound();
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
								setTimeout(functions[arr[8]], 5000);
								setTimeout(function() {
									StopSound();
									game.innerHTML = page1;
								}, 10000);
								// _("showRight").innerHTML = "";
								
								
								return false;
							}
							if(pos <= 9) {
								MiddleQuery();
								setTimeout(renderQuestion, 5000);
							}else {
								pos = 0;
								correct = 0;
								floatingBox = 9;
								game.innerHTML = page9;
								pageNumber = 0;
								setTimeout(function() {
									game.innerHTML =  page1;
								}, 10000);
							}
							
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

// var stepper = new five.Stepper({
//     type: five.Stepper.TYPE.FOUR_WIRE,
//     stepsPerRev: 150,
//     pins: [6,7,8,9],
//     board: b1
// });

// var stepper2 = new five.Stepper({
//     type: five.Stepper.TYPE.FOUR_WIRE,
//     stepsPerRev: 150,
//     pins: [10,11,12,13],
//     board: b1  
// });

// function moveCC() {
//   stepper.cw().step(5000, function() {
//     console.log("done");
//   });
// }

buttonblack1.on("down", function() {
  	if(pageNumber < 1) { 
  		functions[arr[pageNumber++]]();
  	}else if(pageNumber >= 2 && pageNumber <= 6) {
  		functions[arr[pageNumber++]]();
  	}
  });

// buttonblack2.on("up", function() {
//   });

function SpeedStart() {
  secondary.src='sounds/speed/question/start.mp3';
  secondary.volume = 1;
  secondary.load(); 
  secondary.play();
  StartLight();
  setTimeout(function(){SpeedRound(); }, 5000);
}

function SpeedRound() {
  primary.src='sounds/speed/question/main.mp3';
  primary.load(); 
  primary.play();
  SpeedRoundLight();

}

function SpeedWin() {
  secondary.src='sounds/speed/win/main.mp3';
  secondary.load(); 
  primary.volume = 0.2;
  secondary.play();
  SpeedWinLight();
  setTimeout(function(){ primary.volume = 1; SpeedRoundLight(); }, 2000);


}

function SpeedLose() {
  primary.src='sounds/speed/lose/main.mp3';
  primary.load(); 
  primary.play();
  LoseLight();
  setTimeout(function(){ EndingCredit(); }, 6000);
}

function SpeedFinalWin() {
  primary.src='sounds/speed/win/final.mp3';
  primary.load(); 
  primary.play();
  FinalWinLight();
}


//MIDDLE ROUND
function MiddleStart() {
  secondary.src='sounds/middle/question/start.mp3';
  secondary.volume = 1;
  secondary.load(); 
  secondary.play();
  StartLight();
  setTimeout(function(){MiddleRound(); }, 2000);
}
function MiddleRound() {
  MiddleRoundLight();
  primary.src='sounds/middle/question/main.mp3';
  primary.load(); 
  primary.play();
}
function MiddleQuery() {
  QueryLight();
  secondary.src='sounds/middle/question/answer.mp3';
  secondary.load(); 
  secondary.play();
  setTimeout(function(){ primary.pause(); }, 300);
}
function MiddleWin() {
  WinLight();
  primary.src='sounds/middle/win/main.mp3';
  primary.load(); 
  primary.play();
  setTimeout(function(){ secondary.volume = 0; }, 800);
}
function MiddleLose() {
  LoseLight();
  primary.src='sounds/middle/lose/main.mp3';
  primary.load(); 
  primary.play();
  setTimeout(function(){ secondary.volume = 0; }, 800);
  setTimeout(function(){ EndingCredit(); }, 10000);
}
function MiddleFinalWin() {
  primary.src='sounds/middle/win/final.mp3';
  primary.load(); 
  primary.play();
  FinalWinLight();
  setTimeout(function(){ secondary.volume = 0; }, 800);
}

//DEEP ROUND
function deepStart() {
  StartLight();
  secondary.src='sounds/deep/question/start.mp3';
  secondary.volume = 1;
  secondary.load(); 
  secondary.play();
  setTimeout(function(){DeepRound(); }, 2000);
}
function DeepRound() {
  DeepRoundLight();
  primary.src='sounds/deep/question/main.mp3';
  primary.load(); 
  primary.play();
}
function deepQuery() {
  QueryLight();
  secondary.src='sounds/deep/question/answer.mp3';
  secondary.load(); 
  secondary.play();
  setTimeout(function(){ primary.pause(); }, 300);
}
function DeepWin() {
  WinLight();
  primary.src='sounds/deep/win/main.mp3';
  primary.load(); 
  primary.play();
  setTimeout(function(){ secondary.volume = 0; }, 800);
}
function DeepLose() {
  LoseLight();
  primary.src='sounds/deep/lose/main.mp3';
  primary.load(); 
  primary.play();
  setTimeout(function(){ secondary.volume = 0; }, 800);
  setTimeout(function(){ EndingCredit(); }, 6000);
}

//Million ROUND
function MillionStart() {
  StartLight();
  secondary.src='sounds/million/question/start.mp3';
  secondary.volume = 1;
  secondary.load(); 
  secondary.play();
  setTimeout(function(){MillionRound(); }, 2000);
}
function MillionRound() {
  millionRoundLight();
  primary.src='sounds/million/question/main.mp3';
  primary.load(); 
  primary.play();
}
function MillionQuery() {
  QueryLight();
  secondary.src='sounds/million/question/answer.mp3';
  secondary.load(); 
  secondary.play();
  setTimeout(function(){ primary.pause(); }, 300);
}
function MillionWin() {
  millionWinLight();
  primary.src='sounds/million/win/main.mp3';
  primary.load(); 
  primary.play();
  setTimeout(function(){ secondary.volume = 0; }, 800);
}
function MillionLose() {
  LoseLight();
  primary.src='sounds/million/lose/main.mp3';
  primary.load(); 
  primary.play();
  setTimeout(function(){ secondary.volume = 0; }, 800);
  setTimeout(function(){ EndingCredit(); }, 6000);
}

// //OTHER SOUNDS
function EndingCredit() {
  EndingLight();
  primary.src='sounds/other/ending.mp3';
  primary.load(); 
  primary.play();
}
function AudienceLifeline() {
  AudienceLifelineLight();
  secondary.src='sounds/other/audience.mp3';
  secondary.load(); 
  secondary.play();
  primary.volume = 0.1;
  setTimeout(function(){ primary.volume = 1; }, 61000);
}
function FiftyFiftyLifeline() {
  FiftyFiftyLight();
  secondary.src='sounds/other/fiftyfifty-edit.mp3';
  secondary.load(); 
  secondary.play();
  primary.volume = 0.1;
  setTimeout(function(){ primary.volume = 1; }, 1000);
}

function StopSound() {
  primary.pause();
  secondary.pause();
}
//ESSENTIAL SOUND AUDIO 
var primary = document.getElementById("primary");
var secondary = document.getElementById("secondary");
var isPlaying = false;















//LIGHTS SETUP
var PixelForward = false;
var StartTimer = setInterval(function () {
    if (PixelForward) 
    strip.shift(1, pixel.FORWARD, true);
    strip.show();
    // your function
}, 1000 / 12);

var PixelForward2 = false;
var DeepTimer = setInterval(function () {
    if (PixelForward2) 
    strip.shift(1, pixel.FORWARD, true);
    strip.show();
    // your function
}, 10000 / 12);

var PixelForward3 = false;
var MiddleTimer = setInterval(function () {
    if (PixelForward3) 
    strip.shift(1, pixel.FORWARD, true);
    strip.show();
    // your function
}, 13000 / 12);

var PixelForward4 = false;
var MillionTimer = setInterval(function () {
    if (PixelForward4) 
    strip.shift(1, pixel.FORWARD, true);
    strip.show();
    // your function
}, 13000 / 12);


var PixelRando = false;
var Start = setInterval(function () {
    var i;
    var b;
    var m;
    if (PixelRando) {
      strip.color('#000');
      a = Math.floor(Math.random() * 120);
      b = Math.floor(Math.random() * 120);
      c = Math.floor(Math.random() * 120);
      d = Math.floor(Math.random() * 120);
      e = Math.floor(Math.random() * 120);
      f = Math.floor(Math.random() * 120);
      g = Math.floor(Math.random() * 120);
      h = Math.floor(Math.random() * 120);
      i = Math.floor(Math.random() * 120);
      j = Math.floor(Math.random() * 120);
      k = Math.floor(Math.random() * 120);
      m = Math.floor(Math.random() * 120);
      secondaryColour = 'purple';
      strip.pixel(a).color(secondaryColour);
      strip.pixel(b).color('blue');
      strip.pixel(c).color(secondaryColour);
      strip.pixel(d).color(secondaryColour);
      strip.pixel(e).color('blue');
      strip.pixel(f).color(secondaryColour);
      strip.pixel(g).color(secondaryColour);
      strip.pixel(h).color('blue');
      strip.pixel(i).color(secondaryColour);
      strip.pixel(j).color(secondaryColour);
      strip.pixel(k).color('blue');
      strip.pixel(m).color(secondaryColour);
      strip.show();
    }
}, 500 / 12);


var PixelRando2 = false;
var Completo = setInterval(function () {
    var i;
    var b;
    var m;
    var s;
    if (PixelRando2) {
      strip.color('#000');
      a = Math.floor(Math.random() * 120);
      b = Math.floor(Math.random() * 120);
      c = Math.floor(Math.random() * 120);
      d = Math.floor(Math.random() * 120);
      e = Math.floor(Math.random() * 120);
      f = Math.floor(Math.random() * 120);
      g = Math.floor(Math.random() * 120);
      h = Math.floor(Math.random() * 120);
      i = Math.floor(Math.random() * 120);
      j = Math.floor(Math.random() * 120);
      k = Math.floor(Math.random() * 120);
      m = Math.floor(Math.random() * 120);
      secondaryColour = 'purple';
      strip.pixel(a).color('blue');
      strip.pixel(b).color('blue');
      strip.pixel(c).color('white');
      strip.pixel(d).color(secondaryColour);
      strip.pixel(e).color('blue');
      strip.pixel(f).color('green');
      strip.pixel(g).color('white');
      strip.pixel(h).color('blue');
      strip.pixel(i).color(secondaryColour);
      strip.pixel(j).color('green');
      strip.pixel(k).color('blue');
      strip.pixel(m).color(secondaryColour);
      strip.show();
    }
}, 800 / 12);


var PixelRandoEnd = false;
var CompletoEnd = setInterval(function () {
    var i;
    var b;
    var m;
    var s;
    if (PixelRandoEnd) {
      strip.color('#000');
      a = Math.floor(Math.random() * 120);
      b = Math.floor(Math.random() * 120);
      c = Math.floor(Math.random() * 120);
      d = Math.floor(Math.random() * 120);
      e = Math.floor(Math.random() * 120);
      f = Math.floor(Math.random() * 120);
      g = Math.floor(Math.random() * 120);
      h = Math.floor(Math.random() * 120);
      i = Math.floor(Math.random() * 120);
      j = Math.floor(Math.random() * 120);
      k = Math.floor(Math.random() * 120);
      m = Math.floor(Math.random() * 120);
      n = Math.floor(Math.random() * 120);
      o = Math.floor(Math.random() * 120);
      p = Math.floor(Math.random() * 120);
      q = Math.floor(Math.random() * 120);
      secondaryColour = 'purple';
      strip.pixel(a).color('blue');
      strip.pixel(b).color('red');
      strip.pixel(c).color('white');
      strip.pixel(d).color('red');
      strip.pixel(e).color('blue');
      strip.pixel(f).color('green');
      strip.pixel(g).color('red');
      strip.pixel(h).color('blue');
      strip.pixel(i).color('purple');
      strip.pixel(j).color('green');
      strip.pixel(k).color('blue');
      strip.pixel(m).color('purple');
      strip.pixel(n).color('purple');
      strip.pixel(o).color('green');
      strip.pixel(p).color('blue');
      strip.pixel(q).color('purple');
      strip.show();
    }
}, 1200 / 12);




//Lights Functions
function StartLight() {
  PixelRando = true;
  PixelRando2 = false;
  PixelForward = false;
  PixelRandoEnd = false;
  PixelForward2 = false;
  PixelForward3 = false;
  PixelForward4 = false;
}

function SpeedRoundLight() {
  PixelRando=false;
  PixelRando2 = false;
  PixelForward = true;
  PixelRandoEnd = false;
  PixelForward2 = false;
  PixelForward3 = false;
  PixelForward4 = false;
  strip.show();
  strip.color('purple');
  var secondaryColour = 'white';
  for(var i = 0; i < 120; i+=8) {
  strip.pixel(i).color(secondaryColour);
  }
  strip.show();
}

function SpeedWinLight() {
  PixelRando=false;
  PixelRando2 = false;
  PixelForward = true;
  PixelForward2 = false;
  PixelRandoEnd = false;
  PixelForward3 = false;
  PixelForward4 = false;
  strip.show();
  strip.color('green');
  var secondaryColour = 'white';
  strip.pixel(0).color(secondaryColour);
  strip.pixel(1).color(secondaryColour);
  strip.pixel(8).color(secondaryColour);
  strip.pixel(9).color(secondaryColour);
  strip.pixel(16).color(secondaryColour);
  strip.pixel(17).color(secondaryColour);
  strip.pixel(24).color(secondaryColour);
  strip.pixel(25).color(secondaryColour);
  strip.pixel(32).color(secondaryColour);
  strip.pixel(33).color(secondaryColour);
  strip.pixel(40).color(secondaryColour);
  strip.pixel(41).color(secondaryColour);
  strip.pixel(48).color(secondaryColour);
  strip.pixel(49).color(secondaryColour);
  strip.pixel(56).color(secondaryColour);
  strip.pixel(57).color(secondaryColour);
  strip.pixel(64).color(secondaryColour);
  strip.pixel(65).color(secondaryColour);
  strip.pixel(72).color(secondaryColour);
  strip.pixel(73).color(secondaryColour);
  strip.pixel(80).color(secondaryColour);
  strip.pixel(81).color(secondaryColour);
  strip.pixel(88).color(secondaryColour);
  strip.pixel(89).color(secondaryColour);
  strip.pixel(96).color(secondaryColour);
  strip.pixel(97).color(secondaryColour);
  strip.pixel(104).color(secondaryColour);
  strip.pixel(105).color(secondaryColour);
  strip.pixel(102).color(secondaryColour);
  strip.pixel(103).color(secondaryColour);
  strip.pixel(110).color(secondaryColour);
  strip.pixel(111).color(secondaryColour);
  strip.pixel(118).color(secondaryColour);
  strip.pixel(119).color(secondaryColour);
  strip.show();
}

function LoseLight() {
  PixelRando = false;
  PixelForward = false;
  PixelRando2 = false;
  PixelRandoEnd = false;
  PixelForward2 = false;
  PixelForward3 = false;
  PixelForward4 = false;
  var i = -1;                   
  function colorLoop () {           
     setTimeout(function () {     
        i++;                    
        if (i < 120) {
           strip.pixel(i).color('red');     
           strip.show();    
           colorLoop();            
        }                   
     }, 8);
  }
  colorLoop(); 
}

function FinalWinLight() {
  PixelRando = false;
  PixelForward = false;
  PixelForward2 = false;
  PixelRandoEnd = false;
  PixelForward4 = false;
  PixelForward3 = false;
  var i = -1;   
  function colorLoop () {           
    setTimeout(function () {     
       i++;                    
       if (i < 120) {
          strip.pixel(i).color('green');     
          strip.show();    
          colorLoop();            
       }                   
    }, 8);
 }
 colorLoop(); 
  setTimeout(function () {   
    var i = -1;     
  function colorLoop () {           
    setTimeout(function () {     
       i++;                    
       if (i < 120) {
          strip.pixel(i).color('purple');     
          strip.show();    
          colorLoop();            
       }                   
    }, 8);
 }
 colorLoop(); 
}, 1600);
setTimeout(function () {
  PixelRando2 = true;
}, 2800);
setTimeout(function () {
  for(var i = 0; i < 120; i++) {
    strip.pixel(i).color('#000');     
    strip.show();             
 } 
  strip.color('#000');
  strip.show();                        
  PixelRando2 = false;
}, 7600);

}

function DeepRoundLight() {
  PixelRando=false;
  PixelRando2 = false;
  PixelForward = false;
  PixelForward3 = false;
  PixelRandoEnd = false;
  PixelForward2 = true;
  PixelForward4 = false;
  strip.show();
  strip.color('purple');
  for(var i = 0; i < 120; i += 2) {
    strip.pixel(i).color('#000');            
 }  
  strip.show();
}

function QueryLight() {
  PixelRando=false;
  PixelRando2 = false;
  PixelForward = false;
  PixelForward2 = false;
  PixelForward3 = false;
  PixelRandoEnd = false;
  PixelForward4 = false;
  var i = -1;        
  function colorLoop () {           
    setTimeout(function () {    
       i++;                    
       if (i < 120) {
          strip.pixel(i).color('#000');     
          strip.show();    
          colorLoop();            
       }                   
    }, 18);
 }
 colorLoop(); 
}

function WinLight() {
  PixelRando=false;
  PixelRando2 = false;
  PixelForward = false;
  PixelForward2 = false;
  PixelForward3 = false;
  PixelRandoEnd = false;
  PixelForward4 = false;
  var i = -1;        
  function colorLoop () {           
    setTimeout(function () {    
       i++;                    
       if (i < 120) {
          strip.pixel(i).color('green');     
          strip.show();    
          colorLoop();            
       }                   
    }, 12);
 }
 colorLoop(); 
}

function MiddleRoundLight() {
    PixelRando=false;
    PixelRando2 = false;
    PixelForward = false;
    PixelRandoEnd = false;
    PixelForward2 = false;
    PixelForward3 = true;
    PixelForward4 = false;
    strip.show();
    strip.color('#000');
    for(var i = 0; i < 120; i += 3) {
      strip.pixel(i).color('blue');   
   }  
    strip.show();
  
  
  strip.color('rgb(128,0,128)');
  strip.show();
  
  
  }


function AudienceLifelineLight() {
//   PixelRando=false;
//   PixelRando2 = false;
  var active;
  if (PixelForward) {
    active = 1;
  } else if(PixelForward2) {
    active = 2;
  }else if(PixelForward3) {
    active = 3;
  }else if(PixelForward4) {
    active = 4;
  }
  PixelRando=false;
  PixelRando2 = false;
  PixelForward = true;
  PixelForward2 = false;
  PixelForward3 = false;
  PixelForward4 = false;
  PixelRandoEnd = false;
  strip.show();
  strip.color('#000');
  var secondaryColour = 'white';
  for(var i = 0; i < 120; i+=8) {
  strip.pixel(i).color(secondaryColour);
  strip.pixel(i+1).color('blue');
  strip.pixel(i+2).color(secondaryColour);
  }
  strip.show();



  setTimeout(function () {    
    PixelForward = false;
    for(var i = 0; i < 120; i += 2) {
      strip.pixel(i).color('purple');            
   }  
    strip.show();     
 }, 30000);

 setTimeout(function () {    
  if (active === 1) {
    SpeedRoundLight();
  } else if(active === 2) {
    DeepRoundLight();
  }else if(active === 3) {
    MiddleRoundLight();
  }else if(active === 4) {
    millionRoundLight();
  }
}, 30500);

}


function millionRoundLight() {
  PixelRando=false;
  PixelRando2 = false;
  PixelForward = false;
  PixelForward2 = false;
  PixelRandoEnd = false;
  PixelForward3 = false;
  PixelForward4 = true;
  strip.show();
  strip.color('#000');
  for(var i = 0; i < 120; i += 14) {
    strip.pixel(i).color('purple');  
    strip.pixel(i+7).color('blue');   
 }  
  strip.show();


strip.color('rgb(128,0,128)');
strip.show();
}

function millionWinLight() {
    PixelRando=false;
  PixelRando2 = false;
  PixelForward = true;
  PixelForward2 = false;
  PixelForward3 = false;
  PixelRandoEnd = false;
  PixelForward4 = false;
  strip.show();
  strip.color('#000');
  var secondaryColour = 'white';
  for(var i = 0; i < 120; i+=8) {
  strip.pixel(i).color(secondaryColour);
  strip.pixel(i+2).color(secondaryColour);
  }
  strip.show();

  setTimeout(function () {    
    strip.color('#000');
    var secondaryColour = 'blue';
    for(var i = 0; i < 120; i+=8) {
    strip.pixel(i).color(secondaryColour);
    strip.pixel(i+2).color(secondaryColour);
    }
    strip.show();   
 }, 2500);

 setTimeout(function () {    
  strip.color('#000');
  var secondaryColour = 'green';
  for(var i = 0; i < 120; i+=8) {
  strip.pixel(i).color(secondaryColour);
  strip.pixel(i+2).color(secondaryColour);
  }
  strip.show();   
}, 6000);

setTimeout(function () {    
  strip.color('#000');
  var secondaryColour = 'purple';
  for(var i = 0; i < 120; i+=8) {
  strip.pixel(i).color(secondaryColour);
  strip.pixel(i+2).color(secondaryColour);
  }
  strip.show();   
}, 5000);

setTimeout(function () {    
  strip.color('#000');
  var secondaryColour = 'purple';
  var secondaryColour2 = 'blue';
  for(var i = 0; i < 120; i+=8) {
  strip.pixel(i).color(secondaryColour);
  strip.pixel(i+2).color(secondaryColour);
  strip.pixel(i+4).color(secondaryColour2);
  strip.pixel(i+6).color(secondaryColour2);
  }
  strip.show();   
}, 7500);
setTimeout(function () {    
  strip.color('#000');
  var secondaryColour = 'purple';
  var secondaryColour2 = 'green';
  for(var i = 0; i < 120; i+=8) {
  strip.pixel(i).color(secondaryColour);
  strip.pixel(i+2).color(secondaryColour);
  strip.pixel(i+4).color(secondaryColour2);
  strip.pixel(i+6).color(secondaryColour2);
  }
  strip.show();   
}, 10000);

setTimeout(function () {     
PixelRando=false;
PixelRando2 = false;
PixelForward = false;
PixelForward2 = false;
PixelRandoEnd = false;
PixelForward3 = false;
PixelForward4 = false;
var i = -1;        
function colorLoop () {           
  setTimeout(function () {    
     i++;                    
     if (i < 120) {
        strip.pixel(i).color('green');     
        strip.show();    
        colorLoop();            
     }                   
  }, 12);
}
colorLoop();   
}, 17500);

  
}

function FiftyFiftyLight() {
  var active;
  if (PixelForward) {
    active = 1;
  } else if(PixelForward2) {
    active = 2;
  }else if(PixelForward3) {
    active = 3;
  }else if(PixelForward4) {
    active = 4;
  }
  PixelRando=false;
  PixelRando2 = false;
  PixelForward = true;
  PixelForward2 = false;
  PixelRandoEnd = false;
  PixelForward3 = false;
  PixelForward4 = false;
  strip.color('blue');
  strip.show();

  setTimeout(function () {    
    strip.color('purple');
    strip.show(); 
 }, 400);

 setTimeout(function () {    
  strip.color('blue');
  strip.show(); 
}, 1000);

 setTimeout(function () {    
  if (active === 1) {
    SpeedRoundLight();
  } else if(active === 2) {
    DeepRoundLight();
  }else if(active === 3) {
    MiddleRoundLight();
  }else if(active === 4) {
    millionRoundLight();
  }
}, 2000);
}

function PregameLight(){
  PixelRando=false;
  PixelRando2 = false;
  PixelForward = false;
  PixelRandoEnd = false;
  PixelForward2 = false;
  PixelForward3 = false;
  strip.color('purple');
  strip.show();
  
}

function IntroLight() {
  PixelRando = false;
  PixelRando2 = false;
  PixelForward = false;
  PixelRandoEnd = true;
  PixelForward2 = false;
  PixelForward3 = false;
  PixelForward4 = false;
  setTimeout(function () {    
    PixelRandoEnd = false;
    strip.color('purple');
    strip.show('#000');
  }, 23500);
}

function EndingLight() {
  PixelRando = false;
  PixelRando2 = false;
  PixelForward = false;
  PixelRandoEnd = true;
  PixelForward2 = false;
  PixelForward3 = false;
  PixelForward4 = false;
  setTimeout(function () {    
    PixelRandoEnd = false;
    strip.color('#000');
    strip.show();
  }, 31000);
}


function StopLight() {
  PixelRando = false;
  PixelRando2 = false;
  PixelForward = false;
  PixelRandoEnd = false;
  PixelForward2 = false;
  PixelForward3 = false;
  PixelForward4 = false;
  strip.color('#000');
  strip.show();
}






 strip.on("ready", function() {

  console.log("Strip ready, let's go");
  PregameLight();
  // var colors = ["blue", "blue", "blue", "blue", "blue", "blue", "white"];

  // var colors = ["red", "green", "blue", "yellow", "cyan", "magenta", "white"];
  // var current_colors = [0,1,2,3,4];
  // var current_pos = [0,1,2,3,4];
  // var blinker = setInterval(function() {

  //     strip.color("#000"); // blanks it out

  //     for (var i=0; i< current_pos.length; i++) {
  //         if (++current_pos[i] >= strip.length) {
  //             current_pos[i] = 0;
  //             if (++current_colors[i] >= colors.length) current_colors[i] = 0;
  //         }
  //         strip.pixel(current_pos[i]).color(colors[current_colors[i]]);
  //     }

  //     strip.show();
  // }, 1000/fps);

  strip.color("#000");
  strip.show();
 });

});