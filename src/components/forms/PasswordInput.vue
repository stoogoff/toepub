<template>
	<form-field :label="label" :message="message" :error="error" v-slot="field">
		<div class="relative flex w-full flex-wrap items-stretch">
			<input
				:id="field.id"
				:value="value"
				:type="type"
				:class="inputClass"
				:disabled="disabled"
				:placeholder="placeholder"
				@input="$emit('input', $event.target.value)"
			/>
			<span class="z-10 h-full leading-snug font-normal absolute text-center text-gray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3" @click="toggleView">
				<icon-view :icon="icon" />
			</span>
		</div>
	</form-field>
</template>
<script>
import Vue from 'vue'

export default Vue.component('PasswordInput', {
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

	data() {
		return {
			showPassword: false
		}
	},

	computed: {
		icon() {
			return this.showPassword ? 'eye' : 'eye-off'
		},

		type() {
			return this.showPassword ? 'text' : 'password'
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

	methods: {
		toggleView() {
			this.showPassword = !this.showPassword
		}
	},
})

</script>
