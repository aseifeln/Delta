/*
	Contains main game logic & structure.
	Updates & renders the current GameState
	Use different GameStates for different desired behaviours,
	ex playing, paused, menu, game over, etc.
*/


class GameEngine {
	constructor() {
		this.keyState = new KeyState(); //keeps track of which keys are down
		this.eventPublisher = new EventPublisher();
		this.playingState = new PlayingGameState();
		this.pausedState = new PauseGameState();
		this.startState = new StartMenuGameState();
		this.gameOverState = new GameOverGameState();
		this.currentState = this.startState; //the GameEngine's current State
		this.currentState.onEnter();
	}

	start() {
		this.eventPublisher.publishEvent(new Event(EventFilter.GAME, EventEnum.GAME_START));
	}

	// Future: implement pausing
	pauseGame() {
		this.enterState(this.pausedState);
	}
	resume() {
		this.enterState(this.playingState);
	}

	//start playing a new game from the start menu
	startGame() {
		this.enterState(this.startState);
	} //TODO

	//setup a new game by creating new GameStates (discard old ones)
	setupNewGame() {
		this.keyState.clearKeys();
		this.playingState = new PlayingGameState();
		this.currentState = this.playingState; //the GameEngine's current State
		this.currentState.onEnter();
	}

	//called for gameover
	gameOver() {
		this.enterState(this.gameOverState);
	}

	//called every frame
	update() {
		//update the current GameState, which will update each of its systems.
		this.currentState.update();
	}

	//called every frame afte update()
	render() {
		//render the current GameState, which will render each of its systems.
		this.currentState.render();
	}

	//receive an event from some source and queue it.
	queueEvent(e) {
		if (e instanceof Event == false) { throw new TypeError(); }
		this.currentState.enqueueEvent(e);
	}

	// Switch to a new state, ex from the start menu to the playing state.
	enterState(newState) {
		if (newState instanceof State == false) { throw new TypeError(); }
		this.currentState.onExit();
		this.currentState = newState;
		this.currentState.onEnter();
	}

	tryEnterState(newState) {
		if (newState instanceof State == false) { throw new TypeError(); }
		if (this.currentState.canExit() && newState.canEnter()) {
			this.enterState(newState);
		}
	}

	// Translates the given KeyboardEvent into an Event, queues it,
	// and updates this game engine's keyState.
	// @param e: a KeyboardEvent from the browser
	// @param isPressed: a boolean representing whether the KeyboardEvent
	// corresponded to a pressed or released event.
	receiveRawKeyEvent(keyEvent, isPressed) {
		// const event = RawKeyMap.map(keyEvent);
		// TODO only queue keys we're interested in.
		const event = new Event(EventFilter.KEYBOARD, keyEvent.type + "_" + keyEvent.key);
		if (event != null) {
			this.queueEvent(event);
		}
		this.keyState.setKey(keyEvent.key, isPressed);
	}

	//accessed by objects who want to know about KeyStates, ex Player.
	getKeyState() {
		return this.keyState;
	}
}
