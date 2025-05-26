import java.util.Scanner;

public class StringReversal {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter a string: ");
        String input = scanner.nextLine();
        
        // Method 1: Using StringBuilder
        StringBuilder sb = new StringBuilder(input);
        String reversed1 = sb.reverse().toString();
        System.out.println("Reversed string (StringBuilder): " + reversed1);
        
        // Method 2: Using loop
        String reversed2 = "";
        for (int i = input.length() - 1; i >= 0; i--) {
            reversed2 += input.charAt(i);
        }
        System.out.println("Reversed string (loop): " + reversed2);
        
        scanner.close();
    }
}