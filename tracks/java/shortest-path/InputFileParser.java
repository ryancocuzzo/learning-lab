import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashSet;
import java.util.Set;

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
        int weight = Integer.valueOf(split[2]);
        return new Edge(new Node(fromString), new Node(toString), weight);
    }

    public static Graph parseFileAsGraph(String filepath) {
        Path path = Path.of(filepath);
        Set<Edge> edges = new HashSet<Edge>();
        try (var lines = Files.lines(path)) {
            lines.forEach(line -> {
                Edge e = parseLineAsEdge(line);
                if (e != null) {
                    edges.add(e);
                }
            });
        } catch (IOException e) {
            System.out.printf("Could not bind the path %s to lines\n", filepath);
            throw new Error("Could not parse file.");
        };
        return new Graph(edges);
    }
}