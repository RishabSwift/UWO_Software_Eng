import java.lang.*;

public class QueueSimulator
{
    /**
     * An enum of the events
     */
    public static enum Event
    {
        ARRIVAL,
        DEPARTURE
    };

    /**
     * Current time
     */
    private double currTime;

    /**
     * Arrival rate
     */
    private double arrivalRate;

    /**
     * Service time
     */
    private double serviceTime;

    /**
     * Time for the next arrival
     */
    private double timeForNextArrival;

    /**
     * Time for the next departure
     */
    private double timeForNextDeparture;

    /**
     * Total simulation time
     */
    private double totalSimTime;

    /**
     * A queue for the Data objects that are to be processed
     */
    private LinkedListQueue<Data> buffer = new LinkedListQueue<Data>();

    /**
     * A queue for the data objects that were already processed
     */
    private LinkedListQueue<Data> eventQueue = new LinkedListQueue<Data>();

    /**
     * The upcoming event whether it's an Arrival or a Departure
     */
    private Event e;

    /**
     * A method that returns a random arrival time based on the arrival rate
     * @param arrivalRate The arrival rate
     * @return Time for the next arrival
     */
    public double getRandTime(double arrivalRate)
    {
        double num, time1, max=1, min=0, randNUM;
        randNUM= Math.random();
        time1= (-1/arrivalRate) * (Math.log(1-randNUM));
        //System.out.println(time1);
        return time1;
    }

    /**
     * A constructor that takes arrival time, service time and simulation time in the arguments
     * @param aR Arrival rate
     * @param servT Service time
     * @param simT Simulation time
     */
    public QueueSimulator(double aR, double servT, double simT)
    {
        // Just sets the fields with the values passed in the arguments
        // And current time starts at 0
        currTime = 0;
        arrivalRate = aR;
        serviceTime = servT;
        totalSimTime = simT;

        // timeForNextArrival is initialized with random time for arrival
        timeForNextArrival = getRandTime(arrivalRate);
        // timeForNextDeparture is initialized with timeForNextArrival plus the serviceTime
        timeForNextDeparture = timeForNextArrival + serviceTime;
    }

    /**
     * Calculates the average of an array of double values
     * @param arr Array of double values
     * @return The average of the array
     */
    private static double calculateAverage(double[] arr)
    {
        double sum = 0;
        for(int i = 0; i < arr.length; i++)
            sum += arr[i];

        return sum / arr.length;
    }

    /**
     * It calculates the average of waiting times
     * @return The average of waiting times
     */
    public double calcAverageWaitingTime()
    {
        // Initialize an array for the waiting times of all the Data objects in the eventQueue
        double[] waitingTimes = new double[eventQueue.size()];
        int i = 0;
        // At each iteration, dequeue the Data object and add its waiting time to the array
        while(eventQueue.size() > 0)
        {
            Data data = eventQueue.dequeue();
            waitingTimes[i] = data.getWaitingTime();
            i++;
        }

        // Return the average of the array
        return calculateAverage(waitingTimes);
    }

    /**
     * It runs the simulation and returns the average of waiting times
     * @return The average of waiting times
     */
    public double runSimulation()
    {
        // Keep looping until the current time reaches the total simulation time
        while(currTime < totalSimTime)
        {
            // If there are no data objects in the queue
            // Then the next event should forcely be an Arrival
            // So set the timeForNextDeparture to timeForNextArrival plus serviceTime just like what was done in the constructor
            if(buffer.isEmpty())
            {
                timeForNextDeparture = timeForNextArrival + serviceTime;
            }

            // Decide what's the next event whether an arrival or a departure
            // Based on comparing timeForNextArrival and timeForNextDeparture
            e = timeForNextArrival < timeForNextDeparture ? Event.ARRIVAL : Event.DEPARTURE;

            if(e == Event.ARRIVAL)
            {
                // If it's an arrival

                // Update the current time
                currTime = timeForNextArrival;

                // Initialize a new Data object and setting its arrivalTime to the currentTime
                Data data = new Data();
                data.setArrivalTime(currTime);

                // Add it to the queue
                buffer.enqueue(data);

                // Calculate the new timeForNextArrival which is the current time plus the random time for arrival
                timeForNextArrival = currTime + getRandTime(arrivalRate);
            }
            else
            {
                // If it's a departure
                currTime = timeForNextDeparture;

                // Dequeue the data object from the buffer queue
                Data data = buffer.dequeue();
                // Set its departure time with the current time
                data.setDepartureTime(currTime);

                // Add it to the events queue
                eventQueue.enqueue(data);

                // Calculate the timeForNextDeparture which is the current time plus serviceTime
                timeForNextDeparture = currTime + serviceTime;
            }
        }

        // Returns the average of waiting times
        return calcAverageWaitingTime();
    }
}