class GameOverGameState extends GameState {
	constructor() {
		super();
		this.gameOver = new Image();
		this.gameOver.src = 'assets/gameover.png'

		const startListener = new EventListener(EventFilter.KEYBOARD, function(event) {
			if (event.getEventEnum() == EventEnum.keydown_g) {
				ENGINE.setupNewGame();
				ENGINE.startGame();
			}
		});
		this.registerEventListener(startListener);
	}

	onEnter() {
	}

	update() {
		this.dequeueEvent();
		for (let sys of this.systems) {
			sys.update();
		}
	}

	render() {
		CTX.fillStyle = Colors.PURPLE; //bg color
		CTX.fillRect(0, 0, WIDTH, HEIGHT);
		CTX.drawImage(this.gameOver, WIDTH/2-(this.gameOver.width/2), 100); //draw title

		CTX.fillStyle = Colors.WHITE; //text color
		fillText("Better luck next time!", WIDTH/2, HEIGHT/2, Fonts.DEFAULT);
		fillText("Press g to continue", WIDTH/2, HEIGHT/2+60, Fonts.DEFAULT);
	}

}
