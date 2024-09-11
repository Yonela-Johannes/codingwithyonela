import { useDispatch, useSelector } from 'react-redux'
// import { globalActions } from '@/store/globalSlices'
import { useEffect } from 'react'

import Details from '../components/poll/Details'
import Contestants from '../components/poll/Contestants'
import ContestPoll from '../components/poll/ContestPoll'
import ChatModal from '../components/poll/ChatModal'
// import ChatButton from '../components/poll/ChatButton'
// import UpdatePoll from '../components/poll/UpdatePoll'
import DeletePoll from '../components/poll/DeletePoll'

export default function Polls({
  pollData,
  contestantData,
}) {
  const dispatch = useDispatch()
  // const { setPoll, setContestants, setGroup } = globalActions
  const { poll, contestants, currentUser, group } = useSelector(
    (states) => states.globalStates
  )

  useEffect(() => {
    // dispatch(setPoll(pollData))
    // dispatch(setContestants(contestantData))

    const fetchData = async () => {
      // if (typeof window !== 'undefined') {
      //   setTimeout(async () => {
      //     const groupData = await getGroup(`guid_${id}`)
      //     if (groupData) dispatch(setGroup(JSON.parse(JSON.stringify(groupData))))
      //   }, 500)
      // }
    }

    fetchData()
  }, [
    // dispatch,
    // setPoll,
    // setContestants,
    // setGroup,
    // contestantData,
    // pollData,
    // id,
    // currentUser,
    // group,
  ])

  return (
    <>
      {/* {poll && (
        <Head>
          <title>Poll | {poll.title}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
      )} */}

      <div className="min-h-screen relative backdrop-blur">
        <div
          className="absolute inset-0 before:absolute before:inset-0
          before:w-full before:h-full before:bg-[url('/assets/images/bg.jpeg')]
          before:blur-sm before:z-[-1] before:bg-no-repeat before:bg-cover"
        />

        <section className="relative px-5 py-10 space-y-16 text-white sm:p-10">
          {poll && <Details poll={poll} />}
          {poll && contestants && <Contestants poll={poll} contestants={contestants} />}
        </section>

        {poll && (
          <>
            {/* <UpdatePoll pollData={poll} /> */}
            <DeletePoll poll={poll} />
            <ContestPoll poll={poll} />
            <ChatModal group={group} />
            {/* <ChatButton poll={poll} group={group} /> */}
          </>
        )}
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  // const { id } = context.query
  // const pollData = await getPoll(Number(id))
  // const contestantData = await getContestants(Number(id))

  // return {
  //   props: {
  //     pollData: JSON.parse(JSON.stringify(pollData)),
  //     contestantData: JSON.parse(JSON.stringify(contestantData)),
  //   },
  // }
}
