public class ThreadPrinter {
    public static void main(String[] args) throws InterruptedException {
        Runnable printThreadTask = () -> System.out.println("Thread: " + Thread.currentThread());

        for (int i = 0; i < 100; i++) { 
            Thread workerThread = new Thread(printThreadTask);
            workerThread.start();
        }

        Thread.sleep(1000); 
    }
}
