# Bowling

This is a program for scoring a game of bowling.  It uses HTML, a little CSS, JavaScript, and AngularJS. 

When playing, the user told the frame and ball they are on and prompted to enter the number of pins to score.

When the Score It button is clicked, the following happens:
  - The number of pins is validated
  - The number of pins is entered into an array
  - The pin input area is cleared
  - Previous frames are evaluated for marks and scored if possible
  - The current frame is scored
  - The frame and ball are updated
  - A new prompt is generated
  
Repeats until the the end of the 10th frame.

Requirements:

Strike
If you knock down all 10 pins in the first shot of a frame, you get a strike.
How to score: A strike earns 10 points plus the sum of your next two shots.

Spare
If you knock down all 10 pins using both shots of a frame, you get a spare.
How to score: A spare earns 10 points plus the sum of your next one shot.

Open Frame
If you do not knock down all 10 pins using both shots of your frame (9 or fewer pins knocked down), you have an open frame.
How to score: An open frame only earns the number of pins knocked down.

The 10th Frame
If you roll a strike in the first shot of the 10th frame, you get 2 more shots.
If you roll a spare in the first two shots of the 10th frame, you get 1 more shot.
If you leave the 10th frame open after two shots, the game is over and you do not get an additional shot.

How to Score: The score for the 10th frame is the total number of pins knocked down in the 10th frame.
The user is prompted with the frame and ball, and inputs the number of pins knocked down.
