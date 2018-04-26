
// storing all our game logic in a separate file. Nice!
import { tempArray, round, playerNumber, setValue } from '../../constants'


export const storeAnswerInBoard = (rightOrWrongFromDB) => {
    console.log('-> tempArray ', tempArray);
    tempArray[playerNumber].push(rightOrWrongFromDB)
}

export const sendAnswer = (answer) => {
    console.log('sendAnswer: ', answer);
    console.log(this.props.questions[0].answer);
}

export const answerChecked = (answer) => {
    //console.log('chosenAnswer: ', chosenAnswer);
    
}


// const p1 = []
// const p2 = []

// answerCheck = () => {
//     if (sendAnswer === answerChecked )
//     return  
// }


// export const winnerCheck = (sendAnswer) {

// }
