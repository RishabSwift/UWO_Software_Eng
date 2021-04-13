const searchButton = document.getElementById('search');
const subjectInput = document.getElementById('subject');
const componentInput = document.getElementById('component');
const courseInput = document.getElementById('course');
const searchResultsContainer = document.getElementById('search-results-container')
const searchResults = document.getElementById('search-results');
const alertElement = document.getElementById('alert');
const newScheduleName = document.getElementById('schedule_name');
const addScheduleForm = document.getElementById('add-schedule-form');
const scheduleList = document.getElementById('schedule-list');
const userScheduleInput = document.getElementById('user-schedules');
const coursesInScheduleList = document.getElementById('courses-in-schedule');


const alertTypes = {
    ERROR: 'alert-danger',
    SUCCESS: 'alert-success',
};

populateSelectInput(subjectInput, '/subjects');
populateSelectInput(componentInput, '/components');
hideElement(searchResultsContainer);
hideElement(addScheduleForm);

// hideElement(scheduleList);

function populateSelectInput(input, url) {

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {

            input.options.length = 0;

            let option;
            option = document.createElement('option');
            option.value = "";
            option.text = "";

            input.appendChild(option);

            data.forEach(subject => {
                option = document.createElement('option');
                option.value = subject;
                option.text = subject;
                input.appendChild(option);
            });

            // add the new option into the select
        })
        .catch(error => {
            console.log('Error populating select elements...');
        });
}

function search() {

    // hide the alert element when they search...
    hideElement(alertElement);
    // hide the schedule list when they search...
    hideElement(scheduleList);

    let subject = subjectInput.value.trim();
    let course = courseInput.value.trim();
    let component = componentInput.value.trim();

    // nothing entered
    if (!subject && !course && !component) {
        showAlert('Please input at least one search term!');
        return;
    }

    searchUsingInput(subject, course, component).then(data => {
        showResults(data);
    });

}

function searchUsingInput(subject, course, component) {
    return fetch(`/search?subject=${subject}&course=${course}&component=${component}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch(error => {
            console.log('Error searching...');
            return null;
        });
}


function showResults(data) {


    if (data.length === 0) {
        showAlert('No results found!');
        return;
    }


    searchResults.textContent = "";

    data.forEach(item => {
        parseResults(item);
    });

    showElement(searchResultsContainer);


}

// quickly show an element, but since sometimes we wanna use flex, make it optional
function showElement(element, display = 'block') {

    // if string, might be ID that's passed in.
    if (typeof element === 'string' || element instanceof String) {
        element = document.getElementById(element);
    }

    element.style.display = display;
}


function parseResults(object) {

    // PARSE HEADER (TITLE & DESCRIPTION)
    let headerElement = document.createElement('div');
    headerElement.className = "header";

    let courseTitleElement = document.createElement('h3');
    courseTitleElement.className = 'course-title';
    courseTitleElement.appendChild(document.createTextNode(`${object.subject} ${object.id} - ${object.name}`))

    let courseDescription = document.createElement('p');
    let courseDescriptionTitle = document.createElement('b');
    courseDescriptionTitle.appendChild(document.createTextNode("Course Description: "));

    courseDescription.appendChild(courseDescriptionTitle);
    courseDescription.appendChild(document.createTextNode(object.description));

    headerElement.appendChild(courseTitleElement);
    headerElement.appendChild(courseDescription);

    searchResults.appendChild(headerElement);


    // PARSE TABLE
    let bodyElement = document.createElement('div');
    bodyElement.className = "course-body";

    let tableElement = document.createElement('table');
    let tableHead = document.createElement('thead');
    let tableHeadTr = document.createElement('tr');
    tableHeadTr.class = 'table-head';

    let headers = ["Section", "Component", "Class #", "Days", "Status", ""];

    headers.forEach(header => {
        let headTh = document.createElement('th');
        headTh.appendChild(document.createTextNode(header));
        tableHeadTr.appendChild(headTh);
    });

    tableHead.appendChild(tableHeadTr);
    tableElement.appendChild(tableHead);

    let tableBody = document.createElement('tbody');
    let tableBodyTr = document.createElement('tr');

    let body = [object.info.class_section, object.component, object.info.class_nbr, object.days, object.status];

    body.forEach(elem => {
        let bodyTd = document.createElement('td');
        bodyTd.appendChild(document.createTextNode(elem));
        tableBodyTr.appendChild(bodyTd);

        // FRONTEND TASK 4 - Indicate different components of a course by different colours.
        switch (elem) {
            case "LEC":
                bodyTd.className = 'text-success';
                break;
            case "TUT":
                bodyTd.className = 'text-danger';
                break;
            case "LAB":
                bodyTd.className = 'text-warning';
                break;
        }
    });



    // action link
    let actionTd = document.createElement('td');
    let linkA = document.createElement('a');
    linkA.dataset.courseId = object.id;
    linkA.href = "javascript:;";
    linkA.setAttribute('onclick', `openAddToScheduleModal("${object.id}", "${object.subject}")`);
    linkA.appendChild(document.createTextNode("Add to schedule"));
    actionTd.appendChild(linkA);
    tableBodyTr.appendChild(actionTd);

    tableBody.appendChild(tableBodyTr);
    tableElement.appendChild(tableBody);

    bodyElement.appendChild(tableElement);
    searchResults.appendChild(bodyElement);

}

function openAddToScheduleModal(courseId, subjectName) {
    document.getElementById('hidden-course-id').value = courseId;
    document.getElementById('hidden-subject-name').value = subjectName;
    openModal('add-course-modal');
}

function addToSchedule() {
    let hiddenCourseIdInput = document.getElementById('hidden-course-id');
    let hiddenSubjectNameInput = document.getElementById('hidden-subject-name');
    let courseId = hiddenCourseIdInput.value;
    let subjectName = hiddenSubjectNameInput.value;
    let scheduleName = userScheduleInput.value;
    (async () => {
        const rawResponse = await fetch(`/schedules/${scheduleName}/subjects/${subjectName}/courses/${courseId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const content = await rawResponse.json();

        if (content) {
            closeModal('add-course-modal');
            loadMySchedule();
            hiddenCourseIdInput.value = "";
            showAlert("This course has been added successfully.", alertTypes.SUCCESS);
        } else {
            showAlert('Error adding');
        }

    })();
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

function deleteAllSchedules() {
    fetch('/schedules/', {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            showAlert("All schedules have been deleted.", alertTypes.SUCCESS);
            loadMySchedule(); // reload schedules
        })
        .catch(error => {
            console.log('Error deleting user schedule... ' + error);
        });
}

function showAlert(message, type = alertTypes.ERROR) {
    alertElement.textContent = ""; // clear message
    showElement(alertElement);
    alertElement.className = `alert ${type}`;
    alertElement.appendChild(document.createTextNode(message));
}

function addSchedule() {
    (async () => {
        const rawResponse = await fetch('/schedules', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: newScheduleName.value})
        });
        const content = await rawResponse.json();

        if (content[0] !== undefined) {
            if (content[0].location === "body") {
                showAlert(content[0].msg);
                return;
            }
        }

        loadMySchedule();
        newScheduleName.value = "";
        showAlert(content.msg, alertTypes.SUCCESS);
    })();
}


function populateMySchedules(data) {

    let tableElement = document.createElement('table');
    let tableHead = document.createElement('thead');
    let tableHeadTr = document.createElement('tr');
    tableHeadTr.class = 'table-head';

    let headers = ["Schedule Name", "Total Courses", ""];

    headers.forEach(header => {
        let headTh = document.createElement('th');
        headTh.appendChild(document.createTextNode(header));
        tableHeadTr.appendChild(headTh);
    });

    tableHead.appendChild(tableHeadTr);
    tableElement.appendChild(tableHead);

    let tableBody = document.createElement('tbody');


    // select input in SCHEDULE MODAL
    let option;
    userScheduleInput.options.length = 0;


    // loop through saved data and show in the list
    Object.keys(data.saved).forEach((schedule) => {

        let totalCourses = Object.keys(data.saved[schedule]).length;
        let body = [schedule, totalCourses];

        let tableBodyTr = document.createElement('tr');


        // populate select input in schedule MODAL
        option = document.createElement('option');
        option.value = schedule;
        option.text = schedule;
        userScheduleInput.appendChild(option);


        body.forEach(elem => {
            let bodyTd = document.createElement('td');
            bodyTd.appendChild(document.createTextNode(elem));
            tableBodyTr.appendChild(bodyTd);
        });

        // action link
        let actionTd = document.createElement('td');

        let linkA = document.createElement('a');
        linkA.href = "javascript:;";
        linkA.appendChild(document.createTextNode("View Schedule"));
        linkA.setAttribute('onclick', `viewSchedule("${schedule}")`);

        let linkB = document.createElement('a');
        linkB.href = "javascript:;";
        linkB.appendChild(document.createTextNode("Delete Schedule"));
        linkB.setAttribute('onclick', `deleteSchedule("${schedule}")`);

        actionTd.appendChild(linkA);
        actionTd.appendChild(linkB);


        tableBodyTr.appendChild(actionTd);

        tableBody.appendChild(tableBodyTr);

    });

    // // // action link
    // let actionTd = document.createElement('td');
    // let linkA = document.createElement('a');
    // linkA.dataset.courseId = object.id;
    // linkA.href = "";
    // linkA.setAttribute('onclick', `addToSchedule("${object.id}")`);
    // linkA.appendChild(document.createTextNode("Add to schedule"));
    // actionTd.appendChild(linkA);
    // tableBodyTr.appendChild(actionTd);

    tableElement.appendChild(tableBody);

    scheduleList.appendChild(tableElement);


}

function viewSchedule(name) {

    fetch('/schedules/' + encodeURIComponent(name))
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {

            populateMyCoursesInSchedule(data);
            openModal('list-courses-in-schedule');

        })
        .catch(error => {
            console.log('Error getting the list of user schedules. ' + error);
        });
}

function populateMyCoursesInSchedule(data) {

    coursesInScheduleList.textContent = "";
    let headerElement = document.createElement('h3');
    headerElement.className = "mb-3";
    headerElement.appendChild(document.createTextNode(`All courses in schedule "${data.name}"`));
    coursesInScheduleList.appendChild(headerElement);


    let tableElement = document.createElement('table');
    let tableHead = document.createElement('thead');
    let tableHeadTr = document.createElement('tr');
    tableHeadTr.class = 'table-head';

    let headers = ["Subject", "Course ID", "Component", "Days", "Status"];
    // let headers = ["Subject", "Course ID", ""];

    headers.forEach(header => {
        let headTh = document.createElement('th');
        headTh.appendChild(document.createTextNode(header));
        tableHeadTr.appendChild(headTh);
    });

    tableHead.appendChild(tableHeadTr);
    tableElement.appendChild(tableHead);

    let tableBody = document.createElement('tbody');

    // select input in SCHEDULE MODAL
    let option;
    userScheduleInput.options.length = 0;


    // loop through saved data and show in the list
    data.courses.forEach(item => {


        // get timetable data...
        let body = [item[0].subject, item[0].id];

        let tableBodyTr = document.createElement('tr');

        // get additional TIMETABLE data to show the user
        getTimetableDataFromSubjectAndCourse(item[0].subject, item[0].id, body, tableBodyTr);



        // // action link
        // let actionTd = document.createElement('td');
        //
        // let linkA = document.createElement('a');
        // linkA.href = "javascript:;";
        // linkA.appendChild(document.createTextNode("Delete Course"));
        // linkA.setAttribute('onclick', `deleteCourse("${data.name}")`);
        //
        //
        // actionTd.appendChild(linkA);
        // tableBodyTr.appendChild(actionTd);
        tableBody.appendChild(tableBodyTr);

    });

    tableElement.appendChild(tableBody);
    coursesInScheduleList.appendChild(tableElement);
}

// merge in the data from the course
function getTimetableDataFromSubjectAndCourse(subject, course, body, tableBodyTr) {
    fetch(`/subjects/${subject}/courses/${course}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {


            body.push(data[0].component, data[0].days, data[0].status);

            body.forEach(elem => {
                let bodyTd = document.createElement('td');
                bodyTd.appendChild(document.createTextNode(elem));
                tableBodyTr.appendChild(bodyTd);
            });


        })
        .catch(error => {
            console.log('Error getting timetable data from user schedule course. ' + error);
        });
}

// function deleteCourse(name) {
//     alert(name);
// }

function deleteSchedule(name) {


    fetch('/schedules/' + encodeURIComponent(name), {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {
            showAlert("Schedule deleted", alertTypes.SUCCESS);
            loadMySchedule(); // reload schedules
        })
        .catch(error => {
            console.log('Error deleting user schedule... ' + error);
        });
}

function toggleAddScheduleForm() {
    if (addScheduleForm.style.display === "none") {
        showElement(addScheduleForm, 'flex');
    } else {
        hideElement(addScheduleForm)
    }
}

function loadMySchedule() {

    showElement(scheduleList);

    fetch('/schedules')
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => {

            scheduleList.textContent = "";
            populateMySchedules(data)

        })
        .catch(error => {
            console.log('Error getting the list of user schedules. ' + error);
        });
}


function openModal(id) {
    loadMySchedule();
    document.getElementById(id).style.display = "block";
}

function closeModal(id) {
    let modal = document.getElementById(id);
    document.getElementById(id).style.display = "none";
}


// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close-modal")[0];
//
// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     span.parentElement.parentElement.style.display = "none";
// };

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
//