<template>
  <v-dialog v-model="show" max-width="500px" persistent>
    <v-card>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-title>
          Add Team to Group
        </v-card-title>
        <v-card-text>
          <v-file-input
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Team Logo"
          ></v-file-input>
          <v-text-field
            label="Team Name"
            outlined
            dense
            required
            v-model="teamname"
            :rules="teamRules"
            :counter="25"
          ></v-text-field>

          <v-text-field
            label="Played Games"
            outlined
            dense
            required
            v-model="played"
            :rules="playedRules"
          ></v-text-field>

          <v-text-field
            label="Won Games"
            outlined
            dense
            required
            v-model="wins"
            :rules="winRules"
          ></v-text-field>

          <v-text-field
            label="Draws"
            outlined
            dense
            required
            v-model="draws"
            :rules="drawRules"
          ></v-text-field>

          <v-text-field
            label="Lost Games"
            outlined
            dense
            required
            v-model="lost"
            :rules="lostRules"
          ></v-text-field>
          <v-text-field
            label="Points"
            outlined
            dense
            required
            v-model="points"
            :rules="pointsRules"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn small color="#3AB648" dark text @click="validate">Save</v-btn>
          <v-btn
            small
            dark
            color="rgb(4, 86, 190)"
            text
            @click.stop="show = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["visible"],
  data: () => ({
    rules: [
      value =>
        !value ||
        value.size < 2000000 ||
        "Avatar size should be less than 2 MB!"
    ],
    valid: false,
    teamname: "",
    teamRules: [
      v => !!v || "Name is required",
      v => v.length <= 25 || "Name must be less than 25 characters"
    ],
    played: "",
    playedRules: [v => !!v || "Played Games are required"],
    wins: "",
    winRules: [v => !!v || "Games won are required"],
    draws: "",
    drawRules: [v => !!v || "Draws is required"],
    lost: "",
    lostRules: [v => !!v || "Lost Games are required"],
    points: "",
    pointsRules: [v => !!v || "Points are required"]
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    }
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  }
};
</script>
