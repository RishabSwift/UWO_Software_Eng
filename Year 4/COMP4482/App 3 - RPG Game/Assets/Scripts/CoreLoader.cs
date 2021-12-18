using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CoreLoader : MonoBehaviour
{

    public GameObject fadeScreenUI;
    public GameObject player;
    public GameObject gm;

    // Start is called before the first frame update
    void Start()
    {
        if (FadeScreen.instance == null)
        {
           FadeScreen.instance = Instantiate(fadeScreenUI).GetComponent<FadeScreen>();
        }

        if (PlayerController.singleton == null)
        {
            PlayerController.singleton = Instantiate(player).GetComponent<PlayerController>();
        }

        if (GameManager.instance == null)
        {
            Instantiate(gm);
        }



    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
