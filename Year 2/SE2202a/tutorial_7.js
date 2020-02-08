/*
 * Tutorial 7 — The Robot Project
 */


/**
 * The list of roads defined as string pairs.
 * They are joined by '-'.
 * E.g. "Alice's House-Bob's House" =  Road that connects Alice and Bob's house.
 * @type {*[]}
 */
const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

/**
 * Create a map of the house... It finds out which house is connected to what other house/building
 *
 * Kind of like this:
 *
 graph = {
       'Alice house': ['Bob house', 'Post office'],
       'Post office': ['Alice house'],
       'Bob house': ['Alice house']

}
 *
 * @param edges - array of edges
 * @returns {null}
 */
function buildGraph(edges) {
    // Create an empty object
    let graph = Object.create(null);

    // Function to add data to the object
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }

    // Split the string by dash "-" and add that to the object
    for (let [from, to] of edges.map(r => r.split("-"))) {
        // The "to" is the linking feature of the node...
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

// Build the graph and store in variable
const roadGraph = buildGraph(roads);


class VillageState {
    /**
     * The constructor
     * @param place
     * @param parcels
     */
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    /**
     * Responsible for delivering the parcel...
     * @param destination
     * @returns {VillageState}
     */
    move(destination) {
        // check if the road is going from the current place to the destination
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        }

        // create a new state with the destination as new place
        // filter out the the undelivered from the parcels
        let parcels = this.parcels.map(p => {
            if (p.place != this.place) return p;
            return {place: destination, address: p.address}; // move
        }).filter(p => p.place != p.address); // deliver

        // return the new destination of the robot
        return new VillageState(destination, parcels);
    }
}

/**
 * Create a new instance of the VillageState
 * @type {VillageState}
 */
let first = new VillageState(
    "Post Office",
    [{place: "Post Office", address: "Alice's House"}]
);


/**
 *
 * Stores data in an object containing both the direction it wants to move in and a memory value that will be given back to it the next time it is called
 * @param state
 * @param robot
 * @param memory
 */
function runRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

/**
 * Pick a random element from the array
 * @param array
 * @returns {*}
 */
function randomPick(array) {
    // Math.random() -> returns a number from 0-1 (not inclusive)
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

/**
 * Using the randomPick to get a random element from an array, move the robot randomly to deliver all packages and finish its destinations
 * @param state
 * @returns {{direction: *}}
 */
function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

/**
 * Randomly create a new state with parcels so we can test it
 * @param parcelCount
 * @returns {VillageState}
 */
VillageState.random = function (parcelCount = 5) {
    let parcels = [];
    // Create parcels based on how many we want from the argument
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        // If the new place is the same as the address, then loop pick another one
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
};


/**
 * The mail route based on the mailRoute variable above
 * @param state
 * @param memory
 * @returns {{memory: *, direction: *}}
 */
function routeRobot(state, memory) {
    // Remove the first element after every turn
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

/**
 * Find the shortest route
 * @param graph
 * @param from
 * @param to
 * @returns {*[]}
 */
function findRoute(graph, from, to) {
    // Array of places that will be explored next array of places that should be explored next, and the past route
    let work = [{at: from, route: []}];
    // If we have reached the goal, then return that as the route
    // Otherwise keep searching
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

/**
 * Alternate method of delivering the parcels. Most Efficient
 * It takes the first undelivered parcel in the set and, if that parcel hasn’t been picked up yet, plots a route toward it
 *
 * @param place
 * @param parcels
 * @param route
 * @returns {{memory: *, direction: *}}
 */
function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        // If the parcel has been picked up, it still needs to be delivered,
        // so the robot creates a route toward the delivery address instead
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}

runRobot(VillageState.random(), goalOrientedRobot, []);


/*
 * EXERCISES
 * ----------------------------------
 * MEASURING A ROBOT
 * ----------------------------------
 */

/**
 * Compare the efficiency of the robots...
 * Generate 100 tasks and let each of the robots solve each of these tasks.
 * When done, it should output the average number of steps each robot took per task.
 * @param robot1
 * @param memory1
 * @param robot2
 * @param memory2
 */
function compareRobots(robot1, memory1, robot2, memory2) {
    // The total steps the robot took...
    let total1 = 0, total2 = 0;
    // Run it 100 times as per the question
    for (let i = 0; i < 100; i++) {
        // Get a random one...
        let state = VillageState.random();
        // Count the # of steps taken by the robot and add it to the total
        total1 += countRobotSteps(state, robot1, memory1);
        total2 += countRobotSteps(state, robot2, memory2);
    }
    // Divide by 100 since we ran this a 100 times... so to get the answer per step we must do so...
    console.log(`Robot 1 took ${total1 / 100} steps per task`);
    console.log(`Robot 2 took ${total2 / 100} steps per task`);
    console.log(`The fastest robot was ${total1 < total2 ? "Robot 1" : "Robot 2"}!`);
}

/**
 * Count the number of steps it took to deliver all parcels / move through the town for the given robot
 * @param state
 * @param robot
 * @param memory
 * @returns {number}
 */
function countRobotSteps(state, robot, memory) {
    let steps = 0;
    // Let's calculate the steps we need to deliver all parcels
    while (true) {
        // if the parcels are all delivered... we're done
        if (state.parcels.length === 0) {
            return steps;
        }
        // Move from one place to another and count a step
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        steps++;
    }
}

console.error('\n\nPart 1: Compare Robots');
compareRobots(routeRobot, [], goalOrientedRobot, []);

/*
 * ----------------------------------
 * ROBOT EFFICIENCY
 * ----------------------------------
 */

/**
 * The fastest robot
 * Pick the closest target by doing pickup and then delivery.
 * @param place
 * @param parcels
 * @param route
 * @returns {{memory: *, direction: *}}
 */
function superSonicRobot({place, parcels}, route) {
    // If there are no routes... what are we doing here?!
    if (route.length == 0) {

        let pickups, deliveries, destinations, bestRoute;
        // Filter and map the parcels and deliveries
        pickups = parcels.filter(p => p.place != place).map(p => p.place);
        deliveries = parcels.filter(p => p.place == place).map(p => p.address);

        // Do pickups first if any to pickup...
        destinations = pickups.length > 0 ? pickups : deliveries;

        // Loop through the targets and find route for htem
        for (let destination of destinations) {
            let foundRoute = findRoute(roadGraph, place, destination);
            // If we don't have the best route yet, then the new route becomes the best route
            if (!bestRoute) {
                bestRoute = foundRoute;
                // If the length of best route is more than the found one, then we should make ours more efficient by swapping them
            } else if (bestRoute.length > foundRoute.length) {
                bestRoute = foundRoute;
            }
        }
        // ...and the route is the best route!
        route = bestRoute;
    }
    return {direction: route[0], memory: route.slice(1)};
}

console.error('\n\nPart 2: Robot Efficiency');
compareRobots(superSonicRobot, [], goalOrientedRobot, []);


/*
 * ----------------------------------
 * PERSISTENT GROUP
 * ----------------------------------
 */


/**
 *
 */
class PGroup {

    /**
     * It says "The constructor shouldn’t be part of the class’s interface (though you’ll definitely want to use it internally)"
     * @param element
     */
    constructor(element) {
        this.element = element;
    }

    /**
     * return a new PGroup instance with the given member added and leave the old one unchanged
     * @param _element
     * @returns {PGroup}
     */
    add(_element) {
        return this.has(_element) ? this : new PGroup(this.element.concat([_element]));
    }

    /**
     * Create a new instance with the element removed
     * @param _element
     * @returns {PGroup}
     */
    delete(_element) {

        return !this.has(_element) ? this : new PGroup(this.element.filter(m => m !== _element));
    }

    /**
     * Check if it has an element
     * @returns {boolean|*}
     * @param _element
     */
    has(_element) {
        return this.element.includes(_element);
    }

}

// PGroup.empty = Object.create(PGroup.prototype);
PGroup.empty = new PGroup([]);

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.error('\n\nPart 3: Persistent Group');
console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false