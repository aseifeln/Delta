//Class for drawing background image(s)
class BGSystem extends System {
	constructor() {
		super();
		//start location for both image tiles which will scroll to produce background
		this.loc1Scroller = new Point(0, -450); // bg image location for scroller mode
		this.loc2Scroller = new Point(900, 1500); 

		this.velocity = new Point(0, 0.5);
		//TODO: set up images
		// Gifs should be loopable, and
		// gifs should also be tileable (for scroller mode, when
		// the background is moving vertically)
		//ex https://www.pinterest.ca/pin/261560690838597798/
		
		//setting background image
		this.bgImageScroller = new Image();
		this.bgImageScroller.src = "assets/bg_image.png";
	}

	//called every frame
	update() {
	}

	//called every frame
	render() {
			CTX.drawImage(this.bgImageScroller, this.loc1Scroller.getX(), this.loc1Scroller.getY(), this.loc2Scroller.getX(), this.loc2Scroller.getY());
			CTX.drawImage(this.bgImageScroller, this.loc1Scroller.getX(), this.loc1Scroller.getY()-1500, this.loc2Scroller.getX(), this.loc2Scroller.getY());
	}

	// continuously move images vertically (top to bottom). called by another
	// class (LevelSystem.js) when the game is in scroller mode.
	// scroll() will stop being called when game is in asteroid mode.
	scroll() {
		if(this.loc1Scroller.getY() >= 1000) {
			this.loc1Scroller.set(0, -750);
			this.render();
		}
		this.loc1Scroller.addPoint(this.velocity); //move images vertically
	  // this.loc2Scroller.addPoint(this.velocity);
		// reset image locations when offscreen (move back to top, when past bottom)
	}

}
