import avatar from '../assets/avatar.png'
export default function AboutMe()
{
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <hr className="m4-8" />
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="min-w-48 max-w-48 flex flex-col gap-2">
          <div className="">
            <img src={avatar} className='w-20 h-20 rounded-full' alt="Yonela Johannes" />
          </div>
          <h2 className="text-2xl font-bold text-center break-words">
            Yonela Johannes
          </h2>
          <p className="text-center break-words">
            Software Developer
          </p>
        </div>
        <p className="text-lg">
          On this blog, you'll find weekly articles and tutorials on topics
          such as web development, software engineering, and programming
          languages. I am always learning and exploring new
          technologies, so be sure to check back often for new content!
        </p>
        <p className="text-lg">
          I encourage you to leave comments on our posts and engage with
          other readers. You can like other people's comments and reply to
          them as well. We believe that a community of learners can help
          each other grow and improve.
        </p>
      </div>
    </div>
  );
}
