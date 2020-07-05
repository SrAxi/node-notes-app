const chalk = require('chalk')
const yargs = require('yargs')

const notes = require('./notes.js')

/**
 * Create Add command
 *
 * Example: `node .\app.js add --title="pokemon" --body="pikachu"`
 */
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string',
        },
    },
    handler: (argv) => notes.addNote(argv.title, argv.body)
})

/**
 * Create Remove command
 *
 * Example: `node .\app.js remove --title="pokemon"`
 */
yargs.command({
    command: 'remove',
    describe: 'Removes a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler: (argv) => notes.removeNote(argv.title)
})

/**
 * Create List command
 *
 * Example: `node .\app.js list`
 */
yargs.command({
    command: 'list',
    describe: 'List all the notes',
    handler: () => notes.listNotes()
})

/**
 * Create Read command
 *
 * Example: `node .\app.js read --title="pokemon"`
 */
yargs.command({
    command: 'read',
    describe: 'Read a given note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string',
        },
    },
    handler: (argv) => notes.readNote(argv.title)
})

yargs.parse()



