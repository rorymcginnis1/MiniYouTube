var express = require ('express');
var router = express.Router();
var multer = require('multer');
const { makeThumbnail } = require('../middleware/posts');
var db= require ('../conf/database');
const {isLoggedIn} = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/videos/uploads");
    },
    filename: function (req, file, cb){
        var fileExt = file.mimetype.split("/")[1];
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb( null, `${file.fieldname}-${uniqueSuffix}.${fileExt}`);
    }
});



const upload = multer ({ storage: storage});


router.post("/create",isLoggedIn,upload.single("UploadVideo"),makeThumbnail, async function(req,res,next){
    

    // var x= (JSON.stringify(req.body));
    // x=JSON.parse(x);
    // x=JSON.stringify(x)
    // x=x.split("\"")

    // var title = x[3];
    // var  describtion = x[7];

    var {path, thumbnail} = req.file;
    var {userId} = req.session.user;
    var {Title, Description} = req.body;
    

    try{
        //var a=req.body;
        //inp = `("`+title+`",`+`"`+Description+`","`+path+`","`+thumbnail+`","`+userId+`")`

        test = "INSERT INTO posts (title,describtion, video, thumbnail, fk_userId) Value (?,?,?,?,?)";

        var[insertResult, _ ] = await db.execute(test,[Title,Description, path, thumbnail,userId]);

        if(insertResult && insertResult.affectedRows){
            return req.session.save(function(error){
                if(error) next (error);
                return res.redirect(`/posts${insertResult.insertId}`);
            })

        }
        else{
            next(new Error('Post could not be created'));
        }

    }catch(error){
        next(error);

    }
});





router.post("/delete:id(\\d+)", async function (req,res, next){


    try{
        comtest="DELETE from comments where fk_postId = "+req.params.id
    
        test="DELETE from posts where id = "+req.params.id;



        var [rows, _] = await db.execute(comtest);


        var [rows, _] = await db.execute(test);

        res.redirect("/profile")

        

    }
    catch(error){
        next(error)

    }

    
});

router.get("/profile", async function (req,res, next){
    var name = req.params.id

    try{
        test= "select title from posts where fk_userId = "+name;
        var [rows, _ ] =db.execute(test); 

    }
    catch(error){
        next(error)

    }





});

router.get("/search", async function (req, res, next){


    var {SearchValue, _ } = req.query;

    try{
        inp = '"%'+""+`%"`;
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










module.exports = router;