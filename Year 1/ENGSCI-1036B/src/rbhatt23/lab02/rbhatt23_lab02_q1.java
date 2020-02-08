package rbhatt23.lab02;

import java.util.Scanner;

public class rbhatt23_lab02_q1 {

    public static void main(String[] args) {

        System.out.println("******************************************************");
        System.out.println("ES1036b: Lab 02 Q1");
        System.out.println("Date: February 4, 2019");
        System.out.println("Name: Rishab Bhatt");
        System.out.println("Student Number: 251028696");
        System.out.println("Program’s mission: Check if the number is divisible by first and second integer");
        System.out.println("******************************************************");
        System.out.println();

        Scanner scan = new Scanner(System.in);

        System.out.println("Please enter an integer value: ");
        int num = scan.nextInt();

        System.out.println("Please enter the first divisor: ");
        int firstDivisor = scan.nextInt();

        System.out.println("Please enter the second divisor: ");
        int secondDivisor = scan.nextInt();

        String message;

        if (num % firstDivisor == 0 && num % secondDivisor == 0) {
            message = "both divisors";
        } else if (num % firstDivisor == 0) {
            message = "the first divisor only";
        } else if (num % secondDivisor == 0) {
            message = "the second divisor only";
        } else {
            message = "neither divisors";
        }

        System.out.printf("The number is divisible by %s.\nGoodbye!", message);

    }
}
