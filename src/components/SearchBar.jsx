import { useState } from 'react';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <li id = "search-bar" className="nav-item">
            <input
                type="text"
                placeholder="Търсене..."
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
        </li>
    );
}