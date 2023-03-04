<template>
	<div class="my-4 text-xl">
		<draggable v-model="draggable">
			<div
				class="p-4 mb-1 flex rounded bg-white border-2 border-white hover:border-blue-200 cursor-move"
				v-for="(file, idx) in files"
				:key="`file_${idx}`"
			>
				<span class="mr-1"><icon-view icon="file" /></span>
				<span class="flex-grow">{{ file.name }}</span>
				<span @click="deleteFile(file)" class="hover:text-red-600 cursor-pointer"><icon-view icon="delete" /></span>
			</div>
		</draggable>
	</div>
</template>
<script>

import Vue from 'vue'

export default Vue.component('FileList', {
	props: {
		files: {
			type: Array,
			required: true,
		},
	},

	computed: {
		draggable: {
			get() {
				return this.files
			},
			set(files) {
				this.$emit('update', files)
			},
		},
	},

	methods: {
		deleteFile(file) {
			const files = this.files.filter(f => f !== file)

			this.$emit('update', files)
		},
	}
})

</script>