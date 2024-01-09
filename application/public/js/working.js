const { isLoggedIn } = require("../../middleware/auth");

var url = "https://jsonplaceholder.typicode.com/albums/2/photos"





async function fetchWithStrings(){
    try{
        var response = await fetch(url)
        var data = await response.json();
        var htmlString = data.reduce(function(prev,product){

            return (prev +   
                         
             `<div class = "product-card">

             <img class="product-img" src="${product.thumbnailUrl}"/>
             <div class = "product-info">
             <p class = "product-title">${product.title}</p>
             </div>
             </div>`

             
            );
 

        
            
        },"");
        document.getElementById("product-list").innerHTML = htmlString;
        let cards = document.getElementsByClassName('product-card');
        [...cards].forEach(function(ele){
            
            ele.addEventListener('click', fadeOut);


        });

        
 
    }catch(error){

            
    }


}

function fadeOut(ev){
    var current = ev.currentTarget;
    


            let timer1 = setInterval(function(){
                current.style.opacity=.9;

                clearInterval(timer1);

            },100);

            let timer2 = setInterval(function(){
                current.style.opacity=.8;

                clearInterval(timer2);
        
            },200);

            let timer3 = setInterval(function(){
                current.style.opacity=.7;

                clearInterval(timer3);
     
            },300);

            let timer4 = setInterval(function(){
                current.style.opacity=.6;

                clearInterval(timer4);
       
            },400);

            let timer5 = setInterval(function(){
                current.style.opacity=.5;

                clearInterval(timer5);

            },500);

            let timer6 = setInterval(function(){
                current.style.opacity=.4;

                clearInterval(timer6);
        
            },600);

            let timer7 = setInterval(function(){
                current.style.opacity=.3;

                clearInterval(timer7);
       
            },700);

            let timer8 = setInterval(function(){
                current.style.opacity=.2;

                clearInterval(timer8);
        
            },800);

            let timer9 = setInterval(function(){
                current.style.opacity=.1;

                clearInterval(timer9);
        
            },900);

            let timer10 = setInterval(function(){
                current.remove();


                clearInterval(timer10);
                document.getElementById("counter").innerHTML = "There are " +(document.getElementsByClassName('product-card').length) +" photo(s) being shown";
       
            },1000);

            


        }
        
        



fetchWithStrings();






document.getElementById("counter").innerHTML = "There are 50 photo(s) being shown";
