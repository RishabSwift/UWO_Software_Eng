using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerController : MonoBehaviour
{


    public Rigidbody2D rigidBody;
    public float speed;

    public Animator animator;

    public static PlayerController singleton;

    public string areaTransitionName;

    public bool canMove = true;

    // ensure player cannot go outside the map
    private Vector3 bottomLeftLimit;
    private Vector3 topRightLimit;


    // Start is called before the first frame update
    void Start()
    {
        if (singleton == null)
        {
            singleton = this;
        } else
        {
            if (singleton != this)
            {
                Destroy(gameObject);
            }
        }


        // when new scene loaded, don't destroy it...
        DontDestroyOnLoad(gameObject);
    }

    // Update is called once per frame
    void Update()
    {
      

        float moveX = Input.GetAxisRaw("Horizontal");
        float moveY = Input.GetAxisRaw("Vertical");

        if (canMove)
        {
            rigidBody.velocity = new Vector2(moveX, moveY) * speed;
           
        }
        else
        {
            rigidBody.velocity = Vector2.zero;
        }

        animator.SetFloat("moveX", rigidBody.velocity.x);
        animator.SetFloat("moveY", rigidBody.velocity.y);

        if (moveX == 1 || moveX == -1 || moveY == 1 || moveY == -1)
        {
            if (canMove)
            {
                animator.SetFloat("lastMoveX", moveX);
                animator.SetFloat("lastMoveY", moveY);
            }
        }

        transform.position = new Vector3(
        Mathf.Clamp(transform.position.x, bottomLeftLimit.x, topRightLimit.x),
        Mathf.Clamp(transform.position.y, bottomLeftLimit.y, topRightLimit.y),
        0);

    }

    public void SetBoundaries(Vector3 bottomLeftLimit, Vector3 topRightLimit)
    {
        this.bottomLeftLimit = bottomLeftLimit + new Vector3(.5f, .5f, 0); // ensure that there's some padding...
        this.topRightLimit = topRightLimit + new Vector3(-.5f, -.5f, 0);

    }
}
