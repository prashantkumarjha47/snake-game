import React, { Component } from "react";
import "./App.css";
import Snake from "./Snake";
import Food from "./Food";

const getRandomCoordinates = () => {
  let x = Math.floor(Math.random() * 100);
  let y = Math.floor(Math.random() * 100);

  if (x % 2 !== 0) x++;
  if (y % 2 !== 0) y++;

  return [x, y];
};

const initialState = {
  food: getRandomCoordinates(),
  speed: 150,
  direction: "RIGHT",
  snakeDots: [
    [0, 0],
    [2, 0],
  ],
  notEaten: true,
};
class App extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onkeydown;
  }

  componentDidUpdate() {
    this.didSnakeTouchedBoundary();
    this.didSnakeCollapsed();
    this.didSnakeAteFood();
  }

  didSnakeTouchedBoundary() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  didSnakeCollapsed = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let snake = [...this.state.snakeDots];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    });
  };

  didSnakeAteFood = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates(),
        notEaten: false,
        speed: this.state.speed - 5,
      });
    }
  };

  onGameOver = () => {
    this.setState(initialState);
  };

  onkeydown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
    }
  };

  moveSnake = () => {
    let dot = [...this.state.snakeDots];
    let head = dot[dot.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
      default:
        break;
    }
    dot.push(head);

    this.state.notEaten && dot.shift();

    this.setState({
      snakeDots: dot,
      notEaten: true,
    });
  };

  render() {
    return (
      <div className="game-arena">
        <Snake snakeDots={this.state.snakeDots} />
        <Food dot={this.state.food} />
      </div>
    );
  }
}

export default App;
