// App.js
import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AppRoutes from "./AppRoutes";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      {" "}
      <div className="App">
        <header className="App-header">
          <AppRoutes />
        </header>
      </div>
    </Provider>
  );
}

export default App;
