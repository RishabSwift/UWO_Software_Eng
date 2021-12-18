using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class ItemButton : MonoBehaviour
{

    public Image image;
    public Text amount;
    public int buttonValue;

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void Click()
    {
        if (GameManager.instance.playerItems[buttonValue] != "")
        {
            GameMenu.instance.SelectItem(GameManager.instance.GetItemDetails(GameManager.instance.playerItems[buttonValue]));
        }
    }
}
