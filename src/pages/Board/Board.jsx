import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { FaFlag } from "react-icons/fa";
import Column from "../Column/Column";
const Board = () => {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [backlog, setBacklog] = useState([]);
  const [inReview, setInReview] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        setCompleted(json.filter((task) => task.completed));
        setIncomplete(json.filter((task) => !task.completed));
      });
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    deletePreviousState(source.droppableId, draggableId);

    const task = findItemById(draggableId, [
      ...incomplete,
      ...completed,
      ...inReview,
      ...backlog,
    ]);

    setNewState(destination.droppableId, task);
  };

  function deletePreviousState(sourceDroppableId, taskId) {
    switch (sourceDroppableId) {
      case "1":
        setIncomplete(removeItemById(taskId, incomplete));
        break;
      case "2":
        setCompleted(removeItemById(taskId, completed));
        break;
      case "3":
        setInReview(removeItemById(taskId, inReview));
        break;
      case "4":
        setBacklog(removeItemById(taskId, backlog));
        break;
    }
  }
  function setNewState(destinationDroppableId, task) {
    let updatedTask;
    switch (destinationDroppableId) {
      case "1": // TO DO
        updatedTask = { ...task, completed: false };
        setIncomplete([updatedTask, ...incomplete]);
        break;
      case "2": // DONE
        updatedTask = { ...task, completed: true };
        setCompleted([updatedTask, ...completed]);
        break;
      case "3": // IN REVIEW
        updatedTask = { ...task, completed: false };
        setInReview([updatedTask, ...inReview]);
        break;
      case "4": // BACKLOG
        updatedTask = { ...task, completed: false };
        setBacklog([updatedTask, ...backlog]);
        break;
    }
  }
  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <button
        className="btn btn-wide mt-4"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Todo Add Task
      </button>
      <dialog id="my_modal_3" className="modal ">
        <div className=" bg-white p-4 shadow-lg lg:w-[550px] w-full">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle float-right right-2 top-2 ">
              ✕
            </button>
          </form>

          <label className="label">
            <span className="label-title">Enter Title</span>
          </label>
          <input
            type="text"
            placeholder="Enter title"
            className="input input-bordered input-warning w-full"
            required
          />
          <label className="label">
            <span className="label-title">Enter description</span>
          </label>
          <textarea
            className="textarea input-bordered input-warning w-full"
            placeholder="description"
          ></textarea>
          <div className="grid grid-cols-12 gap-4 m-0 p-0 lg:h-[100px] flex-wrap">
            <div className="lg:col-span-4 col-span-12">
              <label className="label">
                <span className="label-title">Deadline </span>
              </label>
              <input
                type="date"
                className="input input-bordered input-warning w-full"
              />
            </div>
            <div className="lg:col-span-4 col-span-12">
              <div className="mt-10">
                <ul className="menu lg:menu-horizontal bg-base-200 rounded-box lg:mb-64">
                  <li>
                    <details className="p-0 m-0">
                      <summary className="text-base font-normal ">
                        Priority level
                      </summary>

                      <ul>
                        <li>
                          <a>
                            {" "}
                            <FaFlag className="text-base text-red-600 " />{" "}
                            Urgent
                          </a>
                        </li>
                        <li>
                          <a>
                            {" "}
                            <FaFlag className="text-base text-yellow-600 " />{" "}
                            High
                          </a>
                        </li>
                        <li>
                          <a>
                            {" "}
                            <FaFlag className="text-base text-green-600 " />{" "}
                            Normal
                          </a>
                        </li>
                        <li>
                          <a>
                            {" "}
                            <FaFlag className="text-base text-gray-600 " /> Low
                          </a>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:col-span-4 col-span-12">
              <div className="mt-10">
                <ul className="menu lg:menu-horizontal bg-base-200 rounded-box lg:mb-64">
                  <li>
                    <details className="p-0 m-0">
                      <summary className="text-base font-normal ">
                        Assign Task
                      </summary>

                      <ul>
                        <li>
                          <a>
                            {" "}
                            <FaFlag className="text-base text-red-600 " />{" "}
                            Urgent
                          </a>
                        </li>
                        <li>
                          <a>
                            {" "}
                            <FaFlag className="text-base text-yellow-600 " />{" "}
                            High
                          </a>
                        </li>
                        <li>
                          <a>
                            {" "}
                            <FaFlag className="text-base text-green-600 " />{" "}
                            Normal
                          </a>
                        </li>
                        <li>
                          <a>
                            {" "}
                            <FaFlag className="text-base text-gray-600 " /> Low
                          </a>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Submit</button>
          </div>
        </div>
      </dialog>
      <h2 className="text-center text-2xl py-2">PROGRESS BOARD</h2>

      <div className="flex justify-between items-center flex-row  w-full lg:w-[1280px] m-auto">
        <Column title={"TO DO"} tasks={incomplete} id={"1"} />
        <Column title={"DONE"} tasks={completed} id={"2"} />
        <Column title={"IN REVIEW"} tasks={inReview} id={"3"} />
        <Column title={"Completed"} tasks={backlog} id={"4"} />
      </div>
    </DragDropContext>
  );
};

export default Board;