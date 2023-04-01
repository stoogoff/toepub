<template>
	<div>
		<loading-spinner v-if="src === null" />
		<figure v-else class="p-1 relative">
			<img :src="src" class="block w-full" />
			<span @click="$emit('delete')" class="inline-block absolute bottom-1 right-1 text-red-600 hover:text-white cursor-pointer"><icon-view icon="delete" /></span>
		</figure>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('ImageUpload', {
	props: {
		file: {
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