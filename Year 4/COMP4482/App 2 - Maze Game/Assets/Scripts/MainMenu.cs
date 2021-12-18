using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class MainMenu : MonoBehaviour
{
    public GameObject resumeBtn;
    //public Button leaderboardBtn;
    //public Button quitBtn;

    public GameObject menuScreen;

    public static MainMenu instance;

    public bool firstLoad = true;

    public GameObject winnerScreen;

    public bool inLeaderboard = false;

    public GameObject menuBottonScreen;
    public GameObject leaderboardScreen;
    public GameObject pauseButton;

    public Text leaderboardButtonText;

    public Text leaderboardResultText;
    public Text yourscoreText;

    public InputField nameTextBox;
    public GameObject textObject;

    // Start is called before the first frame update
    void Start()
    {

        resumeBtn.SetActive(false);

        instance = this;

        winnerScreen.SetActive(false);

        leaderboardScreen.SetActive(false);

        pauseButton.SetActive(false);

        textObject.SetActive(false);



    }

    // Update is called once per frame
    void Update()
    {

        if (!firstLoad)
        {
            if (PlayerController.instance.isPaused)
            {
                resumeBtn.SetActive(true);
                menuScreen.SetActive(true);
            }
            else
            {
                resumeBtn.SetActive(false);
                menuScreen.SetActive(false);
            }
        }

        PlayerController.instance.userName = nameTextBox.text;
    }

    public void SaveName()
    {
        
        //PlayerController.instance.userName = nameTextBox.text ;
    }

    public void QuitGame()
    {
        UnityEditor.EditorApplication.isPlaying = false;
        Application.Quit();
    }

    void StartGame()
    {
        //(MenuScreen.GetComponent<Canvas>()).enabled = false;
    }

    void ShowLeaderboardScreen()
    {
        Debug.Log("leaderboard!");
    }

    public void ResumeGame()
    {
        PlayerController.instance.isPaused = false;
        PlayerController.instance.CheckForPause();
        resumeBtn.SetActive(false);
        menuScreen.SetActive(false);
        winnerScreen.SetActive(false);
        pauseButton.SetActive(true);
    }

    public void NewGame()
    {
        winnerScreen.SetActive(false);
        firstLoad = false;
        Timer.instance.time = 0;
        Timer.instance.timerRunning = true;
        MazeRenderer.instance.DeleteWalls();
        MazeRenderer.instance.Reset();
        ResumeGame();
        textObject.SetActive(false);

        PlayerController.instance.transform.position = PlayerController.instance.startingPosition;
    }


    public void ShowWinnerText()
    {
        winnerScreen.SetActive(true);
    }

    public void showMainMenu()
    {
        resumeBtn.SetActive(false);
        menuScreen.SetActive(true);
    }

    public void ToggleLeaderboard()
    {
        inLeaderboard = !inLeaderboard;
        leaderboardScreen.SetActive(inLeaderboard);
        menuBottonScreen.SetActive(!inLeaderboard);

        if (inLeaderboard)
        {
            leaderboardButtonText.text = "main menu";
        } else
        {
            leaderboardButtonText.text = "leaderboard";
        }
    }

    public void UpdateYourTimeText(string text)
    {
        MainMenu.instance.yourscoreText.text = text;
    }

    public void UpdateBestTimeText(string text)
    {
        MainMenu.instance.leaderboardResultText.text = text;
    }

    public void Pause()
    {
        PlayerController.instance.isPaused = true;
        menuScreen.SetActive(true);
        pauseButton.SetActive(false);
    }
    
}
