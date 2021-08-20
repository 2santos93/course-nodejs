require('colors');

const inquirer = require('inquirer');

const goBack = {name:`${'<-'.cyan} Atras`, value: null};

const menuOptionsConfig = [{
    type: 'list',
    name: 'answer',
    message: 'Pick a choice',
    choices: [
        {
            name: `${'1.'.cyan} Create task`,
            value: '1'
        },
        {
            name: `${'2.'.cyan} Show tasks`,
            value: '2'
        },
        {
            name: `${'3.'.cyan} Show completed tasks`,
            value: '3'
        },
        {
            name: `${'4.'.cyan} Show pending tasks`,
            value: '4'
        },
        {
            name: `${'5.'.cyan} Complete task`,
            value: '5'
        },
        {
            name: `${'6.'.cyan} Delete task`,
            value: '6'
        },
        {
            name: `${'0.'.cyan} Exit`,
            value: '0'
        }
    ]
}];

const pressEnterConfig = [
    {
        type: 'input',
        name: 'pauseAnswer',
        message: `Press ${'ENTER'.cyan} to continue`
    }
];

const executeMenuAndGetAnswer = async () => {
    console.clear();
    const {answer} = await inquirer.prompt(menuOptionsConfig);
    return answer;
};

const pressEnterToContinue = async () => {
    await inquirer.prompt(pressEnterConfig);
};

const getTaskDescription = async (message) => {
    const input = {
        type: 'input',
        name: 'answer',
        message,
        validate: (input) => {
            if(input.length <= 0) return 'Cant be empty';

            return true;
        }
    }
    const {answer} = await inquirer.prompt(input);
    return answer;
};

const getTaskToDelete = async (tasks) => {

    console.clear();

    const choicesTasks = tasks.map((task, index) => {
        return {
            name: `${++index +'.'.cyan} ${task.description}`,
            value: task
        }
    });

    choicesTasks.unshift(goBack);

    const tasksConfig = [{
        type: 'list',
        name: 'task',
        message: 'Choose a task',
        choices: choicesTasks
    }];

    const {task} = await inquirer.prompt(tasksConfig);
    return task;
};

const getCompletedTasks = async (tasks) => {
    console.clear();

    const choicesTasks = tasks.map((task, index) => {
        return {
            name: `${++index +'.'.cyan} ${task.description}`,
            value: task,
            checked: !!task.doneAt
        }
    });

    const tasksConfig = [{
        type: 'checkbox',
        name: 'approvedTasks',
        message: 'Choose the tasks to change status',
        choices: choicesTasks,
    }];

    const {approvedTasks} = await inquirer.prompt(tasksConfig);
    return approvedTasks;
}

module.exports = {
    executeMenuAndGetAnswer,
    pressEnterToContinue,
    getTaskDescription,
    getTaskToDelete,
    getCompletedTasks
};