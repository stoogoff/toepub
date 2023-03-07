<template>
	<form-field :label="label" :message="message" :error="error" v-slot="field">
		<div class="relative flex w-full flex-wrap items-stretch">
			<span class="h-full leading-snug font-normal absolute text-center text-gray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
				<slot name="prepend"></slot>
			</span>
			<input
				:id="field.id"
				:value="value"
				type="text"
				:class="inputClass"
				:disabled="disabled"
				:placeholder="placeholder"
				@input="$emit('input', $event.target.value)"
			/>
			<span v-if="hasAppendSlot" class="h-full leading-snug font-normal absolute text-center text-gray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
				<slot name="append"></slot>
			</span>
		</div>
	</form-field>
</template>
<script>
import Vue from 'vue'

export default Vue.component('TextInput', {
	props: {
		value: {
			type: [String, Number],
			required: true,
		},
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
		disabled: {
			type: Boolean,
			default: false,
		},
		placeholder: {
			type: String,
			default: '',
		},
	},

	computed: {
		hasPrependSlot() {
			return 'prepend' in this.$slots && this.$slots.prepend.length > 0
		},

		hasAppendSlot() {
			return 'append' in this.$slots && this.$slots.append.length > 0
		},

		inputClass() {
			let classList = ['input']

			if(this.hasPrependSlot) {
				classList.push('pl-10')
			}

			if(this.hasAppendSlot) {
				classList.push('pr-10')
			}

			if(this.disabled) {
				classList.push('disabled')
			}

			if(this.error) {
				classList.push('warning')
			}

			return classList.join(' ')
		},
	},
})

</script>
