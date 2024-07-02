import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Context } from "../../main";


const Project = () =>
{
  const { id } = useParams();
  const [project, setProject] = useState({});
  const navigateTo = useNavigate();

  // const { isAuthorized, user } = useContext(Context);

  // useEffect(() =>
  // {
  //   axios
  //     .get(`http://localhost:4000/api/v1/project/${id}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) =>
  //     {
  //       setProject(res.data.project);
  //     })
  //     .catch((error) =>
  //     {
  //       navigateTo("/notfound");
  //     });
  // }, []);

  // if (!isAuthorized) {
  //   navigateTo("/login");
  // }

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Project Details</h3>
        <div className="banner">
          <p>
            Title: <span> {project.title}</span>
          </p>
          <p>
            Category: <span>{project.category}</span>
          </p>
          <p>
            Country: <span>{project.country}</span>
          </p>
          <p>
            City: <span>{project.city}</span>
          </p>
          <p>
            Location: <span>{project.location}</span>
          </p>
          <p>
            Description: <span>{project.description}</span>
          </p>
          <p>
            Project Posted On: <span>{project.jobPostedOn}</span>
          </p>
          <p>
            Salary:{" "}
            {project.fixedSalary ? (
              <span>{project.fixedSalary}</span>
            ) : (
              <span>
                {project.salaryFrom} - {project.salaryTo}
              </span>
            )}
          </p>
          {/* {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${project._id}`}>Apply Now</Link>
          )} */}
        </div>
      </div>
    </section>
  );
};

export default Project;
