const {
    executeMenuAndGetAnswer, 
    pressEnterToContinue, 
    getTaskToDelete,
    getTaskDescription,
    getCompletedTasks
} = require('./Services/inquirerService');

const Tasks = require('./models/tasks');
const Task = require('./models/task');
const {
    saveTasksIntoDB, 
    getTasksFromDB
} = require('./Services/dbService');

const main = async () => {

    let optionPicked = '';
    const isExit = (optionPicked) => optionPicked === '0';
    const tasksFromDB = getTasksFromDB();
    const tasks = new Tasks(tasksFromDB);
    do{
        optionPicked = await executeMenuAndGetAnswer();

        switch(optionPicked){

            case '1':
                const taskDescription = await getTaskDescription('Write the task description')
                tasks.createTask(taskDescription);
                break;

            case '2':
                tasks.showTasks();
                break;

            case '3':
                tasks.showTasks(Task.COMPLETED);
                break;

            case '4':
                tasks.showTasks(Task.PENDING);
                break;

            case '5':
                const completedTasks = await getCompletedTasks(tasks.getTasks());
                if(completedTasks){
                    tasks.toggle(completedTasks);
                }
                break;
            case '6':
                const taskToDelete = await getTaskToDelete(tasks.getTasks());
                if(taskToDelete){
                    tasks.deleteTask(taskToDelete);
                    break;
                }
                continue;
        }

        saveTasksIntoDB(tasks.getTasks());

        if(!isExit(optionPicked)) await pressEnterToContinue();

    }while(!isExit(optionPicked));

}

main();