import java.net.http.*;
import java.net.URI;

public class GitHubAPIClient {
    public static void main(String[] args) throws Exception {
        HttpClient httpClient = HttpClient.newHttpClient();

        HttpRequest githubRequest = HttpRequest.newBuilder()
                .uri(URI.create("https://api.github.com"))
                .build();

        HttpResponse<String> githubResponse = httpClient.send(githubRequest, HttpResponse.BodyHandlers.ofString());

        System.out.println("Status: " + githubResponse.statusCode());
        System.out.println("Body: " + githubResponse.body());
    }
}
