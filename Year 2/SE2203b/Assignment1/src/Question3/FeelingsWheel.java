package Question3;

import Question1.Rollable;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class FeelingsWheel implements Rollable<String> {

    // hold the feelings information here to start
    private List<String> rawFeelings = new ArrayList<String>();
    private String[] feelings;
    private int[] wheelSize;
    private int counter = 0;

    /**
     * The constructor
     * @param filename
     */
    public FeelingsWheel(String filename) {
        readTextFile(filename);
        getFeelingNames();
        getWheelSize();
    }

    /**
     * Read the text file
     *
     * @param filename
     */
    public void readTextFile(String filename) {
        File file = new File("./" + filename);
        try {
            BufferedReader br = new BufferedReader(new FileReader(file));
            String st;
            while ((st = br.readLine()) != null && !st.equals("")) {
                rawFeelings.add(st);
            }
        } catch (Exception ex) {
            // caught an error...
            System.out.println("An error occurred");
        }
    }

    /**
     * Get the wheel size
     * if we hit a 1, then we have rolled over...
     * so we need to count how many lines we skipped until we hit 1 again
     * e.g.
     * --------
     * romantic 1
     * fond 0
     * sentimental 1
     * --------
     * This would be size 2 since we hit 1 the third time, resetting it
     *
     * @return the wheel size
     */
    private int getWheelSize() {

        int size = 0;
        for (int i = 0; i < rawFeelings.size(); i++) {
            int num = Integer.parseInt(rawFeelings.get(i).split(" ")[1]);
            // the first one is always 1, if it's not it means it's an inner wheel
            // check if it's 1, if it is then we have hit the end of wheel
            if (num == 1 && i != 0) {
                size = i;
                break;
            }

        }
        // if size is still 0, then it means that it's obviously the inner wheel
        // so let's just get the size of the array list
        if (size == 0) {
            return rawFeelings.size();
        }

        return size;
    }

    /**
     * Get the feeling names
     */
    private void getFeelingNames() {
        // initiate the feelings with the size of the array since we now know that
        feelings = new String[rawFeelings.size()];
        wheelSize = new int[rawFeelings.size()];

        // loop through the array list
        for (int i = 0; i < rawFeelings.size(); i++) {
            // split line by line and get the first index (the word)
            try {
                String line = rawFeelings.get(i);
                feelings[i] = line.split(" ")[0];
                wheelSize[i] = Integer.parseInt(line.split(" ")[1]);
            } catch (Exception e) {
                System.out.println(feelings[i]);
            }
        }
    }


    /**
     * Reset the counter
     */
    @Override
    public void reset() {
        if (counter == wheelSize.length - 1) {
            counter = 0;
        }
    }


    /**
     * Increase the counter
     */
    @Override
    public void increase() {
        // in case, to prevent any unexpected errors
        if (wheelSize[0] == 0 && counter == wheelSize.length - 1) {
            counter = 0;
            return;
        }
        counter++;
        // in case...
        if (counter == wheelSize.length - 1) {
            counter = 0;
        }
    }


    /**
     * If it's last rolled over
     * @return
     */
    @Override
    public boolean lastRolledOver() {
        if (counter != 0) {
            return wheelSize[counter] == 1;
        }

        return false;
    }

    /**
     * Get the value of the wheel
     * @return
     */
    @Override
    public String getValue() {
        return feelings[counter]; // return as string
    }

    /**
     * Convert to string
     * @return
     */
    public String toString() {
        return getValue();
    }
}