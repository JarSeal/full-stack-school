interface ExerciseOutputValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (hours: Array<number>, dailyTarget: number): ExerciseOutputValues => {
    let rating: number = 0, ratingDescription: string = '';
    const averageHours: number = hours.length
        ? hours.reduce((val, acc) => {
            acc = acc + val;
            return acc;
        }) / hours.length
        : 0;
    if(averageHours >= dailyTarget) {
        rating = 3;
        ratingDescription = 'You have reached your daily target (' + dailyTarget + ')..';
    } else if(averageHours >= dailyTarget / 2) {
        rating = 2;
        ratingDescription = 'Not too bad but could be better..';
    } else {
        rating = 1;
        ratingDescription = 'You have performed poorly, but don\'t give up..';
    }

    return {
        periodLength: hours.length,
        trainingDays: hours.filter(hour => hour !== 0).length,
        success: dailyTarget <= averageHours,
        rating,
        ratingDescription,
        target: dailyTarget,
        average: averageHours
    };
};

const parseExerciseArguments = (args: Array<string>): number[] => {
    let isNumbers = true,
        hours = [];
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
    console.log('Error: ', e.message);
}
