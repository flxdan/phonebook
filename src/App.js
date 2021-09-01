import React, { useState, useEffect} from 'react';
import serviceTool from './services/persons';
import PeopleList from './components/PeopleList'
import SearchField from './components/SearchField';
import FormField from './components/FormField';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const  [search, setSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState()

  useEffect(() => {
    serviceTool.getAll().then(response => setPersons(response))
  }, [])

  const handleNewPerson = (event) => {
    setNewName(event.target.value);
  }

  const handleNewNumber= (event) => {
    setNewNumber(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      phone: newNumber
    }
    
    let taken = false;
    persons.forEach((person) => {
      if (person.name === newName) {
        if (window.confirm(`Update ${person.name} ?`)) {
          serviceTool.updatePerson(person.id, newPerson)
          .then((returnedPerson) => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson));
            showMessage(`Updated ${person.name}`)
          })
          .catch(error => {
            showMessage(error.response.data.error)
          })
        } 
        taken = true;
      }
    })

    if (!taken) {
      serviceTool.addPerson(newPerson)
      .then(res => {
        setPersons(persons.concat(res));
        setNewName("");
        setNewNumber("");
        showMessage(`Added ${res.name}`)
      })
      .catch(error => {
        showMessage(error.response.data.error)
      })
    }
  }

  const showMessage = (messsage) => {
    setErrorMessage(messsage);
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }
  
  const handleSearch = (event) => {
    setSearch(event.target.value);
  }

  const handleDelete = (id_num, person) => {
    if (window.confirm(`Delete ${person} ?`)) {
      serviceTool.removePerson(id_num).then((res) => {
        setPersons(persons.filter(n => n.id !== id_num));
        showMessage(`Deleted ${person}`)
      }) 
    }
  }

  return (
    <div className='main-container'>
      <h1>Phonebook</h1>
      <Notification message={errorMessage} />
      <SearchField handleSearch = {handleSearch}/>
      <FormField
        addPerson = {addPerson}
        newName = {newName}
        newNumber = {newNumber}
        handleNewPerson = {handleNewPerson}
        handleNewNumber = {handleNewNumber}
      />
      <PeopleList people = {persons} search = {search} remove = {handleDelete}></PeopleList>
    </div>
  )
}

export default App;