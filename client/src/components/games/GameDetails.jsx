import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame, getQuestion, fetchAllQuestions, roundUp} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import { tempArray, playerNumber, setValue, round, setRoundHigher} from '../../constants'
import './GameDetails.css'
import Button from 'material-ui/Button'
//import { storeAnswerInBoard, sendAnswer, answerChecked } from './logic'



class GameDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
      if (this.props.round ) this.props.roundUp()
      this.props.fetchAllQuestions()
    }
  }



  render() {
    const {game, users, authenticated, userId, questions, question} = this.props
    if (!authenticated) return (
			<Redirect to="/login" />
    )

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    return (
      <div className="game-container">
      <h2>Game #{game.id}</h2>
      {
        game.status === 'pending' &&
        game.players.map(p => p.userId).indexOf(userId) === -1 && 
        <Button size="small" color="primary" variant="raised" onClick={this.joinGame}>Join Game</Button>
      }
        
      <h1>{`${this.props.questions[round].question}`} </h1>
        <div>
          <img className="img-holder" onClick={_ => this.sendAnswer("a")} src= {`${ this.props.questions[round].imageA} `} alt="" height={240} />
          <img className="img-holder" onClick={_ => this.sendAnswer("b")} src= {`${ this.props.questions[round].imageB} `} alt="" height={240} />
          <img className="img-holder" onClick={_ => this.sendAnswer("c")} src= {`${ this.props.questions[round].imageC} `} alt="" height={240} />
          <img className="img-holder" onClick={_ => this.sendAnswer("d")} src= {`${ this.props.questions[round].imageD} `} alt="" height={240} />
        </div>
        
      </div>
      
    )
  }


  storeAnswerInBoard = (rightOrWrongFromDB) => {
    console.log('rightOrWrongFromDb: ')
    //console.log('-> tempArray ', tempArray);
    //tempArray[playerNumber].push(rightOrWrongFromDB)
    setRoundHigher()
    this.render()
  }

  sendAnswer = (answer) => {
    console.log('sendAnswer: ', answer);
    roundUp(round)
    console.log(roundUp(round))
    this.answerChecked(answer)
    
  }

  answerChecked = (answer) => {
    console.log('round: ', round)
    console.log('answerChecked: ', answer);
    console.log('right answer is: ',this.props.questions[round].answer);
    let rightAnswer = this.props.questions[round].answer
    if(answer === rightAnswer){
      this.storeAnswerInBoard("r")
      // console.log(`--> question ${round} answered: Right! `)
    } else {
      this.storeAnswerInBoard("r")
      // console.log(`--> question ${round} answered: Wrong... `)
    }
  }
    
  joinGame = () => this.props.joinGame(this.props.game.id)

  makeMove = (playerId, stepValue, questionNumber) => {
    const {game, updateGame} = this.props
    const board = game.board
    updateGame(game.id, board)
  }


}

const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users,
  questions: state.questions,
  question: state.question,
  round: state.round

})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame, getQuestion,fetchAllQuestions, roundUp
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)