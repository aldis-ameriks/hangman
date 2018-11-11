import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField/TextField';
import Typography from '@material-ui/core/Typography/Typography';
import React from 'react';

type Props = {
  makeMove: (guess: string) => void;
  classes: any;
};

type State = {
  guess: string;
};

class GameInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { guess: '' };
  }

  public render() {
    const { classes, makeMove } = this.props;
    const { guess } = this.state;

    const handleSubmit = (e: React.FormEvent) => {
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
          inputProps={{ maxLength: 1, 'data-testid': 'guess' }}
          value={guess}
          onChange={(e: React.ChangeEvent<{ value: string }>) => this.setState({ guess: e.target.value })}
        />
        <Button type="submit" variant="contained" color="secondary" className={classes.button} onClick={handleSubmit}>
          Test your luck
        </Button>
      </form>
    );
  }
}

export default GameInput;
