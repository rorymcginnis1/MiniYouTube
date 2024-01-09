

passwordTest = false;
usernameTest = false;
confirmPasswordTest = false;


document.getElementById("Username").addEventListener("input", function(ev){
    let userInput = ev.currentTarget;
    let username = userInput.value;
    
    if(username.length >=3 && (username[0].charCodeAt(0)>=65 && username[0].charCodeAt(0)<=90 || username[0].charCodeAt(0)>=97 && username[0].charCodeAt(0)<=122)){
        userInput.classList.add("valid_text");
        userInput.classList.remove("invalid_text");
        usernameTest=true;

    }
    else{
        userInput.classList.add("invalid_text");
        userInput.classList.remove("valid_text");     
        usernameTest=false;  
    }
});



let password;

document.getElementById("Password").addEventListener("input", function(ev){
    let userInput = ev.currentTarget;
    let username = userInput.value;
    password= username;
    Upper= false;
    number=false;
    special = false;
    for(i =0; i<username.length; i++){
        temp = username[i].charCodeAt(0);
        if(temp>=65 && temp<=90){
            Upper = true;
        }
        if(temp >=48 && temp<=57){
            number = true;
        }
        if(temp == 33 || temp == 35 || temp ==36 || temp == 38 || temp ==42 || temp == 43|| temp ==45 || temp ==47 || temp ==64 || temp ==91 || temp ==93 || temp ==94 || temp ==126){
            special = true;
        }




    }
    if(username.length >=8 && special && number && Upper ){
        userInput.classList.add("valid_text");
        userInput.classList.remove("invalid_text");
        passwordTest= true;
        
    }
    else{
        userInput.classList.add("invalid_text");
        userInput.classList.remove("valid_text");   
        passwordTest= false;    
    }
});

let confirmPassword;

document.getElementById("Confirm Password").addEventListener("input", function(ev){
    let userInput = ev.currentTarget;
    let username1 = userInput.value;
    confirmPassword = username1;
    if(username1 == password){
        userInput.classList.add("valid_text");
        userInput.classList.remove("invalid_text");
        confirmPasswordTest=true;
        
    }
    else{
        confirmPasswordTest=false;
        userInput.classList.add("invalid_text");
        userInput.classList.remove("valid_text");       
    }
});



document.getElementById("reg-form").addEventListener("submit", function (ev){
    ev.preventDefault();
    formDataisbad = true;
    if(usernameTest && passwordTest){
        if(confirmPassword==password)
            formDataisbad=false;
}

    if(formDataisbad){

        if(!usernameTest){
            alert("Username must be 3 or more alphanumeric characters and must start with a letter");
        }
        if(!passwordTest){
            alert("Password must be: \n8 or more characters long\nHave 1 or more upper case letters\nHave 1 or more numbers\nHave 1 or more special characters\n\nSpecial characters include any of the following\n/ * - + ! @ # $ ^ & ~ [ ]");
        }
        if(confirmPassword != password){
            (alert("Confirm Password must be same as Password"));
            
        }
        return;
    }
    else{

        ev.currentTarget.submit();


    }
    console.log(ev);
});


