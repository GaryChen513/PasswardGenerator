// Assignment Code
var generateBtn = document.querySelector("#generate");
var charSet; // Array
var allCharList; // Array
var length; // Length of password
var charList; // Boolean array

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Generate valid password. Function-regeneratePassword will be called if password is invalid
function generatePassword(){
  main();
  var passwordList = new Array(length);
  for (var i =0; i< length; i++){
    passwordList[i] = randomSingleChar();
  }
  var password = passwordList.join("")
  var bool = isValid(password);
  if (bool){
    return password;
  }else{
    return regeneratePassword();
  }
}

// Check whether input, password, is valid
function isValid(password){
  if (password.length !== length){
    return false;
  }
  var copied_charList = [...charList];
  console.log(copied_charList);
  for (var i=0; i< password.length; i++){
      for (var j =0;j<copied_charList.length;j++){
        if(allCharList[j].includes(password[i])){
          copied_charList[j] = false;
        }
      }
  }
  // Return True if all elements in array are false
  for (var i = 0;i < copied_charList.length;i++){
    if (copied_charList[i]){
      return false
    }
  }
  return true
}

// Regenerate the password to be valid
function regeneratePassword(){
  var password;
  do{
    var passwordList = new Array(length);
    for (var i =0; i< length; i++){
      passwordList[i] = randomSingleChar();
    }
    console.log(passwordList);
    password = passwordList.join("")
    var bool = isValid(password);
  }while(bool === false)

  return password;
}

//Random a charType first, and then randonly omit a char within that charType
function randomSingleChar(){
  var chosenCharGroup = new Array();
  for (var i=0; i<charList.length; i++){
    if (charList[i]===true){
      chosenCharGroup.push(allCharList[i]);
    }
  }
  var randomIndex = Math.floor(Math.random()*chosenCharGroup.length);
  var chosenCharSet = chosenCharGroup[randomIndex];
  var char = chosenCharSet[Math.floor(Math.random()*chosenCharSet.length)];
  
  return char
}

// Get the length of password, repeat prompting until the number is in valid range
function getPasswordLength(){
  var lengthInput = prompt("How long the password you would expect, choose a number between 8 to 128");
  while (lengthInput === false||lengthInput < 8 || lengthInput > 128){
    lengthInput = prompt("Please input a valid length to password, choose a number between 8 to 128")
  }
  return lengthInput
}

// Get charType, repeat promting until at least one type is selected
function getCharType(){
  var ifLowerCase = confirm("Do you want your password contains any lowercase character");
  var ifUpCase = confirm("Do you want your password contains any uppercase character");
  var ifNumbers = confirm("Do you want your password contains any numbers");
  var ifSpecialChar = confirm("Do you want your password contains any special character");

  //while loop begins if none type is chosen
  while ((ifLowerCase || ifUpCase || ifNumbers || ifSpecialChar) === false){
    alert("You have to pick at least one character type !");
    var ifLowerCase = confirm("Do you want your password contains any lowercase character");
    var ifUpCase = confirm("Do you want your password contains any uppercase character");
    var ifNumbers = confirm("Do you want your password contains any numbers");
    var ifSpecialChar = confirm("Do you want your password contains any special character");
  }
    var charCheckList = [ifLowerCase, ifUpCase, ifNumbers, ifSpecialChar];
  
  return charCheckList;
}

// Create global variables
function main(){
  charSet = {
    lowerCase : "abcdefghijklmnopqrstuvxyz",
    upCase : "ABCDEFGHIJKLMNOPQRSTUVXYZ",
    numbers  : "0123456789",
    specialChar : "£$&()*+[]@#^-_!?",
  }
  allCharList = [charSet["lowerCase"],charSet["upCase"],charSet["numbers"],charSet["specialChar"]]
  length = Number(getPasswordLength());
  charList = getCharType();
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
