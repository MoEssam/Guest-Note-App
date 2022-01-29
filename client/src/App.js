import Register from "./Components/Register";
import Login from "./Components/Login";
import Notes from "./Components/Notes";
import SendNote from "./Components/SendNote";
import AddNote from "./Components/AddNote";

function App() {
  return (
    <div>
      Hello Pentavalue
      <div>
        <Register />
      </div>
      <div>
        <Login />
      </div>
      <div>
        <Notes />
      </div>
      <div>
        <SendNote />
      </div>
      <div>
        <AddNote />
      </div>
    </div>
  );
}

export default App;
