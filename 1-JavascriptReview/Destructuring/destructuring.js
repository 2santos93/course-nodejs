let person = {
    name: 'nelson',
    lastname: 'Dos Santos',
    age: 27,
    hobbies: {
        monday: 'running',
        saturday: 'sleeping'
    },
    eat: () => {
        let a = 1;
        console.log(`im eating ${a+=1}`);
    }
}

let animals = ['dog', 'cat', 'horse', 'shark']; 

let {name, lastname = 'doesnt have', eat} = person;

console.log(eat())
console.log(eat())
