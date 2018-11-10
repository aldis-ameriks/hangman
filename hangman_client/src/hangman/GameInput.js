import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography/Typography';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';

class GameInput extends React.Component {
  state = {
    guess: ''
  };

  render() {
    const { classes, makeMove } = this.props;
    const { guess } = this.state;

    const handleSubmit = e => {
      e.preventDefault();
      this.setState({ guess: '' }, () => {
        makeMove(guess);
      });
    };

    return (
      <form>
        <Typography variant="headline" className={classes.title}>
          Enter your best guess below.
        </Typography>
        <TextField
          inputProps={{ maxLength: 1 }}
          value={guess}
          onChange={e => this.setState({ guess: e.target.value })}
        />
        <Button type="submit" variant="contained" color="secondary" className={classes.button} onClick={handleSubmit}>
          Test your luck
        </Button>
      </form>
    );
  }
}

GameInput.propTypes = {
  makeMove: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired
};

export default GameInput;
