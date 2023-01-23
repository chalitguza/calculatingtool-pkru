const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/formtemp', (req, res) => {
    res.render('formtemp.ejs');
});





app.post('/', (req, res) => {
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




app.listen(3000, () => {
    console.log('Server started on port 3000');
});
