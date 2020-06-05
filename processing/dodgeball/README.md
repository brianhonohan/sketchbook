# Overview
A simple game of dodging circles bigger than you, absorbing smaller ones.

The intent of this sketch is to experiment with a bit of game mechanics.

### Currently:

* Upon contact, you absorb (or lose) 10% of the circles area that are smaller (or bigger) than you.
* If you completely absorb another ball, another one pops on the board, with a radius based on a Gaussian distribution around yours.
* If at any point, another circle is more than 2x as big as you, it will have it's radius reduced by 5% per frame (to even out the playing field)
* If your radius gets below 3 pixels, you lose.
* Clicking the mouse when the game is over will restart a new game.

### Future Features:

* Upgrade the collision test logic (perhaps use cells to limit comparisons) to allow circles to bounce off of each other.
* Create a goal:
	* Survival
	* Collect N number of particular color
* Create opponent circles that try to subvert your goal. 