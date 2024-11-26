<template>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Usuário</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="editedUser.firstName"
              label="Nome"
              required
              :rules="[v => !!v || 'Nome é obrigatório']"
            ></v-text-field>
            <v-text-field
              v-model="editedUser.lastName"
              label="Sobrenome"
              required
              :rules="[v => !!v || 'Sobrenome é obrigatório']"
            ></v-text-field>
            <v-text-field
              v-model="editedUser.email"
              label="Email"
              required
              :rules="[
                v => !!v || 'Email é obrigatório',
                v => /.+@.+\..+/.test(v) || 'Email deve ser válido'
              ]"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
          <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    modelValue: Boolean,
    user: Object
  })
  
  const emit = defineEmits(['update:modelValue', 'save'])
  
  const dialog = ref(props.modelValue);
  const valid = ref(true);
  const editedUser = ref({ ...props.user });
  
  watch(() => props.modelValue, val => {
    dialog.value = val;
  });
  
  watch(dialog, val => {
    emit('update:modelValue', val);
  });
  
  const close = () => {
    dialog.value = false;
  };
  
  const save = () => {
    if (valid.value) {
      emit('save', editedUser.value);
    }
  };
  </script>
  
  