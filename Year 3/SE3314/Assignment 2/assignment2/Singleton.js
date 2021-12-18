let timer = 0;

let getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

// This file is taken from Assignment 1 and modified to fit Assignment 2
module.exports = {
    init: function() {

        timer = getRandomNumberBetween(1, 999);

        // increment every .1s
        // reset when very large....
        setInterval(() => {
            return timer >= Number.MAX_SAFE_INTEGER ? (timer = 0) : (timer += 1);
        }, 10);

    },


    //--------------------------
    //getTimestamp: return the current timer value
    //--------------------------
    getTimestamp: function() {
       return timer;
    },


    getRandomNumber: function(min, max) {
        return getRandomNumberBetween(min, max);
    }

};
