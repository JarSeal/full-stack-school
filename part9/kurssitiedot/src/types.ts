interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

interface CoursePartOne extends CoursePartsWithDescription {
    name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}

interface CoursePartThree extends CoursePartsWithDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface CoursePartsWithDescription extends CoursePartBase {
    description: string;
}

interface MyOwnCoursePartType extends CoursePartsWithDescription {
    name: "Lengthy course"
    length: number;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | MyOwnCoursePartType;