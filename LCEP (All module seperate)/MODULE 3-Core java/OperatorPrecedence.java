public class OperatorPrecedence {
    public static void main(String[] args) {
        int result1 = 10 + 5 * 2;
        System.out.println("10 + 5 * 2 = " + result1 + " (multiplication first)");
        
        int result2 = (10 + 5) * 2;
        System.out.println("(10 + 5) * 2 = " + result2 + " (parentheses first)");
        
        int result3 = 20 / 4 + 3 * 2;
        System.out.println("20 / 4 + 3 * 2 = " + result3 + " (division and multiplication, then addition)");
        
        boolean result4 = 5 > 3 && 2 < 4;
        System.out.println("5 > 3 && 2 < 4 = " + result4 + " (comparisons first, then logical AND)");
    }
}