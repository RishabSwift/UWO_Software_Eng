public class SavingsAccount extends BankAccount {

    public double rate;
    public int savingsNumber; // initialized to 0 as per the assignment
    private String accountNumber;

    /**
     *
     * @param name user name
     * @param amount funds
     * @param rate interest rate
     */
    public SavingsAccount(String name, double amount, double rate) {
        super(name, amount);
        this.savingsNumber = 0;
        this.accountNumber = super.getAccountNumber() + "-S" + this.savingsNumber;
        this.rate = rate;
    }

    /**
     *
     * @param oldAccount  old account
     * @param amount balance
     */
    public SavingsAccount(SavingsAccount oldAccount, double amount) {
        super(oldAccount, amount);
        this.accountNumber = super.getAccountNumber() + "-S" + ++this.savingsNumber;
    }

    /**
     * Calculate one month worth of interest
     */
    public void postInterest() {
        double valueWithInterest = getBalance() + getBalance() * rate; 
        setBalance(valueWithInterest);
    }

    /**
     *
     * @return account number
     */
    public String getAccountNumber() {
        return this.accountNumber;
    }
}
