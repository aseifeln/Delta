//This class is for Sound Effects
//Work in progress. TODO Intitialization event and properly calling sound.

class SoundSystem extends System {
	  constructor() {
		  //Sound variables which link to the folder assets. They are declared in the constructor because
		  //The sound class is an object in playing game state and is not used anywhere else.
		  this.backgroundSong    = new Audio('assets/AsteroidThemeSong.mp3');
		  this.asteroidExplosion = new Audio('assets/AsteroidExplosion.mp3');
		  this.alienBossTheme    = new Audio('assets/AlienBoss.mp3');
		  this.bulletSound       = new Audio('assets/LaserBlaster.mp3');
		  this.thrusterSound     = new Audio('assets/Thrusters.mp3');
		
		  //These listen for the specific event to occur (like keystroke or game event) and then call the method to
		  //Play the appropriate sounds
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
		  
		  let gKeyListener = new EventListener(EventFilter.KEYBOARD, function(event) {
			  if (event.getEventEnum() == EventEnum.keydown_g) {
				  playBulletSound();
			  }
		  });
		  this.addEventListener(gKeyListener);
		  
		  //uses the same sound for all destroyed objects (for now)
		  let objectDestroyedListener = new EventListener(EventFilter.DESTROY, function(event) {
			  if (event.getEventEnum() == EventEnum.DESTROY_OBJECT) {
				  playAsteroidExplosion();
			  }
		  });
		  this.addEventListener(objectDestroyedListener);
		  
	}
//These methods play the sounds for each type of event, thrust up or down, shooting bullets, collisions and background sounds
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