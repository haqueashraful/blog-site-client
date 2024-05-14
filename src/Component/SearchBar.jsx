import { Button, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import  { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    e.preventDefault()
    const value = e.target.value;
    const searctValue = value.toLowerCase() 
    setSearch(searctValue);
    onSearch(value);
  };

  return (
  <div>
    <InputGroup>
    <Input
    w={64}
      type="text" 
      placeholder="Search by title" 
      onChange={handleChange} 
    />
    <InputRightAddon> <Button>Search</Button> </InputRightAddon>
    </InputGroup>
  </div>
  );
};

export default SearchBar;
