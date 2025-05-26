public class TypeCastingExample {
    public static void main(String[] args) {
        double doubleNum = 15.75;
        int intFromDouble = (int) doubleNum;
        
        System.out.println("Original double: " + doubleNum);
        System.out.println("Casted to int: " + intFromDouble);
        
        int intNum = 25;
        double doubleFromInt = (double) intNum;
        
        System.out.println("Original int: " + intNum);
        System.out.println("Casted to double: " + doubleFromInt);
    }
}