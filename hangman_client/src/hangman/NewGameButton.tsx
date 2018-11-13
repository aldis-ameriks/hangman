import Button from '@material-ui/core/Button/Button';
import React from 'react';

type Props = {
  classes: any;
  startNewGame: () => void;
};

const NewGameButton: React.FunctionComponent<Props> = ({ classes, startNewGame }) => (
  <Button
    type="button"
    variant="contained"
    color="secondary"
    className={classes.button}
    onClick={startNewGame}
  >
    Start new game
  </Button>
);

export default NewGameButton;
