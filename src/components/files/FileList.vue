<template>
	<div class="my-4 text-xl">
		<draggable v-model="draggable">
			<div
				class="p-4 mb-1 flex rounded bg-gray-800 border-2 border-gray-600 hover:border-gray-400 cursor-move text-gray-300"
				v-for="(file, idx) in files"
				:key="`file_${idx}`"
			>
				<span class="mr-1">
					<svg style="width:24px;height:24px" viewBox="0 0 24 24"><title>file-outline</title><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" fill="currentColor" /></svg>
				</span>
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