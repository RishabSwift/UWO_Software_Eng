using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class PauseMenu : MonoBehaviour
{
    public Button resumeGameBtn;
    public Button newGameBtn;
    public Button mainMenuBtn;

    public Canvas MenuScreen;
    public Canvas ResumeScreen;


    // Start is called before the first frame update
    void Start()
    {
        mainMenuBtn.onClick.AddListener(ResumeGame);
        newGameBtn.onClick.AddListener(NewGame);
        resumeGameBtn.onClick.AddListener(GoToMainMenu);
    }

    // Update is called once per frame
    void Update()
    {

    }

    void ResumeGame()
    {
        Time.timeScale = 1;
    }

    void NewGame()
    {
        (ResumeScreen.GetComponent<Canvas>()).enabled = false;
        MazeRenderer maze = GameObject.Find("MazeRenderer").GetComponent<MazeRenderer>();
        maze.Reset();
        //mazeRenderer.Reset();
    }

    void GoToMainMenu()
    {
        (MenuScreen.GetComponent<Canvas>()).enabled = true;
        (ResumeScreen.GetComponent<Canvas>()).enabled = false;
    }
}
