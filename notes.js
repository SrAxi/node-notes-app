// Imports
const fs = require('fs')
const chalk = require('chalk')

// Constants
const NOTES_FILE = 'notes.json'

// Endpoints
const addNote = (title, body) => {
    const notes = loadNotes()
    const isDuplicatedTitle = !!notes.find(({ title: noteTitle }) => title === noteTitle)

    if (isDuplicatedTitle) {
        console.log(chalk.red.bold('Duplicated title!'))
    } else {
        notes.push({ title, body })
        saveNotes(notes)
        console.log(chalk.green.bold('Note saved successfuly!'))
    }
}

const removeNote = title => {
    const notes = loadNotes()
    const foundNote = notes.find(({ title: noteTitle }) => title === noteTitle)

    if (!!foundNote) {
        const filteredNotes = notes.filter(({ title: noteTitle }) => title !== noteTitle)
        saveNotes(filteredNotes)
        console.log(chalk.green.bold('Note removed successfuly!'))
    } else {
        console.log(chalk.blue.bold(`Couldn't find note with that title`))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    if (notes.length > 0) {
        console.log(chalk.blue.bgWhite.bold('\nYour Notes:\n'))
        notes.forEach(({ title, body }, idx) => console.log(chalk.blue.bold(`${++idx}. ${title} -> ${body}`)))
        console.log('\n')
    } else {
        console.log(chalk.redBright.bold('Notes list empty :('))
    }
}

const readNote = title => {
    const notes = loadNotes()
    const foundNote = notes.find(({ title: noteTitle }) => title === noteTitle)

    if (foundNote) {
        console.log(`${chalk.blue.bold(foundNote.title)} -> ${foundNote.body}`)
    } else {
        console.log(chalk.redBright.bold('Sorry! Note not found!'))
    }
}


// Helpers
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes, null, 2)
    fs.writeFileSync(NOTES_FILE, dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(NOTES_FILE)
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}


// Export
module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote,
}
