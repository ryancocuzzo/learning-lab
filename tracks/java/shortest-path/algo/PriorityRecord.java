package algo;

public class PriorityRecord implements Comparable<PriorityRecord> {
    String nodeName;
    int dist;

    public PriorityRecord(String nodeName, int dist) {
        this.nodeName = nodeName;
        this.dist = dist;
    }

    @Override
    public int compareTo(PriorityRecord pr) {
        if (this.dist > pr.dist)
            return 1;
        if (this.dist == pr.dist)
            return 0;
        return -1;
    }
}
