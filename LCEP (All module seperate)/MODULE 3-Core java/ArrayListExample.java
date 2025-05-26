import java.util.ArrayList;
import java.util.Scanner;

public class ArrayListExample {
    public static void main(String[] args) {
        ArrayList<String> studentNames = new ArrayList<>();
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Enter student names (type 'done' to finish):");
        
        while (true) {
            System.out.print("Enter name: ");
            String name = scanner.nextLine();
            
            if (name.equalsIgnoreCase("done")) {
                break;
            }
            
            studentNames.add(name);
        }
        
        System.out.println("\nStudent names entered:");
        for (int i = 0; i < studentNames.size(); i++) {
            System.out.println((i + 1) + ". " + studentNames.get(i));
        }
        
        scanner.close();
    }
}