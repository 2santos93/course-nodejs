const { getUser, getSalary } = require('./promises')

const getUserInfo = async (id) => {
    try
    {  
        const user = await getUser(id);
        const salary = await getSalary(user);

        return {
            user,
            salary
        };
        
    }catch(err){
        throw err; 
    }

};

getUserInfo(1)
    .then( ({user, salary}) => console.log(`${user.name} (${user.id}) has a ${salary.value} salary `))
    .catch( err => console.log(err) );