package rbhatt23.lab01;

import java.util.Scanner;

public class rbhatt23_lab01_q1 {

    public static void main(String[] args) {


        System.out.println("******************************************************");
        System.out.println("ES1036b: Lab 01 Q1");
        System.out.println("Date: January 28, 2019");
        System.out.println("Name: Rishab Bhatt");
        System.out.println("Student Number: 251028696");
        System.out.println("Program’s mission: Compute the volume of a cone");
        System.out.println("******************************************************");
        System.out.println();

        // Scanner
        Scanner scan = new Scanner(System.in);

        // Get the height and radius from user
        System.out.println("Enter the height of the cone: ");
        double height = scan.nextDouble();

        System.out.println("Enter the radius of the cone: ");
        double radius = scan.nextDouble();

        // Calculate the volume
        double volume = (Math.PI * Math.pow(radius, 2) * height) / 3;

        // Print the output
        System.out.printf("The volume of a cone with radius %f cm and height %f cm is: \n%f", radius, height, volume);

    }
}
