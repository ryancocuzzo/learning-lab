package algo;

import java.util.HashMap;
import java.util.PriorityQueue;
import java.util.Map;

import graph.Graph;
import graph.Edge;

public class ShortestPathFinder {
    private Graph graph;
    
    public ShortestPathFinder(Graph graph) {
        this.graph = graph;
    }

    public Map<String, Integer> initializeDistanceMap(String sourceNode) {
        Map<String, Integer> distances = new HashMap<>();
        for (String nodeName : graph.getNodeNames()) {
            distances.put(nodeName, Integer.MAX_VALUE);
        }
        distances.put(sourceNode, 0);
        return distances;
    }

    public int computeShortestPathDistance(String fromNode, String toNode) {
        PriorityQueue<PriorityRecord> pq = new PriorityQueue<>();
        Map<String, Integer> distances = this.initializeDistanceMap(fromNode);

        pq.add(new PriorityRecord(fromNode, 0));
        while (!pq.isEmpty()) {
            PriorityRecord pr = pq.remove();
            String source = pr.nodeName;
            for (Edge dest : graph.edgesFrom(source)) {
                int currentBestDistance = distances.get(dest.to.name);
                int newDistance = distances.get(source) + dest.weight;
                if (newDistance < currentBestDistance) {
                    distances.put(dest.to.name, distances.get(source) + dest.weight);
                }
                pq.add(new PriorityRecord(dest.to.name, newDistance));
            }
        }
        return distances.get(toNode);
    }
}
