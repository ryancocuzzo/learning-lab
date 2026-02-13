import java.util.Scanner;

public class Main {

    public static void main() {
        try (Scanner sc = new Scanner(System.in)) {
            System.out.print("Enter the input file path: ");
            String inputFile = sc.nextLine();
            Graph g = InputFileParser.parseFileAsGraph(inputFile);
            if (g != null) {
                System.out.println(g.toString());
            }

            System.out.println("\nWe're going to be calculating shortest-path.");
            System.out.println("Please provide the name of the source and destination nodes.");
            System.out.print("Enter the name of the source node: ");
            String source = sc.nextLine();
            System.out.print("Enter the name of the destination node: ");
            String dest = sc.nextLine();
            int distance = new ShortestPathFinder(g).computeShortestPathDistance(source, dest);
            System.out.printf("\nThe shortest path between %s and %s is %d units!", source, dest, distance);
        }
    }
}
