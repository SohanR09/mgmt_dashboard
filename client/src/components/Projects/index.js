import { useQuery } from "@apollo/client";
import React from "react";
import { GET_PROJECTS } from "../../queries/projectQueries";
import Spinner from "../Spinner";
import ProjectCrad from "../ProjectCard";

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Something went Wrong</p>;
  console.log(error);
  return (
    <>
      {data?.projects?.length > 0 ? (
        <div className="row mt-4">
          {data.projects.map((project) => (
            <ProjectCrad key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
}
