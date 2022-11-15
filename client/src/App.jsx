import { EthProvider } from "./contexts/EthContext";
import "./App.css";
import Test from "./components/Test/test";
import React from "react";

function App() {
    return (
        <EthProvider>
            <Test/>
        </EthProvider>
    );
}

export default App;
