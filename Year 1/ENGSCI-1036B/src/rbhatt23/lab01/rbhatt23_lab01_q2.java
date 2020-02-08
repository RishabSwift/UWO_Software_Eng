package rbhatt23.lab01;


import java.util.Scanner;

public class rbhatt23_lab01_q2 {

    public static void main(String[] args) {

        System.out.println("******************************************************");
        System.out.println("ES1036b: Lab 01 Q2");
        System.out.println("Date: January 28, 2019");
        System.out.println("Name: Rishab Bhatt");
        System.out.println("Student Number: 251028696");
        System.out.println(" Program’s mission: This program calculates a weighted average of four grades.");
        System.out.println("******************************************************");
        System.out.println();

        // Set up scanner and variables
        Scanner scan = new Scanner(System.in);
        double[] grades = new double[4];
        double[] weights = new double[4];

        // Each word such are in an array so they can be easily looped so there is no code repetition
        String[] words = {"first", "second", "third", "fourth"};

        // Loop 4 times
        for (int i = 0; i < 4; i++) {
            // Ask the user for grade and weight and store it in the nth place (in the array)
            System.out.printf("Input the %s grade:\n", words[i]);
            grades[i] = scan.nextDouble();

            System.out.printf("Input the %s grade weight:\n", words[i]);
            weights[i] = scan.nextDouble();
        }

        // Calculate the final grade by looping through the grade and weight of the arrays set above
        double finalGrade = 0;
        for (int i = 0; i < 4; i++) {
            finalGrade += grades[i] * weights[i];
        }
        // Output the answer
        System.out.printf("The course grade is %f", finalGrade);
    }

}
