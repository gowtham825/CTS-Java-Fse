// public class PatternMatchingExample {
    
//     public static void checkObjectType(Object obj) {
//         String result = switch (obj) {
//             case Integer i -> "Integer with value: " + i;
//             case String s -> "String with value: \"" + s + "\" (length: " + s.length() + ")";
//             case Double d -> "Double with value: " + d;
//             case Boolean b -> "Boolean with value: " + b;
//             case null -> "Null object";
//             default -> "Unknown type: " + obj.getClass().getSimpleName();
//         };
        
//         System.out.println(result);
//     }
    
//     public static void main(String[] args) {
//         System.out.println("Pattern Matching with Switch:");
        
//         checkObjectType(42);
//         checkObjectType("Hello World");
//         checkObjectType(3.14159);
//         checkObjectType(true);
//         checkObjectType(null);
//         checkObjectType(new java.util.ArrayList<>());
//         checkObjectType('A');
        
//         // Advanced pattern matching with conditions
//         System.out.println("\nAdvanced pattern matching:");
//         advancedPatternMatching(15);
//         advancedPatternMatching("Java");
//         advancedPatternMatching(-5);
//     }
    
//     public static void advancedPatternMatching(Object obj) {
//         String result = switch (obj) {
//             case Integer i when i > 10 -> "Large integer: " + i;
//             case Integer i when i < 0 -> "Negative integer: " + i;
//             case Integer i -> "Small positive integer: " + i;
//             case String s when s.length() > 5 -> "Long string: " + s;
//             case String s -> "Short string: " + s;
//             default -> "Other type";
//         };
        
//         System.out.println(result);
//     }
// }