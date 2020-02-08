package rbhatt23.lab06;

import java.util.Scanner;

public class rbhatt23_lab06_q2 {

    public static void main(String[] args) {

        Scanner scan = new Scanner(System.in);
        System.out.println("How many dice would you like to roll?");

        // Get number from user
        int num = scan.nextInt();

        // New array that's size of number
        int[] diceOutput = new int[num];

        // Roll dice and store in array
        for (int i = 0; i < num; i++) {
            diceOutput[i] = rollDice();
        }

        // Get the occurrences and output it
        outputOccurrences(getOccurrences(diceOutput));
        System.out.println("Mean: " + getMean(diceOutput));
        System.out.println("StdDev : " + getStandardDeviation(diceOutput));
    }

    /**
     * Roll the dice
     * @return random number between 1 - 6
     */
    private static int rollDice() {
        return (int) (Math.random() * ((6 - 1) + 1)) + 1;
    }

    /**
     * Get the mean value
     * @param diceOutput array
     * @return mean
     */
    private static int getMean(int[] diceOutput) {
        int mean = 0;
        for (int num : diceOutput) {
            mean += num;
        }
        return mean / diceOutput.length;
    }

    /**
     * et the occurrences of each number after the dice has been rolled
     * @param diceOutput array
     * @return occurrences array
     */
    private static int[] getOccurrences(int[] diceOutput) {
        int[] occurrences = new int[6];

        for (int i = 0; i < diceOutput.length; i++) {
            occurrences[diceOutput[i] - 1]++;
        }
        return occurrences;
    }

    /**
     * Output the occurrences of each number after the dice has been rolled
     * @param occurrences array
     */
    private static void outputOccurrences(int[] occurrences) {
        for (int i = 0; i < occurrences.length; i++) {
            System.out.printf("%d's: %d\n", i + 1, occurrences[i]);
        }
    }

    /**
     * Get standard deviation
     * @param diceOutput dice output
     * @return StdDev
     */
    private static int getStandardDeviation(int[] diceOutput) {
        int sum = 0;
        for (int i = 0; i < diceOutput.length; i++) {
            sum += Math.pow((diceOutput[i] - getMean(diceOutput)), 2);
        }

        return (int) Math.sqrt(sum / diceOutput.length);
    }

}
