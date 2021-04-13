public class Node {
    int n;
    String name;
    boolean visited;

    //The Node class constructor that gets "n" as node number and "name" as node name. 
    Node(int n, String name) {
        this.n = n;
        this.name = name;
        visited = false;
    }

    // set the node as visited
    void visit() {
        visited = true;
    }
    // set the node as unvisit
    void unvisit() {
        visited = false;
    }
    
    //check whether the node was visited or not
    boolean isVisited()
    {
    	return visited;
    }
}