using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class GameMenu : MonoBehaviour
{

    public GameObject menu;
    public GameObject[] windows;

    public Text nameText, hpText, levelText, xpText;
    public Slider xpSlider;

    private PlayerStats stats;
    public GameObject statsHolder;

    public Text statusNameText, statusHpText, strengthText, currentWeaponText, weaponPowerText, currentArmorText, currentArmorPowerText;

    public ItemButton[] itemsButtons;

    public static GameMenu instance;
    public string selectedItem;
    public Item activeItem;
    public Text itemName;

    // Start is called before the first frame update
    void Start()
    {
        instance = this;
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Escape))
        {
            if (menu.activeInHierarchy)
            {
                CloseMenu();
            }
            else
            {
                menu.SetActive(true);
                UpdateStats();
                GameManager.instance.menuOpen = true;
            }
        }
    }

    public void UpdateStats()
    {
        stats = GameManager.instance.playerStats;
        if (stats.gameObject.activeInHierarchy)
        {
            statsHolder.SetActive(true);
            nameText.text = stats.playerName;
            hpText.text = "HP: " + stats.currentHP + "/" + stats.maxHP;
            levelText.text = "Level: " + stats.currentLevel;
            xpText.text = "" + stats.currentXP + "/" + stats.XpToNextLevel[stats.currentLevel];
            xpSlider.maxValue = stats.XpToNextLevel[stats.currentLevel];
            xpSlider.value = stats.currentXP;

        } else
        {
            statsHolder.SetActive(false);
        }
    }

    public void ToggleWindow(int number)
    {
        UpdateStats();
        for (int i=0; i<windows.Length; i++)
        {
            if (number == i)
            {
                windows[i].SetActive(!windows[i].activeInHierarchy);
            } else
            {
                windows[i].SetActive(false);
            }
        }
    }

    public void CloseMenu()
    {
        ToggleWindow(-1);
        GameManager.instance.menuOpen = false;
        menu.SetActive(false);
    }

    public void ShowStats()
    {

        statusNameText.text = stats.name;
        statusHpText.text = "" + stats.currentHP + "/" + stats.maxHP;
        strengthText.text = stats.strenth.ToString();
        currentWeaponText.text = stats.currentWeapon;
        weaponPowerText.text = stats.weaponPower.ToString();
        currentArmorText.text = stats.currentArmour.ToString();
        currentArmorPowerText.text = stats.armourPower.ToString();
       
    }

    public void ShowItems()
    {
        for (int i =0; i<itemsButtons.Length; i++)
        {
            itemsButtons[i].buttonValue = i;

            if (GameManager.instance.playerItems[i] != "")
            {
                itemsButtons[i].image.gameObject.SetActive(true);
                itemsButtons[i].image.sprite = GameManager.instance.GetItemDetails(GameManager.instance.playerItems[i]).itemSprite;
                itemsButtons[i].amount.text = GameManager.instance.totalItems[i].ToString();
            } else
            {
                itemsButtons[i].image.gameObject.SetActive(false);
                itemsButtons[i].amount.text = "";
            }
        }
    }

    public void SelectItem(Item item)
    {
        activeItem = item;
        itemName.text = activeItem.name;
    }

    public void UseItem()
    {
        activeItem.Use();
    }

    public void Quit() 
    {
        UnityEngine.SceneManagement.SceneManager.LoadScene("Menu");
    }
}
