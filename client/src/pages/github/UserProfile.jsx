// import Repos from "./Repos";
import { RiGitRepositoryFill, RiUserFollowFill, RiUserFollowLine } from "react-icons/ri";
const UserProfile = ({ userData, theme }) =>
{
	return (
		<a href={userData.html_url} target='_blank' className={` ${theme == "light" ? "text-black bg-bg_lighter" : "text-white bg-bg_core"} lg:mt-10 p-1 lg:p-4 rounded-md w-max h-max`}>
			<div className={`${theme == "light" ? "text-black bg-bg_light" : "text-white bg-bg_core"} mb-2 lg:mb-4 rounded-full flex gap-4 items-center`}>
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
			{/* <div className={`flex flex-col lg:flex-row gap-2 items-center`}>
				<div className='flex items-center gap-2 bg-glass rounded-lg p-2 flex-1 min-w-24'>
					<RiUserFollowFill className='w-5 h-5 text-blue-800' />
					<p className='text-xs'>Followers: {userData?.followers}</p>
				</div>

				<div className='flex items-center gap-2 bg-glass rounded-lg p-2 flex-1 min-w-24'>
					<RiUserFollowLine className='w-5 h-5 text-blue-800' />
					<p className='text-xs'>Following: {userData?.following}</p>
				</div>

				<div className='flex items-center gap-2 bg-glass rounded-lg p-2 flex-1 min-w-24'>
					<RiGitRepositoryFill className='w-5 h-5 text-blue-800' />
					<p className='text-xs'>Public repos: {userData?.public_repos}</p>
				</div>

				<div className='flex items-center gap-2 bg-glass rounded-lg p-2 flex-1 min-w-24'>
					<RiGitRepositoryFill className='w-5 h-5 text-blue-800' />
					<p className='text-xs'>Public gists: {userData?.public_gists}</p>
				</div>
			</div> */}
		</a>

	);
};

export default UserProfile;
