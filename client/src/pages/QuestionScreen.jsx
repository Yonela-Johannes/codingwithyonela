import Categories from '../shared/Categories'
import Questions from '../components/question/Questions'

const QuestionScreen = () =>
{
  return (
    <div className='flex justify-between h-full'>
      <div className="hidden md:max-min lg:block">
        <Categories />
      </div>
      <Questions />
    </div>
  )
}

export default QuestionScreen
