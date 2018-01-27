<template>
	<div id="stages" class="panel" v-if="user">
		<div class="stages__header">
			<h2>Stages</h2>
		</div>
		<div class="row stages__row">
			<div class="col_3">
				<h3 class="user_title">{{ user.name }}</h3>
				<div class="dates">
					<button v-for="int of user.intervals" class="bttn--small" @click="set_interval(int)">{{ int.ts | timestamp }}</button>
				</div>
			</div>
			<div class="col_9">
				<h3>Night Score: <span class="night_score">{{ night_score }}</span></h3>
				<div v-if="!stage_chart" class="chart-placeholder"></div>
				<canvas id="stage_chart" :class="{disabled: !stage_chart}" width="100%" height="56vw"></canvas>
				<p v-if="stage_chart">This chart describes the amount of time spent in various sleep stages throughout a given night.</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Chart from 'chart.js';
	import anime from 'animejs';
	export default {
		name: 'Stages',
		props: ['user'],
		data() {
			return {
				stage_chart: null,
				night_score: 0
			}
		},
		mounted() {
		},
		watch: {
			user() {
				if (this.stage_chart) {
					this.stage_chart.destroy();
					this.stage_chart = null;
				}
			}
		},
		methods: {
			set_interval(int) {

				let ctx = 'stage_chart';

				let labels = [];
				let data = [];

				let purple = {
					r: 92,
					g: 0,
					b: 122
				}

				let bgc = [];

				for (let stage in int.stage_arrays) {

					for (let c in purple) {
						purple[c] += 40;
					}

					let color = `rgba(${purple.r}, ${purple.g}, ${purple.b}, 0.45)`;
					bgc.push(color);

					let label =  stage[0].toUpperCase() + stage.slice(1);
					labels.push(label);
					let duration = 0;
					for (let dir of int.stage_arrays[stage]) {
						duration += dir;
					}
					duration = duration / 60;
					data.push(duration);
				}

				this.night_score = int.score;

				anime({
					targets: this,
					night_score: [0, this.night_score],
					round: 1,
					easing: 'easeOutQuart',
					duration: 2000
				});


				if (this.stage_chart != null) {
					this.stage_chart.data.labels = labels;
					this.stage_chart.data.datasets[0].data = data;
					this.stage_chart.backgroundColor = bgc;
					this.stage_chart.update();
				} else {
					this.stage_chart = new Chart(ctx, {
						type: 'bar',
					    data: {
					        labels: labels,
					        datasets: [{
					            label: 'Duration in Minutes',
					            data: data,
								backgroundColor: bgc
					        }]
					    },
					    options: {
					        scales: {
					            yAxes: [{
					                ticks: {
										fontColor: '#c158dc',
					                    beginAtZero: true
					                },
									gridLines: {
										color: 'rgba(189, 189, 189, 0.4)'
									},
									scaleLabel: {
										display: true,
										labelString: 'Duration in Minutes',
										fontColor: 'rgba(189, 189, 189, 1)'
									}
					            }],
					            xAxes: [{
									ticks: {
										fontColor: 'rgba(189, 189, 189, 1)'
					                },
									gridLines: {
										color: 'rgba(189, 189, 189, 0)'
									},
									scaleLabel: {
										fontColor: 'rgba(189, 189, 189, 1)'
									}
					            }]
					        },
							legend: {
								display: false
							}
					    }
					});
				}
			}
		},
		filters: {
			timestamp(time) {
				let date = new Date(time).toLocaleString('en-us', { year: 'numeric', month: 'numeric', day: 'numeric' });
				return date;
			}
		}

	}
</script>

<style lang="scss">
	@import '../assets/scss/main.scss';

	#stages {

		.stages__header {
			padding: 12px;
			background-color: $purple_dark;

			h2 {
				margin: 0;
			}
		}

		.user_title {
			margin-bottom: 12px;
		}

		.dates {
			button {
				display: block;
				width: 100%;
				margin-bottom: 12px;
			}
		}

		#stage_chart {
			margin-top: 24px;
			margin-bottom: 24px;
			&.disabled {
				display: none;
			}
		}

		.chart-placeholder {
			height: 45vw;
			max-height: 500px;
		}
	}
</style>
