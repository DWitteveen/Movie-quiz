import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame, getQuestion, fetchAllQuestions} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
// import board from '../../constants'
import './GameDetails.css'
import Button from 'material-ui/Button'
import QuestionList from '../question/question'

class GameDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
      this.props.fetchAllQuestions()
    }
  }

  joinGame = () => this.props.joinGame(this.props.game.id)

  makeMove = (playerId, stepValue, questionNumber) => {
    // player: as param to know who is using it
    // stepValue: R(ight),W(rong)
    // questionNumber we can get from component holding the function or button
    // and use to know in which index of the array to store the step.
    
    //console.log('--> Makemove/ toRow: ', toRow);
    const {game, updateGame} = this.props
    const board = game.board
    console.log('---> Makemove/ board: ', board)
    console.log('---> Makemove/ playerId: ', playerId)
    console.log('---> Makemove/ stepValue: ', stepValue)
    console.log('---> Makemove/ questionNumber: ', questionNumber)
    updateGame(game.id, board)
  }

  render() {
    const {game, users, authenticated, userId, questions, question} = this.props
    // Can we take the userId from here?
    if (!authenticated) return (
			<Redirect to="/login" />
    )
    
    console.log(questions)

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'

    // const player = game.players.find(p => p.userId === userId)
    console.log('--> GameDetails/ player.userId? : ',userId);
    
    // const winner = "unknown right now"
    // const winner = game.players
    //   .filter(p => p.symbol === game.winner)
    //   .map(p => p.userId)[0]
    //   console.log('-> winner: ', game.players);

    return (
      <div className="game-container">
      <h1>Game #{game.id}</h1>
      {
        game.status === 'pending' &&
        game.players.map(p => p.userId).indexOf(userId) === -1 && 
        <Button size="small" color="primary" variant="raised" onClick={this.joinGame}>Join Game</Button>
      }
      <h3>{ `Player ${userId}` }</h3>
      
      

      <h3>{`${this.props.questions[0].question}`}</h3>
      <img id="a" alt="" src = {`${this.props.questions[0].imageA} `} height={240} />
      <img id="b" alt="" src = {`${this.props.questions[0].imageB} `} height={240} />
      <img id="c" alt="" src = {`${this.props.questions[2].imageC} `} height={240} />
      <img id="d" alt="" src = {`${this.props.questions[2].imageD} `} height={240} />
      {console.log(questions[0].answer)}



      { game.status !== 'pending' && <QuestionList /> } 
      </div>
      
    )
  }
}

let testAnswer = [""];



const mapStateToProps = (state, props) => ({
  authenticated: state.currentUser !== null,
  userId: state.currentUser && userId(state.currentUser.jwt),
  game: state.games && state.games[props.match.params.id],
  users: state.users,
  questions: state.questions,
  question: state.question

})

const mapDispatchToProps = {
  getGames, getUsers, joinGame, updateGame, getQuestion,fetchAllQuestions
}

export default connect(mapStateToProps, mapDispatchToProps)(GameDetails)
