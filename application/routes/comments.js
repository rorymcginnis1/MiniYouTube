var express = require ('express');
var router = express.Router();
var db = require('../conf/database');
const { isLoggedIn } = require('../middleware/auth');

router.post("/create",isLoggedIn, async function (req,res, next){
    try{

    var name = res.locals.post;
    x= (JSON.stringify(req.body))
    x=x.split(":");
    num=x[0]

    s=""
    for(i =2; i<num.length-1; i++){
        s=s+num[i];

    }

    num=s;


    ids=num.split(" ");

    post=ids[0]

    usey = ids[1]

    if(x.length!=2){

        s=x[1];
        for(i = 2; i<x.length;i++){
            s=s+":"+x[i]


        }
        x=s

    }
    else{
        x=x[1]
    }
    s=""
    for(i =1; i<x.length-2; i++){
        s=s+x[i];

    }
    x=s;

    if(x==""){
        return res.redirect("/posts"+post);
    }

    inp = `("`+x+`",`+`"`+usey+`","`+post+`")`

    test = "INSERT INTO comments (text, fk_authorId, fk_postId) value "+ inp;

    var [resultObject, fields]  = await db.execute(test);


        res.redirect('/posts'+post)

  }
    catch(error){
        next(error)

    }
});



module.exports = router;