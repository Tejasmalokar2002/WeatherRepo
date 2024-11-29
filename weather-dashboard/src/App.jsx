import React, { useState } from 'react';
import Weather from './components/Weather';

function App() {
    const [city, setCity] = useState('');

    const handleSearch = (e) => {
        setCity(e.target.value);
    };

    return (
        <div className="App" style={{ textAlign: 'center', padding: '20px' }}>
            
            <Weather city={city} />
        </div>
    );
}

export default App;
