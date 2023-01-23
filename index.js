const express = require('express');
const bodyParser = require('body-parser');
const app = express();



var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port "+port);
});


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/formtemp', (req, res) => {
    res.render('formtemp');
});





app.post('/formtemp', (req, res) => {
    const temperature = req.body.temperature;
    const unit = req.body.unit;
    if(isNaN(temperature) || (unit !== 'F' && unit !== 'C')){
        res.render('error.ejs');
        return;
    }
    
    let result = (unit === 'F' ? (temperature - 32) * (5/9) : (temperature * (9/5)) + 32 ).toFixed(2);

    
    // let result;
    // if (unit === 'F') {
    //     result = (5/9) * (temperature - 32);
    // } else {
    //     result = (9/5) * temperature + 32;
        
    // }


    res.render('resulttemp.ejs', {temperature: temperature, unit: unit, result: result});
});


app.get('/formgrade', (req, res) => {
    res.render('formgrade')
})

app.post('/formgrade', (req, res) => {
    let score = req.body.score
    let midterm = req.body.midterm
    let final = req.body.final
    let total = parseInt(score) + parseInt(midterm) + parseInt(final)
    let grade
    if (total >= 80) {
        grade = 'A'
    } else if (total >= 70 && total < 79) {
        grade = 'B'
    } else if (total >= 60 && total < 69) {
        grade = 'C'
    } else if (total >= 50 && total < 59) {
        grade = 'D'
    } else {
        grade = 'E'
    }
    res.render('resultgrade.ejs', { total, grade })
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
