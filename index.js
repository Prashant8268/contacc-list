const express = require('express');
const path = require('path');
const axios = require('axios'); 
const cors = require('cors');

const db =require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();
app.use(express.json());



app.use(express.static('assets'));

//midlle ware 1 middleware can manipulate data and can return res
// app.use(function(req,res,next){
//     console.log('middle ware 1 is called');
//     req.body.prashant = "nice"
//     next();

// })




app.use(cors());
app.use(express.urlencoded({ extended: false }))
// telling server we will be using ejs as template engine
app.set('view engine','ejs');

// telling my server from where views 
app.set('views',path.join(__dirname,'views'));


var contactList = [
    {
        name: 'Prashant',
        phone: "465465"
    },
    {
        name: "lkjasdf",
        phone:"524545"
    },
    {
        name:"6531465465",
        phone:"5321314"
    }
]

app.get('/contact',async(req,res)=>{

    const contact_list = await Contact.find();

    return res.render('./contact.ejs',{
        contact_list
    });
})

app.get('/delete/:id',async(req,res)=>{


    try {
        const check = await Contact.findByIdAndDelete(req.params.id);

      } catch (error) {
        console.error('Error:', error);
      }

  

    return res.redirect('back');
})





app.post('/submit',async (req, res) => {
    try {
      const formData = req.body; 

      const jsonData = JSON.stringify(formData);
      const apiResponse = await axios.post('http://localhost:5000/create-contact',jsonData,{
        headers: {
            'Content-Type': 'application/json',
          }
        
      });

      return  res.redirect('back');

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  })

app.post('/create-contact',(req,res)=>{

    try {
    
        // adding to databas         // 

        // const contact = new Contact;
        // contact.name = req.body.name;
        // contact.phone = req.body.phone;

        // contact.save();
        // you can create as below 

        Contact.create({
            name:req.body.name,
            phone:req.body.phone
        })



        return  res.json({
            mesage:"Added Successfully"
        })
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
      }

}

)

app.listen(5000,(err)=>{
    if(err){
        console.log("Error in running server :",err);
        return ;
    }

    console.log('Server is running on ', 5000);
})