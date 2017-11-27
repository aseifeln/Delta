class UISystem extends System {
	constructor(playerSystem) {
		super();
		this.playerSystem = playerSystem;
		const instance = this;
		class HealthBar {
			constructor() {
				this.health = 100;
			}
			update() {
				this.health = instance.playerSystem.getPlayer().getLife();
				this.health = this.health <= 0 ? 0 : this.health;
			}

			render() {
				CTX.strokeStyle = Colors.WHITE;
				CTX.strokeRect(10, 10, 100, 20);
				CTX.fillStyle = this.health <= 20 ? Colors.RED : Colors.WHITE;
				CTX.fillRect(10, 10, this.health, 20);
			}
		}

		this.healthBar = new HealthBar();
	}

	update() {
		this.healthBar.update();
	}

	render() {
		this.healthBar.render();
	}


}
