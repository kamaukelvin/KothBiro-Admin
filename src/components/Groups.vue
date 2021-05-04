<template>
	<v-container>
		<v-card elevation="2" shaped>
			<v-card-title>
				<v-img class="mr-2 mb-3" max-height="85" max-width="85" :src="Logo"></v-img>
				KOTHBIRO LEAGUE
				<v-progress-linear rounded height="6" value="15" color="#3AB648"></v-progress-linear>
			</v-card-title>
			<v-card-text>
				<v-row>
					<v-col md="8">
						<v-card elevation="0" class="mb-4">
							<AddTeams :visible="showAddTeamsModal" @close="showAddTeamsModal = false" />
							<v-card-text>
								<v-card class="mb-5" v-for="group in groups" :key="group.title">
									<v-toolbar color="#02024D" flat>
										<div ><h3  class="text-center white--text">2021/2022-{{ group.title }}</h3></div>
										<span href class="ml-auto">
											<v-speed-dial direction="bottom">
												<template v-slot:activator>
													<v-btn color="#02024D" flat dark fab x-small>
														<v-icon>
															mdi-dots-vertical
														</v-icon>
													</v-btn>
												</template>

												<v-btn
													dark
													x-small
													color="green"
													@click.stop="showAddTeamsModal = true"
												>
													<v-icon x-small class="mr-1">mdi-soccer</v-icon>
													Add Team
												</v-btn>
												<v-btn dark x-small color="indigo">
													<v-icon x-small class="mr-1">mdi-calendar-clock</v-icon>
													Add Fixture
												</v-btn>
											</v-speed-dial></span
										>
									
									</v-toolbar>

											<v-simple-table>
												<template v-slot:default>
													<thead >
														<tr>
															<th
																class="text-left"
																v-for="column in tableColumns"
																:key="column"
																
															>
																{{ column }}
															</th>
														</tr>
													</thead>
													<tbody>
													 
														<tr v-for="item in group.teams" :key="item.name">
													
															<td class="font-weight-medium">  <router-link to="/">{{ item[1].name }}	</router-link></td>
															<td>{{ item[1].stats.played }}</td>
															<td>{{ item[1].stats.wins }}</td>
															<td>{{ item[1].stats.draws }}</td>
															<td>{{ item[1].stats.loss }}</td>
															<td>{{ item[1].stats.pts }}</td>
														</tr>
													</tbody>
												</template>
											</v-simple-table>
									
								</v-card>
							</v-card-text>
						</v-card>
					</v-col>
					<v-col md="4">
						<v-card class="">
							<AddTeams :visible="showAddTeamsModal" @close="showAddTeamsModal = false" />
							<v-toolbar color="#02024D" flat>
								<div>
									<h3 class="white--text"><v-icon  color="white" class="mr-2">mdi-format-list-numbered</v-icon>Standings</h3>
								</div>
							</v-toolbar>

							<v-simple-table>
								<template v-slot:default>
									<thead>
										<tr>
											<th class="text-left">#</th>
											<th class="text-left" v-for="column in tableColumns" :key="column">
												{{ column }}
											</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="team in groups.teams" :key="team">
											<td>{{ team }}</td>
											<!-- <td>{{ item.name }}</td>
											<td>{{ item.played }}</td>
											<td>{{ item.wins }}</td>
											<td>{{ item.draws }}</td>
											<td>{{ item.loss }}</td>
											<td>{{ item.points }}</td> -->
										</tr>
									</tbody>
								</template>
							</v-simple-table>
						</v-card>
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script>
import FirebaseService from '../services/FirebaseService';
import Logo from '../assets/logo.png';
// import GroupTeams from './GroupTeams.vue';
import AddTeams from './modal/AddTeams';

export default {
	name: 'Groups',
	components: { AddTeams },
	data() {
		return {
			groups: [],
			rows: {},
			showAddTeamsModal: false,
			currentGroup: null,
			currentIndex: -1,
			componentKey: 0,
			Logo,
			tabs: null,
			tableColumns: ['Team', 'P', 'W', 'D', 'L', 'PTS'],
			tabsTitles: ['Group Teams', 'Fixtures'],
			desserts: [
				{
					icon: '',
					name: 'Frozen Yogurt',
					played: 9,
					wins: 3,
					draws: 4,
					loss: 2,
					points: 23,
				},
				{
					name: 'Ice cream sandwich',
					calories: 237,
				},
			],
		};
	},

	methods: {
		onDataChange(items) {
			let _groups = [];

			items.forEach((item) => {
				let key = item.key;
				let data = item.val();
				console.log("WHAT IS THE DATA HERE", data)
		let teamData = Object.entries(data.teams)




				_groups.push({
					key: key,
					title: data.group_name,
					teams: teamData
				});
			});

			this.groups = _groups;
			console.log('THE GROUPS DATA', this.groups);
		},

		refreshList() {
			let currentGroup = this.currentGroup;
			let currentIndex = this.currentIndex;
			if (currentIndex !== -1) {
				this.currentGroup = currentGroup;
				this.currentIndex = currentIndex;
			} else {
				this.currentGroup = null;
				this.currentIndex = -1;
			}
		},

		setActiveTutorial(group, index) {
			this.currentGroup = group;
			this.currentIndex = index;
		},

		removeAllTutorials() {
			FirebaseService.deleteAll()
				.then(() => {
					this.refreshList();
				})
				.catch((e) => {
					console.log(e);
				});
		},
	},
	mounted() {
		FirebaseService.getGroups().on('value', this.onDataChange);
	},
	beforeDestroy() {
		FirebaseService.getGroups().off('value', this.onDataChange);
	},
};
</script>
<style scoped></style>
