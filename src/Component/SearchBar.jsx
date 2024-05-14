import { Button, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    const searchValue = value.toLowerCase();
    setSearch(searchValue);
    onSearch(searchValue);
  };

  return (
    <div>
      <InputGroup>
        <Input
          w={64}
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={handleChange}
        />
        <InputRightAddon>
          <Button>Search</Button>
        </InputRightAddon>
      </InputGroup>
    </div>
  );
};

export default SearchBar;
