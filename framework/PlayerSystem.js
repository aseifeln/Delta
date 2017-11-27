//updates and renders player
class PlayerSystem extends System {
	constructor(player) {
		super();
		this.player = player;
	}
	update() {
		this.player.update();
		if (this.player.getLife() <= 0) {
			const e = new Event(EventFilter.PLAYER, EventEnum.PLAYER_DIE, undefined);
			this.publishEvent(e);
		}
	}
	render() {
		this.player.render();
	}
	getPlayer() {
		return this.player;
	}
	setPlayer(p) {
		this.player = p;
	}
}
