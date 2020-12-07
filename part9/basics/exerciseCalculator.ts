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

const parseExerciseArguments = (hours: Array<number>, target: number) => {
    let isNumbers = true;
    hours.forEach(hour => {
        if(isNaN(Number(hour))) isNumbers = false;
    });
    if(isNumbers && !isNaN(Number(target))) {
      return hours;
    } else {
      throw new Error('Provided values were not numbers!');
    }
};

try {
    // const hours: number[] = parseExerciseArguments(process.argv[0], process.argv[1]);
    console.log(calculateExercises([0, 2.6, 3, 0, 2, 1, 1], 2));
} catch (e) {
    console.log('Error: ', e.message);
}
