import React from "react";
import {render} from "react-dom";
import ReactPlayer from 'react-player'
import Button1 from './Button1'
import Button2 from './Button2'
import "./index.css"
import "./audio.css"
import Hub from './Hub'
import makeCarousel from 'react-reveal/makeCarousel';
import Slide from 'react-reveal/Slide';
import styled, { css } from 'styled-components';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom'
import axios from "axios"
import Card from '@material-ui/core/Card'
import { CardContent } from "@material-ui/core";

const styles = {
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      maxHeight: 50
    },
    typo: {
      fontSize: 144
    }
}

const CarouselUI = ({ position, total, handleClick, children }) => (
    <Container>
      <Children>
        {children}
        <Arrow onClick={handleClick} data-position={position - 1}>{'<'}</Arrow>
        <Arrow right onClick={handleClick} data-position={position + 1}>{'>'}</Arrow>
      </Children>
      
    </Container>
  );
const Carousel = makeCarousel(CarouselUI);

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

class App extends React.Component {
  state = {
    quoteData: [1, 1, 1, 1, 1, 1],
    gratData: [1, 1, 1, 1, 1, 1],
    songs: ["","","","","","",""]
  }
    constructor(props) {
      super(props);
      axios.get('http://localhost:8080/api/quote').then(res => {
        this.state = {quoteData: res.data}
        console.log(res.data)
      })
      axios.get('http://localhost:8080/api/gratitude').then(res => {
        this.state = {gratData: res.data}
        console.log(res.data)
      })
      axios.get('http://localhost:8080/api/song').then(res => {
        this.state = {songs: res.data}
        console.log('asdfasdfasdf', res.data)
      })
      console.log('state', this.state)
    }
    componentDidMount() {
       axios.get('http://localhost:8080/api/quote').then(res => {
        this.setState({quoteData: res.data})
        console.log('res', res)
      })
      axios.get('http://localhost:8080/api/gratitude').then(res => {
        this.setState({gratData: res.data})
        console.log('res', res)
      })
      axios.get('http://localhost:8080/api/song').then(res => {
        this.setState({songs: res.data})
        console.log('res', res)
      })
    }

    render() {
      shuffle(this.state.quoteData);
      shuffle(this.state.gratData);
      shuffle(this.state.songs);
      console.log('this is in state',this.state.quoteData[1])
      console.log('song', this.state.songs, this.state.songs[0].link)
      let song = this.state.songs[0].link;
      console.log(song)
        return (
            <body>
                <Router>
                <div styles={styles.root}>
                <Link to="/Hub">
                <Button1 />
                </Link>
                <Link to="/">
                  <Button2 />
                </Link>
                <Switch>
                  <Route exact path="/Hub">
                    <Hub />
                  </Route>
                  <Route exact path="/">
                  </Route>
                </Switch>
                </div>
                </Router>
                <div class="center2">
                  <h1 class="h1">Happy Thoughts</h1>
                </div>
                <div class="center">
                  <Card raised={true} square={false} class="card">
                    <CardContent>
                    <h1 class="cardWord">{this.state.quoteData[0].body}</h1>
                    <h2 class="cardWord">{this.state.quoteData[0].author}</h2>
                    </CardContent>
                    </Card>
                </div>
                <div>
                    <Carousel defaultWait={5000} maxTurns={120} >
                        <Slide right>
                        <Title>
                            <h1 class="words">{this.state.gratData[0].body}</h1>
                            <p class="words">{this.state.gratData[0].user}</p>
                        </Title>
                        </Slide>
                        <Slide right>
                        <Title>
                            <h1 class="words">{this.state.gratData[1].body}</h1>
                            <p class="words">{this.state.gratData[1].user}</p>
                        </Title>
                        </Slide>
                        <Slide right>
                        <Title>
                            <h1 class="words">{this.state.gratData[2].body}</h1>
                            <p class="words">{this.state.gratData[2].user}</p>
                        </Title>
                        </Slide>
                        <Slide right>
                        <Title>
                            <h1 class="words">{this.state.gratData[3].body}</h1>
                            <p class="words">{this.state.gratData[3].user}</p>
                        </Title>
                        </Slide>
                        <Slide right>
                        <Title>
                            <h1 class="words">{this.state.gratData[4].body}</h1>
                            <p class="words">{this.state.gratData[4].user}</p>
                        </Title>
                        </Slide>
                        <Slide right>
                        <Title>
                            <h1 class="words">{this.state.gratData[5].body}</h1>
                            <p class="words">{this.state.gratData[5].user}</p>
                        </Title>
                        </Slide>
                    </Carousel>
                </div>
                <div className = "App">
                    <header className = "App-header">
                        <ReactPlayer url={this.state.songs[0].link} controls = {true} playing = {true} width = {1} height = {1} loop = {true}/>
                    </header>
                </div>
            </body>
        );
    }
}
const width = '100%', height = '100px'
const Title = styled.h1`
font-size: 1.5em;
text-align: center;
color: palevioletred;

`;
const Container = styled.div`

  position: relative;
  overflow: hidden;
  width: ${width};
`;
const Children  = styled.div`
  width: ${width};
  position: relative;
  height: ${height};
`;
const Arrow = styled.div`
  text-shadow: 1px 1px 1px #fff;
  z-index: 100;
  line-height: ${height};
  text-align: center;
  position: absolute;
  top: 0;
  width: 10%;
  font-size: 3em;
  cursor: pointer;
  user-select: none;
  ${props => props.right ? css`left: 90%;` : css`left: 0%;`}
`;
const Dot = styled.span`
  font-size: 1.5em;
  cursor: pointer;
  text-shadow: 1px 1px 1px #fff;
  user-select: none;
`;
const Dots = styled.span`
  text-align: center;
  width: ${width};
  z-index: 100;
`;

render(<App/>, window.document.getElementById("app"));
    