import React from "react";
import ToDo from "./components/ToDo";
import { useState, useEffect } from "react";
import "./index.css";
import { getAllToDo, addToDo, updateToDo, deleteToDo } from "./utils/HandleApi";

function App() {
  // State variables to manage the ToDo list and input text
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState("");

  // useEffect hook to fetch all ToDos when the app starts
  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  // Function to handle adding a new ToDo
  const handleAddToDo = () => {
    addToDo(text, setText, setToDo);
  };

  // Function to handle updating a ToDo
  const handleUpdateToDo = () => {
    updateToDo(updateId, text, setToDo, setText, setIsUpdating);
  };

  // Function to handle deleting a ToDo
  // Function to handle deleting a ToDo
  const handleDeleteToDo = (id) => {
    deleteToDo(id, setToDo);
  };

  // Function to set the text and ID when clicking update button
  const handleEditToDo = (id, text) => {
    setUpdateId(id);
    setText(text);
    setIsUpdating(true);
  };

  return (
    <div className="App">
      <div className="container">
        {/* App header */}
        <h1>TO DO</h1>

        <div className="top">
          {/* Input field for adding/updating new ToDos */}
          <input
            type="text"
            placeholder="Add/Update ToDos..."
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />

          {/* Conditional rendering for Add/Update button */}
          {isUpdating ? (
            <button className="add" onClick={handleUpdateToDo}>
              Update
            </button>
          ) : (
            <button className="add" onClick={handleAddToDo}>
              Add
            </button>
          )}
        </div>

        <div className="list">
          {/* Render each ToDo item */}
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => handleEditToDo(item._id, item.text)}
              deleteToDo={() => handleDeleteToDo(item._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
