import Categories from '../shared/Categories'
import Center from '../components/suggestion/Center'

const QuestionScreen = () => {
  return (
    <div className='flex justify-between h-full'>
        <Categories />
        <Center />
    </div>
  )
}

export default QuestionScreen
