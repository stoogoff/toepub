<template>
	<nuxt-link
		class="btn inline-block border font-sans font-bold uppercase text-sm text-center px-6 py-3 mr-1 mb-1 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
		:class="classList"
		:disabled="disabled"
		:to="to">
		<slot />
	</nuxt-link>
</template>
<script>
import Vue from 'vue'

export default Vue.component('LinkAction', {
	props: {
		to: {
			type: String,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		type: {
			type: String,
			default: '',
		},
		block: {
			type: Boolean,
			default: false,
		},
		outlined: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		classList() {
			let classList = []

			if(this.block === true) {
				classList.push('block w-full')
			}

			if(this.outlined) {
				classList.push('outlined')
			}

			if(this.disabled === true) {
				classList.push('cursor-default shadow-none hover:shadow-none disabled')
			}
			else {
				classList.push('hover:shadow-lg cursor-pointer enabled')
				classList.push(this.type)
			}

			return classList.join(' ')
		},
	}
})
</script>