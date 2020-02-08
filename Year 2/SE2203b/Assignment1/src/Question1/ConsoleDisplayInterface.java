package Question1;

public interface ConsoleDisplayInterface <T> {

    /**
     * Reset the counter
     */
    public void reset();

    /**
     * Increase the counter
     */
    public void increase();

    /**
     * Get the current wheel value
     * @param theWheel
     * @return T
     */
    public T getWheelValue(int theWheel);

    /**
     * Determine the number of wheels in use
     * @return T
     */
    public int getWheelsInUse();
}
