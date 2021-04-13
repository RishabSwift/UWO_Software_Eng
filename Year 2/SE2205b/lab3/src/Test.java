import java.util.*; 
public class Test {
    public static void main(String[] args) {
    	/******First graph sample*******/
    	//define nodes
        Graph graph = new Graph();
        Node a = new Node(0, "a");
        Node b = new Node(1, "b");
        Node c = new Node(2, "c");
        Node d = new Node(3, "d");
        Node e = new Node(4, "e");
        	
        //define edges
        graph.addEdge(a,d);
        graph.addEdge(a,b);
        graph.addEdge(a,c);
        graph.addEdge(c,d);
        graph.addEdge(c,e);
        System.out.print("First Graph \n");
        //the output of printEdges method is : (the print format is arbitrary)
        //The b has an edge towards: a 
        //The e has an edge towards: c 
        //The a has an edge towards: d b c 
        //The d has an edge towards: a c 
        //The c has an edge towards: a d e 
        graph.printEdges();
        
        // the out put of BFS is : b a d c e 
        graph.BFS(b);
        graph.resetNodesVisited();
        
        //the output of DFS is : a d c e b  
        graph.DFS(a);
        
        
        /******Second graph sample*******/
    	//define nodes
        System.out.print("\n Second Graph \n");
        Graph graph2 = new Graph();
        Node i = new Node(0, "i");
        Node j = new Node(1, "j");
        Node k = new Node(2, "k");
        Node l = new Node(3, "l");
        Node m = new Node(4, "m");
        Node n = new Node(4, "n");
        Node o = new Node(4, "o");
        	
        //define edges
        graph2.addEdge(i,j);
        graph2.addEdge(i,k);
        graph2.addEdge(i,o);
        graph2.addEdge(n,m);
        graph2.addEdge(m,j);
        graph2.addEdge(m,l);
        graph2.addEdge(l,o);
        graph2.addEdge(l,i);
        graph2.addEdge(j,o);
        
        //the output of printEdges method is : (the print format is arbitrary)
        //The i has an edge towards: j k o l 
        //The j has an edge towards: i m o 
        //The l has an edge towards: m o i 
        //The n has an edge towards: m 
        //The o has an edge towards: i l j 
        //The m has an edge towards: n j l 
        //The k has an edge towards: i
        graph2.printEdges();
        
        // the out put of BFS is : i j k o l m n 
        graph2.BFS(i);
        graph2.resetNodesVisited();
        
        //the output of DFS is : i j m n l o k   
        graph2.DFS(i);

    }
}