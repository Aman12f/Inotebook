import React from 'react'
import NoteItem from './NoteItem'
import { useContext,useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'
import AddNote from './AddNote'
import Modal from 'react-bootstrap/Modal';
import { useState,useRef } from 'react';
import Button from 'react-bootstrap/Button';

const Notes = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
const {notes_,fetchNotes,updateNotes} = useContext(NoteContext)
useEffect(() => {
    fetchNotes()
},[])
const ref = useRef(null)
const closeRef = useRef(null);
const updateNote =(note)=>{
  ref.current.click(); 
  setNote({ id: note._id, title: note.title, description: note.description, tag: note.tag });
}
const [note, setNote] = useState({id:"",title:"",description:"",tag:""})
const onchange =(e)=>{
   setNote({...note,[e.target.name]:e.target.value})
}
const handleOnclick=()=>{
   console.log("Updating the notes ");
   updateNotes(note.id,note.title,note.description,note.tag)
   closeRef.current.click()
}
  return (
    <>
    <Button variant="primary d-none" onClick={handleShow} ref={ref}>
        Launch static backdrop modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
    <form>
  <div className="form-group">
    <label htmlFor="title">Title</label>
    <input type="text" className="form-control" id="title" name="title" placeholder="title" value={note.title} aria-describedby="emailHelp" onChange={onchange}></input>
  </div>
  <div className="form-group">
    <label htmlFor="description">Title</label>
    <input type="text" className="form-control" id="description" name="description" placeholder="description" value={note.description} aria-describedby="emailHelp" onChange={onchange}></input>
  </div>
  <div className="form-group">
    <label htmlFor="tag">Tag</label>
    <input type='text' className="form-control" id="tag" name="tag" placeholder="tag" value={note.tag} aria-describedby="emailHelp" onChange={onchange}></input>
  </div>
</form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} ref={closeRef}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOnclick}>Update</Button>
        </Modal.Footer>
      </Modal>

      <AddNote></AddNote>
      <div className="row m-3">
       {
          notes_.map((note)=>{
              return  (<NoteItem key = {note._id} note={note} updateNote={updateNote}></NoteItem>)
            })
        }
        </div>
    </>
  )
}

export default Notes
