import java.util.HashMap;
import java.util.Scanner;

public class HashMapExample {
    public static void main(String[] args) {
        HashMap<Integer, String> studentMap = new HashMap<>();
        Scanner scanner = new Scanner(System.in);
        
        System.out.println("Enter student data (enter -1 as ID to stop):");
        
        while (true) {
            System.out.print("Enter student ID: ");
            int id = scanner.nextInt();
            
            if (id == -1) {
                break;
            }
            
            scanner.nextLine(); // consume newline
            System.out.print("Enter student name: ");
            String name = scanner.nextLine();
            
            studentMap.put(id, name);
        }
        
        System.out.print("\nEnter student ID to retrieve name: ");
        int searchId = scanner.nextInt();
        
        if (studentMap.containsKey(searchId)) {
            System.out.println("Student name: " + studentMap.get(searchId));
        } else {
            System.out.println("Student ID not found.");
        }
        
        scanner.close();
    }
}