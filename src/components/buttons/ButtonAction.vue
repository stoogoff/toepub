<template>
	<button
		:class="classList"
		class="btn border font-sans font-bold uppercase text-sm text-center px-6 py-3 mr-1 mb-1 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
		:disabled="disabled"
		@click="$emit('click')"
	>
		<slot />
	</button>
</template>
<script>
import Vue from 'vue'

export default Vue.component('ButtonAction', {
	props: {
		disabled: {
			type: Boolean,
			default: false,
		},
		outlined: {
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
		small: {
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

			if(this.small) {
				classList.push('px-3 py-1 text-xs')
			}

			if(this.disabled) {
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
