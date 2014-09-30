package pacman;

import static org.junit.Assert.*;

import org.junit.Test;


/*
 * Author: Caleb Murray
 * unit test for direction that pacman will 
 * follow on move based on user key entry. 
 */

public class DirectionalTest {
	//board top left is assumed to be [0,0]
	Pacman p = new Pacman;
	int prevPacX;
	int prevPacY;

	@Test
	public void leftTest() {
		prevPacX = p.getPacX;
		p.setKeyPress(left);
		p.refresh();
		// <<----+
		assert(p.getPacX < prevPacX );
	}
	
	@Test
	public void rightTest() {
		prevPacX = p.getPacX;
		p.setKeyPress(right);
		p.move();
		// +---->>
		assert(p.getPacX > prevPacX );	
	}
	
	@Test
	public void upTest() {
		prevPacY = p.getPacY;
		p.setKeyPress(up);
		p.move();
		/*	^
		 * 	|
		 * 	+
		 */
		assert(p.getPacY < prevPacY );
	}
	
	@Test
	public void downTest() {
		prevPacY = p.getPacY;
		p.setKeyPress(down);
		p.move();
		/*	+
		 * 	|
		 * 	V
		 */
		assert(p.getPacY > prevPacY );
	}

}
