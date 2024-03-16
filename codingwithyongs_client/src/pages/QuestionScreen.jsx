import Categories from '../shared/Categories'
import Questions from '../components/question/Questions'

const QuestionScreen = () => {
  return (
    <div className='flex justify-between h-full'>
      <Categories />
      <Questions />
    </div>
  )
}

export default QuestionScreen
