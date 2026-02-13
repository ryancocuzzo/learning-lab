import java.util.*;

public class Graph {
    Set<Edge> edges;

    public Graph(Set<Edge> edges) {
        this.edges = edges;
    }

    public String toString() {
        StringBuilder s = new StringBuilder();
        s.append("Graph:\n");
        for (Edge e : this.edges) {
            s.append(e.toString() + "\n");
        }
        return s.toString();
    }
}
