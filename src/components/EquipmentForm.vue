```vue
<template>

  <!-- ADD EQUIPMENT -->
  <AddEquipmentForm
    v-if="!equipment"
    :is-open="isOpen"
    @save="save"
    @cancel="cancel"
  />

  <!-- UPDATE EQUIPMENT -->
  <UpdateEquipmentForm
    v-else
    :is-open="isOpen"
    :equipment="equipment"
    @save="save"
    @cancel="cancel"
  />

</template>


<script setup lang="ts">

import AddEquipmentForm from "./AddEquipmentForm.vue";
import UpdateEquipmentForm from "./UpdateEquipmentForm.vue";


/* =====================================================
   EQUIPMENT TYPE
===================================================== */

interface Equipment {

  id: string;

  code: string;

  name: string;

  category: string;

  classroom: string;

  quantity: number;

  condition: string;

  status: string;

  dateAcquired: string;

  notes: string;

}


/* =====================================================
   PROPS
===================================================== */

defineProps<{

  isOpen: boolean;

  equipment: Equipment | null;

}>();


/* =====================================================
   EMITS
===================================================== */

const emit =
  defineEmits<{

    (
      event: "save",
      equipment: Equipment
    ): void;

    (
      event: "cancel"
    ): void;

  }>();


/* =====================================================
   SAVE
===================================================== */

const save = (
  equipment: Equipment
) => {

  emit(
    "save",
    equipment
  );

};


/* =====================================================
   CANCEL
===================================================== */

const cancel = () => {

  emit(
    "cancel"
  );

};

</script>
```
