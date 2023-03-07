<template>
	<div class="mb-4 pt-0">
		<label :for="id" :class="labelClass">{{ label }}</label>
		<slot v-bind:id="id" />
		<aside :class="messageClass">{{ message || ' ' }}</aside>
	</div>
</template>
<script>
import Vue from 'vue'
import { id } from '~/utils/string'

export default Vue.component('FormField', {
	props: {
		label: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			default: '',
		},
		error: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		id() {
			return id(this.label)
		},

		labelClass() {
			return this.getCssClass('label')
		},

		messageClass() {
			return this.getCssClass('message')
		},
	},

	methods: {
		getCssClass(base) {
			let classList = [base]

			if(this.error) {
				classList.push('warning')
			}

			return classList.join(' ')
		}
	},
})

</script>
