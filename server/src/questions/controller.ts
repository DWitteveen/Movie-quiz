import { JsonController, Body, Get, Param, Put } from "routing-controllers";
import Question from './entity';

@JsonController()
export default class QuestionController {
    

  @Get('/questions')
  async allQuestions() {
  const question = await Question.find()

   return { question }
}

  @Put('/questions/:id')
  async updateQuestion(
  @Param('id') id: number,
  @Body() update: Partial<Question>
  ) { 
    const question = await Question.findOneById(id)
    return Question.merge(question, update).save()
  } 
} 
