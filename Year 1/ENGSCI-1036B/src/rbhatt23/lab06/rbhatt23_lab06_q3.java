package rbhatt23.lab06;

import java.util.Scanner;

public class rbhatt23_lab06_q3 {

    private static int[] pickedCards = new int[52];

    public static void main(String[] args) {

        printHeader(6, 3, "Rishab", "Bhatt", "Simple card game using arrays");

        Scanner scan = new Scanner(System.in);

        String[] deck = new String[52];
        String[] suits = {"H", "C", "D", "S"};

        populateDeck(deck, suits);

        while (true) {
            int firstCardIndex = drawCardAsIndex();
            int secondCardIndex = drawCardAsIndex();
            int higherCardIndex = -1;

            // If the cards are the same... draw the second card again
            while (higherCardIndex == -1) {
                secondCardIndex = drawCardAsIndex();
                higherCardIndex = higherCard(firstCardIndex, secondCardIndex);
            }

            String secondCardDrawnMessage = String.format("The second card drawn was %s", showCard(deck[secondCardIndex]));

            System.out.println("\nThe first card drawn was " + showCard(deck[firstCardIndex]));
            System.out.println("Will the next card be higher? (y/n)");
            String input = scan.nextLine();
            System.out.println();

            if (higherCardIndex == firstCardIndex) {
                if (input.contains("y")) {
                    System.out.println(secondCardDrawnMessage);
                    System.out.println("Too bad!");
                } else {
                    System.out.println(secondCardDrawnMessage);
                    System.out.println("You were correct!");
                }
            } else {
                if (input.contains("y")) {
                    System.out.println(secondCardDrawnMessage);
                    System.out.println("You were correct!");
                } else {
                    System.out.println(secondCardDrawnMessage);
                    System.out.println("Too bad!");
                }
            }


            System.out.println("\nWould you like to play again? (y/n)");
            input = scan.nextLine();
            if (input.equals("n")) {
                break;
            }
        }

        System.out.println("\nGoodbye!");

    }

    /**
     * Populate the deck
     * @param deck
     * @param suits
     */
    private static void populateDeck(String[] deck, String[] suits) {
        // Count from 0-51 to fill in the cards array
        int start = 0;
        for (int i = 1; i <= suits.length; i++) {
            for (int j = 1; j <= 13; j++) {
                deck[start] = j + suits[i - 1];
                start++;
            }
        }
    }

    private static String showCard(String cardValue) {
        cardValue = cardValue.replace("11", "J");
        cardValue = cardValue.replace("12", "Q");
        cardValue = cardValue.replace("13", "K");
        cardValue = cardValue.replace("\\b1H\\b", "AH"); // escape the entire word not just one occurrence of 1
        cardValue = cardValue.replace("\\b1C\\b", "AC"); // escape the entire word not just one occurrence of 1
        cardValue = cardValue.replace("\\b1D\\b", "AD"); // escape the entire word not just one occurrence of 1
        cardValue = cardValue.replace("\\b1S\\b", "AS"); // escape the entire word not just one occurrence of 1
        return cardValue;
    }

    private static int drawCardAsIndex() {
        int index = (int) (Math.random() * ((52 - 1) + 1));
        // If the card has already been picked, draw another one...
        while (pickedCards[index] == 1) {
            index = (int) (Math.random() * ((52 - 1) + 1));
        }
        return index;
    }

    private static int higherCard(int firstCardIndex, int secondCardIndex) {
        // Ordered deck ranked by highest card to lowest.. Ace of Spades being the highest...
        int[] rankedDeck = {40, 27, 14, 1, 52, 39, 26, 13, 51, 38, 25, 12, 50, 37, 24, 11, 49, 36, 23, 10, 48, 35, 22, 9, 47, 34, 21, 8, 46, 33, 20, 7, 45, 32, 19, 6, 44, 31, 18, 5, 43, 30, 17, 4, 42, 29, 16, 3, 41, 28, 15, 2};
        int firstPosition = -1, secondPosition = -1;
        for (int i = 0; i < 52; i++) {
            if (rankedDeck[i] == firstCardIndex) {
                firstPosition = i;
            }

            if (rankedDeck[i] == secondCardIndex) {
                secondPosition = i;
            }
        }

        if (firstPosition < secondPosition) {
            return firstCardIndex;
        }
        return secondCardIndex;

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
