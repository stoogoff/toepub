<template>
	<div>
		<div class="instruction">Select the files you want to convert to EPUB format. Files must be in Markdown or plain text format for the contents.</div>
		<file-drop-zone @input="addFiles" />

		<div v-if="hasFiles" class="px-2 py-4">
			<p>Click the dustbin to remove a file or drag to reorder them.</p>
			<file-list :files="files" @update="setFiles" />
		</div>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('AddFiles', {
	props: {
		files: {
			type: Array,
			required: true,
		}
	},

	computed: {
		hasFiles() {
			return this.files.length > 0
		},
	},

	methods: {
		addFiles(files) {
			this.$emit('add', files)
		},

		setFiles(files) {
			this.$emit('update', files)
		},
	},
})
</script>