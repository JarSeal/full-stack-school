import calculateExercises from './calculateExercises';

const parseExerciseArguments = (args: Array<string>): number[] => {
    let isNumbers = true;
    const hours = [];
    for(let i=2; i<args.length; i++) {
        if(isNaN(Number(args[i]))) {
            isNumbers = false;
            break;
        }
        if(i !== 2) hours.push(Number(args[i]));
    }
    if(isNumbers && args.length > 2) {
        return hours;
    } else {
        throw new Error(`
            Provided values were not numbers! 
            First number should be the target 
            and the rest should be the daily 
            hours exercised.
        `);
    }
};

try {
    const hours: number[] = parseExerciseArguments(process.argv);
    console.log(calculateExercises(hours, Number(process.argv[2])));
} catch (e) {
    if (e instanceof Error) {
        console.log('Error: ', e.message);
    } else {
        console.log('Error: ', e);
    }
}
