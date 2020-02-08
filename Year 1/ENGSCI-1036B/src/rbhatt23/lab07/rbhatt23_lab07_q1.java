package rbhatt23.lab07;

import java.util.Scanner;

public class rbhatt23_lab07_q1 {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);

        // Get input
        System.out.println("Welcome! How many strings would you like to sort?");
        int total = scan.nextInt();

        // Initialize array with length of the total strings they're gonna enter
        String[] strings = new String[total];

        // Ask them for that many "total" strings using for loop
        for (int i = 0; i < total; i++) {
            System.out.printf("Please enter string %d: ", i + 1);
            strings[i] = scan.next();
        }

        // Sort array using bubble sort
        sortLength(strings);

        // Print sorted array using foreach loop
        System.out.println("\n\nYour sorted array is:");
        for (String string : strings) {
            System.out.println(string);
        }

        System.out.println("Goodbye!");

    }

    /**
     * Sort the array by its length
     * @param array String array
     */
    private static void sortLength(String[] array) {
        // Loop through the array to keep track of passes
        for (int i = 0; i < array.length; i++) {
            // Loop through the same array
            for (int j = 1; j <= array.length - 1; j++) {
                // Keep comparing using the array lengths
                if (array[j].length() < array[j - 1].length()) {
                    // And swap...
                    // Set a temporary variable and set its value to the first index
                    String temp = array[j];
                    // Swap the values
                    array[j] = array[j - 1];
                    array[j - 1] = temp;
                }
            }
        }
    }

    /**
     * Sort the array using bubble sort
     * #### THIS ONE SORTS ALPHABETICALLY
     *
     * @param array String array
     */
    private static void sortAlphabetically(String[] array) {
        // Loop through the array to keep track of passes
        for (int i = 0; i < array.length; i++) {
            // Loop through the same array
            for (int j = 1; j <= array.length - 1; j++) {
                // Keep comparing the value to the one beside it (which one comes last in
                // alphabetical order) until it is brought to the top of the array
                if (array[j].compareTo(array[j - 1]) < 0) {
                    // And swap...
                    // Set a temporary variable and set its value to the first index
                    String temp = array[j];
                    // Swap the values
                    array[j] = array[j - 1];
                    array[j - 1] = temp;
                }
            }
        }
    }

}
