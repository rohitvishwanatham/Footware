var express=require('express');
var app=express();
const mongodb=require('mongodb');
const bodyparser=require('body-parser')
const MongoClient=mongodb.MongoClient;
var db
MongoClient.connect("mongodb://localhost:27017/stock",{ useUnifiedTopology: true },(err,database)=>{
    if(err) console.log("unable to connect");
    db=database.db('stock');
    app.listen(5000,()=>{console.log("listening on port no 5000")})
});
app.set('view engine','ejs')
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
app.use(express.static('public'))

app.get('/',(req,res)=>{
  db.collection('stockdetails').find().toArray((err,result)=>{
    if(err) console.log("error calling homepage");
    res.render('homepage.ejs',{data:result});
  })
    
})
app.get('/add',(req,res)=>{
  res.render('add.ejs')
})

app.get('/update',(req,res)=>{
  res.render('update.ejs')
})
app.post('/add',(req,res)=>{
  
  db.collection('stockdetails').insertOne({Pid:req.body.pid,
    cat:req.body.cat,
    type:req.body.type,
    stock:req.body.stock,
    size:req.body.size,
    price:req.body.price
  })
  res.redirect('/');
})
app.post('/delete',(req,res)=>{
  
  db.collection('stockdetails').deleteOne({Pid: req.body.pid})
  res.redirect('/');
})
app.post('/update',(req,res)=>{

  db.collection('stockdetails').updateOne(
    {Pid:req.body.pid},
    { $set: {stock:req.body.stock}
  })
  
  res.redirect('/');
})
