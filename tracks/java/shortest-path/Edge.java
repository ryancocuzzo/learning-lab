public class Edge {
    public int weight;
    public Node from;
    public Node to;

    public Edge(Node from, Node to, int weight) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }

    public String toString() {
        return "[" + this.from.toString() + " -> " + this.to.toString() + "(" + this.weight + ") ]";
    }
}
