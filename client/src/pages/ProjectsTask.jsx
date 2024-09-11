import React, { useContext, useEffect } from "react";
import Board from "../components/task/Board";
import { useDispatch, useSelector } from "react-redux";
import {
  disableMessageUpdate,
  getAllprojects,
} from "../features/project/projectSlice";
import { ThemeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import Empty from "./Empty";
import { SlideLeft, SlideUp } from "../animation/animate";
import { Head } from "../shared/Head";

const ProjectsTask = () => {
  const { theme } = useContext(ThemeContext);
  const { projects, success, updated, deleted } = useSelector(
    (state) => state.project
  );

  const dispatch = useDispatch();

  const getProjects = () => {
    dispatch(getAllprojects());
    dispatch(disableMessageUpdate());
  };

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    if (updated || success || deleted) {
      getProjects();
    }
  }, [updated, success, deleted]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`w-full h-full`}
    >
      {projects?.length > 0 ? (
        <>
          <div className="space-y-4 max-w-[550px] mb-8">
            <Head
              title="Projects"
              desc="Explore a wide range of projects created by our community, and get inspired to start your own."
              theme={theme}
            />
          </div>
          <Board project={true} data={projects} />
        </>
      ) : (
        <Empty
          title="No Projects"
          description="The CodingWithYonela Team has not created a project yet."
          path="/admin/new-project"
          pathMessage="Create Project"
        />
      )}
    </motion.div>
  );
};

export default ProjectsTask;
