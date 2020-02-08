package rbhatt23.lab04;

import java.util.Scanner;

public class rbhatt23_lab04_q3 {

    private static int difficulityLevel, typeOfProblem, userInput, maxRange, minRange = 0, totalCorrect = 0;
    private static char operators[] = {'+', '-', '*'}, selectedOperator;
    private static long getTimes[] = new long[10];
    private static boolean randomOperator = false;

    private static Scanner scan = new Scanner(System.in);

    public static void main(String[] args) {

        System.out.println("Welcome to the math practice program!");

        // Run this loop until the user exits
        while (true) {
            getDifficultyLevel();
            getProblemType();

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
                    getDifficultyLevel();
                    getProblemType();
                    break;
                case 6:
                    System.out.println("Goodbye!");
                    return;
                default:
                    break;
            }

            askQuestions();

            // Calculate average time per problem
            double totalTime = 0;
            // The variable getTimes[] has an array of times for each question... Just get a sum and find the average!
            for (long time : getTimes) {
                totalTime += time;
            }
            double averageTime = totalTime / getTimes.length / 1000;

            // Final message
            System.out.printf("\n\nYou scored %d/10 questions correctly and the average question time was %f seconds\n\n\n", totalCorrect, averageTime);
        }

    }

    /**
     * Show difficulty messages and get the level
     */
    private static void getDifficultyLevel() {
        System.out.println("Please choose a difficulty level:");
        System.out.println("1) Easy: Integers ranging 0 to 10");
        System.out.println("2) Medium: Integers ranging 0 to 100");
        System.out.println("3) Hard: Integers ranging -100 to 100");

        userInput = getInput(3, "Invalid difficulty choice!");
        difficulityLevel = userInput;

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
    private static void getProblemType() {
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
     * @return array of random numbers
     */
    private static int[] generateNumbersForQuestion() {
        return new int[]{getRandomNumber(minRange, maxRange), getRandomNumber(minRange, maxRange)};
    }

    /**
     * Ask the questions with operators
     */
    private static void askQuestions() {

        // Run the loop 10 times for 10 questions
        for (int i = 1; i <= 10; i++) {

            // Get the beginning time
            long startTime = System.currentTimeMillis();
            System.out.println("Question " + i);

            // Generate two numbers to ask for the question
            int[] numbers = generateNumbersForQuestion();
            int firstNumber = numbers[0];
            int secondNumber = numbers[1];
            int answer = 0;

            // If user choose a random operator, get a random operator every time a question is asked
            if (randomOperator) {
                selectedOperator = operators[getRandomNumber(0, 2)];
            }

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
            getTimes[i - 1] = System.currentTimeMillis() - startTime;

        }
    }

    /**
     * Get a random number
     *
     * @param min number
     * @param max number
     * @return random number between range
     */
    private static int getRandomNumber(int min, int max) {
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
}
