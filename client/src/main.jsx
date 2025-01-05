// Importing required libraries
import { createRoot } from "react-dom/client"; // To render the React app
import "./index.css"; // Importing the main CSS file for styling
import App from "./App.jsx"; // Importing the main App component
import { BrowserRouter } from "react-router-dom"; // Importing BrowserRouter for routing
import { Provider } from "react-redux"; // Importing Provider to integrate Redux with the app
import store from "./store/store"; // Importing the Redux store

// Rendering the React app inside the root div
createRoot(document.getElementById("root")).render(
  // Wrapping the app with BrowserRouter to enable routing
  <BrowserRouter>
    {/* Wrapping the app with Provider to make Redux store available to the entire app */}
    <Provider store={store}>
      <App /> {/* The main App component */}
    </Provider>
  </BrowserRouter>
);
