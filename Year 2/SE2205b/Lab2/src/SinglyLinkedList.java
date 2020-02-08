public class SinglyLinkedList<E>
{
    private static class Node<E>
    {
        /**
         * The generic element of the node
         */
        private E element;

        /***
         * Reference to the next node
         */
        private Node<E> next;

        /**
         * Constructor that takes it an element object and and next node
         * @param e The element
         * @param n The next node
         */
        public Node(E e, Node<E> n)
        {
            element = e;
            next = n;
        }

        /**
         * Gets the element of the node
         * @return The element of the node
         */
        public E getElement()
        {
            return element;
        }

        /**
         * Gets the next node
         * @return The next node
         */
        public Node<E> getNext()
        {
            return next;
        }

        /**
         * Sets the next node
         * @param n A node
         */
        public void setNext(Node<E> n)
        {
            next = n;
        }
    }

    /**
     *
     */
    private Node<E> head;

    /**
     * A reference on the Node on the tail of the LinkedList
     */
    private Node<E>tail;

    /**
     * An integer field to keep track of the size of the LinkedList
     */
    private int _size;

    /**
     * Constructor with no arguments
     */
    public SinglyLinkedList()
    {
        head = null;
        tail = null;
        _size = 0;
    }

    /**
     * Returns the size of the LinkedList
     * @return The size of the LinkedList
     */
    public int size()
    {
        return _size;
    }

    /**
     * It returns whether the LinkedList is empty or not
     * @return A boolean, true if it's empty, false if it's not empty
     */
    public boolean isEmpty()
    {
        return size() == 0;
    }

    /**
     * It gets the element inside the first node
     * @return The element inside the first node
     */
    public E first()
    {
        return head != null ? head.getElement() : null;
    }

    /**
     * It gets the element inside the last node
     * @return the element inside the last node
     */
    public E last()
    {
        return tail != null ? tail.getElement() : null;
    }

    /**
     * Add an element to the first of the LinkedList
     * @param element the element
     */
    public void addFirst(E element)
    {
        // Initializing a new node with the element
        Node<E> node = new Node<E>(element, null);
        if(_size == 0)
        {
            // If it's the first node in the LinkedList, then it's gonna be the head and as well as the tail
            head = tail = node;
        }
        else
        {
            // The new node will be the new head of the LinkedList so it should point to the old head with its next node field
            node.setNext(head);
            head = node;
        }

        // Increase the size counter of the LinkedList
        _size++;
    }

    /**
     * Add an element to the last of the LinkedList
     * @param element the element
     */
    public void addLast(E element)
    {
        // Initializing a new node with the element
        Node<E> node = new Node<E>(element, null);
        if(_size == 0)
        {
            // If it's the first node in the LinkedList, then it's gonna be the head and as well as the tail
            head = tail = node;
        }
        else
        {
            // The new node will be the new tail of the LinkedList, so the old tail's next node should be pointing to new the node
            tail.setNext(node);
            tail = node;
        }
        // Increase the size counter of the LinkedList
        _size++;
    }

    /**
     * It removes the first node of the LinkedList and returns its element
     * @return
     */
    public E removeFirst()
    {
        // If the LinkedList is empty, then it returns null
        if(head == null)
            return null;

        // Get the element of the first node
        E element = head.getElement();

        if(head == tail)
        {
            // If there was only one node, then both head and tail are set to null
            head = tail = null;
        }
        else
            // Else, then the head becomes its next node
            head = head.getNext();

        // Decrement the size counter of the LinkedList
        _size--;
        return element;
    }
}