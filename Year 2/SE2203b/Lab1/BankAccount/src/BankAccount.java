/**
 The BankAccount class is an abstract class that holds
 general data about a bank account. Classes representing
 specific types of bank accounts should inherit from
 this class.
 */

public class BankAccount {
    // Class variable so that each account
    // has a unique number
    protected static int numberOfAccounts = 100001;

    // Current balance in the account
    private double balance;

    // Name on the account
    private String owner;

    // Number bank uses to identify account
    private String accountNumber;

    /**
     Default constructor
     */

    public BankAccount()
    {
        balance = 0;
        accountNumber = numberOfAccounts + "";
        numberOfAccounts++;
    }

    /**
     Standard constructor
     @param name The owner of the account.
     @param amount The beginning balance.
     */

    public BankAccount(String name, double amount)
    {
        owner = name;
        balance = amount;
        accountNumber = numberOfAccounts + "";
        numberOfAccounts++;
    }

    /**
     Copy constructor creates another account
     for the same owner.
     @param oldAccount The account with information
     to copy.
     @param amount The beginning balance of the
     new account.
     */

    public BankAccount(BankAccount oldAccount,
                       double amount)
    {
        owner = oldAccount.owner;
        balance = amount;
        accountNumber = oldAccount.accountNumber;
    }

    /**
     Allows you to add money to the account.
     @param amount The amount to deposit in the account.
     */

    public void deposit(double amount)
    {
        balance = balance + amount;
    }

    /**
     Allows you to remove money from the account if
     enough money is available, returns true if the
     transaction was completed, returns false if
     there was not enough money.
     @param amount The amount to withdraw from
     the account.
     @return True if there was sufficient funds to
     complete the transaction, false otherwise.
     */

    public boolean withdraw(double amount)
    {
        boolean completed = true;

        if (amount <= balance)
        {
            balance = balance - amount;
        }
        else
        {
            completed = false;
        }
        return completed;
    }

    /**
     Accessor method to balance
     @return The balance of the account.
     */

    public double getBalance()
    {
        return balance;
    }

    /**
     accessor method to owner
     @return The owner of the account.
     */

    public String getOwner()
    {
        return owner;
    }

    /**
     Accessor method to account number
     @return The account number.
     */

    public String getAccountNumber()
    {
        return accountNumber;
    }

    /**
     Mutator method to change the balance
     @param newBalance The new balance for the account.
     */

    public void setBalance(double newBalance)
    {
        balance = newBalance;
    }

    /**
     Mutator method to change the account number
     @param newAccountNumber The new account number.
     */

    public void setAccountNumber(String newAccountNumber)
    {
        accountNumber = newAccountNumber;
    }
}

