using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class PlayerController : MonoBehaviour
{
    public float speed;
    public int totalPickups;
    

    private Rigidbody rb;
    private int score;

    public Text scoreText;
    public Text winnerText;

    public GameObject[] pickup;
    public GameObject floatingTextPrefab;


    private int remainingPickups;
    private bool gamePaused;

    // Start is called before the first frame update
    void Start()
    {
        rb = GetComponent<Rigidbody>();
        setupGame();
    }

    // called before performing any physics calculations
    // 
    void FixedUpdate()
    {
        // if game is paused
        if (gamePaused)
        {
            return;
        }

        // get user input from the keyboard... the input is any input from the device
        float moveHorizontal = Input.GetAxis("Horizontal");
        float moveVertical = Input.GetAxis("Vertical");

        // x,y,z values. y=0 because we don't wanna move up
        Vector3 movement = new Vector3(moveHorizontal, 0.0f, moveVertical).normalized;
        rb.AddForce(movement * speed);
    }

    // the "other" collider needs to be found
    void OnTriggerEnter(Collider other)
    {
        // make sure that it is a pickup tag to ensure we are only colliding against the pickup objects
        if (other.gameObject.CompareTag("Pickup"))
        {
            // get the score that is associated with the item we just picked up
           int scorePoint = other.gameObject.GetComponent<PickupProperties>().scorePoint;
            // add it to the total score
            score += scorePoint;
            // hide the picked up item
            other.gameObject.SetActive(false);
            // subtract 1 from the remaning pickups
            remainingPickups--;

            // finally, update hte score
             updateScoreText();

            // display the points we scored above the item we picked up to show how many points they are
            if (floatingTextPrefab)
            {
                var text = Instantiate(floatingTextPrefab, transform.position, Quaternion.identity, transform);
                text.GetComponent<TextMesh>().text = "+" + scorePoint.ToString();
            }
           
        }

    }

    // update the score text and check if a user has won
    void updateScoreText()
    {
        scoreText.text = "Score: " + score.ToString();

        // if they have no more to pick up, then they've won
        if (remainingPickups == 0)
        {
            winnerText.text = "You Win!";
            // pause for a few seconds
            StartCoroutine(PauseForSeconds());
        }
    }

    // set up the game by setting up variables
    void setupGame()
    {
        score = 0;
        winnerText.text = "";
        addPickups();
        updateScoreText();
        gamePaused = false;
    }

    // add the pickup objects randomly
    void addPickups()
    {
        // Randomly place pickups... as many as totalPickups
        for (int i = 0; i < totalPickups; i++)
        {
            // the vector position for where the pickups can be placed.
            Vector3 randomPosition = new Vector3(Random.Range(-9, 9), 0.5f, Random.Range(-9, 9));
            // instantiate the objects
            Instantiate(pickup[Random.Range(0, pickup.Length)], randomPosition, Quaternion.identity);
        }

        remainingPickups = totalPickups;
    }

    // Pause the game for a few seconds
    public IEnumerator PauseForSeconds()
    {
        gamePaused = true;

        // stop the vball
       rb.velocity = new Vector3(0, 0, 0);
        // pause for 2 seconds and then restart the game
        yield return new WaitForSeconds(2f);
        gamePaused = false;
        // reload scene so we don't have to set values to 0 and such.
        SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
    }

}