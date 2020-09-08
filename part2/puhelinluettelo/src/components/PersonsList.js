import React from 'react';

const sortObjectByKey = (a, b, key) => {
    const first = a[key].toUpperCase();
    const second = b[key].toUpperCase();
    let comparison = 0;
    if (first > second) {
        comparison = 1;
    } else if (first < second) {
        comparison = -1;
    }
    return comparison;
};

const PersonsList = ({persons, filterVal, loadingList, handleDelete}) => {
    let list = persons,
        value;
    if(filterVal.length) {
        value = filterVal.toLowerCase().trim();
        list = persons.filter(
            person => person.name.toLowerCase().includes(value)
        );
    }
    list.sort((a, b) => sortObjectByKey(a, b, 'name'));
    return <ul style={{listStyle:'none', padding:0}}>
        {list.length
            ? list.map((item) => <li key={"contact-item-" + item.id}>
                {item.name} {item.number}&nbsp;
                <button onClick={() => handleDelete(item.id, item.name)}>Delete</button>
              </li>)
            : <h4>{loadingList ? 'Loading...' : 'No contacts found!'}</h4>
        }
    </ul>;
};

export default PersonsList;
