//This class is for Sound Effects
//Work in progress

class SoundSystem extends System {
	constructor() {
		this.backgroundSong    = new Audio('assets/AsteroidThemeSong.mp3');
		this.asteroidExplosion = new Audio('assets/AsteroidExplosion.mp3');
		this.alienBossTheme    = new Audio('assets/AlienBoss.mp3');
		this.bulletSound       = new Audio('assets/LaserBlaster.mp3');
		this.thrusterSound     = new Audio('assets/Thrusters.mp3');
		
		let wKeyListener = new EventListener(EventFilter.KEYBOARD, function(event) {
			if (event.getEventEnum() == EventEnum.keydown_w) {
				playThrusterSound();
			}
		});
		this.addEventListener(wKeyListener);
		
		let sKeyListener = new EventListener(EventFilter.KEYBOARD, function(event) {
			if (event.getEventEnum() == EventEnum.keydown_s) {
				playThrusterSound();
			}
		});
		this.addEventListener(sKeyListener);
	}

	playBackgroundSong(){
		this.backgroundSong.play();
		this.backgroundSong.loop = true;
	}

	playAsteroidExplosion(){
		this.asteroidExplosion.play();
	}

	playAlienBossTheme(){
		this.alienBossTheme.play()
		this.alienBossTheme.loop = true;
	}

	playBulletSound(){
		this.bulletSound.play();
	}

	playThrusterSound(){
		this.thrusterSound.play();
	}

}
