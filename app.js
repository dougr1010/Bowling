var app = angular.module('bowlingApp', []);

app.controller('BowlingController', ['$scope', function($scope) {

$scope.data = 'Hello Epsilon';


      //key:[ball1, ball2, ball3, score, mark]
var line = [['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','',''],
			['','','','',''],['','','','',''],['','','','',''],['','','','',''],['','','','','']];
var i = 0;
var frame = 0;
var ball = 0;
var pins = 0;
var valid = false;
var firstBall = 0;
var gameOver = false;

$scope.line = line;
$scope.gameOver = gameOver;

//initialize to beginning of the game
frame = 0;
ball = 0;
$scope.prompt = 'Welcome! Throw your first ball.'

//advance game on when the 'Score it' button is clicked
$scope.updateScore = function(){
	console.log('saw ',$scope.pins,' pins entered');
	console.log('frame ', frame, ' ball ',ball);
		pins = $scope.pins;
		valid = validateInput();
		console.log(valid);
		if (valid) {
			console.log('GO: frame ', frame, ' ball ',ball);
			line[frame][ball] = pins;
			$scope.pins = '';
			evaluateMarks();
			scoreIt();
			frameControl(pins);
			promptControl();
		}
}

function fakevalidateInput() {
	return false;
}

/////////////////////////////////////////////////////////////////////////
// validate a reasonable number of pins given the position of the game //
/////////////////////////////////////////////////////////////////////////
function validateInput() {
	var valid = false;
	var maxPins = 0;
	if (!((pins==0)||(pins=="1")||(pins==2)||(pins==3)||(pins==4)||(pins==5)||(pins==6)||(pins==7)||(pins==8)||(pins==9)||(pins==10))) {
		alert('The number of pins must be between 0 and 10.');
		$scope.pins = '';
	} else if ((ball == 1) && (frame != 9) && (pins > (10 - parseInt(line[frame][0])))) {
		maxPins = (10 - parseInt(line[frame][0]));
		alert('Number of pins must be in the range of 0 to ' + maxPins + '.');
		$scope.pins = '';

	} else if ((ball == 1) && (frame == 9) && (parseInt(line[frame][0]) != 10) && (pins > (10 - parseInt(line[frame][0])))) {
		maxPins = (10 - parseInt(line[frame][0]));
		alert('Number of pins must be in the range of 0 to ' + maxPins + '.');
		$scope.pins = '';


	} else {
		valid = true;
		console.log('valid input');
	}
	return valid;
}

////////////////////////////////////////////////////////////
// Advance through the game based on the user's pin count //
////////////////////////////////////////////////////////////
function frameControl(pins) {
	if ((ball == 0) && (pins < 10)) {        	// ball one & not a strike
		ball = 1;							    //   -> move to second ball
	} else if ((ball == 0) && (pins == 10) && (frame != 9)) {  	// ball one is a strike & not frame 10
		frame++;                                               	//   -> move to next frame, first ball 
	} else if ((ball == 1) && (frame != 9)) {       // ball 2 & not frame 10
		frame++;                                    //   -> move to next frame
		ball = 0;                                   //   -> first ball

	} else if ((ball == 0) && (frame == 9)) {       // 10th frame, first ball
		ball = 1;									//   -> move to second ball		
	} else if ((ball == 1) && (parseInt(line[9][0]) + parseInt(pins)) >= 10) { // 10th frame, strike or spare
		ball = 2;											   					//   -> move to third ball
	//} else if ((ball == 1) && (frame == 9) && (pins == 10)) {  	// 10th frame, ball 2 strike
	//	ball = 2;											   	//   -> move to third ball
	} else if ((ball == 1) && (parseInt(line[9][0]) + parseInt(pins)) < 10) {  	// 10th frame, open
	} else if (ball == 2) {
	} else {
		alert('something wrong with frame control');
	}
}

//////////////////////////////////////////////////////////////////////
// Prompt the user with the frame number and which ball they are on //
//////////////////////////////////////////////////////////////////////
function promptControl() {
	var ballName = "";
	if (ball == 0) {
		ballName = "first";
	} else if (ball == 1) {
		ballName = "second";
	} else {
		ballName = "final";
	}

	$scope.prompt = 'Frame ' + (frame + 1) + ', throw your ' + ballName + ' ball.'
	if (gameOver) {$scope.prompt = "Game Over.  Thanks for Playing."};
}

////////////////////////////////////////////////////////////////////////////////////
// Look at previous frames and update score now that more balls have been thrown. //
// If all data is available, write the score and clear the mark.                  //
// Note: frame in code runs 0-9, frame re: User runs 1-10.                        //
////////////////////////////////////////////////////////////////////////////////////
function evaluateMarks() {
	//frame 2: after ball 1, check and score spare in frame 1 (don't total from previous frame, there isn't one)
	if ((frame == 1) && (ball == 0) && (line[0][4] == 'spare')) {
		console.log('scoring frame ',frame-1);
		line[0][3] = parseInt(line[0][0]) + parseInt(line[0][1]) + parseInt(pins);
		line[0][4] = '/';
	//frame 2:  after ball 2, check and score score strike in frame 1 (don't total from previous frame, there isn't one)	
	} else if ((frame == 1) && (ball == 1) && (line[frame-1][4] == 'strike')) {
		console.log('scoring frame ',frame-1);
		line[0][3] = 10 + parseInt(line[1][0]) + parseInt(pins);
		line[0][4] = 'X';

	//frame 3: check and score strikes after ball 1 (don't total from previous frame, there isn't one)	
	} else if ((frame == 2) && (ball == 0) && (line[0][4] == 'strike') && (line[1][4] == 'strike')) {
		console.log('scoring frame ',frame-1);
		line[0][3] = 10 + 10 +  parseInt(pins);
		line[0][4] = 'X';

	//frame 4-10: check and score strikes after ball 1	
	} else if ((frame > 2) && (ball == 0) && (line[frame-2][4] == 'strike') && (line[frame-1][4] == 'strike')) {
		console.log('scoring frame ',frame-1);
		line[frame-2][3] = parseInt(line[frame-3][3]) + 10 + 10 +  parseInt(pins);
		line[frame-2][4] = 'X';


	//frames 3-10: check and score spares after ball 1 	
	} else if ((frame > 1) && (ball == 0) && (line[frame-1][4] == 'spare')) {
		console.log('scoring frame ',frame-1);
		line[frame-1][3] = parseInt(line[frame-2][3]) + 10 + parseInt(pins);
		line[frame-1][4] = '/';

	//frames 2-10: check and score strikes after ball 2	
	} else if ((frame > 1) && (ball == 1) && (line[frame-1][4] == 'strike')) {
		console.log('scoring frame ',frame-1);
		line[frame-1][3] = parseInt(line[frame-2][3]) + 10 + parseInt(line[frame][0]) + parseInt(pins);
		line[frame-1][4] = 'X';
		line[frame][4] = 'X';
	} else {
		console.log('No marks to process');
	}
}

//////////////////////////////////////////////////////////////////////////////////
// Score the frame if there is enough data.                                     //
// If the frame is a mark, note the type in the line, but don't write the score //
//////////////////////////////////////////////////////////////////////////////////
function scoreIt() {
	//game over if (frame 10 and ball two and no strike or spare), or if ball three has been thrown
	gameOver = ((frame == 9) && (ball == 1) && ((parseInt(line[9][0]) + parseInt(line[9][1])) < 10))
			||  (frame == 9) && (ball == 2);
	$scope.gameOver = gameOver;

	//if a mark, don't score the frame, note the mark type in line
	if ((ball == 0) && (pins == 10)) {
		line[frame][4] = 'strike';
	} else if ((ball == 1) && (parseInt(line[frame][0]) + parseInt(line[frame][1])) == 10) {
		line[frame][4] = 'spare';
	//not a mark, score the frame
	//special case for frame 1: no previous frame total to add
	} else if ((frame == 0) && (ball == 1)) {
		line[frame][3] = parseInt(line[frame][0]) + parseInt(line[frame][1]);
	//typical case: frame 2 - 9 open frame	
	} else if ((ball == 1) && (frame!=0) && (frame != 9)) {
		line[frame][3] = line[frame-1][3] + parseInt(line[frame][0]) + parseInt(line[frame][1]);
	//game over after two balls	
	} else if (gameOver && (ball == 1)) {
		line[frame][3] = line[frame-1][3] + parseInt(line[frame][0]) + parseInt(line[frame][1]);
	//game over after three balls	
	} else if (gameOver && (ball == 2)) {
		line[frame][3] = line[frame-1][3] + parseInt(line[frame][0]) + parseInt(line[frame][1]) + parseInt(line[frame][2]);
	}

	$scope.line = line;
}

}])