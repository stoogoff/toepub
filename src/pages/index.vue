<template>
	<section class="mx-auto w-2/3">
		<loading-overlay v-if="loading" />
		<div class="grid grid-cols-3 gap-6 mb-6">
			<div class="col-span-2">
				<tab-group>
					<tab-panel title="Content">
						<div class="instruction">Select the files you want to convert to EPUB format. Files must be in Markdown or plain text format for the contents. Images can be uploaded as well and should be JPEG or PNG.</div>
						<file-drop-zone @input="addFiles" />
					</tab-panel>
					<tab-panel title="Images">
						hello
					</tab-panel>
					<tab-panel title="Meta Data">
						<div class="instruction">Enter the title, author name and other information for your book. Title and Author are required but everything else is optional.</div>
						<div class="py-2">
							<validate-field :value="title" :rules="rules.title" v-slot="{ error, message }">
								<text-input label="Title *" v-model="title" :error="error" :message="message" />
							</validate-field>
							<validate-field :value="author" :rules="rules.author" v-slot="{ error, message }">
								<text-input label="Author *" v-model="author" :error="error" :message="message" />
							</validate-field>
							<text-input label="Copyright" v-model="rights" />
							<validate-field :value="date" :rules="rules.date" v-slot="{ error, message }">
								<text-input label="Published Date" v-model="date" :error="error" :message="message" placeholder="YYYY-MM-DD" />
							</validate-field>
							<text-input label="Publisher" v-model="publisher" />
						</div>
					</tab-panel>
				</tab-group>
			</div>
			<div>
				<div v-if="hasFiles" class="px-2 py-4">
					<p>Click the dustbin to remove a file or drag to reorder them.</p>
					<file-list :files="files" @update="setFiles" />
					<div class="instruction">Press the convert button and your files will be converted to EPUB format. Copies of your EPUB will be kept on our server for 24 hours before being deleted.</div>
					<button-action
						block
						type="primary"
						:disabled="!canContinue"
						@click="upload"
					>Convert</button-action>
				</div>
				<div v-else class="text-sm">
					<p>Your files will appear here when they are ready.</p>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
import { download } from '~/utils/file'
import { required, format, validate, validateBatch } from '~/utils/validators'

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
				date: this.date,
			})
		},

		rules() {
			return {
				title: [required()],
				author: [required()],
				date: [format(/^(\d{4}-\d{2}-\d{2})?$/, 'YYYY-MM-DD')],
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
				this.title = ''
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
	@apply border border-gray-600 bg-gray-800 p-4 rounded text-base relative mb-4 text-gray-300;
}
</style>