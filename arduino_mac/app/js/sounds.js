

// //THIS IS NOT REQUIRED//
// //SPEED ROUND BUTTONS
// var speedstart = document.getElementById('speedstart');
// var speedround = document.getElementById('speedround');
// var speedwin = document.getElementById('speedwin');
// var speedlose = document.getElementById('speedlose');
// var speedfinalwin = document.getElementById('speedfinalwin');
// //SPEED ROUND EVENT LISTENERS
// speedstart.addEventListener("click", SpeedStart, false);
// speedround.addEventListener("click", SpeedRound, false);
// speedwin.addEventListener("click", SpeedWin, false);
// speedlose.addEventListener("click", SpeedLose, false);
// speedfinalwin.addEventListener("click", SpeedFinalWin, false);

// //MIDDLE ROUND BUTTONS
// var middlestart = document.getElementById('middlestart');
// var middleround = document.getElementById('middleround');
// var middlequery = document.getElementById('middlequery');
// var middlewin = document.getElementById('middlewin');
// var middlelose = document.getElementById('middlelose');
// var middlefinalwin = document.getElementById('middlefinalwin');
// //MIDDLE ROUND EVENT LISTENERS
// middlestart.addEventListener("click", MiddleStart, false);
// middleround.addEventListener("click", MiddleRound, false);
// middlequery.addEventListener("click", MiddleQuery, false);
// middlewin.addEventListener("click", MiddleWin, false);
// middlelose.addEventListener("click", MiddleLose, false);
// middlefinalwin.addEventListener("click", MiddleFinalWin, false);

// //DEEP ROUND BUTTONS
// var deepstart = document.getElementById('deepstart');
// var deepround = document.getElementById('deepround');
// var deepquery = document.getElementById('deepquery');
// var deepwin = document.getElementById('deepwin');
// var deeplose = document.getElementById('deeplose');
// //DEEP ROUND EVENT LISTENERS
// deepstart.addEventListener("click", deepStart, false);
// deepround.addEventListener("click", deepRound, false);
// deepquery.addEventListener("click", deepQuery, false);
// deepwin.addEventListener("click", deepWin, false);
// deeplose.addEventListener("click", deepLose, false);


// //Million ROUND BUTTONS
// var millionstart = document.getElementById('millionstart');
// var millionround = document.getElementById('millionround');
// var millionquery = document.getElementById('millionquery');
// var millionwin = document.getElementById('millionwin');
// var millionlose = document.getElementById('millionlose');
// //Million ROUND EVENT LISTENERS
// millionstart.addEventListener("click", millionStart, false);
// millionround.addEventListener("click", millionRound, false);
// millionquery.addEventListener("click", millionQuery, false);
// millionwin.addEventListener("click", millionWin, false);
// millionlose.addEventListener("click", millionLose, false);


// //OTHER BUTTONS
// var endingcredit = document.getElementById('endingcredit');
// var audience = document.getElementById('audience');
// var fiftyfifty = document.getElementById('fiftyfifty');

// //OTHER EVENT LISTENERS
// endingcredit.addEventListener("click", EndingCredit, false);
// audience.addEventListener("click", AudienceLifeline, false);
// fiftyfifty.addEventListener("click", FiftyFiftyLifeline, false);


// EVERYTHING DOWN FROM HERE IS REQUIRED
// //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// SOUND FUNCTIONS
// SPEED ROUND

var primary = document.getElementById("primary");
var secondary = document.getElementById("secondary");
var isPlaying = false; 

function SpeedStart() {
  secondary.src='sounds/speed/question/start.mp3';
  secondary.volume = 1;
  secondary.load(); 
  secondary.play();

  setTimeout(function(){SpeedRound(); }, 5000);
}

function SpeedRound() {
  primary.src='sounds/speed/question/main.mp3';
  primary.load(); 
  primary.play();
}

function SpeedWin() {
  secondary.src='sounds/speed/win/main.mp3';
  secondary.load(); 
  primary.volume = 0.2;
  secondary.play();
  setTimeout(function(){ primary.volume = 1; }, 2000);
}

function SpeedLose() {
  primary.src='sounds/speed/lose/main.mp3';
  primary.load(); 
  primary.play();
  setTimeout(function(){ EndingCredit(); }, 6000);
}

function SpeedFinalWin() {
  primary.src='sounds/speed/win/final.mp3';
  primary.load(); 
  primary.play();
}


//MIDDLE ROUND
function MiddleStart() {
  secondary.src='sounds/middle/question/start.mp3';
  secondary.volume = 1;
  secondary.load(); 
  secondary.play();
  setTimeout(function(){MiddleRound(); }, 2000);
}
function MiddleRound() {
  primary.src='sounds/middle/question/main.mp3';
  primary.load(); 
  primary.play();
}
function MiddleQuery() {
  secondary.src='sounds/middle/question/answer.mp3';
  secondary.load(); 
  secondary.play();
  setTimeout(function(){ primary.pause(); }, 300);
}
function MiddleWin() {
  primary.src='sounds/middle/win/main.mp3';
  primary.load(); 
  primary.play();
  setTimeout(function(){ secondary.volume = 0; }, 800);
}
function MiddleLose() {
  primary.src='sounds/middle/lose/main.mp3';
  primary.load(); 
  primary.play();
  setTimeout(function(){ secondary.volume = 0; }, 800);
  setTimeout(function(){ EndingCredit(); }, 6000);
}
function MiddleFinalWin() {
  primary.src='sounds/middle/win/final.mp3';
  primary.load(); 
  primary.play();
  setTimeout(function(){ secondary.volume = 0; }, 800);
}

//DEEP ROUND
function deepStart() {
  secondary.src='sounds/deep/question/start.mp3';
  secondary.volume = 1;
  secondary.load(); 
  secondary.play();
  setTimeout(function(){deepRound(); }, 2000);
}
function deepRound() {
  primary.src='sounds/deep/question/main.mp3';
  primary.load(); 
  primary.play();
}
function deepQuery() {
  secondary.src='sounds/deep/question/answer.mp3';
  secondary.load(); 
  secondary.play();
  setTimeout(function(){ primary.pause(); }, 300);
}
function deepWin() {
  primary.src='sounds/deep/win/main.mp3';
  primary.load(); 
  primary.play();
  setTimeout(function(){ secondary.volume = 0; }, 800);
}
function deepLose() {
  primary.src='sounds/deep/lose/main.mp3';
  primary.load(); 
  primary.play();
  setTimeout(function(){ secondary.volume = 0; }, 800);
  setTimeout(function(){ EndingCredit(); }, 6000);
}

//Million ROUND
function millionStart() {
  secondary.src='sounds/million/question/start.mp3';
  secondary.volume = 1;
  secondary.load(); 
  secondary.play();
  setTimeout(function(){millionRound(); }, 2000);
}
function millionRound() {
  primary.src='sounds/million/question/main.mp3';
  primary.load(); 
  primary.play();
}
function millionQuery() {
  secondary.src='sounds/million/question/answer.mp3';
  secondary.load(); 
  secondary.play();
  setTimeout(function(){ primary.pause(); }, 300);
}
function millionWin() {
  primary.src='sounds/million/win/main.mp3';
  primary.load(); 
  primary.play();
  setTimeout(function(){ secondary.volume = 0; }, 800);
}
function millionLose() {
  primary.src='sounds/million/lose/main.mp3';
  primary.load(); 
  primary.play();
  setTimeout(function(){ secondary.volume = 0; }, 800);
  setTimeout(function(){ EndingCredit(); }, 6000);
}



// //OTHER SOUNDS
function EndingCredit() {
  primary.src='sounds/other/ending.mp3';
  primary.load(); 
  primary.play();
}
function AudienceLifeline() {
  secondary.src='sounds/other/audience-edit.mp3';
  secondary.load(); 
  secondary.play();
  primary.volume = 0.1;
  setTimeout(function(){ primary.volume = 1; }, 9000);
}
function FiftyFiftyLifeline() {
  secondary.src='sounds/other/fiftyfifty-edit.mp3';
  secondary.load(); 
  secondary.play();
  primary.volume = 0.1;
  setTimeout(function(){ primary.volume = 1; }, 1000);
}


function stopSound() {
  primary.pause();
  secondary.pause();
}



//ESSENTIAL SOUND AUDIO 



