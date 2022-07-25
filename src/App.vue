<template>
  <div class="vue">Hi this is vue app</div>
</template>

<script>
export default {
	data() {
		return {
			name:'component'
		}
	},

	created() {
		console.log('from vue app');
	}
}
</script>

<style>
.vue {
	background-color: blue;
	z-index: 9999;
}
</style>