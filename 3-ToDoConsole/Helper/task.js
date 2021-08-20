const Task = require('../models/task');

const convertToAsks = (arrData) => {
    tasks = {};
    arrData.forEach(task => {
        tasks[task.id] = new Task(task.description, task.id, task.doneAt);
    });

    return tasks;
}

module.exports = {
    convertToAsks
}