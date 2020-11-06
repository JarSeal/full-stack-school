import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterChange, clearFilter } from '../reducers/filterReducer';

const Filter = () => {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleFilter = (value) => {
    dispatch(filterChange(value));
  };

  return (
    <div className='filter' style={{marginBottom: '10px'}}>
      <input
        type='text'
        name='filterInput'
        value={filter}
        placeholder='Filter'
        onChange={({ target }) => handleFilter(target.value)} />
      {filter.trim().length !== 0 && <button onClick={() => dispatch(clearFilter())}>x</button>}
    </div>
  );
};

export default Filter;