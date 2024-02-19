import { useState } from "react";
import { StatisticLine } from "./StatisticLine";
import { Button } from "./Button";

const App = () => {
  // save each button click in its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleIncreaseGood = () => {
    setGood((prevGood) => prevGood + 1);
  };

  const handleIncreaseNeutral = () => {
    setNeutral((prevNeutral) => prevNeutral + 1);
  };

  const handleIncreaseBad = () => {
    setBad((prevBad) => prevBad + 1);
  };

  const totalFeedback = good + neutral + bad;

  const averageScore = (good - bad) / totalFeedback;

  const positivePercentage = (good * 100) / totalFeedback;

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [text, setText] = useState(anecdotes[0]);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleSelect = () => {
    const newSelected = Math.floor(Math.random() * anecdotes.length);
    setSelected(newSelected);
    setText(anecdotes[newSelected]);
  };

  const handleVoteAnecdote = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
  };

  const maxVotes = Math.max(...votes);
  const maxIndices = votes.reduce((acc, vote, index) => {
    if (vote === maxVotes) {
      acc.push(index);
    }
    return acc;
  }, []);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleIncreaseGood} text="good" />
      <Button onClick={handleIncreaseNeutral} text="neutral" />
      <Button onClick={handleIncreaseBad} text="bad" />
      <h1>statistics</h1>
      {totalFeedback === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={totalFeedback} />
            <StatisticLine text="average" value={averageScore} />
            <StatisticLine text="positive" value={positivePercentage + "%"} />
          </tbody>
        </table>
      )}
      <p>{text}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={handleVoteAnecdote}>vote</button>
      <button onClick={handleSelect}>next anecdote</button>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[maxIndices[0]]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  );
};

export default App;
