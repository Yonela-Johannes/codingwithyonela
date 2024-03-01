import Left from '../components/chat/Left'
import Center from '../components/chat/Center'
import Right from '../components/chat/Right'

const ChatScreen = () => {
  return (
    <div className='flex justify-between h-full'>
        <Left />
        <Center />
        <Right />
    </div>
  )
}

export default ChatScreen
