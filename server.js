const PORT = process.env.PORT || 3001;

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const addedNotes = require('./db/db.json');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

function newNotes(body, noteArray){
    const newNote = body;
if(!Array.isArray(noteArray))
   noteArray =[];
if(noteArray.length === 0)
   noteArray.push(0);
   body.id = noteArray[0];
   noteArray[0]++;

   noteArray.push(newNote);
   fs.writeFileSync(
       path.join(__dirname, './db/db.json'),
       JSON.stringify(noteArray, null, 2)
   );
   return newNote;
}

app.post('/api/notes', (req, res)=> {
    const newNote = newNotes(req.body, addedNotes);
    res.json(newNote);
})

app.get('/api/notes', (req, res)=> {
    res.json(addedNotes.slice(1));
});
app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.listen(PORT, ()=>{
    console.log(`API server now on port ${PORT}!`);
});