
import static org.junit.Assert.*;

import org.junit.Test;

public class HighScore() {
	
@Test
	Score s = new Score();
    if (args[0].equals("set")) {
        s.setHighScore(Integer.parseInt(args[2]));
    } else {
        System.out.println("score = "+ s.getHighScore());
        
        assert(s.HighScore());
        
        }
}
