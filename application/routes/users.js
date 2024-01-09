var express = require('express');
var router = express.Router();
var db = require('../conf/database')
var bcrypt = require ('bcrypt');
var {ssLoggedIn, isMyProfile} = require("../middleware/auth");

/* GET users listing. */
router.get("/", async function (req, res, next){


  try{
      inp ="";
      inp = `"%%"`;
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

router.post('/register',async function(req, res, next){
  

  var {User_name, Email, Password} = req.body

  var u =User_name.toString();

  var inp = u;
  inp = '"'+inp+`"`;
  var test = ("select id from users where username = " +`${inp}`);


  try{
    var [rows, fields] = await db.query(test);

    if ( rows && rows.length>0){
      return res.redirect('/login');
    }


    var e = Email.toString();
    inp =e;
    inp = '"'+inp+`"`;
    test = ("select email from users where email = " +`${inp}`);

    var [rows, fields] = await db.execute(test);
    if ( rows && rows.length>0){
      return res.redirect('/registration');
    }

    var hashedPassword = await bcrypt.hash(Password, 3)

    var p = hashedPassword.toString();

    inp = `("`+u+`",`+`"`+e+`","`+p+`")`

    test = "INSERT INTO users (username, email, password) value "+ inp;


    var [resultObject, fields]  = await db.execute(test);

    if(resultObject.affectedRows ==1){
      return res.redirect('/login');}
    else{

      return res.redirect('/registration')
    }

  }catch(error){

    next(error);
  }


});

router.post("/login", async function(req, res, next){
  const {Username, Password} = req.body;
  if(!Username || !Password){
    return res.redirect("/login");

  }
  var u = Username.toString();
  var p = Password.toString();

  test = `select id,username,password,email from users where username = ` +`"`+Username+`"`;
  var [rows, fields] = await db.execute(test);
  var user = rows[0]

  if (!user){
    req.flash("error", `Log in Failed: Invalid username/ password`)
    req.session.save(function(err){


        return res.redirect("/login");
        
        
      
    

      


      
      

    })
    
  }
  else{
    var passwordsMatch = await bcrypt.compare(Password, user.password)
    if(passwordsMatch){
      req.session.user={
        userId: user.id,
        email: user.email,
        username: user.username
      };
      req.flash("success", `You are now logged in`)
     
      
      req.session.save(function(err){
        
        
        return res.redirect("/");
  
      })

    }
    else{
      return res.redirect("/login")
    }
    
  }


})

router.use(function(req,res,next){
  if(req.session.user){
    next();

  }else{
    return res.redirect("/login");
  }
})

router.post("/profile/:id(\\d+)",isMyProfile, function (req,res){
  res.render("profile");
});

router.post("/logout", function(req,res,next) {
  req.session.destroy(function(err){
    if(err){
      next(error);
    }
    return res.redirect('/');
  })
   
});

module.exports = router;
