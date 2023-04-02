<template>
	<div
		class="h-10 text-gray-400 px-3"
		:class="{ 'text-green-600': isSuccess, 'text-red-600': isError }"
	>
		<span class="inline-block w-6 transform translate-y-1.5">
			<icon-view  :icon="status" v-if="isSuccess || isError" />
		</span>
		<slot />
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('StatusMessage', {
	props: {
		status: {
			type: String,
			required: true,
		},
	},

	computed: {
		isSuccess() {
			return this.status === 'success'
		},

		isError() {
			return this.status === 'error'
		},
	},
})
</script>