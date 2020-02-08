package rbhatt23.lab00;

import java.util.Scanner;

public class rbhatt23_lab00_q3 {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        double x1, y1, x2, y2, side1, side2, distance;

        System.out.println("Enter x1: ");
        x1 = scan.nextDouble();

        System.out.println("Enter x2: ");
        x2 = scan.nextDouble();

        System.out.println("Enter y1: ");
        y1 = scan.nextDouble();

        System.out.println("Enter y2: ");
        y2 = scan.nextDouble();

        side1 = x2 - x1;
        side2 = y2 - y1;

        distance = Math.sqrt(side1 * side1 + Math.pow(side2, 2.0));

        double perimeter = side1 + side2 + distance;
        System.out.println("The perimeter of the rectangle is " + perimeter);

    }
}
