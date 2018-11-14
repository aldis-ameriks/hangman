import React from 'react';

type Props = {
  makeMove: (guess: string) => void;
  used: string[];
};

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

const GameInput: React.FunctionComponent<Props> = ({ makeMove, used }) => {
  return (
    <div data-testid="game-input">
      {letters.map(letter => (
        <Letter makeMove={makeMove} used={used} letter={letter} key={letter} />
      ))}
    </div>
  );
};

type LetterProps = {
  letter: string;
  makeMove: (guess: string) => void;
  used: string[];
};
const Letter: React.FunctionComponent<LetterProps> = ({ letter, makeMove, used }) => {
  const isDisabled = used.includes(letter);
  return (
    <div
      style={{
        display: 'inline-block',
        padding: '10px',
        margin: '10px',
        width: '35px',
        height: '40px',
        textAlign: 'center',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        backgroundColor: isDisabled ? 'gray' : 'white',
      }}
      className="well"
      onClick={() => makeMove(letter)}
    >
      {letter}
    </div>
  );
};

export default GameInput;
