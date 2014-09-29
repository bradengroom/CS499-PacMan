

public class HighScore {

	
 public static void main(String args[]) {
HighScore s = new HighScore(args[1]);
    if (args[0].equals("base")) {
        s.setHighScore(Integer.parseInt(args[2]));
    } else {
        System.out.println("score = "+ s.getHighScore())
        
        }
