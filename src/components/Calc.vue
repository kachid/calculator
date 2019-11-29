<template>
  <v-card max-width="400px" min-width="350px">
    <v-card-title primary-title>
      <span v-if="name">Hi, {{name}}!</span>
    </v-card-title>
    <v-card-text>
      <v-text-field
        disabled
        outlined
        :value="showDisplay"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-row
        v-for="(calcRow, i) of calcItems"
        :key="i"
        justify="center"
        align="center"
      >
        <v-col v-for="item of calcRow"
          :key="item"
          cols="12"
          justify="center"
          align="center"
        >
          <v-btn rounded value="item" @click="pushBtn(item)">{{item}}</v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "calc",
  props: {
    display: {
      type: String,
      default: "0"
    },
    name: {
      type: String
    }
  },
  data: () => ({
    expression: [],
    calcItems: [
      ['1', '4', '7', '.'],
      ['2', '5', '8', '0'],
      ['3', '6', '9', '='],
      ['+', '-', '*', '/']
    ]
  }),
  computed: {
    normalizedExpression() {
      return this.expression.join(" ");
    },
    showDisplay() {
      return this.expression.length ? this.normalizedExpression : this.display;
    }
  },
  methods: {
    pushBtn(char) {
      if (char === "=") {
        this.sendExpression();
        this.expression = [];
        return
      }
      this.expression.push(char);
    },
    sendExpression() {
      this.$emit('sendExpression', this.normalizedExpression);
    }
  }
}
</script>

<style>

</style>