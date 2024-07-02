import { setGlobalState, useGlobalState } from '../../features/donation'
const Hero = () =>
{
  const [stats] = useGlobalState('stats')

  return (
    <div className="text-gray-800 py-24 px-6">
      <h1
        className="text-xl md:text-2xl xl:text-3xl font-bold
      tracking-tight mb-12"
      >
        <span className="capitalize">Bring creative projects to life on</span>
        <br />
        <span className="uppercase text-green-600">genesis.</span>
      </h1>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          className="inline-block px-4 py-2 border border-green-600
        font-medium text-xs leading-tight uppercase text-green-600
        rounded-md bg-transparent hover:bg-green-700
        hover:text-white"
        >
          Back
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-2 justify-center items-center mt-10">
        <div
          className="flex flex-col justify-center items-center
          h-20 border border-bg_primary rounded-md w-full"
        >
          <span
            className="text-lg font-bold text-green-900
            leading-5"
          >
            {stats?.totalProjects || 0}
          </span>
          <span>Projects</span>
        </div>
        <div
          className="flex flex-col justify-center items-center
          h-20 border border-bg_primary rounded-md w-full"
        >
          <span
            className="text-lg font-bold text-green-900
            leading-5"
          >
            {stats?.totalBacking || 0}
          </span>
          <span>Backings</span>
        </div>
        <div
          className="flex flex-col justify-center items-center
          h-20 border border-bg_primary rounded-md w-full"
        >
          <span
            className="text-lg font-bold text-green-900
            leading-5"
          >
            {stats?.totalDonations || 0} ETH
          </span>
          <span>Donated</span>
        </div>
      </div>
    </div>
  )
}

export default Hero
