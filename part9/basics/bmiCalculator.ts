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

interface BmiInputValues {
    height: number;
    weight: number;
}

const parseArguments = (args: Array<string>): BmiInputValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (e) {
    console.log('Error: ', e.message);
}
