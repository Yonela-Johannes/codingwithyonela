import moment from 'moment'
const List = ({ task }) => {
  return (
    <div
      className={`${
        task?.progress == "done"
          ? "text-green-900"
          : task?.progress == "progress"
          ? "text-orange-500"
          : "text-red-900"
      } h-[80px] rounded-md align-text-top text-start relative font-bold `}
    >
      <div className="absolute top-6 z-10
      px-7">
        <p className="text-base text-black">{task?.title}</p>
        <p className="text-base">{task?.description}</p>
        <p className="text-xs font-semibold text-black">{task?.host?.name}</p>
        <div className="flex gap-1 items-center text-end justify-end">
          <p className="text-xs font-semibold text-bg_core">
            {moment(task?.start_date).format('MMMM Do YYYY')}
          </p>{" "}
          -
          <p className="text-xs font-semibold text-bg_core">{moment(task?.end_date).format('MMMM Do YYYY')}</p>
        </div>
      </div>
    </div>
  );
};

export default List;
