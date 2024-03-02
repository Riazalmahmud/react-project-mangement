import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { FaFlag } from "react-icons/fa";
import Column from "../Column/Column";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const Board = () => {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [backlog, setBacklog] = useState([]);
  const [allTask, setAllTask] = useState([]);
  const [inReview, setInReview] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "",
    assignedTask: "",
    status: "todo",
    statusStag: 1,
  });
  const [dialogClose, setDialog] = useState(true);
  useEffect(() => {
    fetchTaskData()
  }, []);

const fetchTaskData = ()=>{
  fetch("https://project-management-api-lyart.vercel.app/api/v1/task")
  .then((response) => response.json())
  .then((json) => {
    const updatedData = json.data.map((task, index) => ({
      ...task,
      id: index + 1,
    }));
    setAllTask(updatedData);
    setIncomplete(updatedData.filter((task) => task.statusStag === 1));
    setInReview(updatedData.filter((task) => task.statusStag === 2));
    setCompleted(updatedData.filter((task) => task.statusStag === 3));
    setBacklog(updatedData.filter((task) => task.statusStag === 4));
  });
}

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    deletePreviousState(source.droppableId, draggableId,result.destination.droppableId);

    const task = findItemById(draggableId, [
      ...incomplete,
      ...completed,
      ...inReview,
      ...backlog,
    ]);

    setNewState(destination.droppableId, task);
  };

  function deletePreviousState(sourceDroppableId, taskId, destinationDroppableId) {
    switch (sourceDroppableId) {
      case "1":
        setIncomplete(removeItemById(taskId, incomplete, destinationDroppableId));

        break;
      case "2":
        setCompleted(removeItemById(taskId, completed, destinationDroppableId));
        break;
      case "3":
        setInReview(removeItemById(taskId, inReview, destinationDroppableId));
        break;
      case "4":
        setBacklog(removeItemById(taskId, backlog, destinationDroppableId));
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
        console.log(backlog);
        break;
    }
  }
  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  const updatateData = (id, stageId) => {
    const stageIdNum = Number (stageId)
    const dataFilter = allTask.filter((task) => task.id == id);
    dataFilter[0].statusStag = stageIdNum;
    const data = dataFilter[0]
  
    axios
      .put(
        `https://project-management-api-lyart.vercel.app/api/v1/task/${dataFilter[0]._id}`,
        dataFilter[0]
      )
      .then((response) => {
        toast(response.data.message);
        fetchTaskData()
      })
      .catch((error) => {
        console.error("Error during PUT request:", error);
        toast.error(error.response.data.massage);
      });
  };

  function removeItemById(id, array, stage) {
    if (stage == 1) {
      updatateData(id, stage);
    } else if (stage == 2) {
      updatateData(id, stage);
    } else if (stage == 3) {
      updatateData(id, stage);
    } else if (stage == 4) {
      updatateData(id, stage);
    }
    return array.filter((item) => item.id != id);
  }



/* -----------------------create task ----------------------- */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send POST request to your server
      const response = await axios.post(
        "https://project-management-api-lyart.vercel.app/api/v1/task",
        formData
      );
      if (response.data.status === true) {
        toast(response.data.message);
        // Reset form after successful submission
        setFormData(response.data);
        setDialog(false);
        fetchTaskData()
      }

      // Close the dialog or perform any other action
    } catch (error) {
      toast.error(error.response.data.massage);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ToastContainer />
      <button
        className="btn btn-wide mt-4"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        Todo Add Task
      </button>
      {dialogClose && (
        <dialog id="my_modal_3" className="modal ">
          <div className="bg-white p-4 shadow-lg lg:w-[550px] w-full">
            <form onSubmit={handleSubmit}>
              {/* Close button */}
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle float-right right-2 top-2 ">
                  ✕
                </button>
              </form>

              {/* Title input */}
              <label className="label">
                <span className="label-title">Enter Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter title"
                className="input input-bordered input-warning w-full"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              {/* Description input */}
              <label className="label">
                <span className="label-title">Enter description</span>
              </label>
              <textarea
                className="textarea input-bordered input-warning w-full"
                placeholder="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>

              {/* Deadline input */}
              <div className="lg:col-span-4 col-span-12">
                <label className="label">
                  <span className="label-title">Deadline </span>
                </label>
                <input
                  type="date"
                  className="input input-bordered input-warning w-full"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                />
              </div>

              {/* Priority level dropdown */}
              <div className="mt-10">
                <label className="text-base font-normal">Priority level</label>
                <select
                  className="input input-bordered input-warning w-full"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* Assigned task dropdown */}
              <div className="mt-10">
                <label className="text-base font-normal">Assign Task</label>
                <select
                  className="input input-bordered input-warning w-full"
                  name="assignedTask"
                  value={formData.assignedTask}
                  onChange={handleChange}
                >
                  <option value="65e14fffa3844a1b85d54a1d">Urgent</option>
                  <option value="65e14fffa3844a1b85d54a1d">High</option>
                  <option value="65e14fffa3844a1b85d54a1d">Normal</option>
                  <option value="65e14fffa3844a1b85d54a1d">Low</option>
                </select>
              </div>

              {/* Submit button */}
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
      <h2 className="text-center text-2xl py-2">PROGRESS BOARD</h2>

      <div className="flex justify-between items-center flex-row  w-full lg:w-[1280px] m-auto">
        <Column title={"TO DO"} tasks={incomplete} id={"1"} />
        <Column title={"IN REVIEW"} tasks={inReview} id={"2"} />
        <Column title={"DONE"} tasks={completed} id={"3"} />
        <Column title={"Completed"} tasks={backlog} id={"4"} />
      </div>
    </DragDropContext>
  );
};

export default Board;