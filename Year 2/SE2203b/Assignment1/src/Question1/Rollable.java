package Question1;

public interface Rollable<T> {

    /**
     * Reset the counter to minimum value
     */
    public void reset();

    /**
     * Increase the value on the counter
     */
    public void increase();

    /**
     * Test whether the last increase caused a rollover
     * @return boolean
     */
    public boolean lastRolledOver();

    /**
     * Get the value of the counter
     * @return T
     */
    public T getValue();

}
