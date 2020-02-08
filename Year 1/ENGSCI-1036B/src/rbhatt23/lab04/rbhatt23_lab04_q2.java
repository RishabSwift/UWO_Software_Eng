package rbhatt23.lab04;

import java.util.Scanner;

public class rbhatt23_lab04_q2 {

    // If the first parallelogram is complete...
    private static boolean firstCompleted = false;

    public static void main(String[] args) {

        Scanner scan = new Scanner(System.in);

        System.out.println("Please enter a size: ");
        int size = scan.nextInt();

        // Do Repetitions
        while (true) {
            System.out.println("\nPlease enter the number of repetitions (0 to exit):");
            int repetitions = scan.nextInt();

            if (repetitions == 0) {
                break;
            }
            for (int i = 1; i <= size; i++) {
                // Start another loop because we wanna add another parallelogram for every repetition
                for (int j = 0; j < repetitions; j++) {
                    printSingleLine(size, i);
                    // Keeps track weather the FIRST parallelogram is complete because we need the initial empty white space
                    if (j == 0) {
                        firstCompleted = true;
                    }
                    // Print 3 white spaces before the next parallelogram is printed
                    System.out.print("   ");
                }
                firstCompleted = false;
                // New line for the next row of #'s
                System.out.println();
            }
        }

        System.out.println("Goodbye!");
    }


    /**
     * Print single lines of parallelogram
     * @param size size of parallelogram
     * @param i current index
     */
    private static void printSingleLine(int size, int i) {
        // Print white spaces

        // Only place initial white spaces
        if (!firstCompleted) {
            for (int j = size; j >= i; j--) {
                System.out.print(" ");
            }
        }

        // Start over the loop again
        // Handles COLUMNS
        for (int j = 1; j <= size; j++) {
            // If it's the first and last line, print all the #'s
            if (i == 1 || i == size) {
                // to remove trailing space from last and first line
                System.out.print(j == size ? "#" : "# ");
            } else {
                // If it's the first column, put a # and add a white space
                if (j == 1) {
                    System.out.print("# ");
                    // If it's the last column, put a # at the end
                } else if (j == size) {
                    System.out.print("#");
                } else {
                    // If it's neither, then place two white spaces for the middle stuff
                    System.out.print("  ");
                }
            }
        }

    }

}
