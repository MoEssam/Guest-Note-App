import React, { useState } from "react";
import axios from "axios";

function SendNote() {
  const [notes, setNotes] = useState("");

  const getNotes = async (e) => {
    e.preventDefault();
    const myStorage = window.localStorage;
    const userid = myStorage.getItem("userId");
    console.log(userid);
    const allNotes = await axios.get(`http://localhost:4000/notes/${userid}`);
    console.log(allNotes);
    setNotes(allNotes.data);
  };

  const sendNotes = async (e) => {
    e.preventDefault();
    const myStorage = window.localStorage;
    const userid = myStorage.getItem("userId");
    console.log(userid);
    const data = new FormData(e.currentTarget);
    console.log(data.get("noteto"));
    console.log(data.get("note").split(":")[0]);

    const noteData = {
      user_id_sent: userid,
      user_email_received: data.get("noteto"),
      note_id: data.get("note").split(":")[0],
    };

    const sendNote = await axios.post(
      "http://localhost:4000/send-note",
      noteData
    );
    console.log(sendNote);
  };

  return (
    <div>
      <h2>Sending Notes </h2>
      <form onSubmit={sendNotes}>
        <label className="label">Send note to </label>
        <input className="input" type="text" id="noteto" name="noteto" />

        <label className="label">select note</label>
        <select onClick={getNotes} id="note" name="note">
          {notes &&
            notes.map((note, index) => (
              <option key={index}>
                {note.id}: {note.title} says {note.message}
              </option>
            ))}
        </select>
        <ul onClick={getNotes} id="note" name="note">
          {notes &&
            notes.map((note) => (
              <li key={note.id}>
                {note.id}: {note.title} says {note.message}
              </li>
            ))}
        </ul>

        <button className="btn" type="submit">
          send note
        </button>
      </form>
    </div>
  );
}

export default SendNote;
