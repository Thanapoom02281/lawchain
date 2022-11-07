import { EthProvider } from "./contexts/EthContext";
import "./App.css";
import Test from "./components/Test/test";

function App() {
  return (
    <EthProvider>
      <div id="App" >
        <div className="container">
          <Test/>
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
