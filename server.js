const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const addedNotes = require('./bd/bd.json');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

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


app.get('/api/notes', (req, res)=> {
    res.json(addedNotes.slice(1));
});
app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/',(req, res)=>{
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.post('/api/notes', (req, res)=> {
    const addNote = newNote(req.body, addedNotes);
    res.json(addNote);
})

app.listen(PORT, ()=>{
    console.log(`API server now on port ${PORT}!`);
});