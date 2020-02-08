package rbhatt23.lab03;

import java.util.Scanner;

public class rbhatt23_lab03_q1 {

    public static void main(String[] args) {
        System.out.println("******************************************************");
        System.out.println("ES1036b: Lab 03 Q1");
        System.out.println("Date: February 11, 2019");
        System.out.println("Name: Rishab Bhatt");
        System.out.println("Student Number: 251028696");
        System.out.println("Program’s mission: Find the largest integer given 4 numbers");
        System.out.println("******************************************************");
        System.out.println();

        Scanner scan = new Scanner(System.in);

        int largestInteger = 0, number = 0;

        String[] strings = {"first", "second", "third", "fourth"};

        // Loop through to get their input 4 times
        for (int i = 0; i < 4; i++) {

            System.out.printf("Please enter the %s integer:\n", strings[i]);

            // Get user input
            number = scan.nextInt();

            // Loop for validation
            while (number < -1000 || number > 1000) {
                System.out.println("Incorrect input, please enter a value in the range of -1000 to 1000 inclusive:");
                number = scan.nextInt();
            }

            // If the number is larger than the stored integer, then make this the largest number
            if (number > largestInteger) {
                largestInteger = number;
            }
        }

        System.out.println("The largest integer is " + largestInteger);
    }

}
