import React from 'react';
import styled from 'styled-components';

type Props = {
  makeMove: (guess: string) => void;
  used: string[];
};

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

const GameInput: React.FunctionComponent<Props> = ({ makeMove, used }) => {
  return (
    <div data-testid="game-input">
      {letters.map(letter => (
        <LetterBox onClick={() => makeMove(letter)} isDisabled={used.includes(letter)} key={letter}>
          {letter}
        </LetterBox>
      ))}
    </div>
  );
};

type LetterStyledProps = {
  onClick: () => void;
  isDisabled: boolean;
  className: string;
};

const LetterBox: any = styled('div')<LetterStyledProps>`
  display: inline-block;
  padding: 10px;
  margin: 10px;
  width: 35px;
  height: 40px;
  text-align: center;
  border: 1px solid;
  transition: all linear 150ms;
  cursor: ${props => (props.isDisabled ? 'not-allowed' : 'pointer')};
  color: ${props => (props.isDisabled ? '#757575' : 'white')};
  :hover {
    color: ${props => (props.isDisabled ? '#757575' : 'red')};
  }
`;

export default GameInput;
