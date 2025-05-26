import java.util.Scanner;

public class TryCatchExample {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        try {
            System.out.print("Enter first integer: ");
            int num1 = scanner.nextInt();
            
            System.out.print("Enter second integer: ");
            int num2 = scanner.nextInt();
            
            int result = num1 / num2;
            System.out.println("Result: " + num1 + " / " + num2 + " = " + result);
            
        } catch (ArithmeticException e) {
            System.out.println("Error: Division by zero is not allowed!");
        } catch (Exception e) {
            System.out.println("Error: Invalid input. Please enter integers only.");
        }
        
        scanner.close();
    }
}