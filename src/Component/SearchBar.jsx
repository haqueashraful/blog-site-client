import { Button, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { Context } from '../Context/MyContext';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const {isChecked} = useContext(Context)

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
          className='!bg-white/60'
        />
        <InputRightAddon className='!bg-white/60'>
          <Button className={`!bg-transparent ${isChecked ? '!text-white' : '!text-black'}`}>Search</Button>
        </InputRightAddon>
      </InputGroup>
    </div>
  );
};

export default SearchBar;
