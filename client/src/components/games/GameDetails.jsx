import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {getGames, joinGame, updateGame, getQuestion, fetchAllQuestions} from '../../actions/games'
import {getUsers} from '../../actions/users'
import {userId} from '../../jwt'
import { playerNumber, setValue, round, setRoundHigher} from '../../constants'
import './GameDetails.css'
import Button from 'material-ui/Button'
//import { storeAnswerInBoard, sendAnswer, answerChecked } from './logic'

class GameDetails extends PureComponent {

  componentWillMount() {
    if (this.props.authenticated) {
      if (this.props.game === null) this.props.getGames()
      if (this.props.users === null) this.props.getUsers()
      // this.props.getQuestion()
      this.props.fetchAllQuestions()
    }
  }

  storeAnswerInBoard = (correctAnswerSymbol) => {
    const {game, updateGame} = this.props
    const board = game.board
    board[playerNumber].splice(round,1,correctAnswerSymbol)
    updateGame(game.id, board)
  }

  sendAnswer = (answer) => {
      this.answerChecked(answer)
  }

  answerChecked = (answer) => {
    let rightAnswer = this.props.questions[round].answer

    if(answer === rightAnswer){
      const { game, userId } = this.props
      const player = game.players.find(p => p.userId === userId)
      console.log('player.symbol: ',player.symbol)

      this.storeAnswerInBoard(player.symbol)
      console.log(`--> question ${round} answered: Right! `)
    } else {
      console.log(`--> question ${round} answered: Wrong... `)
      this.storeAnswerInBoard('-')
    }
    setRoundHigher()
  }
    
  joinGame = () => this.props.joinGame(this.props.game.id)


  render() {
    const {game, users, authenticated, userId} = this.props
    if (!authenticated) return (
			<Redirect to="/login" />
    )

    if (game === null || users === null) return 'Loading...'
    if (!game) return 'Not found'
    
    const player = game.players.find(p => p.userId === userId)
    
    return (
      <div className="game-container">
      <h2>Game #{game.id}</h2>
      
      {
        game.status === 'pending' && player && <p>Waiting for another movie nerd...</p>
      }
      {
        game.status === 'pending' &&
        game.players.map(p => p.userId).indexOf(userId) === -1 && <div>
          <p>Want to test your movie knowledge?</p>
        <Button size="large" color="secondary" variant="raised" onClick={this.joinGame}>Join Game</Button>
        </div>
      }
      {
        game.status === 'started' && this.props.questions && <div>
      
      <h1>{`${this.props.questions[round].question}`} </h1>
        <div>
          <img className="img-holder" onClick={_ => this.sendAnswer("a")} src= {`${this.props.questions[round].imageA} `} alt="" height={240} />
          <img className="img-holder" onClick={_ => this.sendAnswer("b")} src= {`${this.props.questions[round].imageB} `} alt="" height={240} />
          <img className="img-holder" onClick={_ => this.sendAnswer("c")} src= {`${this.props.questions[round].imageC} `} alt="" height={240} />
          <img className="img-holder" onClick={_ => this.sendAnswer("d")} src= {`${this.props.questions[round].imageD} `} alt="" height={240} />
        </div>
        {
          game.status === 'started' && round === 0 &&  <img src="http://www.boudewijndanser.nl/mnq/tl/bar01.png" alt=""/>
        }
        {
          game.status === 'started' && round === 1 &&  <img src="http://www.boudewijndanser.nl/mnq/tl/bar02.png" alt=""/>
        }
        {
          game.status === 'started' && round === 2 &&  <img src="http://www.boudewijndanser.nl/mnq/tl/bar03.png" alt=""/>
        }
        <div>
        {
          setValue(player.symbol)
        }
        </div>
        <div>
        {
          this.props.game.board[playerNumber][round] !== null && round === 2 && <p>Waiting for the other player to finish...</p>
        }
        </div>
        </div>
        
      
      }
      </div>
    )
  }
}

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