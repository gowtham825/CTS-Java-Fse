import java.sql.*;

public class DatabaseConnector {
    public static void main(String[] args) {
        String dbConnectionString = "jdbc:mysql://localhost:3306/testdb";
        String dbUsername = "root";
        String dbUserPassword = "yourpassword";
        
        try {
            // Load MySQL JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");
            
            // Establish database connection
            Connection databaseConnection = DriverManager.getConnection(dbConnectionString, dbUsername, dbUserPassword);
            
            // Create SQL statement object
            Statement sqlStatement = databaseConnection.createStatement();
            
            // Execute query and get result set
            ResultSet queryResults = sqlStatement.executeQuery("SELECT id, name FROM students");
            
            // Process and display results
            while (queryResults.next()) {
                int studentId = queryResults.getInt("id");
                String studentName = queryResults.getString("name");
                System.out.println("Student ID: " + studentId + ", Student Name: " + studentName);
            }
            
            // Close resources
            queryResults.close();
            sqlStatement.close();
            databaseConnection.close();
            
        } catch (ClassNotFoundException cnfe) {
            System.err.println("JDBC Driver not found: " + cnfe.getMessage());
            cnfe.printStackTrace();
        } catch (SQLException sqle) {
            System.err.println("Database connection error: " + sqle.getMessage());
            sqle.printStackTrace();
        } catch (Exception ex) {
            System.err.println("Unexpected error occurred: " + ex.getMessage());
            ex.printStackTrace();
        }
    }
}