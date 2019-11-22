// import React, {Component} from 'react'; // as alternative to method below
import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';
// constructor is a good place to make one time calls, maybe to api?
// render should avoid doing anything but returning JSX
// componentDidMount for inital data loading (technically should be doing that in here not constructor)
// componentDidUpdate do more data loading when state/props change
// componentWillUpdate clean up after other lifecycles
// 3 other methods, shouldComponentUpdate, getDerivedStateFromProps, getSnapShotBeforeUpdate



class App extends React.Component {
  // constructor always called first
  // 2 ways of initialzing state
  // option 1 below
  // constructor (props) { // by declaring the constructor we are essentially overriding the React.Component constructor
  //   super(props); // super allows the important stuff in the React.Component to be included as well
  //   this.state = { lat: null, errMessage: '' };
  // }

  state = {lat: null, errMessage: ''}; // option 2 auto generates constructor for us via babel

  // componentDidMount() {} // Lifecycle that mounts when app is loaded
  // componentDidUpdate() {} // Lifecycle called automatically any time component updates itself
  // componentWillUnmount() {} // Lifecycle to stop the componentDidUpdate() method, often used for clean up

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition( //geolocator api to het user location
      (position) => {
        // use setState to update state
        this.setState({ lat: position.coords.latitude })
      },
      (err) => {
        this.setState({ errMessage: err.message })
      }
    );
  }

  componentDidUpdate() {
    console.log('My componentDidUpdate, it rerendered!')
  }

  // problem putting logic directly in render function, it is not modular
  // render () {
  //   if (this.state.errMessage && !this.state.lat) {
  //     return <div>Error: {this.state.errMessage}</div>
  //   }
  //   if (!this.state.errMessage && this.state.lat) {
  //     return <SeasonDisplay lat={this.state.lat}/>
  //   }
  //   return <Spinner message="Accept Location Request"/>
  // };

  // put logic into helper function
  renderContent() {
    if (this.state.errMessage && !this.state.lat) {
        return <div>Error: {this.state.errMessage}</div>
      }
      if (!this.state.errMessage && this.state.lat) {
        return <SeasonDisplay lat={this.state.lat}/>
      }
      return <Spinner message="Accept Location Request"/>
  }

  render () {
    return (
      <div className="border red">
        {this.renderContent()}
      </div>
    )
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
