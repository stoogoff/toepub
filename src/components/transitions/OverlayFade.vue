<template>
	<transition name="fade" mode="out-in" appear>
		<div class="w-full h-full fixed block top-0 left-0 bg-gray-800 bg-opacity-75 z-30 flex justify-center items-center backdrop-filter backdrop-blur">
			<slot></slot>
		</div>
	</transition>
</template>
<script>
import Vue from 'vue'

export default Vue.component('OverlayFade', {})
</script>
<style>
.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
	opacity: 0;
}
</style>