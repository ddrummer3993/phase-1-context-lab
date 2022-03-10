/* Your Code Here */

function createEmployeeRecord(array) {
    const timeCard = {};
    timeCard.firstName = array[0];
    timeCard.familyName = array[1];
    timeCard.title = array[2];
    timeCard.payPerHour = array[3];
    timeCard.timeInEvents = [];
    timeCard.timeOutEvents = [];
    return timeCard;
};

function createEmployeeRecords(arrayOfArrays) {
    let arrayOfObjects = [];
    arrayOfArrays.map(array => {
        let newEmployeeRecord = createEmployeeRecord(array);
        arrayOfObjects.push(newEmployeeRecord);
    });
    return arrayOfObjects;
};

function createTimeInEvent(dateStamp) {
    let dateArray = dateStamp.split(' ');
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateArray[1], 10),
        date: dateArray[0]
    })
    return this;
};

function createTimeOutEvent(dateStamp) {
    let dateArray = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateArray[1], 10),
        date: dateArray[0]
    })
    return this;
};

function hoursWorkedOnDate(dateStamp) {
    let timeInObjArray = this.timeInEvents;
    let timeOutObjArray = this.timeOutEvents;
    for (let i = 0; i < timeInObjArray.length; i++) {
        if (timeInObjArray[i].date === dateStamp) {
            let hoursWorked = timeOutObjArray[i].hour - timeInObjArray[i].hour;
            hoursWorked *= .01;
            return hoursWorked;
        };
    };
};

function wagesEarnedOnDate(dateStamp) {
    let hours = hoursWorkedOnDate.call(this, dateStamp);
    let payOwed = hours * this.payPerHour;
    return payOwed;
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(recordsArray, firstName) {
    let record = recordsArray.find(rec => rec.firstName === firstName);
    return record;
};

function calculatePayroll(employeeRecordsArray) {
    let totalWages = employeeRecordsArray.reduce((prev, curr) => prev + allWagesFor.call(curr), 0);
    return totalWages;
};


