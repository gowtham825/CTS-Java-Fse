import java.util.concurrent.*;
import java.util.*;

public class TaskExecutorDemo {
    public static void main(String[] args) throws Exception {
        ExecutorService threadPool = Executors.newFixedThreadPool(3);
        List<Callable<String>> callableTasks = new ArrayList<>();

        for (int i = 1; i <= 5; i++) {
            int taskId = i;
            callableTasks.add(() -> "Task " + taskId + " done");
        }

        List<Future<String>> taskResults = threadPool.invokeAll(callableTasks);

        for (Future<String> futureResult : taskResults) {
            System.out.println(futureResult.get());
        }

        threadPool.shutdown();
    }
}
