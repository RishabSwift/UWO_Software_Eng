package rbhatt23.lab02;


import java.util.Scanner;

public class rbhatt23_lab02_q3 {

    public static void main(String[] args) {

        System.out.println("******************************************************");
        System.out.println("ES1036b: Lab 02 Q3");
        System.out.println("Date: February 4, 2019");
        System.out.println("Name: Rishab Bhatt");
        System.out.println("Student Number: 251028696");
        System.out.println("Program’s mission: Simple switch-statement calculator.");
        System.out.println("******************************************************");
        System.out.println();

        // Initialize the variables
        Scanner scan = new Scanner(System.in);
        double firstNum, secondNum, result = 0;
        int choice;

        // Get the first and second numbers
        System.out.println("Please enter the first number:");
        firstNum = scan.nextDouble();

        System.out.println("Please enter the second number:");
        secondNum = scan.nextDouble();

        System.out.println("\nWhich operation would you like to perform?");
        System.out.println("1. Addition");
        System.out.println("2. Subtraction");
        System.out.println("3. Multiplication");
        System.out.println("4. Division");
        System.out.println("5. Modulo");
        System.out.println("6. Five Year Loan: Monthly Payment");

        // Store their choice in a variable
        choice = scan.nextInt();

        // Boolean variable required to hide the result if error
        boolean success = true;

        // Switch case for the choices and doing proper actions based on the choice
        switch (choice) {
            case 1:
                result = firstNum + secondNum;
                break;
            case 2:
                result = firstNum - secondNum;
                break;
            case 3:
                result = firstNum * secondNum;
                break;
            case 4:
                result = firstNum / secondNum;
                break;
            case 5:
                result = firstNum % secondNum;
                break;
            case 6:
                result = (firstNum * secondNum) / (1 - (1 / Math.pow(1 + secondNum, 5 * 12)));
                break;
            default:
                System.out.println("\nInvalid choice, please re-run the program to try again");
                success = false;
                break;
        }

        // Only show the result if they entered a valid choice
        if (success) {
            System.out.println("\nThe result is " + result);
        }
        System.out.println("Goodbye!");


    }
}
