using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Cube : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        CreateRandomColor();
    }

    public void CreateRandomColor()
    {
        GetComponent<Renderer>().sharedMaterial.color = Random.ColorHSV();
    }

    public void Reset()
    {
        GetComponent<Renderer>().sharedMaterial.color = Color.white;
    }
}
