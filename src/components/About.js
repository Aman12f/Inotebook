import React from 'react'
import { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

const About = () => {
  const {state} = useContext(NoteContext)
  return (
    <div>
       {/* this is state {state.name},{state.id} */}
       Hii , this is about.
    </div>
  )
}

export default About
