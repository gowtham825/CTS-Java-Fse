import java.util.Scanner;

class InvalidAgeException extends Exception {
    public InvalidAgeException(String message) {
        super(message);
    }
}

public class CustomExceptionExample {
    public static void checkAge(int age) throws InvalidAgeException {
        if (age < 18) {
            throw new InvalidAgeException("Age must be 18 or older. Entered age: " + age);
        }
        System.out.println("Age is valid: " + age);
    }
    
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        try {
            System.out.print("Enter your age: ");
            int age = scanner.nextInt();
            
            checkAge(age);
            System.out.println("Welcome! You are eligible.");
            
        } catch (InvalidAgeException e) {
            System.out.println("Error: " + e.getMessage());
        }
        
        scanner.close();
    }
}