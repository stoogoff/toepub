<template>
	<button :class="classList" :disabled="disabled" @click="$emit('click')">
		<slot />
		<span class="hidden btn disabled enabled primary secondary success warning outlined small"></span>
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
			let classList = ['btn']

			if(this.block === true) {
				classList.push('block w-full')
			}

			if(this.outlined) {
				classList.push('outlined')
			}

			if(this.small) {
				classList.push('small')
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
