<!-- eslint-disable vue/valid-v-slot -->
<template>
    <v-container>
      <h1 class="text-h4 mb-4">Lista de Usuários</h1>
      <v-data-table
        :headers="headers"
        :items="users"
        :loading="loading"
        :options.sync="options"
        :server-items-length="totalUsers"
        class="elevation-1"
      >
        <template #item.actions="{ item }">
          <v-btn icon @click="editUser(item)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteUser(item.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <edit-user-dialog
        v-model="editDialog"
        :user="selectedUser"
        @save="saveUser"
      ></edit-user-dialog>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute, useRouter } from 'vue-router';
  import EditUserDialog from '@/components/EditUserDialog.vue';
  
  const store = useStore();
  const route = useRoute();
  const router = useRouter();
  
  const loading = ref(false);
  const editDialog = ref(false);
  const selectedUser = ref(null);
  const options = ref({
    page: 1,
    itemsPerPage: 20,
    sortBy: [],
    sortDesc: [],
  });
  
  const headers = [
    { title: 'ID', key: 'id' },
    { title: 'Nome', key: 'firstName' },
    { title: 'Sobrenome', key: 'lastName' },
    { title: 'Email', key: 'email' },
    { title: 'Ações', key: 'actions', sortable: false }
  ];
  
  const users = computed(() => store.state.users.list);
  const totalUsers = computed(() => store.state.users.total);
  
  watch(options, (newOptions) => {
    router.push({ query: { page: newOptions.page, itemsPerPage: newOptions.itemsPerPage } });
    store.dispatch('users/setPage', newOptions.page - 1);
  });
  
  onMounted(async () => {
    const page = Number(route.query.page) || 1;
    const itemsPerPage = Number(route.query.itemsPerPage) || 20;
    options.value = { ...options.value, page, itemsPerPage };
    
    loading.value = true;
    await store.dispatch('users/setPage', page - 1);
    loading.value = false;
  });
  
  const editUser = (user) => {
    selectedUser.value = { ...user };
    editDialog.value = true;
  };
  
  const saveUser = async (user) => {
    await store.dispatch('users/updateUser', user);
    editDialog.value = false;
  };
  
  const deleteUser = async (userId) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      await store.dispatch('users/deleteUser', userId);
    }
  };
  </script>
  
  