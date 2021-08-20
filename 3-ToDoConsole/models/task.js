const { v4: uuid } = require('uuid');

class Task{
    static PENDING = Symbol('PENDING');
    static COMPLETED = Symbol('COMPLETED');

    id;
    description;
    doneAt;

    constructor(description, id = uuid(), doneAt = null){
        this.id = id;
        this.description = description;
        this.doneAt = doneAt;
    }

    get description(){
        return this.description;
    }

    get doneAt(){
        return this.doneAt;
    }

    isCompleted = () => this.doneAt !== null;

    isPending = () => this.doneAt === null;
}

module.exports = Task;