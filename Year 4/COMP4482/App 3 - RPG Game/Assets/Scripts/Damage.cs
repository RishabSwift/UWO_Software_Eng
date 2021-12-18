using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Damage : MonoBehaviour
{

    public Text damageText;
    public float lifetime = 1f;
    public float moveSpeed = 1f;


    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        Destroy(gameObject, lifetime);
        transform.position += new Vector3(0f, moveSpeed * Time.deltaTime, 0f);
    }

    public void UpdateDamage(int amount)
    {
        damageText.text = amount.ToString();
        transform.position += new Vector3(Random.Range(-.5f, .5f), Random.Range(-.5f, .5f), 0);
    }
}
