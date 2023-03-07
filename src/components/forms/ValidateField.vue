<template>
	<div>
		<slot v-bind:error="error" v-bind:message="message"></slot>
	</div>
</template>
<script>
import Vue from 'vue'
import { validate } from '~/utils/validators'

export default Vue.component('ValidateField', {
	props: {
		value: {
			type: [String, Number],
			required: true,
		},
		rules: {
			type: Array,
			required: true,
		},
	},

	data() {
		return {
			hasChanged: false
		}
	},

	computed: {
		error() {
			if(!this.hasChanged) {
				return false
			}

			return validate(this.rules, this.value).length > 0
		},

		message() {
			if(!this.hasChanged) {
				return ''
			}

			const messages = validate(this.rules, this.value)

			return messages.length === 0 ? '' : messages[0]
		},
	},

	watch: {
		value(newValue) {
			this.hasChanged = true
		},
	}
})
</script>