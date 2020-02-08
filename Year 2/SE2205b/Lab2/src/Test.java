public class Test{

    public static void p1(){
        int i,n;
        LinkedListQueue<Data> Q = new LinkedListQueue<Data>();
        Data d;
        d= new Data();
        d.setArrivalTime(3);
        d.setDepartureTime(3.1);
        Q.enqueue(d);
        d= new Data();
        d.setArrivalTime(3.5);
        d.setDepartureTime(3.6);
        Q.enqueue(d);
        d= new Data();
        d.setArrivalTime(3.8);
        d.setDepartureTime(3.9);
        Q.enqueue(d);
        d= new Data();
        d.setArrivalTime(4.1);
        d.setDepartureTime(4.2);
        Q.enqueue(d);

        n=Q.size();

        for (i=0; i<n-1; i++) {
            d=Q.dequeue();
            System.out.println("Arrival Time: "+d.getArrivalTime()+", Departure Time: "+d.getDepartureTime());
        }
    }

    public static void p2(){
        QueueSimulator qS = new QueueSimulator(1,0.1,100000);
        double sT = qS.runSimulation();

        System.out.println();
        System.out.println("Simulated for 100000s with Arrival Rate of 1 packets/sec and Service Rate of 10 packets/sec:");
        System.out.println("Sojourn time is "+sT+" seconds");
        System.out.println();

        qS = new QueueSimulator(5,0.1,100000);
        sT = qS.runSimulation();

        System.out.println("Simulated for 100000s with Arrival Rate of 5 packets/sec and Service Rate of 10 packets/sec:");
        System.out.println("Sojourn time is "+sT+" seconds");
        System.out.println();

        qS = new QueueSimulator(7,0.1,100000);
        sT = qS.runSimulation();

        System.out.println("Simulated for 100000s with Arrival Rate of 7 packets/sec and Service Rate of 10 packets/sec:");
        System.out.println("Sojourn time is "+sT+" seconds");
        System.out.println();

        qS = new QueueSimulator(9,0.1,100000);
        sT = qS.runSimulation();

        System.out.println("Simulated for 100000s with Arrival Rate of 9 packets/sec and Service Rate of 10 packets/sec:");
        System.out.println("Sojourn time is "+sT+" seconds");
        System.out.println();

        qS = new QueueSimulator(10,0.1,100000);
        sT = qS.runSimulation();

        System.out.println("Simulated for 100000s with Arrival Rate of 10 packets/sec and Service Rate of 10 packets/sec:\n");
        System.out.println("Sojourn time is "+sT+" seconds");
        System.out.println();

    }

    public static void main(String[] args)throws Exception
    {
        int testPart = Integer.parseInt(args[0]);

        if(testPart==1){
            p1();
        }
        else if(testPart==2){
            p2();
        }
        else{
            System.out.println("Incorrect set of arguments");
        }
    }
}