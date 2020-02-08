package rbhatt23.lab04;

import java.util.Scanner;

public class rbhatt23_lab04_q1 {

    public static void main(String[] args) {

        Scanner scan = new Scanner(System.in);

        System.out.println("Input an integer number to calculate its factorial:");
        int num = scan.nextInt();

        // Validate user input
        while(num < 0) {
            System.out.println("Invalid Entry! Please enter a positive integer: ");
            num = scan.nextInt();
        }

        int factorial = 1; // starts at one

        // If they entered 0, the factorial is 1
        if (num == 0) {
            System.out.println("The resulting factorial is: 1");
            return; // no longer runs what's after
        }

        // Calculate factorial
        for (int i = 1; i <= num; i++) {
            factorial *= i;
        }

        // Output
        System.out.printf("The resulting factorial is: %d", factorial);
    }

}
