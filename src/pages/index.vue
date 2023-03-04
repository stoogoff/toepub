<template>
	<section>
		<loading-overlay v-if="loading" />
		<div v-else>
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
		</div>
	</section>
</template>
<script>

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
			console.log(files)
			this.files = [...this.files, ...files]
		},

		setFiles(files) {
			this.files = [ ...files ]
		},

		async upload() {
			console.log(this.files)

			const data = new FormData()

			this.files.forEach(file => data.append(file.name, file))
			this.loading = true

			try {
				// this needs a response message including a link to the file
				// or even an auto download of the file
				const response = await this.$axios.post('/api/upload', data, {
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})

				console.log(response)
			}
			catch(ex) {
				console.log(ex)
			}

			this.loading = false
		}
	},
}

</script>