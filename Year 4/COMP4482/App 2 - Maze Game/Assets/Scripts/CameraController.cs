using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraController : MonoBehaviour
{
    // Camera required objects
    public float rotSpeed = 2.0f;
    public Transform Player;
    float mouseX;
    private Vector3 offset;

    private void Start()
    {
        offset = new Vector3(0f,2f,-1.75f);
    }


    private void LateUpdate()
    {
        //// Rotate camera
        //if (PauseMenu.GameIsPaused == false)
        //{
            // based on mouse rotation
            offset = Quaternion.AngleAxis(Input.GetAxis("Mouse X") * rotSpeed, Vector3.up) * offset;


            transform.position = Player.position + offset;
            transform.LookAt(Player.position); // camera look at player
        //}

    }

}
