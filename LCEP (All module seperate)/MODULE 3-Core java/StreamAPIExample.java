import java.util.*;
import java.util.stream.Collectors;

public class StreamAPIExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25);
        
        System.out.println("Original list:");
        System.out.println(numbers);
        
        // Filter even numbers using Stream API
        List<Integer> evenNumbers = numbers.stream()
                                          .filter(n -> n % 2 == 0)
                                          .collect(Collectors.toList());
        
        System.out.println("\nEven numbers:");
        System.out.println(evenNumbers);
        
        // Additional stream operations
        System.out.println("\nEven numbers greater than 5:");
        List<Integer> evenGreaterThan5 = numbers.stream()
                                               .filter(n -> n % 2 == 0)
                                               .filter(n -> n > 5)
                                               .collect(Collectors.toList());
        System.out.println(evenGreaterThan5);
    }
}