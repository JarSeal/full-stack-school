import React from 'react';
import { connect } from 'react-redux';
import { filterChange, clearFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  const filter = props.filter;

  const handleFilter = (value) => {
    props.filterChange(value);
  };

  return (
    <div className='filter' style={{marginBottom: '10px'}}>
      <input
        type='text'
        name='filterInput'
        value={filter}
        placeholder='Filter'
        onChange={({ target }) => handleFilter(target.value)} />
      {filter.trim().length !== 0 && <button onClick={() => props.clearFilter()}>x</button>}
    </div>
  );
};

const mapDispatchToProps = {
  filterChange,
  clearFilter
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
export default ConnectedFilter;