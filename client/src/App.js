import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./context/AuthContext";

import RoutesContainer from "./routes/Routes";
import { Suspense } from "react";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <RoutesContainer />
          </Suspense>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
