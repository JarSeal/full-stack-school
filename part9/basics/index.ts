import calculateBmi from './calculateBmi';
import calculateExercises from './calculateExercises';
import express = require('express');
import bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    const height = Number(_req.query.height);
    const weight = Number(_req.query.weight);
    if(isNaN(height) || isNaN(weight) || !_req.query.height || !_req.query.weight) {
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

interface ExerciseBody {
    daily_exercises: number[],
    target: number
}

app.post('/webexercise', (req, res) => {
    const body = req.body as ExerciseBody;
    const dailyHours = body.daily_exercises;
    let hoursAreNumbers = true;
    if(dailyHours) {
        for(let i=0; i<dailyHours.length; i++) {
            if(isNaN(dailyHours[i])) {
                hoursAreNumbers = false;
                break;
            }
        }
    }
    if(!Object.keys(body).length || !body.target) {
        res.json({
            error: 'parameters missing'
        });
        return;
    } else if(!hoursAreNumbers ||
        isNaN(body.target) ||
        dailyHours instanceof Array === false) {
        res.json({
            error: 'invalid parameters'
        });
        return;
    }
    const calcResult = calculateExercises(dailyHours, body.target);
    res.json(calcResult);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});