import React from 'react';

class Rank extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      emoji: ''
    }
  }

  generaterEmoji = (entries) => {
    fetch(`https://5x078wo8a7.execute-api.us-east-1.amazonaws.com/prod/rank?rank=${entries}`)
      .then(resp => resp.json())
      .then(data => this.setState({emoji: data.input}))
      .catch(err => console.log('lamda func err', err))
  }

  componentDidMount = () => {
    this.generaterEmoji(this.props.entries)
  }

  componentDidUpdate = (prevState, prevProps) => {
    if (prevProps.entries === this.props.entries) {
      return null
    }
    this.generaterEmoji(this.props.entries)
  }


  render(){

    const { name, entries } = this.props

      return (
        <div>
          <div className='white f3'>
            {`${name}, your current entry count is...`}
          </div>
          <div className='white f1'>
            {entries}
          </div>
          <div className='white f3'>
            {'Rank Badge: ' + this.state.emoji}
          </div>
        </div>
      );
  }
}


export default Rank;