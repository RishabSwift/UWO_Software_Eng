package rbhatt23.lab02;

import java.util.Scanner;

public class rbhatt23_lab02_q2 {

    public static void main(String[] args) {

        System.out.println("******************************************************");
        System.out.println("ES1036b: Lab 02 Q2");
        System.out.println("Date: February 4, 2019");
        System.out.println("Name: Rishab Bhatt");
        System.out.println("Student Number: 251028696");
        System.out.println("Program’s mission: This program calculates the amount of tax an individual must pay.");
        System.out.println("******************************************************");
        System.out.println();

        Scanner scan = new Scanner(System.in);

        // Include the income in an array so we can work with ranges
        int[] single = {8351, 33951, 82251, 171551, 372951};
        int[] widower = {16701, 67901, 137051, 208851, 372951};
        int[] married = {8351, 33951, 68526, 104426, 186476};
        int[] head = {11951, 45501, 117451, 190201, 372951};
        double[] tax = {0.10, 0.15, 0.25, 0.28, 0.33, 0.35};
        int[][] allStatuses = {single, widower, married, head};

        int userIncome, chosenOption;

        // Get the user income
        System.out.println("Please enter a taxable income value:");
        userIncome = scan.nextInt();

        System.out.println("\nPlease enter the most appropriate userStatus");
        System.out.println("1. Single");
        System.out.println("2. Married Filing Jointly or Qualifying Widow(er)");
        System.out.println("3. Married Filing Separately");
        System.out.println("4. Head of Household\n");

        System.out.println("Enter a choice:");

        // Get their chosen option
        // subtract one from what they picked because it's 0 indexed in teh array above.
        // The number they entered is directly associated with the index of the allStatuses[] array
        chosenOption = scan.nextInt() - 1;

        // The user status is defined by the user chosen option
        int[] userStatus = allStatuses[chosenOption];

        // Set the initial tax to 0
        double calculatedTax = 0;

        // Star a loop
        for (int i = 0; i < userStatus.length; i++) {

            // If income is less than the userStatus... then we automatically know that we are within the range
            if (userStatus[i] > userIncome) {
                calculatedTax = userIncome * tax[i];
                break; // to avoid continuing the loop
            }

            // If we're at the last loop then it doesn't matter if the income is less than what they have there
            if (userStatus[i] < userIncome && i == userStatus.length - 1) {
                calculatedTax = userIncome * tax[i + 1];
                break;
            }
        }

        // Output their tax
        System.out.printf("Your tax is %f dollars", calculatedTax);
    }

}
