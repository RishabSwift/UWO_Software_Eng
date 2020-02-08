package rbhatt23.lab05;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class rbhatt23_lab05_q3 {

    private static int typeOfProblem;
    private static int userInput;
    private static int maxRange;
    private static int minRange = 0;
    private static int totalCorrect = 0;
    private static char[] operators = {'+', '-', '*'};
    private static List<Long> getTimes = new ArrayList<>();
    private static boolean randomOperator = false;

    private static Scanner scan = new Scanner(System.in);

    public static void main(String[] args) {

        printHeader(5, 3, "Rishab", "Bhatt", "Practicing simple math problems");


        char selectedOperator = ' ';

        // Run this loop until the user exits
        while (true) {
            fetchDifficulty();
            fetchProblemType();

            // Set their type of problem in a variable
            switch (typeOfProblem) {
                // Addition
                case 1:
                    selectedOperator = operators[0];
                    break;
                // Subtraction
                case 2:
                    selectedOperator = operators[1];
                    break;
                // Multiplication
                case 3:
                    selectedOperator = operators[2];
                    break;
                case 4:
                    // Random operator
                    randomOperator = true;
                    break;
                case 5:
                    fetchDifficulty();
                    fetchProblemType();
                    break;
                case 6:
                    System.out.println("Goodbye!");
                    return;
                default:
                    break;
            }

            // Run the loop 10 times for 10 questions
            for (int i = 1; i <= 10; i++) {
                System.out.println("Question " + i);
                if (randomOperator) {
                    displayQuestion();
                } else {
                    displayQuestion(selectedOperator);
                }
            }

            // Calculate average time per problem
            double totalTime = 0;
            // The variable getTimes[] has an array of times for each question... Just get a sum and find the average!
            for (long time : getTimes) {
                totalTime += time;
            }
            double averageTime = totalTime / getTimes.size() / 1000;

            // Final message
            System.out.printf("\n\nYou scored %d/10 questions correctly and the average question time was %f seconds\n\n\n", totalCorrect, averageTime);
        }

    }

    /**
     * Show difficulty messages and get the level
     */
    private static void fetchDifficulty() {
        System.out.println("Please choose a difficulty level:");
        System.out.println("1) Easy: Integers ranging 0 to 10");
        System.out.println("2) Medium: Integers ranging 0 to 100");
        System.out.println("3) Hard: Integers ranging -100 to 100");

        userInput = getInput(3, "Invalid difficulty choice!");
        int difficulityLevel = userInput;

        switch (difficulityLevel) {
            case 1:
                minRange = 0;
                maxRange = 10;
                break;
            case 2:
                minRange = 0;
                maxRange = 100;
                break;
            case 3:
                maxRange = 100;
                minRange = -100;
                break;
            default: // don't really need this but can't hurt
                maxRange = 100;
                break;
        }
    }

    /**
     * Get the problem type and show the options
     */
    private static void fetchProblemType() {
        System.out.println("Please select the type(s) of problems:");
        System.out.println("1. Addition");
        System.out.println("2. Subtraction");
        System.out.println("3. Multiplication");
        System.out.println("4. Random");
        System.out.println("5. Change Difficulty");
        System.out.println("6. Exit");

        userInput = getInput(6, "Invalid type of problem selected!");
        typeOfProblem = userInput;
    }

    /**
     * Generate 2 random numbers to ask in the question depending on the range and such
     *
     * @return array of random numbers
     */
    private static int[] generateNumbersForQuestion() {
        return new int[]{randomInt(minRange, maxRange), randomInt(minRange, maxRange)};
    }

    /**
     * If user choose a random operator, get a random operator every time a question is asked
     */
    private static void displayQuestion() {
        displayQuestion(operators[randomInt(0, 2)]);
    }

    /**
     * Ask the questions with operators
     */
    private static void displayQuestion(char selectedOperator) {

        // Get the beginning time
        long startTime = System.currentTimeMillis();

        // Generate two numbers to ask for the question
        int[] numbers = generateNumbersForQuestion();
        int firstNumber = numbers[0];
        int secondNumber = numbers[1];
        int answer = 0;


        System.out.printf("What is the result of %d %s %d?\n", firstNumber, selectedOperator, secondNumber);

        // Calculate the answer to check if what they typed is correct
        switch (selectedOperator) {
            case '+':
                answer = firstNumber + secondNumber;
                break;
            case '-':
                answer = firstNumber - secondNumber;
                break;
            case '*':
                answer = firstNumber * secondNumber;
                break;
            default:
                break;
        }

        // Get user answer
        userInput = scan.nextInt();

        // Check their answer
        if (answer == userInput) {
            System.out.println("Correct!\n");
            totalCorrect++;
        } else {
            System.out.println("Incorrect! The correct answer is " + answer + "\n");
        }

        // Get current time and subtract it from the start time and add it to the array
        // The array has all the times taken for each questions so we can easily calculate the average after
        getTimes.add(System.currentTimeMillis() - startTime);
    }

    /**
     * Get a random number
     *
     * @param min number
     * @param max number
     * @return random number between range
     */
    private static int randomInt(int min, int max) {
        return (int) (Math.random() * ((max - min) + 1)) + min;
    }

    /**
     * Get user input, validate it while showing appropriate messages, and return it
     *
     * @param high         the max number user can enter
     * @param errorMessage The error message to show when user screws up
     * @return input
     */
    private static int getInput(int high, String errorMessage) {

        String greeting = String.format("Please input a choice (1-%d):", high);

        System.out.println(greeting);

        userInput = scan.nextInt();

        // User has an invalid input
        while (userInput > high || userInput < 1) {
            System.out.println(errorMessage);
            System.out.println(greeting);
            userInput = scan.nextInt();
        }

        // return user input
        return userInput;
    }

    /**
     * Print the header
     *
     * @param labNum      lab number
     * @param questionNum question number
     * @param fName       first name
     * @param lName       last name
     * @param mission     mission
     */
    private static void printHeader(int labNum, int questionNum, String fName, String lName, String mission) {

        String lab = "Lab " + labNum;
        String question = "Question " + questionNum;
        String name = String.format("Name: %s %s", fName, lName);

        // Get the highest length from the many different strings since we need to have the border that's the length of the longest string

        int[] lengths = {lab.length(), question.length(), name.length(), mission.length()};

        int highestLength = 0;
        for (int length : lengths) {
            if (length > highestLength) {
                highestLength = length;
            }
        }

        // Repeat * until it hits the highestLength
        String borders = new String(new char[highestLength]).replace("\0", "*");

        System.out.println(borders);
        System.out.println(mission);
        System.out.println(borders);
        System.out.println(lab);
        System.out.println(question);
        System.out.println(name);
        System.out.println(borders);
    }
}
