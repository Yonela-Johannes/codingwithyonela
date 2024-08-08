import avatar from '../assets/avatar.png'
export default function AboutMe({ theme })
{
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="min-w-48 max-w-48 flex flex-col gap-2">
          <div className={`${theme == "light" ? "border-clr_alt" : "border-cl_primary"} border  mx-auto rounded-full`}>
            <img src={avatar} className='w-20 h-20 rounded-full' alt="Yonela Johannes" />
          </div>
          <p className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"} font-semibold text-lg lg:text-xl text-center break-words`}>
            Yonela Johannes
          </p>
          <p className={`${theme == "light" ? "text-bg_lighter" : "text-bg_lighter"} font-semibold text-center break-words`}>
            Software Developer
          </p>
        </div>
        <p className="text-lg">
          On <span className={`${theme == "light" ? "text-clr_alt" : "text-cl_primary"}`}>CodingWithYonela</span>, you'll find articles and tutorials on topics
          such as web development, software engineering, and programming
          languages. I am always learning and exploring new
          technologies, so be sure to check back often for new content!
          I encourage you to leave comments on our posts and engage with us.
        </p>
      </div>
    </div>
  );
}
