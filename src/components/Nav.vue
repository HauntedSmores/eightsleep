<template>
	<nav id="nav">
		<div class="row flush">
			<button class="nav_bttn" @click="user_select(1)">user 1</button>
			<button class="nav_bttn" @click="user_select(2)">user 2</button>
			<button class="nav_bttn" @click="user_select(3)">user 3</button>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'AppNav',
	data() {
		return {

		}
	},
	methods: {
		user_select(user) {
			this.$emit('userclick', user);
		}
	}
}
</script>

<style lang="scss">
	#nav {
	}

	.nav_bttn {
		margin-right: 24px;
	}
</style>
