package rbhatt23.lab03;

import java.util.Scanner;

public class rbhatt23_lab03_q3 {

    public static void main(String[] args) {


        System.out.println("******************************************************");
        System.out.println("ES1036b: Lab 03 Q1");
        System.out.println("Date: February 11, 2019");
        System.out.println("Name: Rishab Bhatt");
        System.out.println("Student Number: 251028696");
        System.out.println("Program’s mission: Calculate statistics on a set of integer inputs");
        System.out.println("******************************************************");
        System.out.println();

        Scanner scan = new Scanner(System.in);

        System.out.println("Enter an integer number for the number of loop iterations:");
        int iterations = scan.nextInt();
// Set to the highest number you can set to easily get max/min
        int min = 999999999, max = -999999999, odd = 0, even = 0, sum = 0;
        double mean;

        for (int i = 1; i <= iterations; i++) {
            System.out.printf("\nEnter integer %d\n", i);

            // Get the max, min num
            int num = scan.nextInt();
            max = Math.max(max, num);
            min = Math.min(min, num);

            // Get even and odd count
            if (num % 2 == 0) {
                even++;
            } else {
                odd++;
            }

            // Calculate mean
            sum += num;
            mean = (double) sum / (double) iterations;

            // Output
            System.out.printf("The mean of %d input(s) is %f\n", iterations, mean);
            System.out.printf("Max value: %d\nMin value: %d\nEven Count: %d\nOdd Count: %d\n", max, min, even, odd);
        }


        System.out.println("Good bye!");
    }
}
