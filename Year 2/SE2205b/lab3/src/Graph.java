import java.util.*;

public class Graph {

    private HashMap<Node, LinkedList<Node>> adjacencyMap;

    public Graph() {
        adjacencyMap = new HashMap<>();
    }

    public void addEdgeHelper(Node a, Node b) {
        LinkedList<Node> tmp = adjacencyMap.get(a);

        if (tmp != null) {
            tmp.remove(b);
        } else tmp = new LinkedList<>();
        tmp.add(b);
        adjacencyMap.put(a, tmp);
    }

    public void addEdge(Node source, Node destination) {

        if (!adjacencyMap.keySet().contains(source))
            adjacencyMap.put(source, null);

        if (!adjacencyMap.keySet().contains(destination))
            adjacencyMap.put(destination, null);

        addEdgeHelper(source, destination);
        addEdgeHelper(destination, source);

    }

    public boolean hasEdge(Node source, Node destination) {
        return adjacencyMap.containsKey(source) && adjacencyMap.get(source).contains(destination);
    }

    public void resetNodesVisited() {
        for (Node n : adjacencyMap.keySet()) {
            n.unvisit();
        }

    }

    //BFS method
    void BFS(Node node) {

        //Use a queue to keep track of neighbours
        LinkedList<Node> queue = new LinkedList<Node>();

        //Visit the source node
        node.visit();

        //Add the source node to queue
        queue.add(node);
        System.out.print("Output of BFS is: ");

        //Ensure all nodes are visited
        while (queue.size() != 0) {

            //Dequeue and print
            node = queue.poll();
            System.out.print(node.name + " ");

            //Get adjacent nodes of the dequeued node in queue
            Iterator<Node> i = adjacencyMap.get(node).listIterator();

            //Visit all adjacent nodes if not visited          
            while (i.hasNext()) {
                Node n = i.next();
                if (!n.isVisited()) {
                    n.visit();
                    queue.add(n);
                }
            }
        }
        System.out.println("");
    }

    //DFS
    public void DFSHelper(Node node) {
        //Mark the source node
        node.visit();
        System.out.print(node.name + " ");

        //Recur for all the adjacent nodes to the current node, if not visited
        for (Node n : adjacencyMap.get(node)) {
            if (!n.isVisited())
                DFSHelper(n);
        }
    }

    //DFS caller
    public void DFS(Node node) {
        System.out.print("Output of DFS is: ");
        DFSHelper(node);
    }

    //DFS with stack. Ouput order not matching
        /*
        public void DFS(Node node){
        Stack<Node> stack = new Stack<>();
                stack.push(node);

                while(stack.empty() == false)
                    {
                        // Pop a vertex from stack and print it
                        node = stack.peek();
                        stack.pop();

                        // Stack may contain same vertex twice. So
                        // we need to print the popped item only
                        // if it is not visited.
                        if(!node.isVisited())
                        {
                            System.out.print(node.name + " ");
                            node.visit();
                        }

                        // Get all adjacent vertices of the popped vertex s
                        // If a adjacent has not been visited, then push it
                        // to the stack.
                        Iterator<Node> itr = adjacencyMap.get(node).iterator();

                        while (itr.hasNext())
                        {
                            Node tmp = itr.next();
                            if(!tmp.isVisited())
                                stack.push(tmp);
                        }

                    }
        }
        */

    //Printing edges
    public void printEdges() {

        //Get all the nodes
        Set keys = adjacencyMap.keySet();
        //Conver the set to list for easy iteration
        List<Node> nodeList = new ArrayList<Node>(keys);

        //Iterate through all the nodes
        for (int i = 0; i < nodeList.size(); i++) {

            // Get the parent node
            Node n = nodeList.get(i);
            System.out.print(n.name + " has an edge towrds: ");

            //Get all the linked nodes to the parent node
            Iterator<Node> edges = adjacencyMap.get(n).listIterator();

            //Print the linked nodes
            while (edges.hasNext()) {
                System.out.print(edges.next().name + " ");
            }
            System.out.println("");
        }

    }
}