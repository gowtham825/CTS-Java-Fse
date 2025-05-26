import java.io.*;
import java.net.*;

public class ChatServer {
    public static void main(String[] args) throws IOException {
        ServerSocket chatServerSocket = new ServerSocket(12345);
        System.out.println("Server is running... Waiting for client connection...");

        Socket connectedClient = chatServerSocket.accept();
        System.out.println("Client connected.");

        BufferedReader clientInput = new BufferedReader(new InputStreamReader(connectedClient.getInputStream()));
        PrintWriter clientOutput = new PrintWriter(connectedClient.getOutputStream(), true);

        BufferedReader serverConsole = new BufferedReader(new InputStreamReader(System.in));

        String incomingClientMessage, outgoingServerMessage;
        while ((incomingClientMessage = clientInput.readLine()) != null) {
            System.out.println("Client: " + incomingClientMessage);
            outgoingServerMessage = serverConsole.readLine();
            clientOutput.println(outgoingServerMessage);
            if ("bye".equalsIgnoreCase(outgoingServerMessage)) break;
        }

        connectedClient.close();
        chatServerSocket.close();
    }
}
