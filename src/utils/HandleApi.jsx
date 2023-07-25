import axios from "axios";

// Define the base URL for the API requests
const baseUrl = "https://to-do-app-backend-j6yq.onrender.com/"

// Function to fetch all ToDo items from the server
const getAllToDo = async (setToDo) => {
  try {
    // Make a GET request to the API endpoint for fetching all ToDos
    const response = await axios.get(`${baseUrl}/home`);
    // Extract the data from the response
    const data = response.data;
    // Update the state with the fetched ToDo items
    setToDo(data);
  } catch (error) {
    // Log any errors that occurred during the API request
    console.error('Error fetching ToDos:', error);
  }
};

// Function to add a new ToDo item to the server
const addToDo = async (text, setText, setToDo) => {
  try {
    // Make a POST request to the API endpoint for adding a new ToDo
    const response = await axios.post(`${baseUrl}/save`, { text });
    // Log the response data for debugging purposes
    console.log(response.data);
    // Clear the text input field after successfully adding the ToDo
    setText("");
    // Fetch all ToDo items again to update the state with the latest data
    await getAllToDo(setToDo);
  } catch (error) {
    // Log any errors that occurred during the API request
    console.log(error);
  }
};

// Function to update a ToDo item on the server
const updateToDo = async (_id, text, setToDo, setText, setIsUpdating) => {
  try {
    // Make a PUT request to the API endpoint for updating a ToDo
    const response = await axios.put(`${baseUrl}/update`, { _id, text });
    // Log the response data for debugging purposes
    console.log(response.data);
    // Clear the text input field after successfully updating the ToDo
    setText("");
    // Set isUpdating back to false after the update is done
    setIsUpdating(false);
    // Fetch all ToDo items again to update the state with the latest data
    await getAllToDo(setToDo);
  } catch (error) {
    // Log any errors that occurred during the API request
    console.log(error);
  }
};

// Function to delete a ToDo item from the server
const deleteToDo = async (_id, setToDo) => {
  try {
    // Make a DELETE request to the API endpoint for deleting a ToDo
    const response = await axios.delete(`${baseUrl}/delete`, { data: { _id } });
    // Log the response data for debugging purposes
    console.log(response.data);
    // Fetch all ToDo items again to update the state with the latest data
    await getAllToDo(setToDo);
  } catch (error) {
    // Log any errors that occurred during the API request
    console.log(error);
  }
};

// Export the functions to use them in other parts of the application
export { getAllToDo, addToDo, updateToDo, deleteToDo };
