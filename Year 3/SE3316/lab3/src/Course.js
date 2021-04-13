class Course {
    id;
    subject;
    name;
    description;
    info;
    component;
    days;

    constructor(id, subject, name, description, info) {
        this.id = `${id}`; //catalog_nbr in json -- convert to string because some are integers and may cause issues
        this.subject = subject;
        this.name = name; // className in json
        this.description = description;
        this.info = info; //courseInfo in json
        this.component = this.info.ssr_component;
        this.days = this.getDays();
        this.status = this.info.enrl_stat;
    }

    get number() {
        return this.info.class_nbr;
    }

    get startTime() {
        return this.info.start_time;
    }

    get endTime() {
        return this.info.end_time;
    }

    getDays() {
        let days = {
            M: "Monday",
            Tu: "Tuesday",
            W: "Wednesday",
            Th: "Thursday",
            F: "Friday",
            S: "Saturday",
        };

        // loop through the course_info.days property and return it as a string
        let daysString = "";
        this.info.days.forEach((item) => {
            daysString = daysString + ", " + days[item];
        });


        let time = "";
        if (this.info.start_time !== "" && this.info.end_time !== "") {
            time = ` (${this.info.start_time} - ${this.info.end_time})`;
        }

        return daysString.trim().slice(1, daysString.length) + time; // remove trailing comma
    }


}

module.exports = {Course};