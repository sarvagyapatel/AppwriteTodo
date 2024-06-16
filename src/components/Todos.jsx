// import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";
import appwriteService from "../appwrite/config";

function Todos({ id, allData }) {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState(allData.task[id]);
  const [isEditing, setIsEditing] = useState(true);
  const email = allData.email;
  const documentId = allData.$id;

  const remove = () => {
    let userId = [...allData.userId];
    let task = [...allData.task];

    userId.splice(id, 1);
    task.splice(id, 1);
    const temp = {
      email,
      userId,
      task,
    };
    appwriteService.updatePost(documentId, temp).then((res) => {
      dispatch(addTodo(res));
      console.log(res);
    });
  };

  const update = () => {
    let userId = [...allData.userId];
    let task = [...allData.task];
    task[id] = newTask;
    const temp = {
      email,
      userId,
      task,
    };
    console.log(documentId);
    appwriteService.updatePost(documentId, temp).then((res) => {
      dispatch(addTodo(res));
    });
  };

  const changeColor = ()=>{
    let userId = [...allData.userId];
    let task = [...allData.task];
    let done = [...allData.done];
    done[id] = !done[id];
    // task[id] = newTask;
    const temp = {
      done,
      email,
      userId,
      task,
    };
    console.log(documentId);
    appwriteService.updatePost(documentId, temp).then((res) => {
      dispatch(addTodo(res));
    });
  }

  return (
    <div className="w-full h-full ">
      <div className="flex-row flex items-center justify-around rounded-2xl bg-white ">
      <div className="pe-px">
        <button
          type="submit"
          onClick={() => changeColor()}
          className="border-2 p-2 shadow-md rounded-lg  border-green-700  bg-green-700 text-white text-lg font-semibold hover:bg-green-900 hover:border-green-900"
        >
          {allData.done[id]?"UnMark":"MarkDone"}
        </button>
        </div>
        <div className="float-left w-full">
          <input
            type="text"
            className={`border-2 shadow-md ${allData.done[id]?"bg-green-700":"bg-white"} text-black text-lg rounded-lg p-2 w-full`}
            value={newTask}
            readOnly={isEditing}
            onChange={(e) => {
              e.preventDefault();
              setNewTask(e.target.value);
            }}
          />
        </div>
        <div className="float-right px-4 flex flex-row gap-1 items-center justify-center">
          <button
            type="submit"
            onClick={() => remove()}
            className="border-2 p-2 shadow-md rounded-lg border-red-700  bg-red-700 text-white text-lg font-semibold hover:bg-red-900 hover:border-red-900"
          >
            Delete
          </button>
          <button
            type="submit"
            onClick={() => {
              if (isEditing) {
                setIsEditing(false);
              } else {
                setIsEditing(true);
                update();
              }
            }}
            className="border-2 p-2 shadow-md rounded-lg border-blue-700  bg-blue-700 text-white text-lg font-semibold hover:bg-blue-900 hover:border-blue-900"
          >
            {isEditing ? "Edit" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todos;
