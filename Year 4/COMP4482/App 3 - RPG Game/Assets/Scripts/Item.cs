using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Item : MonoBehaviour
{

    public bool isWeapon;
    public bool isItem;
    public bool isArmour;

    public string itemName;
    public int value;
    public Sprite itemSprite;

    public int worth;
    public bool affectHp, affectStrength;

    public int weaponStrength;
    public int armourStrength;


    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }

    public void Use()
    {
        PlayerStats player = GameManager.instance.playerStats;

        if (isItem)
        {
            if (affectHp)
            {
                player.currentHP += value;
            }
             else if (isArmour)
            {
                player.armourPower += value;
            }
        }

        if (isWeapon)
        {
            if (player.currentWeapon != "")
            {
                GameManager.instance.AddItem(player.currentWeapon);
            }

            player.currentWeapon = itemName;
            player.weaponPower = weaponStrength;
        }

        if (isArmour)
        {
            if (player.currentArmour != "")
            {
                GameManager.instance.AddItem(player.currentArmour);
            }

            player.currentArmour = itemName;
            player.armourPower = armourStrength;
        }

        GameManager.instance.RemoveItem(itemName);
    }
}
