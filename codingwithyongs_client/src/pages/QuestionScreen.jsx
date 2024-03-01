import Categories from '../shared/Categories'
import Center from '../components/suggestion/Center'
import Right from '../components/suggestion/Right'

const QuestionScreen = () => {
  return (
    <div className='flex justify-between h-full'>
        <Categories />
        <Center />
        <Right />
    </div>
  )
}

export default QuestionScreen
