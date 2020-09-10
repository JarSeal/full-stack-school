import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons';

const returnRequest = (request) => {
    return request.then(response => response.data);
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return returnRequest(request);
};

const create = (name, number) => {
    const request = axios.post(baseUrl, { name, number });
    return returnRequest(request);
};

const remove = (id) => {
    const request = axios.delete(baseUrl + "/" + id);
    return returnRequest(request);
};

const updateNumber = (person, newNumber) => {
    const updatedPerson = { ...person, number: newNumber };
    const request = axios.put(baseUrl + "/" + person.id, updatedPerson);
    return returnRequest(request);
};

export default { getAll, create, remove, updateNumber };