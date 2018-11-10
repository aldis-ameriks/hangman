import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button/Button';

const NewGameButton = ({ classes, startNewGame }) => (
  <Button type="button" variant="contained" color="secondary" className={classes.button} onClick={startNewGame}>
    Start new game
  </Button>
);

NewGameButton.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  startNewGame: PropTypes.func.isRequired
};

export default NewGameButton;
