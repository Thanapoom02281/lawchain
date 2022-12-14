import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { EthProvider } from './contexts/EthContext';
import './App.css';
import Test from './components/Test/test';
import Home from './pages/Home';
import SearchLaw from './pages/SearchLaw';
import AddLaw from './pages/AddLaw';
import Judgement from './pages/Judgement';
import SearchJudgement from './pages/SearchJudgement';

const darkTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#021630'
        },
        secondary: {
            main: '#FF9C07'
        }
    }
});

function App() {
    return (
        <EthProvider>
            <ThemeProvider theme={darkTheme}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/searchlaw" element={<SearchLaw />} />
                    <Route path="/addlaw" element={<AddLaw />} />
                    <Route path="/judgement" element={<Judgement />} />
                    <Route path="/search-judgement" element={<SearchJudgement />} />
                </Routes>
                {/* <Test/> */}
                {/* <Home /> */}
            </ThemeProvider>
        </EthProvider>
    );
}

export default App;
