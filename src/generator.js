import React, {Component} from 'react';

class Generator extends Component {
  constructor() {
    super();
    this.state = {
      imgCounter: 0,
      topText: "",
      bottomText: "",
      randomImg: "https://i.imgflip.com/26am.jpg",
      allMemesImgs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => response.json())
      .then(response => {
        const {memes} = response.data;
        this.setState({
          allMemesImgs: memes
        })
      });
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      randomImg: this.state.allMemesImgs[this.state.imgCounter].url
    });
    this.state.imgCounter < this.state.allMemesImgs.length - 1 ?
    this.setState({imgCounter: this.state.imgCounter + 1}) :
    this.setState({imgCounter: 0});
  }

  render() {
    return(
      <div>
        <form className="meme-form" onSubmit={this.handleSubmit}>
           <input
             name="topText"
             type="text"
             placeholder="Top Text"
             value={this.state.topText}
             onChange={this.handleChange}
           />
           <input
             name="bottomText"
             type="text"
             placeholder="Bottom Text"
             value={this.state.bottomText}
             onChange={this.handleChange}
           />

           <button>Next</button>
        </form>
        <div className="meme">
          <img src={this.state.randomImg} alt="image" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
        <div className="counter">
          <h2>{this.state.imgCounter + 1} of {this.state.allMemesImgs.length}</h2>
        </div>


      </div>
    )
  }
}

export default Generator;
