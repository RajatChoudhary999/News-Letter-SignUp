const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


app.get("/",function(req,res){

    res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req,res){
    
    var firstName = req.body.Fname;
    var lastName = req.body.Lname;
    var email = req.body.Email;


    var data = {
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    
    var options = {

        url:"https://us6.api.mailchimp.com/3.0/lists/387cbc82b0",
        method:"POST",
        headers: {
            "Authorization":"Rajat1 e3ed2cc34478eb965b08c333e86ba7bb-us6"
        },
        body:jsonData
    };
    
    request(options,function(error , response , body){

        if(error){
            res.sendFile(__dirname+"/failure.html");
        } 
        if (response.statusCode === 200) {
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }


    });

});

app.post("/failure",function(req,res){

    res.sendFile(__dirname+"/signup.html");
});

app.listen(process.env.PORT||3000,function(){
    console.log("Server is Running on port 300");
})


// api-Key
// e3ed2cc34478eb965b08c333e86ba7bb-us6

// List id 
// 387cbc82b0