const express = require('express');
const app = express();
this.user_1 = require('./data/user-1.json');
this.user_2 = require('./data/user-2.json');
this.user_3 = require('./data/user-3.json');
let users = [];

for (let index = 0; index < 3; index++) {
	let user = {
		name: `User ${index + 1}`
	}

	for (let int of this[`user_${index + 1}`].intervals) {
		let stage_arrays = {};
		for (let int_stage of int.stages) {
			if (stage_arrays.hasOwnProperty(int_stage.stage)) {
				stage_arrays[int_stage.stage].push(int_stage.duration);
			} else {
				stage_arrays[int_stage.stage] = [];
				stage_arrays[int_stage.stage].push(int_stage.duration);
			}
		}
		int.stage_arrays = stage_arrays;
	}
	users[index] = Object.assign(this[`user_${index + 1}`], user);
}

console.log(users);

app.get('/user-1', (req, res) => res.json(user_1));
app.get('/user-2', (req, res) => res.json(user_2));
app.get('/user-3', (req, res) => res.json(user_3));
app.get('/users', (req, res) => res.json(users));

app.listen(3000, () => console.log('Listening on port 3000'));
