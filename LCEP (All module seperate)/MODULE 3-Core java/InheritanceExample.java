class Animal {
    public void makeSound() {
        System.out.println("The animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Bark");
    }
}

public class InheritanceExample {
    public static void main(String[] args) {
        Animal animal = new Animal();
        Dog dog = new Dog();
        
        System.out.println("Animal sound:");
        animal.makeSound();
        
        System.out.println("Dog sound:");
        dog.makeSound();
    }
}