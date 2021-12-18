using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class DialogShow : MonoBehaviour
{

    public string[] dialogLines;
    public bool isPerson = true;

    private bool canActivate;
    private bool isFirstActive;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {

        // if dialogbox is not OPEN... then show lines.
        if (canActivate && (Input.GetButtonDown("Fire1") || isFirstActive) && !Dialog.instance.dialogBox.activeInHierarchy)
        {
            isFirstActive = false;
            Dialog.instance.show(dialogLines, isPerson);
        }
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.tag == "Player")
        {
            canActivate = true;
            isFirstActive = true;
        }
    }

    private void OnTriggerExit2D(Collider2D collision)
    {
        if (collision.tag == "Player")
        {
            canActivate = false;
            isFirstActive = false;
        }
    }
}
