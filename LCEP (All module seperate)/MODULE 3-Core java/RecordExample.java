import java.util.*;
import java.util.stream.Collectors;

record Person(String name, int age) {
    // Records automatically generate constructor, getters, equals, hashCode, toString
}

public class RecordExample {
    public static void main(String[] args) {
        // Create Person instances
        Person person1 = new Person("Alice", 25);
        Person person2 = new Person("Bob", 17);
        Person person3 = new Person("Charlie", 30);
        Person person4 = new Person("Diana", 22);
        
        System.out.println("Person instances:");
        System.out.println(person1);
        System.out.println(person2);
        System.out.println(person3);
        System.out.println(person4);
        
        // Use records in a List
        List<Person> people = Arrays.asList(person1, person2, person3, person4);
        
        // Filter adults (age >= 18) using Streams
        List<Person> adults = people.stream()
                                   .filter(person -> person.age() >= 18)
                                   .collect(Collectors.toList());
        
        System.out.println("\nAdults (age >= 18):");
        adults.forEach(System.out::println);
        
        // Filter by name length
        List<Person> longNames = people.stream()
                                      .filter(person -> person.name().length() > 5)
                                      .collect(Collectors.toList());
        
        System.out.println("\nPeople with names longer than 5 characters:");
        longNames.forEach(System.out::println);
    }
}