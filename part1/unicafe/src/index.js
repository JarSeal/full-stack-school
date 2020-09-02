import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const FeedbackButtons = ({feedback}) => {
  return <div>
    <Header text="Give feedback" />
    <Button text={feedback.goodText} handler={feedback.setGood} amount={feedback.good} />
    <Button text={feedback.neutralText} handler={feedback.setNeutral} amount={feedback.neutral} />
    <Button text={feedback.badText} handler={feedback.setBad} amount={feedback.bad} />
  </div>;
};

const countSum = (feedback) => {
  const {good, neutral, bad} = feedback;
  return good + neutral + bad;
};

const countAverage = (sum, feedback) => {
  const {good, bad} = feedback;
  return sum === 0 ? 0 : (good - bad) / sum;
};

const countPositivePercentage = (sum, feedback) => {
  const {good} = feedback;
  return sum === 0 ? 0 : good / sum * 100;
};

const Statistics = ({feedback}) => {
  const sum = countSum(feedback);
  let content = <p>No feedback given</p>;
  if(sum) {
    content = <table><tbody>
      <StatisticsLine text={feedback.goodText} value={feedback.good} />
      <StatisticsLine text={feedback.neutralText} value={feedback.neutral} />
      <StatisticsLine text={feedback.badText} value={feedback.bad} />
      <tr>
        <td>All</td>
        <td>{sum}</td>
      </tr>
      <tr>
        <td>Average</td>
        <td>{countAverage(sum, feedback)}</td>
      </tr>
      <tr>
        <td>Positive</td>
        <td>{countPositivePercentage(sum, feedback)}</td>
      </tr>
    </tbody></table>;
  }
  return <div>
    <Header text="Statistics" />
    {content}
  </div>;
};

const Header = ({text}) => {
  return <h1 key={text.replace(" ", "")}>{text}</h1>;
};

const Button = ({text, handler, amount}) => {
  return <button key={text} onClick={() => handler(amount + 1)}>{text}</button>;
};

const StatisticsLine = ({text, value}) => {
  return <tr key={text}>
    <td>{text}</td>
    <td>{value}</td>
  </tr>;
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const feedback = {
      goodText: "Good",
      good,
      setGood,
      neutralText: "Neutral",
      neutral,
      setNeutral,
      badText: "Bad",
      bad,
      setBad,
    };

    return <div>
      <FeedbackButtons feedback={feedback} />
      <Statistics feedback={feedback} />
    </div>;
};

ReactDOM.render(<App />, document.getElementById('root'));
