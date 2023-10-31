const nickname= "Timmy";
const firstname = "Timothy";
const username = nickname || firstname;

if(username) {
console.log(`Good Morning, ${username}!`);
} else {
    console.log("Good Morning");
}
