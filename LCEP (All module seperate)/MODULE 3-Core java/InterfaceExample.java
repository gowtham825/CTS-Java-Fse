interface Playable {
    void play();
}

class Guitar implements Playable {
    @Override
    public void play() {
        System.out.println("Playing guitar: Strum strum strum...");
    }
}

class Piano implements Playable {
    @Override
    public void play() {
        System.out.println("Playing piano: Do re mi fa sol...");
    }
}

public class InterfaceExample {
    public static void main(String[] args) {
        Guitar guitar = new Guitar();
        Piano piano = new Piano();
        
        guitar.play();
        piano.play();
        
        // Using polymorphism
        Playable instrument1 = new Guitar();
        Playable instrument2 = new Piano();
        
        System.out.println("\nUsing polymorphism:");
        instrument1.play();
        instrument2.play();
    }
}