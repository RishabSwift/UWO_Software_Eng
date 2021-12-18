using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;


public class Timer : MonoBehaviour
{

    public float time = 0;
    public bool timerRunning = false;

    public Text timeText;

    public static Timer instance;

    // Start is called before the first frame update
    void Start()
    {
        instance = this;
    }

    // Update is called once per frame
    void Update()
    {
        if (timerRunning)
        {
            time += Time.deltaTime;
            DisplayTime(time);
        }

       
    }

    void DisplayTime(float time)
    {
        float minutes = Mathf.FloorToInt(time / 60);
        float seconds = Mathf.FloorToInt(time % 60);

        timeText.text = string.Format("Time Elapsed {0:00}:{1:00}", minutes, seconds);
    }
}
