import React, {PureComponent} from 'react'
import Button from 'material-ui/Button'
//import makeMove from './GameDetails'
//import PropTypes from 'prop-types'

class QuestionHolder extends PureComponent {
//   static propTypes = {
//     // ...
//   }
    makeMove = (playerId, stepValue, questionNumber) => {
        // player: as param to know who is using it
        // stepValue: R(ight),W(rong)
        // questionNumber we can get from component holding the function or button
        // and use to know in which index of the array to store the step.
        
        //console.log('--> Makemove/ toRow: ', toRow);
        //const {game, updateGame} = this.props
        //const board = game.board
        console.log('---> Makemove: Started auto')
        console.log('')
        console.log('---> Makemove/ playerId: ', playerId)
        console.log('---> Makemove/ stepValue: ', stepValue)
        console.log('---> Makemove/ questionNumber: ', questionNumber)
        //updateGame(game.id, board)
    }
    
  render() {
    return (
        <Button size="small" color="primary" variant="raised" onClick={this.makeMove("2","r","1")}>Send something</Button>
    )
  }
}

export default QuestionHolder