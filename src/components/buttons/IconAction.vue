<template>
	<button :class="classList" :disabled="disabled" @click="$emit('click')">
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
			let classList = ['btn btn-icon']

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