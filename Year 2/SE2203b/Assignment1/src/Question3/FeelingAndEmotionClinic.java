package Question3;

import Question1.ConsoleDisplayInterface;
import Question1.Rollable;
import Question2.ConsoleDisplay;
import java.util.Timer;
import java.util.TimerTask;

public class FeelingAndEmotionClinic extends TimerTask {
    Rollable<String> outerWheel = new FeelingsWheel("OuterWheel.txt");
    Rollable<String> middleWheel = new FeelingsWheel("MiddleWheel.txt");
    Rollable<String> innerWheel = new FeelingsWheel("InnerWheel.txt");
    ConsoleDisplayInterface<String> theChart = new
            ConsoleDisplay<String>(innerWheel, middleWheel, outerWheel);

    public void run() {
        String theTreatment = String.format("You are feeling %s because you are %s and %s.", theChart.getWheelValue(3),
                theChart.getWheelValue(2),theChart.getWheelValue(1));
        System.out.print("\r" + theTreatment);
        theChart.increase();
    }

    public static void main(String[] args) {
        System.out.println("--------------------------------------------");
        System.out.println("Welcome to SE2203b Feeling and Emotion Clinic");
        System.out.println("--------------------------------------------");
        System.out.println();

        Timer timer = new Timer();
        timer.schedule(new FeelingAndEmotionClinic(), 0, 1500);
    }
}
