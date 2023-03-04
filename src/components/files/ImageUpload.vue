<template>
	<div class="mb-4">
		<loading-spinner v-if="src === null" />
		<figure v-else class="p-1 input relative">
			<figcaption class="label">Current Image</figcaption>
			<img :src="src" class="block w-full" />
			<span class="inline-block absolute bottom-1 right-1"><icon-action icon="delete" type="warning" outlined @click="$emit('delete')" /></span>
		</figure>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('ImageUpload', {
	props: {
		file: {
			type: [Object],
			required: true,
		},
	},

	fetch() {
		if(this.file.url) {
			this.src = this.file.url
		}
		else {
			this.loadImageFromFile()
		}
	},

	data() {
		return {
			src: null,
		}
	},

	watch: {
		file(newValue) {
			this.$fetch()
		}
	},

	methods: {
		loadImageFromFile() {
			const reader = new FileReader()

			reader.onload = e => this.src = e.target.result
			reader.readAsDataURL(this.file)
		},
	},
})

</script>