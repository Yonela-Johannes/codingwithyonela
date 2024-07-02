import { useEffect } from 'react'
import AddButton from '../components/donation/AddButton'
import CreateProject from '../components/donation/CreateProject'
import Hero from '../components/donation/Hero'
import Projects from '../components/donation/Projects'
import { useGlobalState } from '../features/donation/index'

const Donation = () =>
{
  const [projects] = useGlobalState('projects')

  return (
    <>
      <Hero />
      <Projects projects={projects} />
      <CreateProject />
      <AddButton />
    </>
  )
}

export default Donation
