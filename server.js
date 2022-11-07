const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;
const url = 'mongodb+srv://sixers:ulAmPUYkMt7MxZOM@cluster0.srifgsf.mongodb.net/invoice-asap?retryWrites=true&w=majority'
const dbName = 'invoice-asap'

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('invoices').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {invoices: result})
  })
})
// app.get('/hasBeenPaid', (req, res) => {
//   db.collection('invoices').find().toArray((err, result) => {
//     if (err) return console.log(err)
//     res.render('hasBeenPaid.ejs', {invoices: result})
//   })
// })
app.post('/invoices', (req, res) => {

 
  db.collection('invoices').insertOne({company: req.body.company, client: req.body.client, dueDate: req.body.dueDate, balance: req.body.balance, hasBeenPaid: false}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/invoices', (req, res) => {
//   let value = true 
//   if(hasBeenPaid === value) {
//      value = false
//   }
//   else if(hasBeenPaid === value) {
//     value = false
//  }
    // if (hasBeenPaid === true) {
    //   closed = true
    // } 
  db.collection('invoices')
  
  .findOneAndUpdate({company: req.body.company, client: req.body.client, dueDate: req.body.dueDate, balance: req.body.balance}, {
    $set: {
      hasBeenPaid:true
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/unpaidInvoices', (req, res) => {
  // if (hasBeenPaid === false) {
  //   closed = false
  // } 
  db.collection('invoices')
  .findOneAndUpdate({company: req.body.company, client: req.body.client, dueDate: req.body.dueDate, balance: req.body.balance}, {
    $set: {
      hasBeenPaid:false
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/invoices', (req, res) => {
  db.collection('invoices').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})