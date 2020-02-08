package rbhatt23.lab07;

import java.util.Scanner;

public class rbhatt23_lab07_q3 {

    private static Scanner scan = new Scanner(System.in);

    public static void main(String[] args) {
        System.out.println("Please enter the number of employees in the database:");
        int num = scan.nextInt();
        // New Employee[] array with the size of total number of employees
        Employee[] database = new Employee[num];
        // Enter employee data
        enterData(database);
        // Print all entered data
        printReport(database);
    }

    /**
     * Method to enter employee data
     *
     * @param database employee db
     */
    private static void enterData(Employee[] database) {
        for (int i = 0; i < database.length; i++) {
            System.out.printf("\nEmployee %d:\n", i + 1);

            System.out.println("Please enter the first name:");
            String firstName = scan.next();

            System.out.println("Please enter the last name:");
            String lastName = scan.next();

            System.out.println("Please enter the ID:");
            int ID = scan.nextInt();

            int salary;
            while (true) {
                System.out.println("Please enter the salary:");
                salary = scan.nextInt();

                if (salary > 0) {
                    break;
                }

                System.out.println("Salary must be a positive number!");
            }

            database[i] = new Employee(firstName, lastName, ID, salary);
        }
    }

    /**
     * Report report
     *
     * @param database employee db
     */
    private static void printReport(Employee[] database) {
        System.out.println("\nReport for all employees:");
        for (Employee employee : database) {
            employee.printInfo();
        }
    }

    /**
     * New Employee Class
     */
    public static class Employee {

        // Class members!
        String m_firstName, m_lastName;
        int m_ID, m_salary;

        /**
         * Constructor
         * Assign class members with the passed in data from the loop where they enter data
         *
         * @param fName  First Name
         * @param lName  Last Name
         * @param ID     ID
         * @param salary Salary
         */
        private Employee(String fName, String lName, int ID, int salary) {
            this.m_firstName = fName;
            this.m_lastName = lName;
            this.m_ID = ID;
            this.m_salary = salary;
        }

        /**
         * Print employee information in one line
         */
        private void printInfo() {
            System.out.printf("%s %s, ID: %d, Salary: %d\n", m_firstName, m_lastName, m_ID, m_salary);
        }


    }

}
