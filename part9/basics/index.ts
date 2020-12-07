import calculateBmi from './calculateBmi';
import express = require('express');
const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    const height = Number(_req.query.height);
    const weight = Number(_req.query.weight);
    if(isNaN(height) || isNaN(weight)) {
        res.json({
            error: "malformatted parameters"
        });
    } else {
        res.json({
            height: height,
            weight: weight,
            bmi: calculateBmi(height, weight)
        });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});