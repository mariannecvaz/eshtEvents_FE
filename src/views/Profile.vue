<template>
  <div class="profile">
    <div class="container">
      <h1 id="profileTitle" style="padding-top:20px; padding-bottom: 50px;">Perfil</h1>
    </div>

    <div class="container perfilBanner">
      <div class="row">
        <div class="col-sm-4 fotoP">
          <div>
            <img style="width:200px; height:auto" :src="this.avatar" />
          </div>
          <div class="form-group">
            <b-img v-bind:src="this.newPhoto" fluid style="width:200px"></b-img>
            <form v-on:submit.prevent="changePhoto()">
              <input type="link" id="urlAvatar2" v-model="newPhoto" />
              <br />
              <button type="submit" id="editFoto2">Editar Foto</button>
              <button type="button" id="editFoto3" @click="cancelFt()">X</button>
            </form>
          </div>
        </div>
        <div align="left" class="col-sm-4 infos">
          <p class="userName">
            <b>{{ this.$store.state.loggedUser.user[0].nome }}</b>
          </p>
          <p>Data de Nascimento: {{ this.$store.state.loggedUser.user[0].nome }}</p>
          <p>Contacto: {{ this.$store.state.loggedUser.user[0].nome }}</p>
          <p>Instituição: {{ this.$store.state.loggedUser.user[0].school }}</p>
          <p>E-mail: {{ this.$store.state.loggedUser.user[0].email_ipp }}</p>
        </div>
        <div class="col-sm-4">
          <router-link to="/Profile/editProfile">
            <button id="edit">
              <img
                style="width:25px; margin-right:5px; margin-top:5px"
                src="../assets/settings.svg"
              />Editar Perfil
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <div class="container" style="padding-bottom: 60px; padding-top: 20px;">
      <h2 style="font-family: Channel; font-size: 20px; color: black;">As Tuas Reservas</h2>
    </div>

    <div class="container tables">
      <b-tabs align="center">
        <b-tab title="Eventos">
          <div class="container" style="padding:120px;">
            <eventos />
          </div>
        </b-tab>
        <b-tab title="Espaços">
          <div class="container" style="padding:120px;">
            <espacos />
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import espacos from "../components/espacos.vue";
import eventos from "../components/eventos.vue";
export default {
  components: {
    espacos,
    eventos
  },
  data() {
    return {
      newPhoto: "",
      loggedUser: [],
      avatar: "",
      nome: ""
    };
  },
  created() {
    // if (localStorage.getItem("loggedUser")) {
    //   this.$store.state.loggedUser = JSON.parse(
    //     localStorage.getItem("loggedUser")
    //   );
    // }
    // if (localStorage.getItem("users")) {
    //   this.$store.state.users = JSON.parse(localStorage.getItem("users"));
    // }
    // this.users = this.$store.state.users;

    // this.loggedUser = this.loggedUser.user[0]
    // this.loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    // if (localStorage.getItem("reservations")) {
    //   this.$store.state.reservations = JSON.parse(
    //     localStorage.getItem("reservations")
    //   );
    //   this.reservations = this.$store.state.reservations;
    // }

    if (localStorage.getItem("roomRents")) {
      this.$store.state.roomRents = JSON.parse(
        localStorage.getItem("roomRents")
      );
      if (localStorage.getItem("avatar")) {
        this.$store.state.avatar = JSON.parse(localStorage.getItem("avatar"));
        this.avatar = this.$store.state.avatar;
      }
    }
  },
  computed: {
    filterReservation() {
      return this.myReservation.filter(reservations => {
        let filterResult = true;
        let filterResultType = true;

        if (this.reservations.userId === this.loggedUser.id) {
          filterResult = reservations.id.includes(this.reservations.userId);
        }
        return filterResultType && filterResult;
      });
    }
  },
  methods: {
    getUser() {
      return this.$store.state.loggedUser;
    },
    async changePhoto() {
      alert(this.newPhoto)
      try {
        await this.$store.dispatch("editUser", {
          pass: "",
          oldPass: "",
          img: this.newPhoto
        });
        localStorage.setItem("avatar", JSON.stringify(this.newPhoto));
        this.$store.state.avatar = this.newPhoto
        this.avatar = this.newPhoto;
        this.newPhoto = "";
      } catch (err) {
        alert(err);
      }
    },
    cancelFt() {
      this.newPhoto = "";
    }
  }
};
</script>

<style>
#edit {
  color: white;
  background-color: black;
  border: 0px;
  font-family: GeosansLight;
  position: absolute;
  top: 0%;
  right: 0%;
  height: 23%;
}
#profileTitle {
  font-family: Channel;
  color: black;
  font-size: 20px;
  margin-top: 3%;
}
.userName {
  font-size: 25px;
  color: #daaa29;
}
#editFoto {
  color: black;
  background-color: transparent;
  border: 0%;
}
.infos {
  margin-left: -3%;
  margin-right: 9%;
  font-family: GeosansLight;
}
.fotoP {
  margin-left: -6%;
}
#editFoto2 {
  width: 25%;
  margin-top: 3%;
  font-size: 12px;
  border: 2px solid black;
  height: 1.5vw;
  color: white;
  background-color: #000;
  font-family: GeosansLight;
}
#editFoto3 {
  margin-top: 3%;
  margin-left: 3%;
  font-size: 12px;
  border: 2px solid black;
  height: 1.5vw;
  color: white;
  background-color: #000;
  font-family: GeosansLight;
}
.justify-content-center {
  -ms-flex-pack: center !important;
  -webkit-box-pack: center !important;
  justify-content: center !important;
  /* border-bottom: 2px solid #daaa29; */
}

.perfilBanner {
  padding-top: 1%;
  padding-bottom: 2%;
  border-left: 2px solid black;
  border-right: 2px solid black;
}
.tables {
  padding-top: 2%;
  margin-bottom: 4%;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
}
a {
  color: black;
  text-decoration: none;
  background-color: transparent;
}
/* .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
    color: #495057;
    border-color:#daaa29;
}  */
</style>
