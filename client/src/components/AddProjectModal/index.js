import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ADD_PROJECT } from "../../mutations/projectMutations";
import { GET_PROJECTS } from "../../queries/projectQueries";
import { FaList } from "react-icons/fa";
import { GET_CLIENT } from "../../queries/clientQueries";
import Spinner from "../Spinner";

export default function AddProjectModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("new");
  const [clientId, setClientID] = useState("");

  const { loading, error, data } = useQuery(GET_CLIENT);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, status, clientId },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({
        query: GET_PROJECTS,
      });
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || description === "" || clientId === "")
      return alert("please fill in all data");

    addProject(name, description, status, clientId);

    setName("");
    setDescription("");
    setClientID("");
    setStatus("new");
  };

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong.</p>;

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              Add Project
            </div>
          </button>

          <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="addProjectModalLabel">
                    New Project
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e?.target?.value)}
                      ></input>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e?.target?.value)}
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        className="form-control"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e?.target?.value)}
                      >
                        <option value={"new"}>Not Started</option>
                        <option value={"progress"}>Progress</option>
                        <option value={"completed"}>Completed</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        className="form-control"
                        id="client"
                        value={clientId}
                        onChange={(e) => setClientID(e?.target?.value)}
                      >
                        <option value={""}>Select Client</option>
                        {data.clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      className="btn btn-primary"
                      type="submit"
                      data-bs-dismiss="modal"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
