var Readable = require('stream').Readable  
var util = require('util')  
var five = require('johnny-five')
var mysql = require('mysql');
var mysql = require('mysql-wrapper');

util.inherits(MyStream, Readable)  
function MyStream(opt) {  
  Readable.call(this, opt)
}
MyStream.prototype._read = function() {};  
// hook in our stream
process.__defineGetter__('stdin', function() {  
  if (process.__stdin) return process.__stdin
  process.__stdin = new MyStream()
  return process.__stdin
})

var conn = mysql({
  host: "localhost",
  user: "root",
  password: "root",
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
  port: '8889',
  database: 'proxima'
});

var barcode = document.getElementById('barcode');

var pageNumber = 0;

var game = document.querySelector("#mainGamePlay");

var page1 = `<div id="p1">
	<img class="proximaLogoLarge" src="images/proximalogolarge.png">
</div>`;

/*Bar Code Page*/

var page2 = `<div id="p2">
	<img class="proximaLogoSmall" src="images/proxima.png">
	<p class="scanBarCode">SCAN YOUR BARCODE TO PLAY</p>
	<img class="barCode" src="images/barcode.png">
</div>
<input type="text" id="barcode" name="barcode" autofocus>`;

/*Instructional Pages*/

var page3 = `<div id="p3">
	<img class="proximaLogoSmall" src="images/proxima.png">
	<p class="instructions">QUESTIONS WILL APPEAR IN THE TOP SECTION 
AND 4 POSSIBLE ANSWERS WILL APPEAR WITH EACH QUESTION.
CHOOSE THE CORRECT ANSWER USING THE CORRESPONDING 
BUTTONS ON THE PODIUM</p>
	<img class="questionExample" src="images/questionexample.png">
	<p class="pressButton">PRESS ANY BUTTON TO CONTINUE</p>
</div>`;

var page4 = `<div id="p4">
	<img class="proximaLogoSmall" src="images/proxima.png">
	<img class="instructionsScore" src="images/instructionsScore.png">
	<p class="pressButton">PRESS ANY BUTTON TO CONTINUE</p>
</div>`;

var page5 = `<div id="p5">
	<img class="proximaLogoSmall" src="images/proxima.png">
	<img class="instructionsScore" src="images/timer.png">
	<p class="pressButton">PRESS ANY BUTTON TO CONTINUE</p>
</div>`;

var page6 = `<div id="p6">
	<img class="proximaLogoSmall" src="images/proxima.png">

	<p class="lifeLine">YOU HAVE TWO LIFELINES THAT YOU CAN USE ONCE AT ANY TIME.
USE THE CORRESPONDING BUTTONS ON THE PODIUM TO USE THEM.</p>

<br><img class="orange" src="images/audienceorange.png">

<br><img class="orange" src="images/fiftyfiftyorange.png">


	<p class="pressButton">PRESS ANY BUTTON TO CONTINUE</p>
</div>`;

var page7 = `<div id="p7">
	<img class="proximaLogoSmall" src="images/proxima.png">

	<p class="pressButtonStart">PRESS ANY BUTTON 
<br>TO START</p>
</div>`;


/*Intro Video*/


var pageIntroVideo = `<div id="pIntroVideo">
	
 <video autoplay id="video">
  <source src="video/intro.mp4" type="video/mp4">
Your browser does not support the video tag.
</video> 


</div>`;


/*Main Game Play Page*/

var page8 = `<div id="p8">

	<div id="content">

		<p class="timerText"><span id="countDown">10</span></p>

	<!--ASK AUDIENCE-->
	<img class="audience" src="images/audience.svg">

	<!--50/50-->
	<img class="fiftyfifty" src="images/fiftyfifty.svg">

	<!--LOGO-->
	<img class="mainlogo" src="images/logosmall.svg">

	<!--LEVEL-->
	<div id="level">
	<div class="levelNumberUp">10</div> 
	<div class="levelNumber">9</div> 
	<div class="levelNumber">8</div> 
	<div class="levelNumberUp">7</div> 
	<div class="levelNumber">6</div>
	<div class="levelNumber">5</div> 
	<div class="levelNumberUp">4</div> 
	<div class="levelNumber">3</div> 
	<div class="levelNumber">2</div> 
	<div class="levelNumberUp">1</div> </div>

	<!--POINTS-->
	<div id="points">
	<div class="cats pointsNumberUp">1 MILLION PTS</div>
	<div class="cats pointsNumber">500,000 pts</div>
	<div class="cats pointsNumber">250,000 pts</div>
	<div class="cats pointsNumberUp">125,000 pts</div>
	<div class="cats pointsNumber">32,000 pts</div>
	<div class="cats pointsNumber">8000 pts</div>
	<div class="cats pointsNumberUp">1000 pts</div>
	<div class="cats pointsNumber">500 pts</div>
	<div class="cats pointsNumber">300 pts</div>
	<div class="cats pointsNumberUp">100 pts</div></div>
 
	</div>


	<!--QUESTIONS-->
	<div id=questions>
		
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 1948.8 397.5" style="enable-background:new 0 0 1948.8 397.5;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#FFFFFF;}
	.st1{fill:url(#Path_2_1_);}
	.st2{fill:url(#Path_6_1_);}
	.st3{fill:url(#Path_8_1_);}
	.st4{fill:url(#Path_233_1_);}
	.st5{fill:url(#Path_234_1_);}
	.st6{fill:none;}
	.st7{font-family:'ProximaNova-Regular';}
	.st8{font-size:51px;}
	.st9{font-size:36px;}
</style>
<g id="Group_138" transform="translate(3099 -4734)">
	<path id="Path_1" class="st0" d="M-3098.6,4822.1c0,0,307.1-0.5,316,0s35.8,32,44.6,42.8s27.9,30.5,51.7,31.1s1097.1-0.2,1121.7,0
		s48.2-25,57.8-37.7c9.6-12.7,25.3-38.5,45.1-38.4s310.4,0,310.4,0v-7.4c0,0-298.6,0.5-310.4,0s-26.6-14.6-34.7-24.7
		s-33.6-49.9-68.2-51.9s-1105-1.7-1121.7-1.7s-43.7,19.8-55.5,34.9c-11.9,15.1-31.9,40.6-42.3,42s-314.4,0-314.4,0v11H-3098.6z"/>
	
		<linearGradient id="Path_2_1_" gradientUnits="userSpaceOnUse" x1="-4864.083" y1="29.8907" x2="-4864.083" y2="30.8914" gradientTransform="matrix(1300.7969 0 0 150.2949 6325059 247.7727)">
		<stop  offset="0" style="stop-color:#3E3E3E;stop-opacity:0.922"/>
		<stop  offset="1" style="stop-color:#09004B"/>
	</linearGradient>
	<path id="Path_2" class="st1" d="M-2775.7,4815.1c7.6-4.3,28.9-25.8,40.5-42.7c11.6-16.8,38.6-32.2,48-32.2s1113.7,0.5,1113.7,0.5
		s13.4-1.2,21.8,2.4s31.1,17.1,50.8,47.8c7.3,10.6,26,23.8,26,23.8s-19.2,16.8-27.1,27.1c-7.9,10.3-13.1,21.4-25.9,30.3
		s-13.4,18.4-50.4,18.4h-1095.5c0,0-4.4,0.2-8.3,0c-4-0.2-27.9-4-40-17.5S-2764.3,4822.7-2775.7,4815.1z"/>
	<path id="Path_3" class="st0" d="M-3098.6,4977.3v-6.8h347.4c0,0,32.2-40.4,43.9-40.6c11.7-0.3,160.2,0,160.2,0h255.8
		c0,0,88.6,0.4,96.1,0s17.9,8.8,30,21.8s16.5,18.6,16.5,18.6h23v8.8h-23c0,0-6.7,5-9,8.9c-2.2,3.9-22.8,31-35.7,31.2
		s-247.7,0-247.7,0h-260.4c0,0-9.2,0.3-16.4-5.7c-7.1-6-33.3-35.7-33.3-35.7h-9.4L-3098.6,4977.3z"/>
	<path id="Path_5" class="st0" d="M-3098.6,5089.4v-6.8h347.4c0,0,32.2-40.4,43.9-40.6c11.7-0.3,160.2,0,160.2,0h255.8
		c0,0,88.6,0.4,96.1,0s17.9,8.8,30,21.8s16.5,18.6,16.5,18.6h23v8.8h-23c0,0-6.7,5-9,8.9c-2.2,3.9-22.8,31-35.7,31.2
		s-247.7,0-247.7,0h-260.4c0,0-9.2,0.3-16.4-5.7c-7.1-6-33.3-35.7-33.3-35.7h-9.4L-3098.6,5089.4z"/>
	
		<g id="tested">
		<linearGradient id="Path_6_1_" gradientUnits="userSpaceOnUse" x1="-4868.1265" y1="57.4166" x2="-4868.1265" y2="58.4161" gradientTransform="matrix(594.101 0 0 78.2435 2889709.25 553.8026)">
		<stop  offset="0" style="stop-color:#3E3E3E;stop-opacity:0.922"/>
		<stop  offset="1" style="stop-color:#09004B"/>
	</linearGradient>
	<path id="Path_6" class="st2" d="M-2746.6,5084.2c0,0,28.9-33.5,34-35.5s3.4-2.3,3.4-2.3h511.6c0,0,7.7-0.2,13,4.5
		c5.2,4.7,32,32.7,32,32.7v4.3c0,0-23.9,26.1-29.1,30.7c-5.2,4.5-7,5.8-15.1,5.8h-329.5l-178.2,0.2c0,0-11.2-3.9-17.1-10.3
		s-25.1-26.6-25.1-26.6L-2746.6,5084.2z"/>
	<path id="Path_7" class="st0" d="M-1151.3,4977.2v-6.9h-348.6c0,0-32.3-40.5-44-40.8s-160.7,0-160.7,0h-256.6c0,0-88.9,0.4-96.4,0
		s-18,8.9-30.1,21.9s-16.5,18.6-16.5,18.6h-23v8.8h23c0,0,6.8,5,9,8.9s22.9,31.1,35.8,31.3c12.9,0.2,248.5,0,248.5,0h261.2
		c0,0,9.2,0.3,16.4-5.7s33.4-35.8,33.4-35.8h9.4L-1151.3,4977.2z"/>
		</g>
	
		<linearGradient id="Path_8_1_" gradientUnits="userSpaceOnUse" x1="-4868.1025" y1="57.2311" x2="-4868.1025" y2="58.2311" gradientTransform="matrix(596.0139 0 0 78.4985 2899654.5 441.5422)">
		<stop  offset="0" style="stop-color:#3E3E3E;stop-opacity:0.922"/>
		<stop  offset="1" style="stop-color:#09004B"/>
	</linearGradient>
	<path id="Path_8" class="st3" d="M-1504.4,4972c0,0-29-33.6-34.1-35.6s-3.4-2.3-3.4-2.3h-513.3c0,0-7.8-0.2-13,4.5
		s-32.2,32.9-32.2,32.9v4.3c0,0,24,26.2,29.2,30.8c5.2,4.6,7,5.8,15.1,5.8h330.5l178.8,0.2c0,0,11.2-3.9,17.2-10.3
		s25.2-26.7,25.2-26.7L-1504.4,4972z"/>
	<path id="Path_9" class="st0" d="M-1151.3,5089.5v-6.9h-348.6c0,0-32.3-40.5-44-40.8s-160.7,0-160.7,0h-256.6c0,0-88.9,0.4-96.4,0
		s-18,8.9-30.1,21.9s-16.5,18.6-16.5,18.6h-23v8.8h23c0,0,6.8,5,9,8.9s22.9,31.1,35.8,31.3c12.9,0.2,248.5,0,248.5,0h261.2
		c0,0,9.2,0.3,16.4-5.7c7.2-6,33.4-35.8,33.4-35.8h9.4L-1151.3,5089.5z"/>
	
		<linearGradient id="Path_233_1_" gradientUnits="userSpaceOnUse" x1="-4868.1025" y1="57.2311" x2="-4868.1025" y2="58.2311" gradientTransform="matrix(596.0139 0 0 78.4985 2899654.5 555.5422)">
		<stop  offset="0" style="stop-color:#3E3E3E;stop-opacity:0.922"/>
		<stop  offset="1" style="stop-color:#09004B"/>
	</linearGradient>
	<path id="Path_233" class="st4" d="M-1504.4,5086c0,0-29-33.6-34.1-35.6s-3.4-2.3-3.4-2.3h-513.3c0,0-7.8-0.2-13,4.5
		s-32.2,32.9-32.2,32.9v4.3c0,0,24,26.2,29.2,30.8c5.2,4.6,7,5.8,15.1,5.8h330.5l178.8,0.2c0,0,11.2-3.9,17.2-10.3
		s25.2-26.7,25.2-26.7L-1504.4,5086z"/>
	
		<linearGradient id="Path_234_1_" gradientUnits="userSpaceOnUse" x1="-4868.2319" y1="57.2311" x2="-4868.2319" y2="58.2311" gradientTransform="matrix(585.795 0 0 78.4985 2849336.25 443.5422)">
		<stop  offset="0" style="stop-color:#3E3E3E;stop-opacity:0.922"/>
		<stop  offset="1" style="stop-color:#09004B"/>
	</linearGradient>
	<path id="Path_234" class="st5" d="M-2156.6,4974c0,0-28.5-33.6-33.6-35.6s-3.4-2.3-3.4-2.3H-2698c0,0-7.6-0.2-12.8,4.5
		s-31.6,32.9-31.6,32.9v4.3c0,0,23.6,26.2,28.7,30.8c5.1,4.6,6.9,5.8,14.9,5.8h324.9l175.7,0.2c0,0,11-3.9,16.9-10.3
		s24.8-26.7,24.8-26.7L-2156.6,4974L-2156.6,4974z"/>
</g>
<rect x="391" y="32.4" class="st6" width="1188.2" height="110"/>
<text id="text1" width="200" transform="matrix(1 0 0 1 391.0004 66.4105)"><tspan x="0" y="0" class="st0 st7 st8 cats">This is question 1</tspan><tspan x="0" y="61.2" class="st0 st7 st8">This is question 1 field 2</tspan></text>
<rect x="398" y="226" class="st6" width="792" height="200"/>
			<foreignobject class="node" transform="matrix(1 0 0 1 398 205)" x="46" y="22" width="400">    
                    <div id="text2" style="font-size: 25px; color: white">I'm answer one</div>                
            </foreignobject>
<rect x="398" y="337" class="st6" width="792" height="200"/>
			<foreignobject class="node" transform="matrix(1 0 0 1 398 205)" x="56" y="130" width="400">    
                    <div id="text3" style="font-size: 25px; color: white">I'm answer two</div>                
            </foreignobject>
<rect x="1043.8" y="226" class="st6" width="792" height="200"/>
			<foreignobject class="node" transform="matrix(1 0 0 1 398 205)" x="706" y="22" width="400">    
                    <div id="text4" style="font-size: 25px; color: white">I'm answer three</div>                
            </foreignobject>
<rect x="1043.8" y="339" class="st6" width="792" height="200"/>
			<foreignobject class="node" transform="matrix(1 0 0 1 398 205)" x="706" y="130" width="400">    
                    <div id="text5" style="font-size: 25px; color: white">I'm answer four</div>                
            </foreignobject>
</svg>

</div>
</div>`;

/*Winner*/

var page9 = `<div id="p9">
	<img class="triangle" src="images/triangle.png"><h1 class="winner">YOU'RE A</h1><img class="triangle" src="images/triangle.png">
	<img class="winnerDeveloper" src="images/developer.png">
	<p class="congratulations">Congratulations! You have won a <br> 
$20 gift card to the LCBO.</p>
</div>`;

/*Dispensing Prize*/

var page10 = `<div id="p10">
	<img class="triangleGC" src="images/triangle.png"><img clas="GC" src="images/giftcard.png"><img class="triangleGC" src="images/triangle.png">
	<h1 class="prize">DISPENSING <br>YOUR PRIZE</h1>
	<p class="pleaseWait">PLEASE WAIT</p>

</div>`;

/*Loser*/

var page11 = `<div id="p11">
	<img class="triangle" src="images/triangle.png"><h1 class="winner">YOU LOSE</h1><img class="triangle" src="images/triangle.png">
	<p class="congratulations">Unfortunately you cannot call 
<br>yourself a developer today.
<br>But better luck next time!</p>
</div>`;


game.innerHTML = page1;



new five.Boards(["A", "B"]).on("ready", function(){
	var b1 = this[0];
	var b2 = this[1];

var arr = ['loadpage2', 'loadpage3', 'loadpage4', 'loadpage5', 'loadpage6', 'loadpage7', 'loadpage8'];

var functions = {

loadpage2: function() {
	game.innerHTML = page2;
},

loadpage3: function() {
  	game.innerHTML = page3;
  	SpeedStart();
  	// mainGamePlay.removeEventListener("click", loadpage3, false);
  	// mainGamePlay.addEventListener("click", loadpage4, false);
},

loadpage4: function() {
  	game.innerHTML = page4;
  	// mainGamePlay.removeEventListener("click", loadpage4, false);
  	// mainGamePlay.addEventListener("click", loadpage5, false);
},

loadpage5: function() {
  	game.innerHTML = page5;
  	// mainGamePlay.removeEventListener("click", loadpage5, false);
  	// mainGamePlay.addEventListener("click", loadpage6, false);
},

loadpage6: function() {
  	game.innerHTML = page6;
  	// mainGamePlay.removeEventListener("click", loadpage6, false);
  	// mainGamePlay.addEventListener("click", loadpage7, false);
},

loadpage7: function() {
  	game.innerHTML = page7;
  	// mainGamePlay.removeEventListener("click", loadpage7, false);
  	// mainGamePlay.addEventListener("click", loadpageIntroVideo, false);
},

loadpageIntroVideo: function() {
  	game.innerHTML = pageIntroVideo;
  	// mainGamePlay.removeEventListener("click", loadpageIntroVideo, false);
  	// mainGamePlay.addEventListener("click", loadpage8, false);
},

loadpage8: function() {
	stopSound();
	SpeedStart();
  	game.innerHTML = page8;
  	var winner = [];
	var cat1 = document.querySelector('.st5');
	var cat2 = document.querySelector('.st3');
	var cat3 = document.querySelector('.st2');
	var cat4 = document.querySelector('.st4');
	winner.push(cat1, cat2, cat3, cat4);

	var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, chD, correct = 0;
	var floatingBox = 9;
	var cats = document.querySelectorAll(".cats");
	var servoSwitch = 0;
	var servo = [];
	servo.push(stepper, stepper2);
	console.log(servo);

	function _(x){
		return document.getElementById(x);
	}

	function renderQuestion(){

			var timeLeft = 11;
		    var gameTimer = setInterval(function(){
		    timeLeft--;
		    document.querySelector("#countDown").textContent = timeLeft;
		    if(timeLeft <= 0)
		        clearInterval(gameTimer);
		    },1000);

		
		for(var i = 0; i < cats.length; i++) {
			cats[i].style.backgroundColor = "transparent";
		}
		cats[floatingBox].style.backgroundColor = "orange";
		cats[floatingBox].style.color = "white";
		test = _("test");
		var text1 = document.querySelector("#text1");

		for(var i = 0; i < winner.length; i++) {
			winner[i].style.fill = "url(#Path_8_1_)";
    	}
		if(pos >= questions.length){
			test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
			_("test_status").innerHTML = "WINNER!";
			pos = 0;
			correct = 0;
			floatingBox = 0;
			// stepper.cw().step(5000, function() {
   //  			console.log("done");
   // 			});
   			// stepper2.cw().step(5000, function() {
    		// 	console.log("done");
   			// });
			return false;
		}
	
		_("test_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;
		var cat = Math.floor(Math.random()*3);
		question = questions[pos][cat][0];
		chA = questions[pos][cat][1];
		chB = questions[pos][cat][2];
		chC = questions[pos][cat][3];
		chD = questions[pos][cat][4];
		text1.innerHTML = question;
		text2.innerHTML = chA;
		text4.innerHTML = chB;
		text3.innerHTML = chC;
		text5.innerHTML = chD;
	// document.querySelector("#question").innerHTML = question;
	// winner[0].innerHTML = chA;
	// winner[1].innerHTML = chB;
	// winner[2].innerHTML = chC;
	// winner[3].innerHTML = chD;
		test.innerHTML = "<h3>"+question+"</h3>";
		test.innerHTML += "<input id='one0' type='radio' name='choices' value='A'> "+chA+"<br>";
		test.innerHTML += "<input id='one1' type='radio' name='choices' value='B'> "+chB+"<br>";
		test.innerHTML += "<input id='one2' type='radio' name='choices' value='C'> "+chC+"<br>";
		test.innerHTML += "<input id='one3' type='radio' name='choices' value='D'> "+chD+"<br><br>";
	// test.innerHTML += "<button id='tested'>Submit Answer</button>";


		setTimeout(function() {
			console.log();
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
				pageNumber = 0;
				correct = 0;
				choice = null;

				_("showRight").innerHTML = "no answer";
				game.innerHTML = page11;
				setTimeout(functions[arr[0]], 10000);
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
				servo[servoSwitch].cw().step(5000, function() {
    				console.log("done");
   				});
				correct++;
				// console.log(winner);
				for(var i = 0; i < winner.length; i++) {
    			winner[i].style.fill = "url(#Path_8_1_)";
    			}	
    			if(dog) {	
					winner[dog].style.fill = "green";
					_("showRight").innerHTML = "right";
				}
				floatingBox--;
				servoSwitch++;
				SpeedWin();
				pos++;

				/*IF STATEMENT FOR ALL 10 RIGHT*/
				// game.innerHTML = page9;

			}else if(choice != questions[pos][cat][5]){
				console.log("ugh!");
				// _("showRight").innerHTML = "wrong";
				// console.log(winner);
				for(var i = 0; i < winner.length; i++) {
					winner[i].style.fill = "url(#Path_8_1_)";
    			}	
				winner[dog].style.fill = "red";
				console.log(dog);
					// _("showRight").innerHTML = "WRONG";
				pos = 0;
				correct = 0;
				pageNumber = 0;
				floatingBox = 0;
				game.innerHTML = page11;
				setTimeout(functions[arr[0]], 10000);
				_("showRight").innerHTML = "";
				SpeedLose();

				return false;
			}

			setTimeout(renderQuestion, 5000);
		}, 11000);

	}
	renderQuestion();

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

  	buttonred.on("up", function() {
    // buttonInfo.innerHTML += "Red button pushed";
    //console.log('red');
    // stepper.cw().step(5000, function() {
    // console.log("done");
    // });
    	for(var i = 0; i < winner.length; i++) {
    		winner[i].style.fill = "url(#Path_8_1_)";
    	}
    	winner[0].style.fill = "yellow";
    	var one = document.querySelector("#one0");
    	one.checked = true;
  	});

  	buttonblue.on("up", function() {
    // buttonInfo.innerHTML += "Blue button pushed";
    // //console.log('blue');
    	for(var i = 0; i < winner.length; i++) {
    		winner[i].style.fill = "url(#Path_8_1_)";
    	}
    	winner[1].style.fill = "yellow";
    	var two = document.querySelector("#one1");
    	two.checked = true;
  	});

  	buttonyellow.on("up", function() {
    // buttonInfo.innerHTML += "Yellow button pushed";
    // //console.log('yellow');
    	for(var i = 0; i < winner.length; i++) {
    		winner[i].style.fill = "url(#Path_8_1_)";
    	}
    	winner[2].style.fill = "yellow";
    	var three = document.querySelector("#one2");
    	three.checked = true;
  	});

  	buttongreen.on("up", function() {
    // buttonInfo.innerHTML += "Green button pushed";
    // //console.log('green');
    	for(var i = 0; i < winner.length; i++) {
    		winner[i].style.fill = "url(#Path_8_1_)";
    	}
    	winner[3].style.fill = "yellow";
    	var four = document.querySelector("#one3");
    	four.checked = true;
  	});
	}
}

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


  buttonblack1.on("up", function() {
  	if(pageNumber <= 5)
  	functions[arr[pageNumber++]]();
  });

  buttonblack2.on("up", function() {
  	console.log("black2");
  });

});
