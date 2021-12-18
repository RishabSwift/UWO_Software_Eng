using UnityEngine;
using System;



public class PlayerController : MonoBehaviour
{


    // singleton for PlayerController
    public static PlayerController  instance;

    public bool isPaused = false;

    public float[] bestTimes = new float[5];
    public string[] bestTimesNames = new string[5];

    public string userName = "";

    public bool hitDoor = true;
    GameObject currentDoor;

    //Detect collisions between the GameObjects with Colliders attached
    void OnCollisionEnter(Collision collision)
    {


        // if collided with door..
        if (collision.gameObject.tag == "door")
        {
            Debug.Log(13);
            currentDoor = collision.gameObject;
            //if (Input.GetKeyDown(KeyCode.X))
            //{
            //    collision.gameObject.SetActive(false);
            //}
        }

    }

    

    public Vector3 startingPosition;

    // Start is called before the first frame update
    void Start()
    {
        instance = this;

        startingPosition = gameObject.transform.position;
        
    }

    void Update()
    {
        // if escape is clicked, pause the game
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            if (isPaused)
            {
                isPaused = false;
                MainMenu.instance.menuScreen.SetActive(false);
            }
            else
            {
                isPaused = true;
                MainMenu.instance.menuScreen.SetActive(true);
            }

            CheckForPause();

        }


        if (hitDoor)
        {
            if (Input.GetKeyDown(KeyCode.X))
            {
                currentDoor.SetActive(false);
                hitDoor = false;
            }
           
        }
    }

    public void CheckForPause()
    {

        if (isPaused)
        {
            Time.timeScale = 0;
        }
        else
        {
            Time.timeScale = 1;
        }

    }

    public void GameWon()
    {
        MainMenu.instance.ShowWinnerText();
        MainMenu.instance.showMainMenu();
        MainMenu.instance.ToggleLeaderboard();
        MainMenu.instance.textObject.SetActive(true);
        MainMenu.instance.firstLoad = true;
        Time.timeScale = 0;

        float currentTime = Timer.instance.time;

        float minutes = Mathf.FloorToInt(currentTime / 60);
        float seconds = Mathf.FloorToInt(currentTime % 60);

        string scoreText = string.Format("Your Score: {0:00}:{1:00}", minutes, seconds);
        MainMenu.instance.UpdateYourTimeText(scoreText);

        bool putCurrentTimeInLeaderboard = false;
        // if their time is lower than the array, store it... otherwise don't
        foreach (float time in bestTimes) {

            if (time == 0)
            {
                putCurrentTimeInLeaderboard = true;
                continue;
            }

            if (currentTime < time)
            {
                putCurrentTimeInLeaderboard = true;
            }

         
        }

       


        // sort array...
        if (putCurrentTimeInLeaderboard)
        {
            bestTimes[4] = currentTime;
            Array.Sort(bestTimes);

        }

  

        string bestScoreText = "";

        foreach (float time in bestTimes)
        {
            if (time > 0 && time != 9999)
            {
                float m = Mathf.FloorToInt(time / 60);
                float s = Mathf.FloorToInt(time % 60);

                bestScoreText = bestScoreText + string.Format("{0:00}:{1:00}\n", m, s);
            }
        }

        MainMenu.instance.UpdateBestTimeText(bestScoreText);
    }

}
