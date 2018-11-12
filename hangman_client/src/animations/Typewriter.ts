import React from 'react';

type TypewriterProps = {
  text: string;
  interval: number;
  render: (text: string) => React.ReactNode;
};

class Typewriter extends React.Component<TypewriterProps> {
  public intervalId?: NodeJS.Timeout = undefined;

  public state = this.defaults();

  public defaults() {
    return {
      rest: [...this.props.text.split('')],
      text: '',
    };
  }

  public componentDidMount() {
    this.intervalId = setInterval(this.tick, this.props.interval);
  }

  public componentWillUnmount() {
    this.clearInterval();
  }

  public tick = () => {
    const { rest, text } = this.state;

    if (rest.length === 0) {
      this.clearInterval();
      return;
    }

    const line = text + rest.shift();
    this.setState({ rest, text: line });
  };

  public render() {
    return this.props.render(this.state.text);
  }

  private clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

export default Typewriter;
