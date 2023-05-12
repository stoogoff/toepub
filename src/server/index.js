
const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const pandoc = require('node-pandoc')
const { id, createId } = require('we-ui/utils/string')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
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

app.post('/upload', verifyAuthHeaderMiddleware, async (req, res, next) => {
	if(!req.files) {
		return next({ status: 400, message: 'No files provided.' })
	}

	// acceptable header fields
	const headerFields = ['title', 'author', 'rights', 'date', 'publisher']
	const header = ['---']

	headerFields.forEach(field => {
		if(field in req.body) {
			header.push(`${field}: ${req.body[field]}`) // TODO sanitise
		}
	})

	header.push('...')

	const title = id(req.body.title || 'test')
	const contents = [header.join('\n')]
console.log(header)
	Object.keys(req.files).forEach(key => {
		contents.push(Buffer.from(req.files[key].data).toString())
	})

	const dirPath = path.join(__dirname, 'output', createId())
	const filePath = path.join(dirPath, `${title}.epub`)

	fs.mkdirSync(dirPath)


	pandoc(contents.join('\n\n'), `-f markdown -t epub -o ${filePath}`, (err, result) => {
		if(err) {
			return next({ status: 500, message: `Failed to convert: ${err}` })
		}

		const data = fs.readFileSync(filePath)

		res.set('Content-Type', 'application/epub+zip')
		res.set('Content-Disposition', `attachment; filename="${title}.epub"`)
		res.status(200).send(data)
	})
})

// error handler
app.use((err, req, res, next) => {
	res.setHeader('Content-Type', 'application/json')
	res.status(err.status).send(err)
})

module.exports = {
	path: '/api', handler: app
}
