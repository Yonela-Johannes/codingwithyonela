import Categories from '../shared/Categories'
import Center from '../components/suggestion/Center'

const SuggestionScreen = () => {
  return (
    <div className='flex justify-between h-full'>
        <Categories />
        <Center />
    </div>
  )
}

export default SuggestionScreen
