const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());



app.post('/email', async(req, res) => {
    const { name, email, message } = req.body
    console.log(req.body)
    try {

        // Create a transporter 
        let transporter = nodemailer.createTransport({
            host: "smtp-relay.sendinblue.com",
            port: 587,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });


        // send mail with defined transport object 
        let info = await transporter.sendMail({
            from: process.env.USER,// sender address 
            to: "ysonu1071@gmail.com",// list of receivers 
            subject: "Portfolio contact us",// subject line 
            text: `Name: ${name} Email: ${email} Message: ${message}`,// plain text body 
        });

        console.log()
    } catch (error) {

    }
    res.status(200).json({ success: true })
})



app.listen(8000, () => console.log("Server is running at port 8000"));