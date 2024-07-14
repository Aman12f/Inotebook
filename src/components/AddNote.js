import {React, useState} from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

const AddNote = () => {

    const {addNote} = useContext(NoteContext)
    const [note, setNote] = useState({title:"",description:"",tag:""})
    
  const onchange =(e)=>{
       setNote({...note,[e.target.name]:e.target.value})
  }
  const handleOnClick =(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
  }
  return (
   <>
   <div className="container w-65">
    
   <form>
    <h3>Add a Note</h3>
  <div className="form-group">
    <label for="title">Title</label>
    <input type="text" className="form-control" id="title" name="title" placeholder="title" aria-describedby="emailHelp" onChange={onchange}></input>
  </div>
  <div className="form-group">
    <label for="description">Description</label>
    <input type="text" className="form-control" id="description" name="description" placeholder="description" aria-describedby="emailHelp" onChange={onchange}></input>
  </div>
  <div className="form-group">
    <label for="tag">Tag</label>
    <input type='text' className="form-control" id="tag" name="tag" placeholder="tag" aria-describedby="emailHelp" onChange={onchange}></input>
  </div>
  <button type="button" className="btn btn-primary" onClick={handleOnClick}>AddNote</button>
</form>
   </div>
   </>
  )
}

export default AddNote
