import java.util.Scanner;

public class ArraySumAverage {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter the number of elements: ");
        int size = scanner.nextInt();
        
        int[] array = new int[size];
        int sum = 0;
        
        System.out.println("Enter the elements:");
        for (int i = 0; i < size; i++) {
            System.out.print("Element " + (i + 1) + ": ");
            array[i] = scanner.nextInt();
            sum += array[i];
        }
        
        double average = (double) sum / size;
        
        System.out.println("Sum of elements: " + sum);
        System.out.println("Average of elements: " + average);
        
        scanner.close();
    }
}