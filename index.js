const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get("/",(req,res) =>{
 res.send("<h1> Hello World </h1>")
})

app.listen(3000, () => {
 console.log('Server Started...')
})