package rbhatt23.lab07;

import java.util.Scanner;

public class rbhatt23_lab07_q2 {

    private static Scanner scan = new Scanner(System.in);

    public static void main(String[] args) {

        // Three 2D arrays to hold 3x3 matrices
        double[][] firstMatrix = new double[3][3];
        double[][] secondMatrix = new double[3][3];
        double[][] result = new double[3][3];

        // Get first 3x3 matrix
        System.out.println("Welcome! Please populate the first 3x3 matrix:");
        populateMatrix(firstMatrix);
        printMatrix(firstMatrix);

        // Get second 3x3 matrix
        System.out.println("Please populate the second 3x3 matrix:");
        populateMatrix(secondMatrix);
        printMatrix(secondMatrix);

        // Start a loop
        while (true) {
            System.out.println("******************************");
            System.out.println("** Please choose an option: **");
            System.out.println("******************************");
            System.out.print("a. Add\nb. Subtract\nc. Multiply\nd. Exit\n\nOption: ");
            // Get an option
            String option = scan.next();
            // Check what operation they wanna do
            switch (option) {
                case "a":
                    addMatrices(firstMatrix, secondMatrix, result);
                    break;
                case "b":
                    subtractMatrices(firstMatrix, secondMatrix, result);
                    break;
                case "c":
                    multiplyMatrices(firstMatrix, secondMatrix, result);
                    break;
                default:
                    // Default option for if they enter "d"... or anything else
                    System.out.println("Goodbye!");
                    return; // return out of the METHOD so nothing runs after this
            }
            // Print the new result matrix after they have an action.
            printMatrix(result);
        }
    }


    /**
     * Populate / print the matrix
     *
     * @param matrix array
     */
    private static void populateMatrix(double[][] matrix) {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                System.out.printf("Enter a real number for element (%d,%d): ", i + 1, j + 1);
                matrix[i][j] = scan.nextDouble();
            }
        }
    }

    /**
     * Print the matrix to console
     *
     * @param matrix Matrix array
     */
    private static void printMatrix(double[][] matrix) {
        System.out.println();
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                System.out.printf("%10.1f", matrix[i][j]);
            }
            System.out.println();
        }
        System.out.println();
    }

    /**
     * Add matrices
     *
     * @param a      first matrix
     * @param b      second matrix
     * @param result result matrix
     */
    private static void addMatrices(double[][] a, double[][] b, double[][] result) {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                result[i][j] = a[i][j] + b[i][j];
            }
        }
    }

    /**
     * Subtract matrices
     *
     * @param a      first matrix
     * @param b      second matrix
     * @param result result matrix
     */
    private static void subtractMatrices(double[][] a, double[][] b, double[][] result) {
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                result[i][j] = a[i][j] - b[i][j];
            }
        }
    }

    /**
     * Multiply two matrices together
     *
     * @param a      first matrix
     * @param b      second matrix
     * @param result result matrix
     */
    private static void multiplyMatrices(double[][] a, double[][] b, double[][] result) {
        // row of a
        for (int i = 0; i < 3; i++) {
            // Column of b
            for (int j = 0; j < 3; j++) {
                result[i][j] = 0; // set it initially to 0
                // Column of a
                for (int k = 0; k < 3; k++) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }
    }

}
