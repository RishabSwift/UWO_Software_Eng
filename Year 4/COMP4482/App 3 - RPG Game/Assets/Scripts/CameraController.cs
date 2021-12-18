using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Tilemaps;

public class CameraController : MonoBehaviour
{

    public Tilemap tilemap; // so that users cannot see outside the map
    public Transform target;

    // boundary limits
    private Vector3 bottomLeftLimit;
    private Vector3 topRightLimit;

    // get half of the width and height and stop camera from going through there
    private float halfHeight;
    private float halfWidth;

    // Start is called before the first frame update
    void Start()
    {
        //target = PlayerController.singleton.transform;
        target = FindObjectOfType<PlayerController>().transform;

        halfHeight = Camera.main.orthographicSize;
        halfWidth = halfHeight * Camera.main.aspect;

        bottomLeftLimit = tilemap.localBounds.min + new Vector3(halfWidth, halfHeight, 0f);
        topRightLimit = tilemap.localBounds.max + new Vector3(-halfWidth, -halfHeight, 0f);

        PlayerController.singleton.SetBoundaries(tilemap.localBounds.min, tilemap.localBounds.max);

    }

    // Update is called once per frame
    void LateUpdate()
    {
        transform.position = new Vector3(target.position.x, target.position.y, -30);

        transform.position = new Vector3(
            Mathf.Clamp(transform.position.x, bottomLeftLimit.x, topRightLimit.x),
            Mathf.Clamp(transform.position.y, bottomLeftLimit.y, topRightLimit.y),
            -30);
    }
}
