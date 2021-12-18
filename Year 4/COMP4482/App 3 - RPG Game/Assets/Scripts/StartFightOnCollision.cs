using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class StartFightOnCollision : MonoBehaviour
{
    public string enemyName;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        if (GameManager.instance.fightActive)
        {
            gameObject.SetActive(false);
        } else
        {
            gameObject.SetActive(true);
        }
    }

    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.tag == "Player")
        {
            FightManager.instance.StartFight(enemyName);
        }


        
    }
}
