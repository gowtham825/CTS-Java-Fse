import java.sql.*;

public class StudentDataManager {
    private static final String DATABASE_URL = "jdbc:mysql://localhost:3306/testdb";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "yourpassword";
    
    public void addNewStudent(int studentId, String studentName) {
        String insertQuery = "INSERT INTO students (id, name) VALUES (?, ?)";
        
        try (Connection dbConnection = DriverManager.getConnection(DATABASE_URL, DB_USER, DB_PASSWORD);
             PreparedStatement preparedStmt = dbConnection.prepareStatement(insertQuery)) {
            
            preparedStmt.setInt(1, studentId);
            preparedStmt.setString(2, studentName);
            preparedStmt.executeUpdate();
            System.out.println("New student record has been added successfully.");
            
        } catch (SQLException sqlException) {
            System.err.println("Error occurred while inserting student: " + sqlException.getMessage());
            sqlException.printStackTrace();
        }
    }
    
    public void modifyStudentDetails(int studentId, String updatedName) {
        String updateQuery = "UPDATE students SET name = ? WHERE id = ?";
        
        try (Connection dbConnection = DriverManager.getConnection(DATABASE_URL, DB_USER, DB_PASSWORD);
             PreparedStatement preparedStmt = dbConnection.prepareStatement(updateQuery)) {
            
            preparedStmt.setString(1, updatedName);
            preparedStmt.setInt(2, studentId);
            preparedStmt.executeUpdate();
            System.out.println("Student information has been updated successfully.");
            
        } catch (SQLException sqlException) {
            System.err.println("Error occurred while updating student: " + sqlException.getMessage());
            sqlException.printStackTrace();
        }
    }
    
    public static void main(String[] args) {
        StudentDataManager dataManager = new StudentDataManager();
        dataManager.addNewStudent(101, "John");
        dataManager.modifyStudentDetails(101, "John Smith");
    }
}