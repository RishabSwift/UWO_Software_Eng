import java.util.Random;

public class RandomHello {

    public static void main(String[] args) {
        RandomHello randomHello = new RandomHello();
        System.out.println(randomHello.sayHello());
    }

    /**
     * Random generator
     * @return
     */
    public String sayHello() {

        Random randomGenerator = new Random();

        // bound is set to 5 because array size is 5, and since bound goes to n-1, we can expect values from 0-4 so we won't get IndexArrayOutOfBoundsException
        int random = randomGenerator.nextInt(5);

        String[] greetings = new String[5];
        greetings[0] = "Hello World";
        greetings[1] = "Hola Mundo";
        greetings[2] = "Bonjour Monde";
        greetings[3] = "Hallo Welt";
        greetings[4] = "Ciao Mondo";

        return greetings[random];
    }
}
