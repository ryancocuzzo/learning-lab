package graph;
public class Node {
    public String name;

    public Node(String name) {
        this.name = name;
    }

    public String toString() {
        return "[" + this.name + "]";
    }
}
