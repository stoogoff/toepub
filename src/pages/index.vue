<template>
	<section>
		<loading-overlay v-if="loading" />
		<file-drop-zone @input="addFiles">
			<p>Important message</p>
		</file-drop-zone>
		<div v-if="files.length > 0" class="p-2 mx-auto w-1/2">
			<p>Your files, ready to upload:</p>
			<file-list :files="files" @update="setFiles" />
		</div>
		<div class="p-2 mx-auto w-1/2">
			<button-action
				block
				type="success"
				:disabled="files.length === 0"
				@click="upload"
			>Upload</button-action>
		</div>
	</section>
</template>
<script>
	import { download } from '~/utils/file'

export default {
	name: 'IndexPage',

	data() {
		return {
			loading: false,
			files: [],
		}
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

			this.files.forEach(file => data.append(file.name, file))
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