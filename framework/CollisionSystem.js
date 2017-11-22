/*
	Checks for and handles collisions between objects like player, projectiles, and asteroids.
	Responsible for determining if conditions of a collision (ex distance threshold).
	NOTE: alter as needed.


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
		//this.projectiles = player.getProjectiles(); //get the player's list of projectiles.
		// this.enemies = enemies;

		this.bossSystem = bossSystem;
		this.boss = bossSystem.getObjects()[0];
		this.bossBullets = this.boss.getBullets(); //Array<Bullet>

	}

	update() {
		this.checkPlayer_Asteroids();
		this.checkProjectiles_Asteroids();

		//TODO:
		//player - asteroids: asteroid damages player (DONE)
		//player bullets - asteroids: player bullets damage asteroid (DONE)
		//boss bullets - player: boss bullets damage player (DONE)
		//boss - player: boss damages player (DONE)
		//player bullets - boss: bullets damage boss (DONE)




		//examples
		// if (this.bossSystem.getObjects()[0] != undefined) {
		// 	this.checkBossCollision();
		// }

		// let handle_player_ast = function() {

		// }
		// Distance_check_arr_arr(arrA, arrB, handle_player_ast);



		// let handle_ast_bullets = function(b) {
		// 	b.deactivate()
		// }
		// Distance_check_arr_arr(arrA, arrB, handle_player_ast);
	}

	onEnter() {}
	onExit() {}
	render() {}

	//check if GameObjects a and b are colliding.
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

	//return the distance between two points or objects
	// static getDistance(a, b) {
	// }

	//return true or false
	// static Distance_check_arr_arr(arrA, arrB, callback) {
	// 	//TODO
	// 	for (let a of arrA) {
	// 		for (let b of arrB) {
	// 			if (Distance_check(a, b)) {

	// 			}
	// 		}
	// 	}
	// }

	// return true or false
	// static Distance_check_obj_arr(obj, arr) {
	// 	//TODO
	// }



	// Check if player is colliding with an asteroid
	checkPlayer_Asteroids() {
		let asteroids = this.asteroidSystem.getObjects(); //returns an array of asteroids

		let ploc = this.player.getLocation();
		for (let ast of asteroids) {
			//get asteroids location for param in distance checker
			let loc = ast.getLocation();
			//if distance between player & asteroid < dist
				//ast.deactivate();
				//ASH: Shouldnt the a parameter be ploc? If not then change it back to this.player
				if (CollisionSystem.Distance_check(ploc,loc) == true) {
					this.player.damage(0);
					console.log("player damage");
				}
		}


		//console.log("....")
	}




	// Check if any of the player's projectiles are colliding wit an asteroid
	checkProjectiles_Asteroids() {
		// get player bullet and asteroid objects
		let proj = this.pBulletSystem.getBullets();
		let ast  = this.asteroidSystem.getObjects();
		//checks arrays of bullet and asteroid objects
		for(let p of proj){
			//gets locations of bullets
			let prloc = p.getLocation();
			for(let a of ast){
				//gets locations of asteroids
				let aloc = a.getLocation();

				if(CollisionSystem.Distance_check(prloc,aloc) == true){
					this.asteroidSystem.damage(0);
					console.log("Asteroid Damage")
				}
			}
		}
	}

	//Checks if the player collides with the boss
	checkBossCollision_Player(){
		//gets player location and boss object
		let ploc = this.player.getLocation();
		let boss = this.bossSystem.getObjects();

		//checks the array of boss to see if boss objects are colliding with player
		//if true, player and console report damage
		for(let b of boss){
			//gets boss object location
			let bloc = b.getLocation();

			if(CollisionSystem.Distance_check(ploc,bloc) == true){
				this.player.damage(0);
				console.log("player damage");
			}
		}
	}

	//checks to see if the boss's bullets hit the player.
	checkBossProjectile_Player(){
		//gets player location and boss projectiles
		let ploc = this.player.getLocation();
		let proj = this.bossBullets.getBullets();

		//checks boss bullets array to see if boss projectiles are hitting the player
		//if true, it reports damage to the player and console
		for(let p of proj){
			//gets player projectile location and places it as a param
			let loc = p.getLocation();
			if(CollisionSystem.Distance_check(ploc,loc) == true){
				this.player.damage(0);
				console.log("player damage");
			}
		}
	}

	//Check player bullets hitting boss guy
	checkProjectiles_Boss(){
		//gets player bullets and boss objects and their locations
		let proj = this.pBulletSystem.getBullets();
		let boss = this.bossSystem.getObjects();

		//checks array of bullets and boss objects to see if any bullet collides with a boss
		for(let p of proj){
			//gets location of projectile
			let prloc = p.getLocation();
			for(let b of boss){
				// gets boss object location
				let bloc = b.getLocation();

				if(CollisionSystem.Distance_check(prloc,bloc) == true){
					this.bossSystem.damage(0);
					console.log("boss damage");
				}
			}
		}
	}




	//NOTE example method for if an asteroid is hit
	damageAsteroid(asteroid, projectile) {
		asteroid.damage(projectile.getDamage);
	}
}
