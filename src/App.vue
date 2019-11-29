<template>
  <v-app id="inspire">
    <v-app-bar
      app
      clipped-right
      color="blue-grey"
      dark
    >
      <v-toolbar-title>Calculator</v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn v-if="!ok" text @click="logIn">
          <v-icon left>mdi-login</v-icon>
          Login
        </v-btn>
        <v-btn v-if="ok" text @click="logOut">
          <v-icon left>mdi-logout</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          justify="center"
          align="center"
        >
          <v-col
          justify="center"
          align="center"
        >
            <app-calc
              :display="expression"
              :name="name"
              @sendExpression="getAnswer"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer
      app
      color="blue-grey"
      class="white--text"
    >
      <span>М.Кахидзе</span>
      <v-spacer />
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import AppCalc from "@/components/Calc.vue";

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json;charset=utf-8');

export default {
  name: 'app',
  components: {
    AppCalc
  },
  data: () => ({
    name: null,
    expression: "",
    ok: false
  }),
  methods: {
    getAnswer(expression) {
      this.expression = expression;
      if (this.fetchStatus()) {
        this.eval()
      }
    },
    async logIn () {
      const user = {
        "name": "John",
        "password": "Smith"
      },
      url = "http://185.185.69.80:8081/login",
      init = {
        mode: "cors",
        headers: myHeaders,
        method: "POST",
        body: JSON.stringify(user)
      }
      try {
        const response = await fetch(url, init)
        if (response.ok) {
          let json = await response.json();
          this.ok = json.ok;
          this.name = json.name;
          console.log(json)
        } else {
          console.error("Ошибка HTTP: " + response.status);
        }
      } catch (err) {
        console.error(err)
      }
    },
    async logOut () {
      const url = "http://185.185.69.80:8081/logout",
      init = {
        mode: "cors",
        credentials: "include"
      }
      try {
        const response = await fetch(url, init)
        if (response.ok) {
          let json = await response.json();
          this.ok = !json.ok;
          console.log(json)
        } else {
          console.error("Ошибка HTTP: " + response.status);
        }
      } catch (err) {
        console.error(err)
      }
    },
    async eval () {
      const expression = this.expression,
      url = "http://185.185.69.80:8081/eval",
      init = {
        mode: "cors",
        credentials: "include",
        headers: myHeaders,
        method: "POST",
        body: JSON.stringify(expression)
      }
      try {
        const response = await fetch(url, init)
        if (response.ok) {
          let json = await response.json();
          console.log(json)
          if (json.ok) {
            this.expression = json.ok ? json.answer : json.error;
          }
        } else {
          console.error("Ошибка HTTP: " + response.status);
        }
      } catch (err) {
        console.error(err)
      }
    },
    async fetchStatus() {
      const url = "http://185.185.69.80:8081/",
      init = {
        mode: "cors",
        credentials: "include",
        headers: myHeaders,
        method: "GET"
      }
      try {
        const response = await fetch(url, init)
        if (response.ok) {
          let json = await response.json();
          console.log(json)
          return json.ok;
        } else {
          console.error("Ошибка HTTP: " + response.status);
        }
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>

<style>
</style>
