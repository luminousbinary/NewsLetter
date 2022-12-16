const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const path = require("path")

const port = 5001;
const app = express();

app.use(express.static(path.join(__dirname, "/public")));

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {

    res.sendFile(__dirname + "/signup.html");

});

app.post("/", (req, res) => {
    var fName = req.body.fName
    var lName = req.body.lName
    var email = req.body.email

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fName,
                    LNAME: lName,
                }

            }
        ]
    }

    var jsonData = JSON.stringify(data);

    var options = {
        url: 'https://us21.api.mailchimp.com/3.0/lists/e6547be539',
        method: "POST",
        // thois id for authorzation fir any api
        headers: {
            "Authorization": "calebt b39ecb5930c164c6f4fc69908d05a0f0-us21"
        },
        body: jsonData


    }
    request(options, (err, resp, body) => {

        if (err) {
            console.log("error");
            res.sendFile(__dirname + "/failure.html")

        } else {
            if (resp.statusCode == 200) {
                console.log(resp.statusCode);
                res.sendFile(__dirname + "/success.html")
            }
            else {
                console.log("also Error: " + resp.statusCode)
                res.sendFile(__dirname + "/failure.html")
            }

        }
    })


})

app.post("/failure", (req,res)=>{
    res.redirect("/");
})


app.listen(port, () => {
    console.log("Your app is running on")
})





// b39ecb5930c164c6f4fc69908d05a0f0-us21

// list id:  e6547be539
