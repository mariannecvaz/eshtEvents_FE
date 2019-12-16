import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    logged:false,
    loggedUser:''
  },

  mutations: {
    ADD_USER: (state,payload) => {
      //SE ENCONTRAR ALGUM EMAIL IGUAL AO QUE ESTA A TENTAR CRIAR
      if (!state.users.some(user => user.email === payload.email)) {
        alert("PASSWORDS DIFERENTES")
      }
      if(payload.password !== payload.confPass){
        alert("PASSWORDS DIFERENTES")
      }
      else {
        state.users.push({
          id: payload.id,
          name: payload.name,
          email: payload.email,
          password: payload.password,
        });
        state.loggedUser.push({
          id: payload.id,
          name: payload.name,
          email: payload.email,
          password: payload.password,
        })
        alert("REGISTADO")
      }
    }
  },

  getters: {}
});
