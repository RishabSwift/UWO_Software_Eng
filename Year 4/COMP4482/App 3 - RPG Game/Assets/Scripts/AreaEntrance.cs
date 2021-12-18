using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class AreaEntrance : MonoBehaviour
{

    public string transitionName;

    // Start is called before the first frame update
    void Start()
    {
        if (transitionName == PlayerController.singleton.areaTransitionName)
        {
            Debug.Log(transform.position.x);
            PlayerController.singleton.transform.position = transform.position;
        }

        FadeScreen.instance.FadeOut();
        GameManager.instance.fadingActive = false;
    }

    // Update is called once per frame
    void Update()
    {
         
    }
}
