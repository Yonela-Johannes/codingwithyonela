import { Badge, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "../../shared/Loader";

const Repos = ({ reposUrl, theme }) =>
{
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() =>
	{
		const fetchRepos = async () =>
		{
			try
			{
				setLoading(true);
				const res = await fetch(reposUrl);
				const data = await res.json();
				if (data.message) throw new Error(data.message);
				setRepos(data);
			} catch (error)
			{

				toast({
					title: "Error",
					description: error.message,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			} finally
			{
				setLoading(false);
			}
		};

		fetchRepos();
	}, []);

	return (
		<div>
			<h2 className={`${theme == "light" ? "text-cl_alt" : "text-white"} text-md lg:text-xl mt-2`}>Repositories</h2>
			{loading && (
				<Loader />
			)}

			{repos
				.map((repo) =>
				{
					return (
						<div
							key={repo.id}
							className={`grid grid-cols-2 p-1 lg:p-2 my-2 gap-4 items-center ${theme == 'light' ? "bg-bg_lightest" : "bg-bg_grey"}`}
						>
							<Flex flex={1} direction={"column"}>
								<a className="text-base lg:text-lg" href={repo.html_url} fontSize={"md"} fontWeight={"bold"} target="_blank">
									{repo.name}
								</a>
								<Badge
									fontSize={"0.7em"}
									colorScheme={"whatsapp"}
									w={"min-content"}
									textAlign={"center"}
									px={1}
									mt={1}
								>
									{repo.language || "None"}
								</Badge>
							</Flex>

							<Flex flex={1} gap={4} ml={6}>
								<Badge fontSize={"0.8em"} colorScheme='orange' flex={1} textAlign={"center"}>
									Stars: {repo.stargazers_count}
								</Badge>
								<Badge fontSize={"0.8em"} colorScheme='pink' flex={1} textAlign={"center"}>
									Forks: {repo.forks_count}
								</Badge>
								<Badge fontSize={"0.8em"} colorScheme='cyan' flex={1} textAlign={"center"}>
									Watchers: {repo.watchers_count}
								</Badge>
							</Flex>
						</div>
					);
				})}
		</div>
	);
};

export default Repos;
