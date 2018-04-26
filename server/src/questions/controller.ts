import { JsonController, Body, Get, Param, Put, NotFoundError, Post, HttpCode } from "routing-controllers";
import Question from './entity';
// import { randomQuestion } from "./gameEdit";


@JsonController()
export default class QuestionController {
    

  @Get('/questions')
  async allQuestions() {
      console.log("on the end point all questions")
  const question = await Question.find()

   return { question }
}

  @Get('/questions/:id')
  getQuestion(
  @Param('id') id: number
  
  ) {
    return Question.findOneById(id)
  }

  @Put('/questions/:id')
  async updateQuestion(
  @Param('id') id: number,
  @Body() update: Partial<Question>
  ) { 
    const question = await Question.findOneById(id)
    if (!question) throw new NotFoundError('Connot find question')
    return Question.merge(question, update).save()
  } 

  
  @Post('/questions')
  @HttpCode(201)
  createQuestion(
  @Body() question: Question
  ) {
    // question.question = randomQuestion()
    
    return question.save()
  } 

}