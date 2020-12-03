const calculateBmi = (height: number, weight: number) => {
    const index: number = weight / Math.pow((height / 100), 2);
    if(index <= 15) {
        return 'Very severely underweight';
    } else if(index <= 16) {
        return 'Severely underweight';
    } else if(index <= 18.5) {
        return 'Underweight';
    } else if(index <= 25) {
        return 'Normal (healthy weight)';
    } else if(index <= 30) {
        return 'Overweight';
    } else if(index <= 35) {
        return 'Obese Class I (Moderately obese)';
    } else if(index <= 40) {
        return 'Obese Class II (Severely obese)';
    } else {
        return 'Obese Class III (Very severely obese)';
    }
};

console.log(calculateBmi(180, 74));