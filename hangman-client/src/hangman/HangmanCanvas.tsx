import React, { Component } from 'react';
import posed from 'react-pose';

const AnimatedContainer = posed.div({
  enter: {
    x: 0,
    opacity: 1,
    delay: 300,
    transition: { duration: 300 },
  },
  exit: {
    x: -50,
    opacity: 0,
  },
});

const renderGallows = (turnsLeft: number) => {
  // @ts-ignore
  const canvas = document.getElementById('gallows');
  // @ts-ignore
  if (!canvas || !canvas.getContext('2d')) {
    return null;
  }

  // @ts-ignore
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 4;

  switch (turnsLeft) {
    case 7: {
      ctx.beginPath();
      ctx.clearRect(0, 0, 400, 504);
      ctx.stroke();

      ctx.moveTo(350, 450);
      ctx.lineTo(50, 450);
      ctx.lineTo(50, 50);
      ctx.lineTo(200, 50);
      ctx.stroke();
      break;
    }
    case 6: {
      ctx.beginPath();
      ctx.moveTo(200, 50);
      ctx.lineTo(200, 100);
      ctx.stroke();
      break;
    }
    case 5: {
      ctx.beginPath();
      ctx.moveTo(200, 100);
      ctx.arc(200, 150, 30, 1.5 * Math.PI, -0.5 * Math.PI, true);
      ctx.stroke();
      break;
    }
    case 4: {
      ctx.beginPath();
      ctx.moveTo(200, 180);
      ctx.lineTo(200, 300);
      ctx.stroke();
      break;
    }
    case 3: {
      ctx.beginPath();
      ctx.moveTo(200, 200);
      ctx.lineTo(150, 250);
      ctx.stroke();
      break;
    }
    case 2: {
      ctx.beginPath();
      ctx.moveTo(200, 200);
      ctx.lineTo(250, 250);
      ctx.stroke();
      break;
    }
    case 1: {
      ctx.beginPath();
      ctx.moveTo(200, 300);
      ctx.lineTo(150, 350);
      ctx.stroke();
      break;
    }
    case 0: {
      ctx.beginPath();
      ctx.moveTo(200, 300);
      ctx.lineTo(250, 350);

      ctx.moveTo(190, 140);
      ctx.lineTo(195, 145);
      ctx.moveTo(195, 140);
      ctx.lineTo(190, 145);

      ctx.moveTo(210, 140);
      ctx.lineTo(215, 145);
      ctx.moveTo(215, 140);
      ctx.lineTo(210, 145);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(200, 170, 14, -0.15 * Math.PI, -0.85 * Math.PI, true);
      ctx.stroke();

      break;
    }
  }
};

class HangmanCanvas extends Component<{ turnsLeft: number }> {
  public componentDidUpdate() {
    renderGallows(this.props.turnsLeft);
  }

  public componentDidMount() {
    renderGallows(this.props.turnsLeft);
  }

  public render() {
    return (
      <AnimatedContainer duration={300} enter={{ delay: 300 }} exit={{ x: -50 }} key="canvas">
        <canvas id="gallows" height="504px" width="300px">
          Canvas is not supported ;-(
        </canvas>
      </AnimatedContainer>
    );
  }
}

export default HangmanCanvas;
