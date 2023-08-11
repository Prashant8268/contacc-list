const express = require('express');
const path = require('path');
const axios = require('axios'); 
const cors = require('cors');



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

app.get('/contact',(req,res)=>{

    return res.render('./contact.ejs',{
        contact_list : contactList
    });
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
        console.log(req.body, 'form data received on server');
    
        // Simulating saving contact data to a database
        contactList.push(req.body);

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