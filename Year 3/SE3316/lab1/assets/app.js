
// All pokemon object array -- SOURCE: https://github.com/fanzeyi/pokemon.json/blob/master/pokedex.json
// Only first 20 are taken and stored here. The localization of names have also been removed
let allPokemons = [{
    "id": 1,
    "name": {
        "english": "Bulbasaur",
    },
    "type": [
        "Grass",
        "Poison"
    ],
    "base": {
        "HP": 45,
        "Attack": 49,
        "Defense": 49,
        "Sp. Attack": 65,
        "Sp. Defense": 65,
        "Speed": 45
    }
},
{
    "id": 2,
    "name": {
        "english": "Ivysaur",
    },
    "type": [
        "Grass",
        "Poison"
    ],
    "base": {
        "HP": 60,
        "Attack": 62,
        "Defense": 63,
        "Sp. Attack": 80,
        "Sp. Defense": 80,
        "Speed": 60
    }
},
{
    "id": 3,
    "name": {
        "english": "Venusaur",
    },
    "type": [
        "Grass",
        "Poison"
    ],
    "base": {
        "HP": 80,
        "Attack": 82,
        "Defense": 83,
        "Sp. Attack": 100,
        "Sp. Defense": 100,
        "Speed": 80
    }
},
{
    "id": 4,
    "name": {
        "english": "Charmander",
    },
    "type": [
        "Fire"
    ],
    "base": {
        "HP": 39,
        "Attack": 52,
        "Defense": 43,
        "Sp. Attack": 60,
        "Sp. Defense": 50,
        "Speed": 65
    }
},
{
    "id": 5,
    "name": {
        "english": "Charmeleon",
    },
    "type": [
        "Fire"
    ],
    "base": {
        "HP": 58,
        "Attack": 64,
        "Defense": 58,
        "Sp. Attack": 80,
        "Sp. Defense": 65,
        "Speed": 80
    }
},
{
    "id": 6,
    "name": {
        "english": "Charizard",
    },
    "type": [
        "Fire",
        "Flying"
    ],
    "base": {
        "HP": 78,
        "Attack": 84,
        "Defense": 78,
        "Sp. Attack": 109,
        "Sp. Defense": 85,
        "Speed": 100
    }
},
{
    "id": 7,
    "name": {
        "english": "Squirtle",
    },
    "type": [
        "Water"
    ],
    "base": {
        "HP": 44,
        "Attack": 48,
        "Defense": 65,
        "Sp. Attack": 50,
        "Sp. Defense": 64,
        "Speed": 43
    }
},
{
    "id": 8,
    "name": {
        "english": "Wartortle",
    },
    "type": [
        "Water"
    ],
    "base": {
        "HP": 59,
        "Attack": 63,
        "Defense": 80,
        "Sp. Attack": 65,
        "Sp. Defense": 80,
        "Speed": 58
    }
},
{
    "id": 9,
    "name": {
        "english": "Blastoise",
    },
    "type": [
        "Water"
    ],
    "base": {
        "HP": 79,
        "Attack": 83,
        "Defense": 100,
        "Sp. Attack": 85,
        "Sp. Defense": 105,
        "Speed": 78
    }
},
{
    "id": 10,
    "name": {
        "english": "Caterpie",
    },
    "type": [
        "Bug"
    ],
    "base": {
        "HP": 45,
        "Attack": 30,
        "Defense": 35,
        "Sp. Attack": 20,
        "Sp. Defense": 20,
        "Speed": 45
    }
},
{
    "id": 11,
    "name": {
        "english": "Metapod",
    },
    "type": [
        "Bug"
    ],
    "base": {
        "HP": 50,
        "Attack": 20,
        "Defense": 55,
        "Sp. Attack": 25,
        "Sp. Defense": 25,
        "Speed": 30
    }
},
{
    "id": 12,
    "name": {
        "english": "Butterfree",
    },
    "type": [
        "Bug",
        "Flying"
    ],
    "base": {
        "HP": 60,
        "Attack": 45,
        "Defense": 50,
        "Sp. Attack": 90,
        "Sp. Defense": 80,
        "Speed": 70
    }
},
{
    "id": 13,
    "name": {
        "english": "Weedle",
    },
    "type": [
        "Bug",
        "Poison"
    ],
    "base": {
        "HP": 40,
        "Attack": 35,
        "Defense": 30,
        "Sp. Attack": 20,
        "Sp. Defense": 20,
        "Speed": 50
    }
},
{
    "id": 14,
    "name": {
        "english": "Kakuna",
    },
    "type": [
        "Bug",
        "Poison"
    ],
    "base": {
        "HP": 45,
        "Attack": 25,
        "Defense": 50,
        "Sp. Attack": 25,
        "Sp. Defense": 25,
        "Speed": 35
    }
},
{
    "id": 15,
    "name": {
        "english": "Beedrill",
    },
    "type": [
        "Bug",
        "Poison"
    ],
    "base": {
        "HP": 65,
        "Attack": 90,
        "Defense": 40,
        "Sp. Attack": 45,
        "Sp. Defense": 80,
        "Speed": 75
    }
},
{
    "id": 16,
    "name": {
        "english": "Pidgey",
    },
    "type": [
        "Normal",
        "Flying"
    ],
    "base": {
        "HP": 40,
        "Attack": 45,
        "Defense": 40,
        "Sp. Attack": 35,
        "Sp. Defense": 35,
        "Speed": 56
    }
},
{
    "id": 17,
    "name": {
        "english": "Pidgeotto",
    },
    "type": [
        "Normal",
        "Flying"
    ],
    "base": {
        "HP": 63,
        "Attack": 60,
        "Defense": 55,
        "Sp. Attack": 50,
        "Sp. Defense": 50,
        "Speed": 71
    }
},
{
    "id": 18,
    "name": {
        "english": "Pidgeot",
    },
    "type": [
        "Normal",
        "Flying"
    ],
    "base": {
        "HP": 83,
        "Attack": 80,
        "Defense": 75,
        "Sp. Attack": 70,
        "Sp. Defense": 70,
        "Speed": 101
    }
},
{
    "id": 19,
    "name": {
        "english": "Rattata",
    },
    "type": [
        "Normal"
    ],
    "base": {
        "HP": 30,
        "Attack": 56,
        "Defense": 35,
        "Sp. Attack": 25,
        "Sp. Defense": 35,
        "Speed": 72
    }
},
{
    "id": 20,
    "name": {
        "english": "Raticate",
    },
    "type": [
        "Normal"
    ],
    "base": {
        "HP": 55,
        "Attack": 81,
        "Defense": 60,
        "Sp. Attack": 50,
        "Sp. Defense": 70,
        "Speed": 97
    }
},
];

// visiblePokemons is initially the duplicate of allPokemons above. The only time this changes is when a user is searching
// when user is searching, the visiblePokemons only contains an array of objects matching the search query
let visiblePokemons = allPokemons;
let pokemonsElm = document.getElementById("pokemons-list");
let pokemonsSearchElm; // the entire search element
let clearResultsElm = document.getElementById("search-clear-results"); //clear results div
let isSearching = false;
let searchingHeading; // Search heading message h1 element

// when the DOM loads, we can start populating...
window.onload = function () {

    // create the search elements dynamically...
    let searchDiv = document.createElement('div');
    let searchUi = document.createElement('ul');
    searchUi.className = 'flex-container flex-equally-spaced';
    searchUi.id = 'pokemons-search-list';
    searchDiv.id = 'pokemons-search-list-container';

    searchDiv.appendChild(searchUi);

    // add it before the <ul> like it says on the rubric
    document.getElementById('lists').insertBefore(searchDiv, pokemonsElm)

    pokemonsSearchElm = searchUi;
    hideElement(pokemonsSearchElm);

    searchingHeading = document.createElement('h1');
    searchingHeading.id = 'search-heading';
    searchingHeading.style.display = 'none';

    // append it all together
    searchingHeading.appendChild(document.createTextNode('Displaying search results:'));
    document.getElementById('pokemons-search-list-container').insertBefore(searchingHeading, pokemonsSearchElm);

    // populate list of pokemons
    mount();
}

// populate the list of all pokemons on page load
function mount() {

    // clear text elements
    document.getElementById('search-name').value = "";
    document.getElementById('search-id').value = "";



    // loop through all the pokemons
    allPokemons.forEach(updateDOM);
}


// update the DOM with the pokemons
function updateDOM(item) {
    // pass in the parent in which append the HTML 
    let html = generateHtml(item);

}

// get the image url from the ID 
function getImageUrl(id) {
    return window.location.origin + window.location.pathname + "/assets/images/" + id + ".png";
}

/**
 * Generate the HTML (each list element) given the object... this populates all the pokemons one by one
 * 
 * The expected OUTPUT is the following:
 *
 *        <li>
 *            <div class="pokemon">
 *            <div class="pokemon-id">
 *                    #${obj.id}
 *                </div>
 *                <div class="pokemon-image">
 *                    <img src="${imageUrl}" title="${obj.name.english}">
 *                </div>
 *                <h2 class="pokemon-name">${obj.name.english}</h2>
 *                <div class="pokemon-desc">
 *                    Type: <b> ${obj.type.join(", ")} </b>
 *                    <br>
 *                    <b>  HP:  </b> ${obj.base.HP}
 *                    <br>
 *                    <b>  Attack:  </b> ${obj.base.Attack}
 *                    <br>
 *                    <b>  Speed:  </b> ${obj.base.Speed}
 *                    <br>
 *                    <b>  Defense:  </b> ${obj.base.Defense}
 *                
 *                </div>
 *            </div>
 *        </li>
 *
 * @param {*} obj 
 */
function generateHtml(obj) {

    let imageUrl = getImageUrl(obj.id);

    // create the initial list element
    let listElm = document.createElement('li');
    let pDiv = document.createElement('div');
    pDiv.className = 'pokemon';

    // id div
    let pIdDiv = document.createElement('div');
    pIdDiv.className = 'pokemon-id';
    pIdDiv.append(document.createTextNode("#" + obj.id))

    // name div
    let nameH2 = document.createElement('h2');
    nameH2.className = 'pokemon-name';

    // image div
    let pImageDiv = document.createElement('div');

    // set the image... by appending the image element to the image div above
    // set attributes of image
    let pImageImg = document.createElement('img');
    pImageDiv.className = 'pokemon-image';
    pImageImg.setAttribute('src', imageUrl);
    pImageImg.setAttribute('title', obj.name.english)

    // pokemon description div
    let pDescDiv = document.createElement('div');
    pDescDiv.className = 'pokemon-desc';

    // append the text/image in the elements created above
    pIdDiv.appendChild(pImageDiv);
    pImageDiv.appendChild(pImageImg);
    nameH2.appendChild(document.createTextNode(obj.name.english))
    // pDescDiv.appendChild(document.createTextNode(`Type: `);

    // store the description in the div from above.
    let pDescText = document.createTextNode('Type: ')
    let descTypes = document.createElement('b');
    // join the array by comma for easy display
    descTypes.appendChild(document.createTextNode(obj.type.join(", ")));

    // append all the descriptions together
    pDescDiv.append(document.createTextNode("Type: "), descTypes, document.createElement('br'));


    // generate new elements for the stats (HP, Speed, etc)
    let stats = {
        HP: obj.base.HP,
        Attack: obj.base.Attack,
        Speed: obj.base.Speed,
        Defense: obj.base.Defense
    }
    // loop thru the obj above and bold the title and organize the stats nicely, line-by-line.
    for (let stat in stats) {
        let title = document.createElement('b');
        title.appendChild(document.createTextNode(`${stat}: `));

        pDescDiv.append(title, document.createTextNode(stats[stat]))
        pDescDiv.append(document.createElement('br'))
    };

    // append the div, image, name, and description to the parent "pokemon" div
    pDiv.append(pIdDiv, pImageDiv, nameH2, pDescDiv);

    // append the parent "pokemon" div to the list element
    listElm.appendChild(pDiv)

    // depending on if they're searching or not, we update different <ul> elements...
    // if searching, we append results to the search <ul> element
    // if not, we just simply append to the all results
    // parentElement = isSearching ? pokemonsSearchElm : pokemonsElm;

    if (isSearching) {
        pokemonsSearchElm.appendChild(listElm);
    } else {
        // ensure we don't double append after search is cleared... so only append if we have less than 20 pokemons
        if (pokemonsElm.children.length < 20) {
            pokemonsElm.appendChild(listElm);
        }
    }

    // append the list element to the parent <ul> element
    // parentElement.appendChild(listElm);

}

// filter the pokemons by name
// the way this works is that it returns the matching objects only...
function filterByName(searchKey) {
    return allPokemons.filter(function (obj) {
        // simply check if the string (after converted to lowercase) includes the typed term
        return obj.name.english.toLowerCase().includes(searchKey);
    });
}

// filter the allPokemons array by the ID
function filterById(id) {
    return allPokemons.filter(function (obj) {
        // after converting the ID to string, check if it contains the typed term
        return String(obj.id).includes(id);
    });
}


// Perform the search
function search() {

    let nameField = document.getElementById('search-name');
    let idField = document.getElementById('search-id');

    let name = nameField.value.trim().toLowerCase();
    let id = parseInt(idField.value.trim());

    // if text exists in the ID field but the "id" variable is  null.. it means that they entered string since parseInt returned null
    if (idField.value && !id) {
        alert('Please enter a valid number for the ID!');
        idField.value = "";
        return;
    }


    // if nothing enetered, clear the results
    if (!name && !id) {
        clearResults();
        return;
    }


    // if they typed a number, must be between 1-20
    if (id) {
        if (!(id >= 1 && id <= 20)) {
            alert('Please enter a number between 1-20');
            return;
        }
    }

    // regex match for ensuring it's the alphabets and less than 20 characters
    if (name && !name.match(/^[a-zA-Z]{1,20}$/)) {
        alert('Please enter alphabhetical characters less than 20 in length!');
        return;
    }


    // if we get to this point it means we either have an ID or name to search with...
    if (name) {
        visiblePokemons = filterByName(name);
    }

    if (id) {
        visiblePokemons = filterById(id);
    }


    // (re)render any results the user has
    mountSearch();
}



/**
 * Runs immediately after search validation
 * Renders the html to show to user
 */
function mountSearch() {

    isSearching = true;

    pokemonsSearchElm.textContent = '';

    // show the clear results button...
    showElement(clearResultsElm);

    // loop through all the VISIBLE pokemons... which depends on what they searched for!
    visiblePokemons.forEach(updateDOM);

    // if we do not have any results... then just show a message saying no results found
    if (visiblePokemons.length == 0) {

        pokemonsSearchElm.innerText = '';

        showElement('no-results-found');
        hideElement(searchingHeading);
        hideElement(pokemonsSearchElm);

        return;

    }


    // hide any elements we showed earlier
    hideElement('no-results-found');
    showElement(pokemonsSearchElm, 'flex'); // display the "clear results" button
    showElement(searchingHeading);

    parentElement = pokemonsSearchElm;

}


// handle keyUp and only call the search method once we detect ENTER
function handleKeyPress(e) {
    let key = e.keyCode || e.which; // find out what key they pressed
    if (key === 13) { // ENTER key
        search();
    }
}

// clear the search results
function clearResults() {

    isSearching = false;

    // reset visiblePokemons to be all pokemons
    visiblePokemons = allPokemons;

    // hide the search elements
    hideElement('search-clear-results');
    hideElement(pokemonsSearchElm);
    hideElement(searchingHeading);

    // remount
    mount();
}

// quickly show an element, but since sometimes we wanna use flex, make it optional
function showElement(element, display = 'block') {


    // if string, might be ID that's passed in.
    if (typeof element === 'string' || element instanceof String) {
        element = document.getElementById(element);
    }

    element.style.display = display;
}


// hide an element.
// if string passed in get the respective element and then hide it
function hideElement(element) {
    // if string, might be ID that's passed in.
    if (typeof element === 'string' || element instanceof String) {
        element = document.getElementById(element);
    }

    element.style.display = 'none';
}
