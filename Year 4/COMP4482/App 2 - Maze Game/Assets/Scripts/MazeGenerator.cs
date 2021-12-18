using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;


[Flags]
public enum WallState 
{
    // wall state as represented in binary...
    // 0000 = no wall, 0001 = wall on left, 1000 = wall down and so on
    LEFT = 1,
    RIGHT = 2,
    UP = 4,
    DOWN = 8,

    VISITED = 128, // to find out which cell is visited
}

public struct Position {
    public int X;
    public int Y;
}

public struct Neighbour
{
    public Position Position; // position of the neighbour
    public WallState SharedWall; // which wall is shared with its neighbour
}


// Followed this tutorial for MazeGeneration algorithm: youtube.com/watch?v=ya1HyptE5uc
public static class MazeGenerator
{

    private static WallState GetOppositeWall(WallState wall)
    {
        switch(wall)
        {
            case WallState.RIGHT:
                return WallState.LEFT;
            case WallState.LEFT:
                return WallState.RIGHT;
            case WallState.UP:
                return WallState.DOWN;
            case WallState.DOWN:
                return WallState.UP;
            default:
                return WallState.UP;
        }
    }

    private static WallState[,] RecurviseBackTrack(WallState[,] maze, int width, int height)
    {

        var random = new System.Random();
        var positionStack = new Stack<Position>();

        var position = new Position {
            X = random.Next(0, width),
            Y = random.Next(0, height)
        };

        maze[position.X, position.Y] |= WallState.VISITED;
        positionStack.Push(position);

        while (positionStack.Count > 0)
        {
            // start at the current node
            var current = positionStack.Pop();

            // get unvisited neighbours
            var neighbours = GetUnvisitedNeighbours(current, maze, width, height);

            if (neighbours.Count > 0)
            {
                positionStack.Push(current);

                // go to a random neighbour  
                var randomIndex = random.Next(0, neighbours.Count);
                var randomNeighbour = neighbours[randomIndex];
                var nPosition = randomNeighbour.Position;

                // remove the walls
                maze[current.X, current.Y] &= ~randomNeighbour.SharedWall;
                maze[nPosition.X, nPosition.Y] &= ~GetOppositeWall(randomNeighbour.SharedWall); // remove opposite position wall

                // add a door
                

                // mark neighbour as visited
                maze[nPosition.X, nPosition.Y] |= WallState.VISITED;

                positionStack.Push(nPosition);
            }
        }

        return maze;
    }


    // define all the neighbours that are not visited
    // so check if the neighbour is visited... if not, then add it to a list
    private static List<Neighbour> GetUnvisitedNeighbours(Position p, WallState[,] maze, int width, int height)
    {
        var list = new List<Neighbour>();


        // for LEFT
        if (p.X > 0)
        {
            if (!maze[p.X - 1, p.Y].HasFlag(WallState.VISITED))
            {
                list.Add(new Neighbour
                {
                    Position = new Position
                    {
                        X = p.X - 1,
                        Y = p.Y
                    },
                    SharedWall = WallState.LEFT
                });
            }
        }

        // for DOWN
        if (p.Y > 0)
        {
            if (!maze[p.X, p.Y - 1].HasFlag(WallState.VISITED))
            {
                list.Add(new Neighbour
                {
                    Position = new Position
                    {
                        X = p.X,
                        Y = p.Y - 1
                    },
                    SharedWall = WallState.DOWN
                });
            }
        }

        // for UP
        if (p.Y < height - 1) // for TOP
        {
            if (!maze[p.X, p.Y + 1].HasFlag(WallState.VISITED))
            {
                list.Add(new Neighbour
                {
                    Position = new Position
                    {
                        X = p.X,
                        Y = p.Y + 1
                    },
                    SharedWall = WallState.UP
                });
            }
        }

        // for RIGHT
        if (p.X < width - 1) // for RIGHT
        {
            if (!maze[p.X + 1, p.Y].HasFlag(WallState.VISITED))
            {
                list.Add(new Neighbour
                {
                    Position = new Position
                    {
                        X = p.X + 1,
                        Y = p.Y
                    },
                    SharedWall = WallState.RIGHT
                });
            }
        }

        return list;
    }

    public static WallState[,] Generate(int width, int height)
    {
        WallState[,] maze = new WallState[width, height];
        WallState initial = WallState.RIGHT | WallState.LEFT | WallState.UP | WallState.DOWN;

        // set all walls to be 1111
        for (int i = 0; i < width; i++)
        {
            for(int j=0; j<height; j++) 
            {
                maze[i, j] = initial;
            }
        }

        return RecurviseBackTrack(maze, width, height);
    }


}
