using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FloatingTextScript : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        // destroy the item we just created after 1 millis
        Destroy(gameObject, 0.1f);
    }

    
}
