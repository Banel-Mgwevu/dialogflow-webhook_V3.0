const express = require("express");
const app = express();
const nodemailer = require("nodemailer");

// const { PDFDocument } = require('pdf-lib');

const htmlToPDF = require('html-pdf');
const PDFDocument = require('pdfkit');
const doc = new PDFDocument();

const fs = require('fs');
const puppeteer = require('puppeteer');

const path = require("path");


const { WebhookClient } = require("dialogflow-fulfillment");


app.get("/", (req, res) => {
  res.send("Hi from server!");
});

app.post("/", express.json(), (req, res) => {

  
  /*  async function generatePdfFromHtml(html) {   //GENERATES HTML STRING TO PDF HERE
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdf = await page.pdf({ format: 'A4' });
    await browser.close();
    return pdf;
  }*/


  async function generatePDF(htmlString) {
    const doc = new PDFDocument();
  
    return new Promise((resolve, reject) => {
      htmlToPDF.create(htmlString).toStream((err, stream) => {
        if (err) {
          reject(err);
          return;
        }
  
        resolve(stream);
      });
    });
  }


  
  const agent = new WebhookClient({ request: req, response: res });

  //THIS IS THE CV INCASE YOU WANT TO CHANGE IT IN THE FUTURE
  function myCvAttach(email,fullname,pnumber,birthdate,provinces,institution, qualifications,about,skills,workexp,url,workpersonality,driverscodes,languages,nationality) {
  
    let  cv =`<!DOCTYPE html>
    <html>
    <head>
        <style>
            
    @import url('https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap');
    *
    {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    }
    body
    {
    background: lightblue;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    }
    .container
    {
        position: relative;
        width: 100%;
        max-width: 1000px;
        min-height: 1000px;
        background: #fff;
        margin: 50px;
        display: grid;
        grid-template-columns: 1fr 2fr;
        box-shadow: 0 35px 55px rgba(0,0,0,0.1);
    }
    .container .left_Side
    {
        position: relative;
        background: #003147;
        padding: 40px;
    }
    .profileText
    {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(255,255,255,0.2);
    }
    .profileText .imgBx
    {
       position: relative;
       width: 200px;
       height: 200px;
       border-radius: 50%;
       overflow: hidden; 
    }
    .profileText .imgBx img
    {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .profileText h2
    {
        color: #fff;
        font-size: 1.5em;
        margin-top: 20px;
        text-transform: uppercase;
        text-align: center;
        font-weight: 600;
        line-height: 1.4em;
    }
    .profileText h2 span
    {
        font-size: 0.8em;
        font-weight: 300;
    }
    .contactInfo
    {
        padding-top: 40px;
    }
    .title
    {
        color:#fff;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 1px;
        margin-bottom: 20px;
    }
    .contactInfo ul
    {
        position: relative;
    }
    .contactInfo ul li
    {
        position: relative;
        list-style: none;
        margin: 10px 0;
        cursor: pointer;
    }
    .contactInfo ul li .icon
    {
        display: inline-block;
        width: 30px;
        font-size: 18px;
        color: #03a9f4;
    }
    .container ul li span
    {
        color:#fff;
        font-weight: 300;
    }
    .education li
    {
        margin-bottom: 15px;
    }
    .education h5
    {
        color: #03a9f4;
        font-weight: 500;
    }
    .education h4:nth-child(2)
    {
        color: #fff;
        font-weight: 500;
    }
    .education h4
    {
        color: #fff;
        font-weight: 300;
    }
    .container .right_Side
    {
        position: relative;
        background: #fff;
        padding: 40px;
    }
    .about
    {
        margin-bottom: 50px;
    }
    .about:last-child
    {
        margin-bottom: 0;
    }
    .title2
    {
        color:#003147;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 10px;
    
    }
    p
    {
        color: #333;
    }
    .about .box
    {
        display: flex;
        flex-direction: row;
        margin: 20px 0;
    }
    .about .box .year_company
    {
        min-width: 150px;
    }
    .about .box .year_company h5
    {
        text-transform: uppercase;
        color: #848c90;
        font-weight: 600;
    }
    .about .box .text h4
    {
        text-transform: uppercase;
        color: #2a7da2;
        font-size: 16px;
    }
    .skills .box
    {
      position: relative;
      width: 100%;
      display: grid;
      grid-template-columns: 150px 1fr;
      justify-content: center;
      align-items: center;
    }
    .skills .box h4
    {
      text-transform: uppercase;
      color: #848c99;
      font-weight: 500;
    }
  
    </style>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive CV using HTML & CSS</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" type="text/css" href="style.css">
    
    
    
    </head>
    
    <body>
    <div class="container">
    <div class="left_Side">
    <div class= "ProfileText">
    <div class="imgBx">
    <img src="https://media.geeksforgeeks.org/wp-content/uploads/20190506164011/logo3.png"
        width="200" 
        height="200"/>
    </div>
    <h2>${fullname}</h2>
    </div>
    
    <div class="contactInfo">
    <h2 class="title">Contact Info</h2>
    <ul>
        <li>
            <span class="icon"><i class="fa fa-phone" aria-hidden="true"></i>
            </span>
            <span class="text">0${pnumber}</span>
        </li>
        <li>
            <span class="icon"><i class="fa fa-envelope-o" aria-hidden="true"></i>
            </span>
            <span class="text">${email}</span>
        </li>
        <li>
            <span class="icon"><i class="fa fa-calendar" aria-hidden="true"></i>
            </span>
            <span class="text">${birthdate}</span>
        </li>
        <li>
            <span class="icon"><i class="fa fa-linkedin" aria-hidden="true"></i>
            </span>
            <span class="text">${url}</span>
        </li>
        <li>
          <span class="icon"><i class="fa fa-home" aria-hidden="true"></i>
          </span>
          <span class="text">${nationality}</span>
      </li>
        <li>
            <span class="icon"><i class="fa fa-map-marker" aria-hidden="true"></i>
            </span>
            <span class="text">${provinces}</span>
        </li>
    </ul>
    </div>
    
    <div class="education">
        <h3 class="title">Academic Record</h3>
        <ul>
            <li>
                <h5></h5>
                <h4>${institution}</h4>
                <h4>${qualifications}</h4>
            </li>  
        </ul>
    </div>
    </div>
    <div class="right_Side">
      <div class="about">
        <h2 class="title2">Profile</h2>
        <p>
            ${about}
        </p>
      </div> 
      <div class="about">
        <h2 class="title2">Employment History</h2>
        <div class="box">
            <div class="box">
                <div class="text">
                    <p>${workexp}</p>
                </div>
            </div>
        </div>
        <div class="about skills">
          <h2 class="title2">Skills</h2>
          ${skills}
      </div>
  
  
        <div class="about skills">
          <h2 class="title2">Work Personaility (Soft-Skills)</h2>
          ${workpersonality}
      </div>
  
  
        <div class="about skills">
          <h2 class="title2">Languages</h2>
          ${languages}
      </div>
  
  
        <div class="about skills">
          <h2 class="title2">Drivers License</h2>
          ${driverscodes}
      </div>
  
  
  
      </div> 
    </div>
    </div>
    </body>
    </html>`;
    
    
    
    return cv;
  }


 async function buildresume(agent) {
    
    
    //VARIABLE FOR EMPLOYER EMAIL 
    let empmail = req.body.queryResult.parameters['empmail'];
    
    //VARIABLE FOR BUILDING CV
    let fullname = req.body.queryResult.parameters['fullname'];
    let provinces =req.body.queryResult.parameters['provinces'];
    let o_birthdate = req.body.queryResult.parameters['birthdate'];
    let pnumber = req.body.queryResult.parameters['pnumber'];
    let workexp = req.body.queryResult.parameters['workexp'];
    let workpersonality = agent.parameters['workpersonality'];
    let driverscodes = agent.parameters['driverscodes'];
    let nationality = agent.parameters['nationality']
    let languages = agent.parameters['languages'];
    let email = req.body.queryResult.parameters['email'];
    let skills = req.body.queryResult.parameters['skills'];
    let qualifications = req.body.queryResult.parameters['qualifications'];
  	let institution = req.body.queryResult.parameters['institution'];
    let url=req.body.queryResult.parameters['url'];
    let about= req.body.queryResult.parameters['about'];
    
    var birthdate = o_birthdate.substring(0, 10);  //.substring(0, 10)

    let  strPDF =myCvAttach(email,fullname,pnumber,birthdate,provinces,institution, qualifications,about,skills,workexp,url,workpersonality,driverscodes,languages,nationality);
    

  
    var maillist = [
    empmail,
    email,
    ];



 	  // create reusable transporter object using the default SMTP transport
  	 generatePDF(strPDF)
 //    generatePdfFromHtml(strPDF)
     .then(pdf => {
    let transporter = nodemailer.createTransport({
    	host: "mail.softmeet.co.za",
    	port: 465,
    	secure: true, // true for 465, false for other ports
    	auth: {
      	user: 'moloko@softmeet.co.za', // your cPanel email address
      	pass: '10108642mP#', // your cPanel email password
    	},
  		});

      let info = transporter.sendMail({
        from: '"SoftMeet Application Bot - " <banele@softmeet.co.za>', // sender address
        to: maillist, // list of receivers
        subject: "Application CV", // Subject line
        text: "Dear Sir/Madam, <br> Please find my CV. If there's any additional information you need, please let me know. Thank you very much for your consideration.", // plain text body
        
        attachments: [{
          filename: 'example.pdf',
          content: pdf,
            
        }]      
  
        });
   

    });

      

    const response ='Thank you for creating a CV using SoftMeeet CV builder Bot. The CV is complete, check your email address.';
      

    agent.add(response);
  }
  async function sayHello(agent) {


      const HelloRes=`Welcome to SoftApplication Bot. Here you can build and personalized CV with us and send it to your prosepective employer. Just answer a few easy questions. Type "Start" to Continue`;
      
      agent.add(HelloRes);

  }
  


  const intentMap = new Map();
  intentMap.set("buildresume", buildresume);
  intentMap.set("sayHello", sayHello);
  
  agent.handleRequest(intentMap);
});

app.listen(8080, () => {
  console.log("server running...");
});