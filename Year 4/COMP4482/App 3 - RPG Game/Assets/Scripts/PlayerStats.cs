using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerStats : MonoBehaviour
{

    public string playerName;
    public int currentLevel = 1;
    public int currentXP = 0;

    public int currentHP = 100;
    public int maxHP = 100;
    public int startingXp = 1000;

    // array of XP points of each level...
    public int[] XpToNextLevel;

    public int maxLevel = 10;

    public int strenth;
    public int defence;
    public int weaponPower;
    public int armourPower;
    public string currentWeapon;
    public string currentArmour;

    public Sprite characterImage;

    // Start is called before the first frame update
    void Start()
    {
        XpToNextLevel = new int[maxLevel];
        XpToNextLevel[1] = startingXp;

        for(int i = 2; i<XpToNextLevel.Length; i++)
        {
            XpToNextLevel[i] = Mathf.FloorToInt(XpToNextLevel[i - 1] * 1.250f);
        }
    }

    // Update is called once per frame
    void Update()
    {
        // check if user levels up
        if (Input.GetKeyDown(KeyCode.J))
        {
            AddXP(500);
        }
    }

    // add xp to user
    public void AddXP(int XP)
    {
        currentXP += XP;
        if (currentXP > XpToNextLevel[currentLevel])
        {
            currentXP -= XpToNextLevel[currentLevel];
            currentLevel++;
        }

        maxHP *= Mathf.FloorToInt(1.05f);
    }
}
