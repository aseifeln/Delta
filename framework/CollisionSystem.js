/*
	Checks for and handles collisions between objects like player, projectiles, and asteroids.
	Responsible for determining if conditions of a collision (ex distance threshold).

 */

class CollisionSystem extends System {
	// @param player: The player
	// @param asteroids: An array of asteroids
	constructor(playerSystem, asteroidSystem, pBulletSystem, bossSystem) {
		if (playerSystem instanceof PlayerSystem == false || asteroidSystem instanceof GameObjectSystem == false) { throw new Error("Invalid arguments"); }
		super();

		// GameObjects or lists of GameObjects that will be checked for collisions.
		this.playerSystem = playerSystem;
		this.player = playerSystem.getPlayer();
		this.asteroidSystem = asteroidSystem;
		this.pBulletSystem = pBulletSystem; //player bullet system
		this.bossSystem = bossSystem;


	}

	update() {
		this.checkPlayer_Asteroids();
		this.checkProjectiles_Asteroids();
		// this.checkBossCollision_Player();
		// this.checkBossProjectile_Player();
		this.checkProjectiles_Boss();
	}

	onEnter() {}
	onExit() {}
	render() {}

	//check if GameObjects a and b are colliding.
	//@param a, b: pass 2 GameObjects.
	static Distance_check(a, b){
		if (a instanceof GameObject == false) { throw new TypeError("a needs to be a GameObject."); }
		if (b instanceof GameObject == false) { throw new TypeError("b needs to be a GameObject."); }
		// getting x and y coordinates of each object
		let x1 = a.getX();
		let x2 = b.getX();
		let y1 = a.getY();
		let y2 = b.getY();
		//calculating distance between two points
		let sum = Math.pow((x2-x1),2) + Math.pow((y2-y1), 2);
		let distance = Math.sqrt(sum);
		//check distance
		if(distance < 47){
			return true;
		}
		return false;
	}

	// Check if player is colliding with an asteroid
	checkPlayer_Asteroids() {
		let asteroids = this.asteroidSystem.getObjects(); //returns an array of asteroids
		for (let ast of asteroids) {
			//if distance between player & asteroid < dist
				//ast.deactivate();
				if (CollisionSystem.Distance_check(this.player, ast) == true) {
					this.player.damage(10);
					ast.deactivate();
					//TODO do damge, game over screen if player dies
				}
		}
	}

	// Check if any of the player's projectiles are colliding wit an asteroid
	checkProjectiles_Asteroids() {
		// get player bullet and asteroid objects
		let proj = this.pBulletSystem.getObjects();
		let ast  = this.asteroidSystem.getObjects();
		//checks arrays of bullet and asteroid objects
		for(let p of proj){
			for(let a of ast){
				if(CollisionSystem.Distance_check(p, a) == true){
					// a.damage(0);
					a.destroy();
					p.destroy();
				}
			}
		}
	}

	//Checks if the player collides with the boss
	checkBossCollision_Player(){
		let boss = this.bossSystem.getObjects();
		for(let b of boss){
			if(CollisionSystem.Distance_check(this.player, boss) == true){
				this.player.damage(0);
				//TODO do damge, game over screen if player dies
			}
		}
	}

	//checks to see if the boss's bullets hit the player.
	checkBossProjectile_Player(){
		//gets player location and boss projectiles
		let ploc = this.player.getLocation();
		let boss = this.bossSystem.getObjects()[0];
		let proj = boss.getBullets();

		//checks boss bullets array to see if boss projectiles are hitting the player
		//if true, it reports damage to the player and console
		for(let p of proj){
			//gets player projectile location and places it as a param
			let loc = p.getLocation();
			if(CollisionSystem.Distance_check(ploc, loc) == true){
				this.player.damage(0);
				//TODO do damge, game over screen if player dies
			}
		}
	}

	//Check player bullets hitting boss guy
	checkProjectiles_Boss(){
		//gets player bullets and boss objects and their locations
		let proj = this.pBulletSystem.getObjects();
		let boss = this.bossSystem.getObjects();

		//checks array of bullets and boss objects to see if any bullet collides with a boss
		for(let p of proj){
			//gets location of projectile
			for(let b of boss){
				// gets boss object location
				if(CollisionSystem.Distance_check(p, b) == true){
					b.damage(10);
					p.destroy();
					console.log("boss dam");
				}
			}
		}
	}

	// damageAsteroid(asteroid, projectile) {
	// 	asteroid.damage(projectile.getDamage);
	// }
}
