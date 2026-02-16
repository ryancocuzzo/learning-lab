package io;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashSet;
import java.util.Set;

import graph.Edge;
import graph.Graph;
import graph.Node;

public class InputFileParser {
     private static Edge parseLineAsEdge(String line) {
        if (line.equals("") || line.equals("\n") || line.startsWith("//"))
            return null;
        String[] split = line.split(" ");
        if (split.length < 3) {
            return null;
        }
        String fromString = split[0];
        String toString = split[1];
        int weight;
        try {
            weight = Integer.parseInt(split[2]);
        } catch (NumberFormatException e) {
            return null;
        }
        // we are assuming non-negative edge weights
        if (weight < 0) {
            return null;
        } 
        return new Edge(new Node(fromString), new Node(toString), weight);
    }

    public static Graph parseFileAsGraph(String filepath) {
        Path path = Path.of(filepath);
        Set<Edge> edges = new HashSet<Edge>();
        Set<String> nodeNames = new HashSet<>();
        try (var lines = Files.lines(path)) {
            lines.forEach(line -> {
                Edge e = parseLineAsEdge(line);
                if (e != null) {
                    edges.add(e);
                    if (!nodeNames.contains(e.from.name))
                        nodeNames.add(e.from.name);
                    if (!nodeNames.contains(e.to.name))
                        nodeNames.add(e.to.name);
                }
            });
        } catch (IOException e) {
            throw new RuntimeException("Could not parse file: " + filepath, e);
        }
        return new Graph(edges, nodeNames);
    }
}