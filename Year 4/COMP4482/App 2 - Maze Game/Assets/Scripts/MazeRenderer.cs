using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MazeRenderer : MonoBehaviour
{

    [SerializeField]
    [Range(1,50)]
    private int width = 10;

    [SerializeField]
    [Range(1,50)]
    private int height = 10;

    [SerializeField]
    private float size = 1f;

    [SerializeField]
    private Transform groundPrefab = null;

    [SerializeField]
    private Transform wallPrefab = null;

    [SerializeField]
    private Transform doorPrefab = null;

    // create three doors
    private int doorsCreated;

    public static MazeRenderer instance;


    // Start is called before the first frame update
    void Start()
    {
        Reset();
        instance = this;
    }

    public void Reset()
    {

        var maze = MazeGenerator.Generate(width, height);
        Draw(maze);
    }

    public void DeleteWalls()
    {
        GameObject[] allObjects = GameObject.FindGameObjectsWithTag("wall");
        foreach (GameObject obj in allObjects)
        {
            Destroy(obj);
        }

        GameObject[] doors = GameObject.FindGameObjectsWithTag("door");
        foreach (GameObject obj in doors)
        {
            Destroy(obj);
        }


    }

    private void Draw(WallState[,] maze) {

        var ground = Instantiate(groundPrefab, transform);

        

        // size of the floor itself
        ground.localScale = new Vector3(width, 1, height);


        // create 3 randomly placed doors in the cells
        var door = Instantiate(doorPrefab, transform) as Transform;
        var door2 = Instantiate(doorPrefab, transform) as Transform;
        var door3 = Instantiate(doorPrefab, transform) as Transform;
        door.position = new Vector3(-width / 2 + Random.Range(3, width), 0, -height / 2 + Random.Range(3, height));
        door2.position = new Vector3(-width / 2 + Random.Range(3, width), 0, -height / 2 + Random.Range(3, height));
        door3.position = new Vector3(-width / 2 + Random.Range(3, width), 0, -height / 2 + Random.Range(3, height));


        // remove the top right and bottom right for entrance and exit



        for (int i = 0; i < width; i++)
        {
            for (int j=0; j<height; j++) {

                // remove first wall to enter
                if (i == 0 && j == 0)
                {
                    continue;
                } else if (i == 0 && j == height - 1)
                {
                    continue;
                }


              
                var cell = maze[i,j];
                var position = new Vector3(-width / 2 + i, 0, -height / 2 + j);

                if (cell.HasFlag(WallState.UP)) {
                    var topWall = Instantiate(wallPrefab, transform) as Transform;
                    topWall.position = position + new Vector3(0, 0, size / 2);
                    topWall.localScale = new Vector3(size, topWall.localScale.y, topWall.localScale.z);
                }

                if (cell.HasFlag(WallState.LEFT))
                {
                    var leftWall = Instantiate(wallPrefab, transform) as Transform;
                    leftWall.position = position + new Vector3(-size / 2, 0, 0);
                    leftWall.eulerAngles = new Vector3(0, 90, 0);
                    leftWall.localScale = new Vector3(size, leftWall.localScale.y, leftWall.localScale.z);

                    //if (doorsCreated < 3 && j == Random.Range(0, width))
                    //{
                    //    var door = Instantiate(doorPrefab, transform) as Transform;
                    //    door.position = new Vector3(-width / 2 + i, 0, -height / 2 + j);
                    //    doorsCreated++;
                    //}
                }

                if (i == width -1)
                {
                    if (cell.HasFlag(WallState.RIGHT))
                    {
                        var rightWall = Instantiate(wallPrefab, transform) as Transform;
                        rightWall.position = position + new Vector3(+size / 2, 0, 0);
                        rightWall.eulerAngles = new Vector3(0, 90, 0);
                        rightWall.localScale = new Vector3(size, rightWall.localScale.y, rightWall.localScale.z);
                    }
                }

                // check if first row
                if (j==0)
                {
                    if (cell.HasFlag(WallState.DOWN))
                    {
                        var bottomWall = Instantiate(wallPrefab, transform) as Transform;
                        bottomWall.position = position + new Vector3(0, 0, -size / 2);
                        bottomWall.localScale = new Vector3(size, bottomWall.localScale.y, bottomWall.localScale.z);

                    }
                }

            }
        }     
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
