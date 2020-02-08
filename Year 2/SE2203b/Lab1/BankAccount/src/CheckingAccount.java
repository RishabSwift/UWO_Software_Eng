public class CheckingAccount extends BankAccount {

    public double fee;

    /**
     * Constructor
     * @param name
     * @param amount
     * @param fee
     */
    public CheckingAccount(String name, double amount, double fee) {
        super(name, amount);
        this.fee = fee;
        setAccountNumber(getAccountNumber() + "-CA");
    }

    /**
     * Withdraw funds
     * @param amount The amount to withdraw from
     * @return true if success
     */
    public boolean withdraw(double amount) {

        // if amount is more than 100, add the fee
        if (amount > 100) {
            amount += fee;
        }

        return super.withdraw(amount);

    }
}
