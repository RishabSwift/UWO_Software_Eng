using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class FadeScreen : MonoBehaviour
{

    public static FadeScreen instance;

    public Image fadeScreen;
    public float fadeSpeed = 1f;

    public bool fadeToBlack;
    public bool fadeFromBlack;

    // Start is called before the first frame update
    void Start()
    {
        instance = this;
        DontDestroyOnLoad(fadeScreen);
    }

    // Update is called once per frame
    void Update()
    {
        if (fadeToBlack)
        {
            fadeScreen.color = new Color(fadeScreen.color.r, fadeScreen.color.g, fadeScreen.color.b, Mathf.MoveTowards(fadeScreen.color.a, 1f, fadeSpeed * Time.deltaTime));
            if (fadeScreen.color.a == 1f)
            {
                fadeToBlack = false;
            }
        }

        if (fadeFromBlack)
        {
            fadeScreen.color = new Color(fadeScreen.color.r, fadeScreen.color.g, fadeScreen.color.b, Mathf.MoveTowards(fadeScreen.color.a, 0, fadeSpeed * Time.deltaTime));
            if (fadeScreen.color.a == 0)
            {
                fadeFromBlack = false;
            }
        }
    }

    public void FadeIn()
    {
        fadeToBlack = true;
        fadeFromBlack = false;
    }

    public void FadeOut()
    {
        fadeFromBlack = true;
        fadeToBlack = false;
    }
}
