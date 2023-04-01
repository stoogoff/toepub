<template>
	<div>
		<div class="text-sm font-medium text-center border-b tab-group">
			<ul class="flex flex-wrap -mb-px">
				<li class="mr-2" v-for="(tab, idx) in tabs" :key="`tab_${idx}`">
					<span class="cursor-pointer inline-block p-4 rounded-t-lg border-b-2 border-transparent tab" :class="{ active: tab.active, disabled: tab.disabled }" @click="activate(tab)">
						{{ tab.title }}
					</span>
				</li>
			</ul>
		</div>
		<slot />
	</div>
</template>
<script>
import Vue from 'vue'

export default Vue.component('TabGroup', {
	props: {
		active: {
			type: String,
			default: '',
		},
	},

	data() {
		return {
			tabs: []
		}
	},

	mounted() {
		this.tabs = this.$children

		if(this.active) {
			this.tabs.forEach(tab => {
				if(tab.title === this.active) {
					tab.active = true
				}
			})
		}
		else {
			this.tabs[0].active = true
		}
	},

	methods: {
		activate(tab) {
			if(tab.disabled) return

			this.tabs.forEach(child => child.active = child === tab)
		},
	},
})

</script>