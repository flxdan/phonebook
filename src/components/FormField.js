import React from 'react'

const FormField = (props) => {
    return (
      <>
      <h2>Add or Update Entries</h2>
        <form onSubmit = {props.addPerson}>
          <div>
            Name: <input required value={props.newName} onChange={props.handleNewPerson}/>
            <br></br>
            <br></br>
            Number: <input required value = {props.newNumber} onChange={props.handleNewNumber}/>
          </div>
          <br></br>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </>
    )
}

export default FormField