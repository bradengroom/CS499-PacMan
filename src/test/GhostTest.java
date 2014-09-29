package test;

import static org.junit.Assert.*;

import org.junit.Test;

/*
 * author: Braden Groom
 */
public class GhostTest {

	@Test
	public void isBlueTest() {
		
		//create pacman and a ghost
		Pacman pacman = new Pacman();
		Ghost ghost = new Ghost();

		//make pacman use a powerup
		pacman.usePowerUp();

		//when pacman uses a powerup, the ghosts should turn blue
		assert (ghost.isBlue());
	}

	@Test
	public void isChasingTest() {

		//create pacman and a ghost
		Pacman pacman = new Pacman();
		Ghost ghost = new Ghost();

		// pacman has not used a powerup yet, so the ghost should be chasing him
		assert (ghost.isChasing());

		//make pacman use a powerup
		pacman.usePowerUp();

		//now that pacman has used a powerup, the ghost should be running away
		assert (!ghost.isChasing());
	}

}
