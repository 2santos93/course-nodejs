const Task = require('./task');
class Tasks {
    _list;

    constructor(tasks){
        this._list = tasks;
    }

    get tasks(){
        return this._list;
    }

    getTasks = (status = null) => {
        const tasks = Object.values(this._list)
            .filter( (task) => {
                if(status === Task.PENDING) return task.isPending();
                if(status === Task.COMPLETED) return task.isCompleted();

                return true;
            });

        return tasks;
    };

    createTask = (description = '') => {
        const task = new Task(description);
        this._list[task.id] = task;
    };

    showTasks = (status) => {
        const tasks = this.getTasks(status);

        tasks.forEach( (task, index) => {
            const taskStatus = task.isCompleted() ? 'COMPLETED'.green : 'PENDING'.red
            const taskIndex = (++index + '.').cyan;
            console.log(`${taskIndex} ${task.description} :: ${taskStatus}`)
        });
    };

    toggle = (approvedTasks) => {
        this.getTasks().forEach( (task) => {
            this.pendingTask(task);

            if(approvedTasks.includes(task)){
                this.completeTask(task);
            }
        });
    };

    completeTask = (task) => task.doneAt = Date.now();

    pendingTask = (task) => task.doneAt = null;

    deleteTask = (task) => delete this._list[task.id];
}

module.exports = Tasks;