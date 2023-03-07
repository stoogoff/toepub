<template>
	<div class="flex cursor-pointer text-gray-500" @click="toggle">
		<icon-view :icon="icon" />
		<span class="ml-2">{{ label }}</span>
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('CheckBox', {
	props: {
		label: {
			type: String,
			required: true,
		},
		value: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		icon() {
			return this.value ? 'checkbox-checked' : 'checkbox-unchecked'
		}
	},

	methods: {
		toggle() {
			this.$emit('input', !this.value)
		},
	},
})
</script>