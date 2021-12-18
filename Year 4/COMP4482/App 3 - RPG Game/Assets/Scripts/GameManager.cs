using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameManager : MonoBehaviour
{

    public static GameManager instance;

    public PlayerStats playerStats;

    public bool menuOpen;
    public bool dialogOpen;
    public bool fadingActive;
    public bool fightActive;

    public string[] playerItems;
    public int[] totalItems;
    public Item[] referenceItems;

    // Start is called before the first frame update
    void Start()
    {
        instance = this;
        DontDestroyOnLoad(gameObject);
    }

    // Update is called once per frame
    void Update()
    {
        if (menuOpen || dialogOpen || fadingActive || fightActive)
        {
            PlayerController.singleton.canMove = false;
        } else
        {
            PlayerController.singleton.canMove = true;
        }


        //if (Input.GetKeyDown(KeyCode.J))
        //{
        //    AddItem("Silver Sword");
        //    AddItem("Silver Sword");
        //    RemoveItem("Health Potion");
        //}

    }

    public Item GetItemDetails(string item)
    {
        for (int i=0;i < referenceItems.Length; i++)
        {
            if (referenceItems[i].itemName == item)
            {
                return referenceItems[i];
            }
        }
        return null;
    }

    public void AddItem(string itemName)
    {
        int itemIndex = 0;
        bool availableSpace = false;
        for(int i =0; i< playerItems.Length; i++)
        {
            if (playerItems[i] == "" || playerItems[i] == itemName)
            {
                itemIndex = i;
                availableSpace = true;

                continue;                                                                                                                                                                                                                    
            }
        }

        if (availableSpace)
        {
            bool itemExists = false;
            for (int i = 0; i < referenceItems.Length; i++)
            {
                if (referenceItems[i].itemName == itemName)
                {
                    itemExists = true;
                    continue;
                }
            }

            if (itemExists)
            {
                playerItems[itemIndex] = itemName;
                totalItems[itemIndex]++;

            }
        }

        GameMenu.instance.ShowItems();


    }

    public void RemoveItem(string itemName)
    {
        bool found = false;
        int itemIndex = 0;

        for (int i = 0; i < playerItems.Length; i++)
        {
            if (playerItems[i] == itemName)
            {
                itemIndex = i;
                found = true;

                continue;
            }
        }

        if (found)
        {
            totalItems[itemIndex]--;
            if (totalItems[itemIndex] <= 0)
            {
                playerItems[itemIndex] = "";
            }

            GameMenu.instance.ShowItems();
            
        } else
        {
            // item doesn't exist.
        }
    }
}
