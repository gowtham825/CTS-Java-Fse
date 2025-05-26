class MessageThread extends Thread {
    private String message;
    private int count;
    
    public MessageThread(String message, int count) {
        this.message = message;
        this.count = count;
    }
    
    @Override
    public void run() {
        for (int i = 1; i <= count; i++) {
            System.out.println(message + " - Count: " + i);
            try {
                Thread.sleep(500); // pause for 500ms
            } catch (InterruptedException e) {
                System.out.println("Thread interrupted");
            }
        }
    }
}

public class ThreadExample {
    public static void main(String[] args) {
        MessageThread thread1 = new MessageThread("Thread 1", 5);
        MessageThread thread2 = new MessageThread("Thread 2", 5);
        
        thread1.start();
        thread2.start();
        
        try {
            thread1.join();
            thread2.join();
        } catch (InterruptedException e) {
            System.out.println("Main thread interrupted");
        }
        
        System.out.println("Both threads have finished execution");
    }
}