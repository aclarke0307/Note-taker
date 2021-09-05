const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const addedNotes = require('./bd/bd.json');

function newNote(body, noteArray){
    const addNote = body;
if(!Array.isArray(noteArray))
   noteArray =[];

   noteArray.push(addNote);
   fs.writeFileSync(
       path.join(__dirname, './db/db.json'),
       JSON.stringify(noteArray, null, 2)
   );
   return addNote;
}

app.post('/api/notes', (req, res)=> {
    const addNote = newNote(req.body, addedNotes);
    res.json(addNote);
})












app.listen(PORT, ()=>{
    console.log(`API server now on port ${PORT}!`);
});