import Repos from "./Repos";
import { RiGitRepositoryFill, RiUserFollowFill, RiUserFollowLine } from "react-icons/ri";
const UserProfile = ({ userData, theme, followers, following }) =>
{

	return (
		<div className="max-w-[800px] mx-auto">
			<h2 className={`${theme == "light" ? "text-cl_alt" : "text-white"} text-md lg:text-xl mb-3 lg:mt-10 `}>Github</h2>
			<div className={` ${theme == "light" ? "text-black" : "text-white bg-bg_grey"} lg:mb-10 px-2  lg:p-4 rounded-md h-max hover:text-none`}>
				<div className={`${theme == "light" ? "text-black bg-bg_light" : "text-white bg-bg_core"} lg:pr-8 w-max mb-2 bg-bg_greylg:mb-4 rounded-full flex gap-4 items-center`}>
					<img className="w-12 lg:w-16 h-12 lg:h-16 object-cover object-center rounded-full" name={userData.name} src={userData.avatar_url} />
					<div>
						<p>
							{userData.name}
						</p>
						<p>
							{userData.bio}
						</p>
					</div>
				</div>

				<div className="">

					<div className={`flex gap-4 items-center`}>
						<div>
							<p>
								Company:
							</p>
							{userData.company || "Not Specified"}
						</div>
						<div>
							<p>
								Location:
							</p>
							{userData.location || "Not Specified"}
						</div>
					</div>
					<div className={`gap-4 items-center`}>

						<div className={`lg:flex gap-2 items-center`}>
							<p>
								Blog / Website:
							</p>
							{userData.blog ? (
								<a href={userData.blog} target='_blank'>
									{userData.blog}
								</a>
							) : (
								"Not Specified"
							)}
						</div>
						<div className={`flex gap-2 items-center`}>
							<p>
								Member Since:
							</p>
							{new Date(userData.created_at).toLocaleDateString()}
						</div>
					</div>
				</div>
				<div className={`flex flex-col lg:flex-row gap-2 items-center`}>
					<div className='flex items-center gap-2 bg-glass rounded-lg p-2 flex-1 min-w-24'>
						<RiUserFollowFill className='w-5 h-5 text-blue-800' />
						<p className='text-xs'>{userData?.followers}</p>
					</div>

					<div className='flex items-center gap-2 bg-glass rounded-lg p-2 flex-1 min-w-24'>
						<RiUserFollowLine className='w-5 h-5 text-blue-800' />
						<p className='text-xs'>{userData?.following}</p>
					</div>

					<div className='flex items-center gap-2 bg-glass rounded-lg p-2 flex-1 min-w-24'>
						<RiGitRepositoryFill className='w-5 h-5 text-blue-800' />
						<p className='text-xs'>{userData?.public_repos}</p>
					</div>
				</div>

				<div className="flex justify-center p-4 rounded-md flex-wrap h-full gap-y-2 gap-x-1">
					{followers?.length ? (
						followers.map((follower) =>
						(
							<a title={follower.login} className="flex-wrap cursor-pointer" href={follower.html_url} key={follower.id} target="_blank">
								<img src={follower.avatar_url} className="border lg:hover:scale-110 duration-100 w-8 h-8 lg:w-12 lg:h-12 border-cl_primary rounded-full object-cover object-center" alt={follower.login} />
							</a>
						))
					) : ""}
					{following?.length ? (
						following?.map((follower) =>
						(
							<a title={follower.login} className="flex-wrap cursor-pointer" href={follower.html_url} key={follower.id} target="_blank">
								<img src={follower.avatar_url} className="border lg:hover:scale-110 duration-100 w-8 h-8 lg:w-12 lg:h-12 border-cl_primary rounded-full object-cover object-center" alt={follower.login} />
							</a>
						))
					) : ""}
				</div>
			</div>
			{userData?.repos_url ? <Repos reposUrl={userData?.repos_url} theme={theme} /> : ""}
		</div>

	);
};

export default UserProfile;
