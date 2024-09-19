function Comment({ comment }) {
  return (
    <div className="mb-10">
      <div className="flex flex-col gap-6">
        <div className="flex gap-3 border-t pt-6" key={comment?.id}>
          <div>
            <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full relative">
            <img
              src={comment?.profile}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full"
            />

            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h4>
              {comment?.firstname} {comment?.lastname}
            </h4>
            <p className="text-[#404145] pr-20">{comment?.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
