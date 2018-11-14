import React from 'react';

type Props = {
  startNewGame: () => void;
};

const NewGameButton: React.FunctionComponent<Props> = ({ startNewGame }) => (
  <button className="btn btn-large btn-primary" type="button" onClick={startNewGame}>
    Start new game
  </button>
);

export default NewGameButton;
