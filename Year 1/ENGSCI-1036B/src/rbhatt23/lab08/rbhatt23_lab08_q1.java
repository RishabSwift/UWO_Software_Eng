package rbhatt23.lab08;

import java.util.Scanner;

public class rbhatt23_lab08_q1 {

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

            System.out.println("What type of employee will be entered?\n1. Manager\n2. Warehouse\n3. Other");
            int typeOfEmployee = scan.nextInt();

            System.out.println("Please enter the first name:");
            String firstName = scan.next();

            System.out.println("Please enter the last name:");
            String lastName = scan.next();

            System.out.println("Please enter the ID:");
            int ID = scan.nextInt();

            // Get their salary and make sure it's POSITIVE!
            int salary;
            while (true) {
                System.out.println("Please enter the salary:");
                salary = scan.nextInt();

                // if salary is a positive number, no need for the loop to keep running
                if (salary > 0) {
                    break;
                }

                // Only show this message if they enter a negative number because we don't get here unless they enter a negative number
                System.out.println("Salary must be a positive number!");
            }

            // They can be 3 different types of employees!
            switch (typeOfEmployee) {
                case 1: // They chose manager

                    // Get additional information
                    System.out.println("Please enter the store code:");
                    int opcode = scan.nextInt();
                    System.out.println("Please enter the operating budget:");
                    int budget = scan.nextInt();

                    // new Manager class.. which extends the Employee class
                    database[i] = new Manager(firstName, lastName, ID, salary, opcode, budget);

                    break;
                case 2: // They chose Warehouse

                    System.out.println("Please enter the daily shipments assigned:");
                    int dailyShipments = scan.nextInt();

                    database[i] = new Warehouse(firstName,lastName,ID,salary,dailyShipments);

                    break;
                case 3: // They choose other
                    database[i] = new Employee(firstName, lastName, ID, salary);
                    break;
                default:
                    // we're hoping that they won't enter anything other than num between 1-3... so let's just leave it as employee
                    database[i] = new Employee(firstName, lastName, ID, salary);
                    break;
            }

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
            System.out.println(); // for new line
        }
    }

    /**
     * New Employee Class
     */
    public static class Employee {

        // Class members!
        private String m_firstName, m_lastName;
        private int m_ID, m_salary;

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

        private String getFirstName() {
            return this.m_firstName;
        }

        private String getLastName() {
            return this.m_lastName;
        }

        /**
         * Print employee information in one line
         */
        public void printInfo() {
            System.out.printf("%s %s, ID: %d, Salary: %d", getFirstName(), getLastName(), m_ID, m_salary);
        }

    }


    public static class Manager extends Employee {

        private int opCode;
        private double budget;

        /**
         * Constructor
         * Assign class members with the passed in data from the loop where they enter data
         *
         * @param fName  First Name
         * @param lName  Last Name
         * @param ID     ID
         * @param salary Salary
         */
        private Manager(String fName, String lName, int ID, int salary, int opCode, double budget) {
            super(fName, lName, ID, salary);
            this.opCode = opCode;
            this.budget = budget;
        }

        /**
         * Print the information
         */
        @Override
        public void printInfo() {
            // Print the original printInfo() method in the Employee class so we don't have to print that twice...
            super.printInfo();
            // Print the other stuff that hasn't yet been printed out
            System.out.printf(", Store code: %d, Budget: %.2f", opCode, budget);
        }


    }

    public static class Warehouse extends Employee {

        private int shipments;

        /**
         * Constructor
         * Assign class members with the passed in data from the loop where they enter data
         *
         * @param fName  First Name
         * @param lName  Last Name
         * @param ID     ID
         * @param salary Salary
         */
        private Warehouse(String fName, String lName, int ID, int salary, int shipments) {
            super(fName, lName, ID, salary);
            this.shipments = shipments;
        }

        /**
         * Print the information
         */
        @Override
        public void printInfo() {
            // Print the original printInfo() method in the Employee class so we don't have to print that twice...
            super.printInfo();
            // Print the other stuff that hasn't yet been printed out
            System.out.printf(", Shipments: %d", shipments);
        }
    }


}
