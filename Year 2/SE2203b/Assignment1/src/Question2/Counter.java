package Question2;

public class Counter {
    private int counter;

    public Counter(int counter) {
        this.counter = counter;
    }

    /**
     * Increase the count by 1
     */
    public void increase() {
        counter++;
    }

    /**
     * Decrease the count by 1
     */
    public void decrease() {
       counter--;
    }

    /**
     * Get the current count
     * @return count
     */
    public int getCount() {
        return counter;
    }

    /**
     * Determine if the counter is 0
     * @return true if counter = 0
     */
    public boolean isZero() {
        return counter == 0;
    }

    /**
     * Get a nice string that's formatted.
     * @return String
     */
    public String toString() {
        return String.valueOf(counter);
    }
}
