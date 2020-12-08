import calculateBmi from './calculateBmi';

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
        };
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (e) {
    if (e instanceof Error) {
        console.log('Error: ', e.message);
    } else {
        console.log('Error: ', e);
    }
}
