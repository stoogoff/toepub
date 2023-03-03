<template>
	<nuxt-link :class="classList" :disabled="disabled" :to="to">
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
			let classList = ['btn', 'inline-block']

			if(this.block === true) {
				classList.push('block w-full')
			}

			if(this.outlined) {
				classList.push('outlined')
			}

			if(this.disabled === true) {
				classList.push('disabled')
			}
			else {
				classList.push('enabled')
				classList.push(this.type)
			}

			return classList.join(' ')
		},
	}
})
</script>