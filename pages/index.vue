<template>
	<section>
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

export default {
	name: 'IndexPage',

	data() {
		return {
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

		upload() {
			console.log(this.files)
		}
	},
}

</script>