import java.util.*;

public class LambdaExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("John", "Alice", "Bob", "Charlie", "Diana");
        
        System.out.println("Original list:");
        System.out.println(names);
        
        // Sort using lambda expression
        Collections.sort(names, (a, b) -> a.compareTo(b));
        
        System.out.println("\nSorted list (ascending):");
        System.out.println(names);
        
        // Sort in descending order
        Collections.sort(names, (a, b) -> b.compareTo(a));
        
        System.out.println("\nSorted list (descending):");
        System.out.println(names);
    }
}