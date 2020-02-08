using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraController : MonoBehaviour
{

    public GameObject player;
    private Vector3 offset;

    // Start is called before the first frame update
    void Start()
    {
        offset = transform.position - player.transform.position;
    }

    // LateUpdate runs every frame like Update, but also counts in the processing of the previous update
    void LateUpdate()
    {
        transform.position = player.transform.position + offset;
    }

  
}
