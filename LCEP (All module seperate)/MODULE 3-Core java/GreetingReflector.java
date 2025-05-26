import java.lang.reflect.*;

public class GreetingReflector {
    public void greetUser(String name) {
        System.out.println("Hello " + name);
    }

    public static void main(String[] args) throws Exception {
        Class<?> cls = Class.forName("GreetingReflector");
        Method[] methods = cls.getDeclaredMethods();
        for (Method method : methods) {
            System.out.println("Method: " + method.getName());
            System.out.println("Parameters: " + method.getParameterCount());
        }

        Object instance = cls.getDeclaredConstructor().newInstance();
        Method greetMethod = cls.getMethod("greetUser", String.class);
        greetMethod.invoke(instance, "Abishek");
    }
}
