<template>
	<div id="app" class="container_lg">
		<div class="row">
			<div class="col_12">
				<h1>Front End Engineer Challenge</h1>
				<app-nav @userclick="set_user"></app-nav>
			</div>
		</div>
		<div class="row">
			<div class="col_12">
				<stages :user="selected_user"></stages>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import Nav from './components/Nav.vue';
import Stages from './components/Stages.vue';

export default {
	name: 'app',
	components: {
		'app-nav': Nav,
		'stages': Stages
	},
	data () {
		return {
			users: null,
			selected_user: null
		}
	},
	mounted() {
		axios.get('/api/users').then((res) => {
			this.users = res.data;
		});
	},
	methods: {
		set_user(user) {
			this.selected_user = this.users[user - 1];
			console.log(this.selected_user);
		}
	}
}
</script>

<style lang="scss">
	@import 'assets/scss/main.scss';
	#app {
	}

</style>
