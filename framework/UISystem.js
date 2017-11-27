class UISystem extends System {
	constructor(playerSystem) {
		super();
		this.playerSystem = playerSystem;
		
		
		const instance = this;
		class HealthBar {
			constructor() {
				this.health = 100;
				this.alpha = 1.0;
				this.LOW = 20;
			}
			update() {
				this.health = instance.playerSystem.getPlayer().getLife();
				this.health = this.health <= 0 ? 0 : this.health;
				
				if (this.health <= this.LOW) { //flash bar if low health
					this.alpha -= 0.035;
					if (this.alpha <= 0) { this.alpha = 1.0 }
				}
			}

			render() {
				CTX.fillStyle = this.health <= this.LOW ? 
				"rgba(255, 0, 0, " + this.alpha + ")" : 
				"rgba(255, 255, 255, " + this.alpha + ")";
				CTX.fillRect(10, 10, this.health, 20);
				
				CTX.strokeStyle = "rgba(255, 255, 255, " + this.alpha + ")";
				CTX.strokeRect(10, 10, 100, 20);
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
