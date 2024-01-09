var express = require('express');
var router = express.Router();
var db = require('../conf/database');
const { isLoggedIn } = require('../middleware/auth');

/* GET home page. */
router.get("/", async function (req, res, next){
  var {SearchValue, _ } = req.query;
  if(typeof SearchValue==='undefined'){
    Val="";
  }
  else{
    Val=SearchValue;
  }

  try{
      inp ="";
      inp = `"%`+Val+`%"`
      test = ("select id,title,thumbnail ,fk_userId, concat_ws(' ', title, describtion) as haystack from posts having haystack like " +`${inp}`);
      var [ rows, _] = await db.execute(test); 

      


      if(rows && rows.length ==0){
          return res.render('index')

      }else{
          res.locals.posts = rows;
          return res.render('index');

      }


  }catch(error){
      next(error);
  }
});




router.get("/login", function(req,res){
  res.render('login',{title : 'Login' , css:["style.css"]});
})


router.get("/profile", async function(req,res){



try{

  x= ((JSON.parse(JSON.stringify(res.locals))));
 
  ho= x.user.userId;
  inp ="";
  inp = `"%%"`

  test = ("select id,title,describtion,fk_userId,createdAt,thumbnail, video from posts where fk_userId = "+ho);
  var [ rows, _] = await db.execute(test); 


  

  if(rows && rows.length ==0){
      return res.render('profile')

  }else{
      res.locals.posts = rows;
 
      return res.render('profile');

  }

  


}catch(error){
  next(error);
}
});

router.get("/posts:id(\\d+)", async function(req,res){


  try{
    test = ("select id,title,describtion, video, createdAt, fk_userId from posts where id = "+req.params.id);
  
    
    var [ rows, _] = await db.execute(test);

    if (rows.length==0){
      return res.redirect("/")

    }

    
    otest= "select username from users where id = "+rows[0].fk_userId;
  
    x= (JSON.parse(JSON.stringify(res.locals)))


    
    x=x.user


    test ="SELECT text,createAt, fk_authorId FROM comments WHERE fk_postId="+rows[0].id;

    var [ coms, _] = await db.execute(test);


    test="select username from users where id = "+rows[0].fk_userId;



    var [ used, _] = await db.execute(test);

    if(typeof x === 'undefined'){

      if(rows && rows.length ==0){
          return res.render('viewpost'
          )
        }
        else{


          res.locals.comments=coms;
          res.locals.posts = rows;
          res.locals.nam = used;

          return res.render("viewpost")

        }
      
    }

    x=x.userId;

    var orows =Object.assign({},rows[0],{Author: x});
    rows[0]=orows;




    if(coms && coms ==0){


      res.locals.posts = rows;
      res.locals.nam=used;
      return res.render('viewpost')


    }





    test="select username from users where id = "+rows[0].fk_userId;



    var [ used, _] = await db.execute(test);

    test="select username from users where id = "+coms[0].fk_authorId;

    

    var [ holder, _] = await db.execute(test);

    var ooo =Object.assign({},coms[0],{username: holder[0].username});



    var [orows, _] = await db.execute(otest);

    var orows =Object.assign({},rows[0],{username: orows[0].username});
 
  
    rows[0]=orows;

    var orows =Object.assign({},rows[0],{Author: x});
    rows[0]=orows;


    test = "SELECT text,createAt, fk_authorId FROM comments WHERE fk_postId="+rows[0].id;

    [newrow, _] = await db.execute(test);
    if(newrow.length==0){
      if(orows && orows.length==0){
        return res.render('viewpost')}


      res.locals.posts = rows;

      res.locals.nam=used;

      return res.render('viewpost')
    }


    

    orows=[]
    for(i=0;i<(newrow.length);i++){
      otest= "select username from users where id = "+newrow[i].fk_authorId;
      var [tester, _] = await db.execute(otest);


      orows.push(tester)

    }


    for( i=0;i<newrow.length;i++){
      var hold =Object.assign({},newrow[i],{username: orows[i][0].username});
      newrow[i]=(hold)


    }




    if(rows && rows.length ==0){
      if(orows && orows.length==0){
        return res.render('viewpost'
        )
      }
  
    }else{
        res.locals.nam=used;
        res.locals.posts = rows;
        res.locals.comments = newrow;
        return res.render('viewpost'
          )
  
    }
  
    
  
  
  }catch(error){
    next(error);
  }
  });

router.get("/registration", function(req,res){
  res.render('registration',{title : 'Registration' , css:["style.css"], js:["/public/js/validation.js"]});
})

router.get("/postvideo", function(req,res){
  res.render('postvideo',{title : 'Registration' , css:["style.css"], js:["/public/js/validation.js"]});
})









module.exports = router;
