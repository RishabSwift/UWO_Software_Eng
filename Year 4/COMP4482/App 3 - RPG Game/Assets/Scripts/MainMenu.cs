using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MainMenu : MonoBehaviour
{

    public string gameScene;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void NewGame()
    {
        UnityEngine.SceneManagement.SceneManager.LoadScene(gameScene);
    }

    public void Quit()
    {
        Application.Quit();
    }
}
