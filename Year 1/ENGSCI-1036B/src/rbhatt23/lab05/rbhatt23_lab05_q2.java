package rbhatt23.lab05;

import java.util.Scanner;

public class rbhatt23_lab05_q2 {

    public static void main(String[] args) {

        Scanner scan = new Scanner(System.in);

        double base, power;

        // Get numbers
        System.out.println("Please enter a real number base:");
        base = scan.nextDouble();
        System.out.println("Please enter an integer exponent:");
        power = scan.nextDouble();

        // Output
        System.out.println("The result is: " + computePower(base, power));
    }

    /**
     * Compute the power
     *
     * @param base  base #
     * @param power power #
     * @return answer
     */
    private static double computePower(double base, double power) {

        // Any number to the power of 0 is 1...
        if (power == 0) {
            return 1;
        }

        // Set the answer to 1 first
        double answer = 1;
        // if they entered a negative power... temporarily make the power positive
        boolean negativePower = power < 0;

        // Temporarily change the power to positive
        if (negativePower) {
            power = power * -1;
        }

        // Calculate the power...
        for (int i = 1; i <= power; i++) {
            answer *= base;
        }

        // If it was negative power... return it as 1/answer since it's the reciprocal
        return negativePower ? 1 / answer : answer;
    }

}
