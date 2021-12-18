using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Dialog : MonoBehaviour
{

    public Text messageText;
    public Text nameText;

    public GameObject dialogBox;
    public GameObject nameBox;

    public string[] dialogLines;
    private int lineIndex;
    private bool start;

    public static Dialog instance;
    public bool isFirstInteraction;

    // Start is called before the first frame update
    void Start()
    {
        instance = this;
    } 

    // Update is called once per frame
    void Update()
    {
        if (Input.GetButtonUp("Fire1"))
        {
            if (!start)
            {

                lineIndex++;

                if (lineIndex >= dialogLines.Length)
                {
                    dialogBox.SetActive(false);
                    GameManager.instance.dialogOpen = false;
                }
                else
                {
                    checkForName();
                    messageText.text = dialogLines[lineIndex];
                }
            } else
            {
                start = false;
              
            }
        }


    }

    public void show(string[] lines, bool isPerson)
    {
        dialogLines = lines;
        lineIndex = 0;

        checkForName();

        messageText.text = dialogLines[lineIndex];
        dialogBox.SetActive(true);
        start = true;

        nameBox.SetActive(isPerson);

        GameManager.instance.dialogOpen = true;
    }

    // if n:John in any line.. then you update the name
    public void checkForName()
    {
        if (dialogLines[lineIndex].StartsWith("n:"))
        {
            nameText.text = dialogLines[lineIndex].Replace("n:", "");
            lineIndex++;
        }
    }
}
