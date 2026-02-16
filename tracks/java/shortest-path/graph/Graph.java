package graph;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class Graph {
    Map<String, Set<Edge>> adjacencyList; // map node IDs to the IDs of nodes to their edges

    public Graph(Set<Edge> edges) {
        this.adjacencyList = this.computeAdjacencyList(edges);
    }

    private Map<String, Set<Edge>> computeAdjacencyList(Set<Edge> edges) {
        Map<String, Set<Edge>> adjacencyList = new HashMap<>();
        for (Edge e : edges) {
            String key = e.from.name;
            if (adjacencyList.get(key) == null) {
                Set<Edge> newSet = new HashSet<Edge>();
                adjacencyList.put(key, newSet);
            }
            Set<Edge> destinationEdges = adjacencyList.get(key);
            destinationEdges.add(e);
            adjacencyList.put(key, destinationEdges);
        }
        return adjacencyList;
    }

    public String toString() {
        StringBuilder s = new StringBuilder();
        s.append("Graph:\n");
        for (Map.Entry<String, Set<Edge>> entry : this.adjacencyList.entrySet()) {
            StringBuilder sb = new StringBuilder();
            sb.append(entry.getKey() + " => ");
            for (Edge e : entry.getValue()) {
                sb.append(e.to.name + " (" + e.weight + "), ");
            }
            String entryString = sb.toString();
            String entryStringFixed = entryString.substring(0, entryString.length() - 2) + "\n"; // remove the last comma and space, add newline
            s.append(entryStringFixed);
        }
        return s.toString();
    }
}
