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
    let rating = 0, ratingDescription = '';
    const averageHours: number = hours.length
        ? hours.reduce((val, acc) => {
            acc = acc + val;
            return acc;
        }) / hours.length
        : 0;
    if(averageHours >= dailyTarget) {
        rating = 3;
        ratingDescription = 'You have reached your daily target (' + dailyTarget.toString() + ')..';
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

export default calculateExercises;