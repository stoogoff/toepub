<template>
	<span v-html="iconActual" />
</template>
<script>
import Vue from 'vue'

export default Vue.component('IconView', {
	props: {
		icon: {
			type: String,
			required: true,
		}
	},

	computed: {
		iconActual() {
			switch(this.icon) {
					case 'upload-off':
						return '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M22.11 21.46L2.39 1.73L1.11 3L6.56 8.45L5 10H8.11L9 10.89V16H14.11L16.11 18H5V20H18.11L20.84 22.73L22.11 21.46M15 10H19L12 3L9.1 5.9L15 11.8V10Z" /></svg>'
					case 'upload':
						return '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" /></svg>'
					case 'delete':
						return '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>'
					case 'file':
						return '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><title>file-outline</title><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" fill="currentColor" /></svg>'
			}

			throw `Icon '${this.icon}' not found.`
		},
	},
})

</script>