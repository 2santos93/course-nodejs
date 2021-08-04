const {users, salaries} = require('./data/data');

const getUser = (id, callback) => {

    const user = users.find((user) => user.id === id);

    if(!user) callback('user not found', null);

    callback(null, user);

}

const getSalarie = (user, callback) => {

    const salary = salaries.find((salary) => salary.id === user.id);

    if(!salary) callback(`salary for user ${user.id} not found`, null);

    callback(null, salary);

}

getUser(1, (err, user) => {
    if(err){
        console.log(err);
        return;
    }

    getSalarie(user, (err, salary) => {
        if(err){
            console.log(err);
            return;
        }
        console.log(`epale ${salary}`);
        console.log(`the user ${user.id} charges ${salary.value}`);

    })
});