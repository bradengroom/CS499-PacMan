import static org.junit.Assert.*;

import org.junit.Test;

public class PelletTest {

	@Test
	public void isEaten() {
		Pellet pellet = new Pellet();
		
		pellet.eaten();
		
		assert(pellet.isEaten());
	}
	
	@Test
	public void isScoreGained() {
		Score score = new Score();
		Pellet pellet = new Pellet();
		
		if (pellet.isEaten()) {
			score.incScore();
		}
		
		assert(score.isIncremented());
		
	}

}
