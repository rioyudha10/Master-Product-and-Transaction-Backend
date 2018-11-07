let myFunction = (data, callback) => {
    callback(data);
}
let theString = 'nama saya randika';
newFunction = myFunction(theString, (theString)=>{
    console.log('ini proses async');
    console.log(theString);
})
console.log('harusnya ini jalan duluan');