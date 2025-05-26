import java.sql.*;

public class BankingTransactionProcessor {
    private static final String CONNECTION_STRING = "jdbc:mysql://localhost:3306/testdb";
    private static final String USERNAME = "root";
    private static final String USER_PASSWORD = "yourpassword";
    
    public void processMoneyTransfer(int sourceAccountId, int destinationAccountId, double transferAmount) {
        String withdrawalQuery = "UPDATE accounts SET balance = balance - ? WHERE account_id = ?";
        String depositQuery = "UPDATE accounts SET balance = balance + ? WHERE account_id = ?";
        
        try (Connection databaseConnection = DriverManager.getConnection(CONNECTION_STRING, USERNAME, USER_PASSWORD)) {
            // Disable auto-commit for transaction management
            databaseConnection.setAutoCommit(false);
            
            try (PreparedStatement withdrawalStatement = databaseConnection.prepareStatement(withdrawalQuery);
                 PreparedStatement depositStatement = databaseConnection.prepareStatement(depositQuery)) {
                
                // Process withdrawal from source account
                withdrawalStatement.setDouble(1, transferAmount);
                withdrawalStatement.setInt(2, sourceAccountId);
                withdrawalStatement.executeUpdate();
                
                // Process deposit to destination account
                depositStatement.setDouble(1, transferAmount);
                depositStatement.setInt(2, destinationAccountId);
                depositStatement.executeUpdate();
                
                // Commit the transaction
                databaseConnection.commit();
                System.out.println("Money transfer completed successfully.");
                
            } catch (SQLException transactionError) {
                // Rollback transaction in case of error
                databaseConnection.rollback();
                System.out.println("Money transfer failed. All changes have been reverted.");
                transactionError.printStackTrace();
            }
            
        } catch (SQLException connectionError) {
            System.err.println("Database connection error: " + connectionError.getMessage());
            connectionError.printStackTrace();
        }
    }
    
    public static void main(String[] args) {
        BankingTransactionProcessor transactionProcessor = new BankingTransactionProcessor();
        transactionProcessor.processMoneyTransfer(1, 2, 100.00);
    }
}