<template>
	<div>
		<div class="instruction">Images... Images can be uploaded as well and should be JPEG or PNG.</div>
		<file-drop-zone :accept="['image/*']" @input="addImages" />

		<div v-if="hasImages" class="px-2 py-4">
			<p class="mb-2">Click on an image to choose it as the cover image or the dustbin to remove an image.</p>
			<div class="grid grid-cols-3 gap-2">
				<div
					class="border-2 border-gray-600"
					:class="{ 'border-green-600': isSelected(image) }"
					@click="selectImage(image)"
					v-for="(image, idx) in images"
					:key="`image_${idx}`"
				>
					<image-upload
						:file="image"
						@delete="removeImage(image)" /></div>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('AddImages', {
	props: {
		images: {
			type: Array,
			required: true,
		},

		selectedImage: {
			default: null,
		},
	},

	computed: {
		hasImages() {
			return this.images.length > 0
		},
	},

	methods: {
		addImages(images) {
			this.$emit('add', images)
		},

		removeImage(image) {
			this.$emit('update', this.images.filter(i => i !== image))
		},

		selectImage(image) {
			this.$emit('select', this.selectedImage === image ? null : image)
		},

		isSelected(image) {
			return this.selectedImage === image
		},
	},
})
</script>