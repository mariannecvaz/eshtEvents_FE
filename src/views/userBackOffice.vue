<template>
  <div class="bckUsers">
    <br />
    <h2 class="adminTitle">Gestão de Utilizadores</h2>

    <b-table bordered hover :items="this.items" :fields="this.fields">
      <!-- <template v-slot:cell(typeUser)="row">
        <b-form-select :options="[{text:user},{text:admin}]" v-model="row.item.typeUser">
      </b-form-select>
      </template>-->
      <template v-slot:cell(details)="row">
        <b-button
          variant="info"
          class="btnDetails"
          size="sm"
          @click="row.toggleDetails"
          >Mostrar Detalhes</b-button
        >
      </template>
      <template v-slot:row-details="row">
        <b-card>
          <!-- Escola -->
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Escola:</b>
              {{ row.item.school }}
            </b-col>
            <b-col></b-col>
          </b-row>
          <!-- Menu -->
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Email:</b>
              {{ row.item.email }}
            </b-col>
          </b-row>
          <!-- Contacto -->
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right">
              <b>Contacto:</b>
              {{ row.item.contact }}
            </b-col>
            <b-col></b-col>
          </b-row>
        </b-card>
      </template>
      <template v-slot:cell(options)="row">
        <b-button
          variant="danger"
          class="btnRemove"
          size="sm"
          @click="removeUser(row.item.id)"
          style="margin:5px"
          >Eliminar Utilizador</b-button
        >
        <b-button class="btnChange" size="sm" @click="changeUser(row.item.id)"
          >Mudar tipo de utilizador</b-button
        >
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      fields: [
        { key: "name", label: "Nome utilizador", sortable: "true" },
        { key: "typeUser", label: "Tipo de utilizador", sortable: "true" },
        { key: "details", label: "Detalhes" },
        { key: "options", label: "Opções" }
      ]
    };
  },
  created() {
    localStorage.setItem("users", JSON.stringify(this.$store.state.users));
    if (localStorage.getItem("users")) {
      this.items = JSON.parse(localStorage.getItem("users"));
    }
  },
  methods: {
    removeUser(id) {
      for (let i in this.items) {
        if (this.items[i].id === id) {
          this.items = this.items.filter(item => this.items[i].id !== item.id);
          localStorage.setItem("users", JSON.stringify(this.items));
          this.$store.state.users = localStorage.setItem(
            "users",
            JSON.stringify(this.items)
          );
        }
      }
    },
    changeUser(id) {
      for (let i in this.items) {
        if (this.items[i].id === id) {
          const index = this.items.findIndex(
            item => this.items[i].id === item.id
          );
          if (this.items[index].typeUser == "user") {
            this.items[index].typeUser = "admin";
          } else {
            this.items[index].typeUser = "user";
          }
          localStorage.setItem("users", JSON.stringify(this.items));
          this.$store.state.users = localStorage.setItem(
            "users",
            JSON.stringify(this.items)
          );
        }
      }
    }
  }
};
</script>

<style>
.b-table {
  top: 50px;
  left: 500px;
}
.btnRemove {
  width: 210px;
  height: 40px;

  top: 3px;
}
.btnChange {
  width: 210px;
  height: 40px;
  right: -12px;
  top: 3px;
}
.adminTitle {
  font-family: GeosansLight;
  color: black;
}
</style>
