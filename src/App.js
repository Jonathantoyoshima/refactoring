import "./App.css";
import { statement, htmlStatement } from "./refactoring";

function App() {
  return (
    <div className="App">
      {statement()
        .split("\n")
        .map((text) => (
          <p key={text}>{text}</p>
        ))}

      {htmlStatement()}
    </div>
  );
}

export default App;
