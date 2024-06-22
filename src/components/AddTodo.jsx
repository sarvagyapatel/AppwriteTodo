// import React from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";
import { nanoid } from "nanoid";
import { useState } from "react";
import appwriteService from "../appwrite/config.js";

function AddTodo({ email, id }) {
  const [data, setData] = useState("");
  const dispatch = useDispatch();

  const createTodo = () => {
    
    appwriteService.getPost(id).then((res) => {
      // console.log(res)
      const userId = res.userId;
      const task = res.task;
      const done = res.done;

      userId.push(nanoid());
      task.push(data);
      done.push(false);

      const temp = {
        email,
        done,
        userId,
        task,
      };
      appwriteService.updatePost(id,temp).then((res)=>dispatch(addTodo(res)));
    });

  };

  return (
    <div className="w-full h-full">
      <div className="flex-row flex items-center justify-around  rounded-2xl bg-white ">
        <div className="float-left w-full">
          <input
            type="text"
            className="border-2 shadow-md  text-black text-lg rounded-lg p-2 w-full"
            placeholder="Enter Task"
            onChange={(e) => {
              e.preventDefault();
              setData(e.target.value);
            }}
          />
        </div>
        <div className="float-right p-4 w-44">
          <button
            type="submit"
            onClick={() => createTodo()}
            className="border-2 p-2 rounded-lg border-black shadow-md bg-black text-white text-lg font-semibold hover:bg-slate-700 hover:border-slate-700"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTodo;
