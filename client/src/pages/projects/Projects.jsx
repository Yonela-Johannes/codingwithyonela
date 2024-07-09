import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { Context } from "../../main";

const Projects = () =>
{
  const [projects, setProjects] = useState([]);
  // const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();
  useEffect(() =>
  {
    try
    {
      axios
        .get("http://localhost:4000/api/v1/projects", {
          withCredentials: true,
        })
        .then((res) =>
        {
          setProjects(res.data);
        });
    } catch (error)
    {
      console.log(error);
    }
  }, []);
  // if (!isAuthorized) {
  //   navigateTo("/");
  // }

  return (
    <section className="projects page">
      <div className="container">
        <h1>All Projects</h1>
        <div className="banner">
          {projects?.length &&
            projects?.map((element) =>
            {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
