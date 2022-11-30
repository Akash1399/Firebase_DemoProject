import logo from "./logo.svg";
import "./App.css";
import { useFirebase } from "./firebase/config";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ManagerHome from "./pages/ManagerHome";
import Routing from "./Routing";
function App() {
  return (
    <div className="App">
      {/* <SignUp /> */}
      <Routing />
      {/* <ManagerHome /> */}
      {/* <SignUpManager /> */}
      {/* <SignIn /> */}
    </div>
  );
}

export default App;
