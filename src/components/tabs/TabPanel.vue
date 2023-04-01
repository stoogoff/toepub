<template>
	<section v-show="active" class="py-4">
		<slot />
	</section>
</template>
<script>
import Vue from 'vue'

export default Vue.component('TabPanel', {
	props: {
		title: {
			type: String,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
	},

	data() {
		return {
			active: false
		}
	}
})
</script>