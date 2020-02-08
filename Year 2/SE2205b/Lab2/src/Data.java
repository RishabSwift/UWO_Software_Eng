public class Data
{
    /**
     * Arrival time
     */
    private double arrivalTime;

    /**
     * Departure time
     */
    private double departureTime;

    public Data()
    {
        arrivalTime = 0;
        departureTime = 0;
    }

    public double getArrivalTime()
    {
        return arrivalTime;
    }

    public void setArrivalTime(double a)
    {
        arrivalTime = a;
    }

    public double getDepartureTime()
    {
        return departureTime;
    }

    public void setDepartureTime(double d)
    {
        departureTime = d;
    }

    /**
     * Gets the waiting time which is the difference between departureTime and arrivalTime
     * @return The waiting time
     */
    public double getWaitingTime()
    {
        return getDepartureTime() - getArrivalTime();
    }
}