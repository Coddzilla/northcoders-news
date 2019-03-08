import React, { Component } from "react";

class InfinateScroller extends Component {
  state = {
    data: [],
    isLoading: true,
    page: 1,
    hasAllData: false
  };
  render() {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    return <section className="data">{this.state.data}</section>;
  }

  componentDidMount() {
    this.fetchData();
    this.addScrollEventListener();
  }

  componentDidUpdate(prevProps, prevState) {
    // if(prevState.data !== this.state.data)?
  }

  addScrollEventListener = () => {
    document
      .querySelector(".data")
      .addEventListener("scroll", this.handleScroll);
    window.addEventListener("scroll", this.handleScroll);
  };

  handleScroll = throttle(event => {
    const { clientHeight, scrollTop, scrollHeight } = event.target;
    const distanceFromTop = window.scrollY;
    const heightOfScreen = window.innerHeight;
    const documentHeight = document.body.scrollHeight;

    if (
      distanceFromTop
      //blah blah blah
    ) {
      //update page
    }
  }, 2000);
}

export default InfinateScroller;
