// App.js
import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store"; // Assure-toi que le store est bien importé
import AppRoutes from "./AppRoutes"; // Routes de ton application
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      {" "}
      {/* Le Provider enveloppe le Router */}
      <div className="App">
        <header className="App-header">
          <AppRoutes />
        </header>
      </div>
    </Provider>
  );
}

export default App;
