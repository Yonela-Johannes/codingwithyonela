import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Board from "../components/task/Board";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { disableTaskUpdates, getAllTasks } from "../features/tasks/tasksSlice";
import Collaboration from "./Collaboration";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Head } from "../shared/Head";
import { SlideLeft } from "../animation/animate";
import { LayoutContext } from "../context/LayoutContext";
import List from "../components/task/List";

const Todopage = () => {
  const { id } = useParams();
  const { layout } = useContext(LayoutContext);
  const { project } = useSelector((state) => state.project);
  const { tasks, created, updated, success, deleted } = useSelector(
    (state) => state.task
  );
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  const getTasks = (id) => {
    dispatch(getAllTasks(id));
    dispatch(disableTaskUpdates());
  };

  useEffect(() => {
    if (id) {
      getTasks(id);
    }
  }, [id]);

  useEffect(() => {
    if (created && id) {
      getTasks(id);
      toast("New task created");
    }
  }, [created]);

  useEffect(() => {
    if (success || updated || deleted) {
      getTasks(id);
    }
  }, [success, deleted, updated]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div
        className={`${
          theme == "light" ? "text-bg_primary" : "text-white"
        } w-full h-full flex flex-col gap-8`}
      >
        <div className="flex md:flex-row gap-2 lg:gap-4">
          <div>
            <Head
              title={project?.project_name}
              desc={project?.description}
              theme={theme}
            />
          </div>
          <motion.div
            variants={SlideLeft(0.5)}
            initial="initial"
            whileInView="animate"
            className="flex"
          >
            <motion.img
              variants={SlideLeft(0.6)}
              initial="initial"
              whileInView="animate"
              src={project?.image}
              className="w-10 h-10 lg:w-[100px] lg:h-[100px] object-center object-contain"
            />
          </motion.div>
        </div>
        {layout == "grid" ? <Board project={false} data={tasks} /> : <List project={false} data={tasks} />}
      </div>
      <Collaboration id={id} />
    </motion.div>
  );
};

export default Todopage;
