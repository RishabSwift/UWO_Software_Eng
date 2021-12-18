using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HitCoin : MonoBehaviour
{

    private void OnTriggerEnter2D(Collider2D collision) {
        Score.score += 2;

        gameObject.transform.parent.gameObject.SetActive(false);
        Debug.Log(gameObject.transform.parent.gameObject.name);
//   Debug.Log(collision.gameObject.transform.parent.gameObject.name);
        // collision.gameObject.transform.parent.setActive(false);
    }

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
       
    }
}
