import Home from "./pages/Home";
import "./App.css";
import Login from "./pages/Login";
const isAuthenticated = true;
function App() {
  if (isAuthenticated === true) {
    return (
          <Home />
    );
  }else{
    return(
      <Login />
    )
  }
    
  }

export default App;
