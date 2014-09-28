package test;

import static org.junit.Assert.*;

import org.junit.Test;

public class Ghost {

	@Test
	public void isBlue() {
		Pacman pacman = new Pacman();
		Ghost ghost = new Ghost();
		
		pacman.usePowerUp();
		
		assert(ghost.isBlue());
	}

}
