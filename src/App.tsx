import React from 'react';
import './App.css';
import { History } from './components/history';


const App: React.FC = () => {
    return (
        <div className="App">
            <History/>
            <History/>
        </div>
    );
}

export default App;
