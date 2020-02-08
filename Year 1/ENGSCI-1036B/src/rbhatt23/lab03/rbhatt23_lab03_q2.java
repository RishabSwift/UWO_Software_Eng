package rbhatt23.lab03;

import java.util.Scanner;

public class rbhatt23_lab03_q2 {

    public static void main(String[] args) {

        System.out.println("******************************************************");
        System.out.println("ES1036b: Lab 03 Q1");
        System.out.println("Date: February 11, 2019");
        System.out.println("Name: Rishab Bhatt");
        System.out.println("Student Number: 251028696");
        System.out.println("Program’s mission: Determine if number is palindrome");
        System.out.println("******************************************************");
        System.out.println();

        Scanner scan = new Scanner(System.in);

        int integer, divisor;

        System.out.println("Please enter an integer between 1 and 9999 inclusive:");
        integer = scan.nextInt();

        // Validation of integer
        while (!(integer >= 1 && integer <= 9999)){
            System.out.println("Invalid input, please enter an integer between 1 and 9999 inclusive:");
            integer = scan.nextInt();
        }

        System.out.println("Please input an additional divisor between 1 and 150 inclusive:");
        divisor = scan.nextInt();

        // Validation of divisor
        while (!(divisor >= 1 && divisor <= 150)){
            System.out.println("Invalid input, please enter an integer between 1 and 150 inclusive:");
            divisor = scan.nextInt();
        }

        System.out.println("The palindromes are:");

        // Check if number is palindrome AND if it's divisible by the user inputted number
        for (int i = 1; i <= integer; i++) {
            if (i % divisor == 0 && isPalindrome(i)) {
                System.out.print(i + " ");
            }
        }

    }

    /**
     * Check if the given number is a palindrome
     * @param number Number to check if its palindrome
     * @return true if palindrome
     */
    public static boolean isPalindrome(int number) {
        // If it has even number of digits
        String stringNumber = String.valueOf(number);
        int lengthOfNumber = stringNumber.length();

        String firstHalf, secondHalf;

        // Get the first half of the string
        firstHalf = stringNumber.substring(0, lengthOfNumber / 2);

        // If number is divisible by 2, compare the first half with the last half
        // Since the index starts at n + 1 for an even number, we must add one to it.
        secondHalf = stringNumber.substring(lengthOfNumber % 2 == 0 ? lengthOfNumber / 2 : lengthOfNumber / 2 + 1);

        // Check if the first half equals the second half... if it does, it's a palindrome!
        return firstHalf.equals(secondHalf);
    }
}
