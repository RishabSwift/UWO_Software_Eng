package Question2;

import Question1.ConsoleDisplayInterface;
import java.util.Timer;
import java.util.TimerTask;

public class DigitalClock extends TimerTask {
    Wheel seconds = new Wheel(0, 59);
    Wheel minutes = new Wheel(0, 59);
    Wheel hours = new Wheel(0, 23);
    ConsoleDisplayInterface<Integer> theClock = new ConsoleDisplay<Integer>(hours, minutes, seconds);

    public void run() {
        String theTime = String.format("%02d:%02d:%02d", theClock.getWheelValue(3),
                theClock.getWheelValue(2),theClock.getWheelValue(1));

        System.out.print("\r" + theTime);
        theClock.increase();
    }

    public static void main(String[] args)
    {
        System.out.println("Wheels based clock");
        System.out.println("==================");
        Timer timer = new Timer();
        timer.schedule(new DigitalClock(), 0, 1000);
    }
}
