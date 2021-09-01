import React from 'react'

const PeopleList = (props) => {
    let people = props.people;
  
    if (props.search !== '') {
        people = props.people.filter(note => note.name.toLowerCase().includes(props.search.toLowerCase()));
    }
  
    const content = people.map((person , index) => 
      <div key = {index} className='personsList'>
        <span>{person.name} {person.phone} </span>
        <button key = {person.id} onClick = {() => props.remove(person.id, person.name)}>delete</button>
      </div>
    );
  
    return (
      <>
        <h2>Numbers</h2>
        {content}
      </>
    )
  }

export default PeopleList