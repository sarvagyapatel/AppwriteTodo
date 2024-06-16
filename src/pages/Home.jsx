import AddTodo from "../components/AddTodo";
import Todos from "../components/Todos";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../store/todoSlice";
import appwriteService from "../appwrite/config";
import { useEffect, useState } from "react";
import authService from "../appwrite/auth";

function Home() {
  const [email, setEmail] = useState("");
  const [id, setid] = useState("");
  const dispatch = useDispatch();
  const [check , setCheck] = useState(true);
  const [newData, setNewData] = useState();
  const [allData, setAllData] = useState({});
  const [name, setName] = useState("Null");
  
  useEffect(() => {
    authService.getCurrentUser().then((res) => {
      setEmail(res.email);
      // console.log(res);
      setName(res.name);
      appwriteService.getPosts(res.email).then((newPosts) => {
        // console.log(newPosts)
        dispatch(addTodo(newPosts.documents[0]))
        setAllData(newPosts.documents[0]);  //don't kow why newPosts.documents[0] is not adding in allData
        // console.log(newPosts.documents[0])    //this prints value 
        // console.log(allData)  // but this is always empty because due to the synchronous nature of the state updates in react it won't be updated immediately
        setNewData(newPosts.documents[0].task)
        setid(newPosts.documents[0].$id);
      });
    });  
  }, [check]);

  const temp = useSelector((state) => state.todo);
  useEffect(() => {
    console.log(temp);
    if(temp){
    setNewData(temp.task);
    setAllData(temp);
    }
    // console.log(newData)
    console.log(temp)
    setCheck(false)
  }, [temp])

  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full h-full">
      <div className="mt-7 ">
        <h1 className="text-gray-700 underline font-semibold text-2xl">{`Welcome ${name}`}</h1>
      </div>
      <AddTodo email={email} id={id} />

      {newData
        ? newData.map((task, index) => (
            <Todos
              key={allData.userId[index]}
              id={index}
              allData={allData}
            />
          ))
        : null}
    </div>
  );
}

export default Home;