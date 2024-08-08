import List from "./List";
import { useSelector } from "react-redux";
import Loader from '../../shared/Loader'

const Center = ({ theme, id }) =>
{
  const { loading, project } = useSelector((state) => state.project);

  return (
    loading ? (
      <Loader />
    ) : (
      <div className="flex flex-col relative gap-10 h-full">
        <div className="z-20 h-[580px] overflow-y-auto">
          <List theme={theme} key={project.id} project={project} />
        </div>
      </div>
    )
  );
};

export default Center;
