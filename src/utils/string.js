
export const id = (input) =>
	input.trim().normalize("NFD").replace(/[^a-z0-9\-\s]/gi, '').replace(/\s{1,}/g, "-").toLowerCase()

export const createId = (length = 6) => {
	let output = []
	const characters = '0123456789abcdefghijklmnopqrstuvwxyz'

	for(let i = 0; i < length; ++i) {
		output.push(characters[Math.floor(characters.length * Math.random())])
	}

	return output.join('')
}
