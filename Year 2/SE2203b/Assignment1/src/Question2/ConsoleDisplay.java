package Question2;

import Question1.ConsoleDisplayInterface;
import Question1.Rollable;

import java.util.*;

public class ConsoleDisplay<T> implements ConsoleDisplayInterface<T> {

    public List<Rollable<T>> wheels = new ArrayList<Rollable<T>>();


    /**
     * Constructor with only one wheel
     *
     * @param seconds
     */
    public ConsoleDisplay(Rollable<T> seconds) {
        wheels.add(seconds);
    }

    /**
     * Overloading a constructor with 2 parameters
     *
     * @param seconds
     * @param minutes
     */
    public ConsoleDisplay(Rollable<T> seconds, Rollable<T> minutes) {
        this(seconds);
        wheels.add(minutes);
    }

    /**
     * Overloading a constructor with 3 parameters
     *
     * @param hours
     * @param minutes
     * @param seconds
     */
    public ConsoleDisplay(Rollable<T> hours, Rollable<T> minutes, Rollable<T> seconds) {
        this(seconds, minutes);
        wheels.add(hours);
    }


    /**
     * Reset method that resets all the wheels.
     */
    @Override
    public void reset() {
        for (Rollable<T> wheel : wheels) {
            wheel.reset();
        }
    }

    /**
     * Increase the counter by ensuring it's not rolled over and such.
     */
    @Override
    public void increase() {


        // if the seconds is rolled over for example, (meaning it reaches 60 for ex)
        // then reset it and increase the minutes by 1 and keep the count going
        for (int i = 0; i < wheels.size(); i++) {
            if (wheels.get(i).lastRolledOver()) {
                if (i + 1 == wheels.size()) {
                    reset();
                } else {
                    wheels.get(i + 1).increase();
                    wheels.get(i).reset();
                }
            }
        }

        // increase the first one on the Array List
        wheels.get(0).increase();

    }

    /**
     * Get the wheel value
     *
     * @param theWheel
     * @return wheel value
     */
    @Override
    public T getWheelValue(int theWheel) {
        return wheels.get(theWheel - 1).getValue();
    }

    /**
     * Check how many wheels are being used
     *
     * @return
     */
    @Override
    public int getWheelsInUse() {
        return wheels.size();
    }
}
