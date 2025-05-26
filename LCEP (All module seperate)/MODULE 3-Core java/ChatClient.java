import java.io.*;
import java.net.*;

public class ChatClient {
    public static void main(String[] args) throws IOException {
        Socket chatSocket = new Socket("localhost", 12345);

        BufferedReader serverInput = new BufferedReader(new InputStreamReader(chatSocket.getInputStream()));
        PrintWriter serverOutput = new PrintWriter(chatSocket.getOutputStream(), true);

        BufferedReader userInput = new BufferedReader(new InputStreamReader(System.in));

        String messageFromServer, messageToServer;
        while (true) {
            messageToServer = userInput.readLine();
            serverOutput.println(messageToServer);
            if ("bye".equalsIgnoreCase(messageToServer)) break;

            messageFromServer = serverInput.readLine();
            System.out.println("Server: " + messageFromServer);
        }

        chatSocket.close();
    }
}
