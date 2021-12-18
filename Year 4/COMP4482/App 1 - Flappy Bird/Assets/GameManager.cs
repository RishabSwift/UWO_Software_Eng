using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class GameManager : MonoBehaviour
{

    public GameObject gameOverCanvas;

    public void GameOver() {
        gameOverCanvas.SetActive(true);
        Time.timeScale = 0;
    }

    // Start is called before the first frame update
    void Start()
    {
        gameOverCanvas.SetActive(false);
        Time.timeScale = 1;
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void Replay() {
        SceneManager.LoadScene(0);
    }
}
