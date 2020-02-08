public class LinkedListQueue<E> implements Queue<E>
{
    /**
     * The LinkedList used for the queue
     */
    private SinglyLinkedList<E> linkedList;

    /**
     * The constructor
     */
    public LinkedListQueue()
    {
        // Initializing the LinkedList
        linkedList = new SinglyLinkedList<E>();
    }

    /**
     * It returns the size of the queue
     * @return The size of the queue
     */
    public int size()
    {
        return linkedList.size();
    }

    /**
     * It returns whether the Queue is empty or not
     * @return A boolean, true if it's empty, false if it's not empty
     */
    public boolean isEmpty()
    {
        return linkedList.isEmpty();
    }

    /**
     * It gets the element inside the first node
     * @return The element inside the first node
     */
    public E first()
    {
        return linkedList.first();
    }

    /**
     * Adds a new element to the queue
     * @param node the element to be added to the new
     */
    public void enqueue(E node)
    {
        linkedList.addLast(node);
    }

    /**
     * Dequeue the first element from the queue
     * @return The element that's removed from the queue
     */
    public E dequeue()
    {
        return linkedList.removeFirst();
    }
}