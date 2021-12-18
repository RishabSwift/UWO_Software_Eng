let sequenceNumber = 0, timer = 0;

let getRandomNumberBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}

module.exports = {
    init: function() {

        timer = getRandomNumberBetween(1, 999);
        sequenceNumber = getRandomNumberBetween(1, 999);

        // increment every .1s
        // reset when very large....
        setInterval(() => {
            return timer >= Number.MAX_SAFE_INTEGER ? (timer = 0) : (timer += 1);
        }, 10);
    },

    //--------------------------
    //getSequenceNumber: return the current sequence number + 1
    //--------------------------
    getSequenceNumber: function() {
        return ++sequenceNumber;
    },

    //--------------------------
    //getTimestamp: return the current timer value
    //--------------------------
    getTimestamp: function() {
       return timer;
    }

};
