/**
 This program demonstrates the BankAccount and
 derived classes.
 */

public class AccountDriver {
    public static void main(String[] args)
    {

        // Test the CheckingAccount class.
        CheckingAccount checkingAccount = new CheckingAccount("Mike Smith", 5000, .25);
        System.out.println("Account Number " + checkingAccount.getAccountNumber() +
                " has been created for " + checkingAccount.getOwner());
        System.out.println("Initial balance = $" +
                String.format("%.2f", checkingAccount.getBalance()));

        checkingAccount.deposit(1000);
        System.out.println("After deposit of $" +
                String.format("%.2f", 1000.0) + ", balance = $" +
                String.format("%.2f", checkingAccount.getBalance()));

        if (checkingAccount.withdraw(500))
        {
            System.out.println("After withdrawal of $" +
                    String.format("%.2f", 500.0) +
                    ", balance = $" +
                    String.format("%.2f", checkingAccount.getBalance()));
        }
        else
        {
            System.out.println("Insufficient funds to " +
                    "withdraw $" +
                    String.format("%.2f", 500.0) +
                    ", balance = $" +
                    String.format("%.2f", checkingAccount.getBalance()));
        }

        if (checkingAccount.withdraw(99))
        {
            System.out.println("After withdrawal of $" +
                    String.format("%.2f", 99.0) +
                    ", balance = $" +
                    String.format("%.2f", checkingAccount.getBalance()));
        }
        else
        {
            System.out.println("Insufficient funds to " +
                    "withdraw $" +
                    String.format("%.2f", 99.0) +
                    ", balance = $" +
                    String.format("%.2f", checkingAccount.getBalance()));
        }

        System.out.println();

        // Test the SavingsAccount class.
        SavingsAccount yourAccount =
                new SavingsAccount("Alex Hunter", 400, 0.005);

        System.out.println("Account Number " +
                yourAccount.getAccountNumber() +
                " has been created for " +
                yourAccount.getOwner());

        System.out.println("Initial balance = $" +
                String.format("%.2f", yourAccount.getBalance()));

        yourAccount.deposit(1000);
        System.out.println("After deposit of $" +
                String.format("%.2f", 1000.0) +
                ", balance = $" +
                String.format("%.2f", yourAccount.getBalance()));

        if (yourAccount.withdraw(1000))
        {
            System.out.println("After withdrawal of $" +
                    String.format("%.2f", 1000.0) +
                    ", balance = $" +
                    String.format("%.2f", yourAccount.getBalance()));
        }
        else
        {
            System.out.println("Insufficient funds " +
                    "to withdraw $" +
                    String.format("%.2f", 1000.0) +
                    ", balance = $" +
                    String.format("%.2f", yourAccount.getBalance()));
        }

        yourAccount.postInterest();

        System.out.println("After monthly interest " +
                "has been posted, " +
                "balance = $" +
                String.format("%.2f", yourAccount.getBalance()));

        System.out.println();

        // Test the copy constructor of the
        // SavingsAccount class.
        SavingsAccount secondAccount =
                new SavingsAccount(yourAccount, 5);

        System.out.println("Account Number " +
                secondAccount.
                        getAccountNumber() +
                " belonging to " +
                secondAccount.getOwner());

        System.out.println("Initial balance = $" +
                String.format("%.2f", secondAccount.getBalance()));

        secondAccount.deposit(500);

        System.out.println("After deposit of $" +
                String.format("%.2f", 500.0) +
                ", balance = $" +
                String.format("%.2f", secondAccount.getBalance()));

        if (secondAccount.withdraw(1000))
        {
            System.out.println("After withdrawal of $" +
                    String.format("%.2f", 1000.0) +
                    ", balance = $" +
                    String.format("%.2f", secondAccount.getBalance()));
        }
        else
        {
            System.out.println("Insufficient funds " +
                    "to withdraw $" +
                    String.format("%.2f", 1000.0) +
                    ", balance = $" +
                    String.format("%.2f", secondAccount.getBalance()));
        }

        System.out.println();

        // Test to make sure new accounts are
        // numbered correctly.
        CheckingAccount yourCheckingAccount =
                new CheckingAccount("Albert Einstein", 5000, 0.30);

        System.out.println("Account Number " +
                yourCheckingAccount.
                        getAccountNumber() +
                " has been created for " +
                yourCheckingAccount.getOwner());
    }
}

