import axios from 'axios';

const baseUrl = 'https://nameless-sands-07409.herokuapp.com/api/persons';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const addPerson = (newPerson) => {
    const request = axios.post(baseUrl, newPerson);
    return request.then(res => res.data);
}

const removePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(res => res.data);
}

const updatePerson = (id, person) => {
    const request = axios.put(`${baseUrl}/${id}`, person);
    return request.then(res => res.data);
}

const serviceTool = {
    getAll,
    addPerson,
    removePerson,
    updatePerson
}

export default serviceTool;