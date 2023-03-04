
const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const pandoc = require('node-pandoc')
//const { getTodosForUser, saveTodoForUser, updateTodoForUser } = require('./todo')

const app = express()

app.use(bodyParser.json())
app.use(fileUpload())

// ----------
// MIDDLEWARE

// check for an auth header
const verifyAuthHeaderMiddleware = async (req, res, next) => {
	if(!('authorization' in req.headers)) {
		return next({ status: 400, message: 'Bad request: No authorization header found.' })
	}

	res.locals.userToken = req.headers.authorization.replace('Bearer ', '')

	next()
}


// ------
// ROUTES

// check it works
app.get('/hello', (req, res) => res.send('Hello'))


// todo routes
/*app.get('/todos', verifyAuthHeaderMiddleware, (req, res) => {
	const todos = getTodosForUser(res.locals.userToken)

	res.json(todos)
})

app.post('/todos', verifyAuthHeaderMiddleware, (req, res, next) => {
	try {
		saveTodoForUser(res.locals.userToken, req.body)

		res.status(201).send()
	}
	catch(ex) {
		next({ status: 400, message: ex })
	}
})

app.put('/todos/:id', verifyAuthHeaderMiddleware, (req, res, next) => {
	try {
		updateTodoForUser(res.locals.userToken, req.params.id, req.body)

		res.status(204).send()
	}
	catch(ex) {
		next({ status: 400, message: ex })
	}
})*/

app.post('/upload', verifyAuthHeaderMiddleware, async (req, res, next) => {
	if(!req.files) {
		return next({ status: 400, message: 'No files provided.' })
	}

	const contents = []

	Object.keys(req.files).forEach(key => {
		contents.push(Buffer.from(req.files[key].data).toString())
	})

	//console.log(contents)

	pandoc(contents.join('\n\n'), '-f markdown -t epub', (err, result) => {
		if(err) {
			console.error(err)
			return next({ status: 500, message: `Failed to convert: ${err}` })
		}

		//console.log(result)

		res.set('Content-Type', 'application/epub+zip')
		res.status(200).send(Buffer.from(result))
	})

	//res.status(200).send('Received')
})

// error handler
app.use((err, req, res, next) => {
	res.setHeader('Content-Type', 'application/json')
	res.status(err.status).send(err)
})

module.exports = {
	path: '/api', handler: app
}
