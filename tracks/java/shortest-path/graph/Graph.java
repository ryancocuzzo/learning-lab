package graph;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class Graph {
    // Choosing a string id because the full node structure isn't relevant. We're not dealing with nodes themselves.
    // Choosing a Set for the edge list because ordering doesn't matter and there should be no duplicates
    Map<String, Set<Edge>> adjacencyList; // map node IDs to the IDs of nodes to their edges
    Set<String> nodesNames;

    public Graph(Set<Edge> edges, Set<String> nodeNames) {
        this.adjacencyList = this.computeAdjacencyList(edges);
        this.nodesNames = nodeNames;
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

    // Convenience function for algorithms which use the node names
    public Set<String> getNodeNames() {
        return nodesNames;
    }

    public Set<Edge> edgesFrom(String nodeName) {
        return adjacencyList.get(nodeName);
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
