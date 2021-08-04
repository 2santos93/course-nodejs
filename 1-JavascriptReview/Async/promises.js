const { users, salaries } = require('./data/data');

const getUser = (id) => {
    return new Promise( (resolve, reject) => {
        const user = users.find((user) => user.id === id);

        if(!user) {
            return reject(`User ${id} not found`);
        }

        resolve(user);
    });
};

const getSalary = (user) => {

    return new Promise( (resolve, reject) => {
        const salary = salaries.find( (salary) => salary.id === user.id );

        if(!salary) return reject(`salary for ${user.name} (${user.id}) not found`);

        resolve(salary);
    });
};

// getUser(2)
//     .then( (user) => {
//         console.log(`The user is ${user.name}`)
//         return getSalary(user);
//     })
//     .then( (salary) => console.log(`And the salary es ${salary.value}`))
//     .catch( (err) => console.log(err) );
    
module.exports = {
    getUser,
    getSalary
}