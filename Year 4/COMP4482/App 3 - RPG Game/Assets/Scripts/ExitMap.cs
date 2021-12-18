using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class ExitMap : MonoBehaviour
{

    public string nextSceneToLoad;
    public string areaTransitionName;

    public AreaEntrance entrance;

    public float waitToLoad = 1f;

    private bool shouldLoadAfterFade;

    // Start is called before the first frame update
    void Start()
    {
        entrance.transitionName = areaTransitionName;
    }

    // Update is called once per frame
    void Update()
    {
        if (shouldLoadAfterFade)
        {
            waitToLoad -= Time.deltaTime;
            if (waitToLoad <= 0)
            {
                shouldLoadAfterFade = false;
                SceneManager.LoadScene(nextSceneToLoad);
            }
        }
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.tag == "Player")
        {

            shouldLoadAfterFade = true;
            GameManager.instance.fadingActive = true;

            FadeScreen.instance.FadeIn();

            PlayerController.singleton.areaTransitionName = areaTransitionName;
        }
    }
}
