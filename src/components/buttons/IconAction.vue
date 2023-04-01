<template>
	<button
		class="btn btn-icon border font-sans font-bold uppercase text-sm text-center px-6 py-3 mr-1 mb-1 rounded shadow outline-none focus:outline-none ease-linear transition-all duration-150"
		:class="classList"
		:disabled="disabled"
		@click="$emit('click')"
	>
		<icon-view :icon="icon" />
	</button>
</template>
<script>
import Vue from 'vue'

export default Vue.component('IconAction', {
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
		icon: {
			type: String,
			required: true,
		},
	},

	computed: {
		classList() {
			let classList = []

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