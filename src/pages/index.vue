<template>
	<section class="mx-auto w-2/3">
		<loading-overlay v-if="loading" />
		<div class="grid grid-cols-3 gap-4 mb-6">
			<div class="instruction"><span>1</span>Select the files you want to convert to EPUB format.</div>
			<div class="instruction"><span>2</span>Enter the title, author name and other information for your book.</div>
			<div class="instruction"><span>3</span>Press the convert button and your files will be converted to EPUB format.</div>
		</div>
		<file-drop-zone @input="addFiles">
			<p>Files must be in Markdown or plain text format for the contents. Images should be JPEG or PNG.</p>
		</file-drop-zone>
		<div class="p-2">
			<validate-field :value="title" :rules="rules.title" v-slot="{ error, message }">
				<text-input label="Title *" v-model="title" :error="error" :message="message" />
			</validate-field>
			<validate-field :value="author" :rules="rules.author" v-slot="{ error, message }">
				<text-input label="Author *" v-model="author" :error="error" :message="message" />
			</validate-field>
			<text-input label="Copyright" v-model="rights" />
			<text-input label="Published Date" v-model="date" placehold="YYYY-MM-DD" />
			<text-input label="Publisher" v-model="publisher" />
		</div>
		<div v-if="hasFiles" class="p-2">
			<p>You have the following files ready. Click the dustbin to remove a file or drag to reorder them.</p>
			<file-list :files="files" @update="setFiles" />
		</div>
		<div class="p-2">
			<button-action
				block
				type="primary"
				:disabled="!canContinue"
				@click="upload"
			>Convert</button-action>
		</div>
	</section>
</template>
<script>
import { download } from '~/utils/file'
import { required, validate, validateBatch } from '~/utils/validators'

export default {
	name: 'IndexPage',

	data() {
		return {
			loading: false,
			files: [],
			title: '',
			author: '',
			rights: '',
			date: '',
			publisher: '',
		}
	},

	computed: {
		hasFiles() {
			return this.files.length > 0
		},

		canContinue() {
			return this.hasFiles && validateBatch(this.rules, {
				title: this.title,
				author: this.author,
			})
		},

		rules() {
			return {
				title: [required()],
				author: [required()],
			}
		},
	},

	methods: {
		addFiles(files) {
			this.files = [...this.files, ...files]
		},

		setFiles(files) {
			this.files = [ ...files ]
		},

		async upload() {
			const data = new FormData()

			// files
			this.files.forEach(file => data.append(file.name, file))

			// required fields
			data.append('title', this.title)
			data.append('author', this.author)

			// optional fields
			if(!!this.rights) data.append('rights', this.rights)
			if(!!this.date) data.append('date', this.date)
			if(!!this.publisher) data.append('publisher', this.publisher)

			this.loading = true

			try {
				const response = await this.$axios.post('/api/upload', data, {
					responseType: 'blob',
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})

				const [ prefix, fileName ] = response.headers['content-disposition'].split('"')

				download(fileName, response.data)

				this.files = []
			}
			catch(ex) {
				console.log(ex)
			}

			this.loading = false
		}
	},
}

</script>
<style scoped>
.instruction {
	@apply border border-celestial-light bg-white p-4 rounded text-base relative;
}
.instruction span {
	@apply bg-celestial-lighter border border-celestial rounded-full absolute -top-2 -left-2 w-6 h-6 text-center text-sm text-celestial-dark font-bold;
}
</style>