import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import MainRoute from "./routers/MainRoute";


function App() {
  return (
    <Suspense fallback={<></>}>
      <BrowserRouter>
        <AuthProvider>
          <MainRoute />
        </AuthProvider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
