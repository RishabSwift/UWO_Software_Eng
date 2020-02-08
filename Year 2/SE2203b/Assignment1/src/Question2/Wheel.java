package Question2;

import Question1.Rollable;

public class Wheel extends Counter implements Rollable<Integer> {

    // the min num of the counter
    private int min;
    // the max num the counter can go to before it overflows and it's reset to 0
    private int max;

    /**
     * Wheel constructor that sets the counter value in the super class (Counter class)
     * @param min
     * @param max
     */
    public Wheel(int min, int max) {
        // the Counter starts with the min
        super(min);
        this.min = min;
        this.max = max;
    }

    /**
     * Reset the counter to 0
     * Since the UML diagram doesn't have a reset method, we decrease it until it's 0
     */
    @Override
    public void reset() {
        // if it's not zero, decrease it until it's 0...
        while (!super.isZero()) {
            super.decrease();
        }
    }

    /**
     * Determine if there was a roll over
     * @return true if rolled over
     */
    @Override
    public boolean lastRolledOver() {
        // ensure the counter is less than the max... otherwise it'll be rolled over
        return super.getCount() > max;
    }

    /**
     * get the value of the counter
     * @return
     */
    @Override
    public Integer getValue() {
        return super.getCount(); // from super method
    }
}
