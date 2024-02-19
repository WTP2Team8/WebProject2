import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
    const [term, setTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/search/${term}`);
        setTerm(''); // Resetting the search term to empty string
    };

    return (
        <form onSubmit={handleSubmit} style={{ justifyContent: 'center'}}>
            <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search posts..."
                style={{ marginRight: '10px', marginTop: '20px'}}
            />
            <button type="submit">Search</button>
        </form>
    );
}