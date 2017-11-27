//updates and renders player
class PlayerSystem extends System {
	constructor(player) {
		super();
		this.player = player;
		this.playerDeathPublished = false; //flag for player's death only once
	}
	update() {
		this.player.update();
		if (!this.playerDeathPublished && this.player.getLife() <= 0) {
			const e = new Event(EventFilter.PLAYER, EventEnum.PLAYER_DIE, undefined);
			this.playerDeathPublished = true;
			// this.player.disableMovement();
			this.player.setLocation(-60, -60); //move off screen to avoid onscreen collision
			this.player.deactivate();
			this.publishEvent(e);
			//TODO decide how to handle player's death
		}
	}
	render() {
		if (this.player.getIsActive()) {
			this.player.render();
		}
	}
	getPlayer() {
		return this.player;
	}
	setPlayer(p) {
		this.player = p;
	}
}
