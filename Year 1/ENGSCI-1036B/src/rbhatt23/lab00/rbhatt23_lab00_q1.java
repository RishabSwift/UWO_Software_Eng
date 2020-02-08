package rbhatt23.lab00;

import java.util.Scanner;

public class rbhatt23_lab00_q1 {

    public static void main(String[] args) {
        int integer1 = 0;
        int integer2 = 0;
        int result;
        Scanner scan = new Scanner(System.in);

        System.out.println("Enter an integer");

        integer1 = scan.nextInt();

        System.out.println("Enter a second integer");
        integer2 = scan.nextInt();

        result = integer1 / integer2 * integer1 + integer1;

        System.out.println("The result is " + result);

        scan.close();
    }
}
