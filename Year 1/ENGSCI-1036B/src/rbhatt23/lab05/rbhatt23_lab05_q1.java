package rbhatt23.lab05;

import java.util.Scanner;

public class rbhatt23_lab05_q1 {

    public static void main(String[] args) {
        printHeader(5, 1, "Rishab", "Bhatt", "Computing a factorial using methods");
        long factorial = computeFactorial(getPositiveInteger());
        System.out.printf("The resulting factorial is: %d", factorial);
    }

    /**
     * Print the header
     *
     * @param labNum      lab number
     * @param questionNum question number
     * @param fName       first name
     * @param lName       last name
     * @param mission     mission
     */
    private static void printHeader(int labNum, int questionNum, String fName, String lName, String mission) {

        String lab = "Lab " + labNum;
        String question = "Question " + questionNum;
        String name = String.format("Name: %s %s", fName, lName);

        // Get the highest length from the many different strings since we need to have the border that's the length of the longest string

        int[] lengths = {lab.length(), question.length(), name.length(), mission.length()};

        int highestLength = 0;
        for (int length : lengths) {
            if (length > highestLength) {
                highestLength = length;
            }
        }

        // Repeat * until it hits the highestLength
        String borders = new String(new char[highestLength]).replace("\0", "*");


        System.out.println(borders);
        System.out.println(mission);
        System.out.println(borders);
        System.out.println(lab);
        System.out.println(question);
        System.out.println(name);
        System.out.println(borders);
    }

    /**
     * Get number from user
     *
     * @return number
     */
    private static int getPositiveInteger() {
        System.out.println("Input an integer number to calculate its factorial:");
        Scanner scan = new Scanner(System.in);
        int num = scan.nextInt();

        // Validate user input
        while (num < 0) {
            System.out.println("Invalid Entry! Please enter a positive integer: ");
            num = scan.nextInt();
        }
        return num;
    }

    /**
     * Compute factorial
     *
     * @param value number to find factorial of
     * @return factorial
     */
    private static long computeFactorial(int value) {
        long factorial = 1; // starts at one

        // If they entered 0, the factorial is 1
        if (value == 0) {
            return 1; // no longer runs what's after
        }

        // Calculate factorial
        for (int i = 1; i <= value; i++) {
            factorial *= i;
        }
        return factorial;
    }
}
