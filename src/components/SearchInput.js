import React, { useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search products..."
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Search</button>
    </form>
  );
};

const styles = {
  form: {
    marginBottom: '20px', // Add margin bottom for spacing
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    width: '50%',
    padding: '8px',
    margin: '5px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
  },
  button: {
    padding: '8px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
  }
};

export default SearchInput;
