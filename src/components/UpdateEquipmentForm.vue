```vue
<template>

  <ion-modal
    :is-open="isOpen"
    @didDismiss="cancel"
  >

    <ion-header>

      <ion-toolbar color="primary">

        <ion-title>
          Edit Equipment
        </ion-title>

        <ion-buttons slot="end">

          <ion-button
            @click="cancel"
          >
            Close
          </ion-button>

        </ion-buttons>

      </ion-toolbar>

    </ion-header>


    <ion-content class="ion-padding">

      <form
        @submit.prevent="submitForm"
      >


        <!-- =================================================
             EQUIPMENT CODE
        ================================================== -->

        <ion-item>

          <ion-input
            v-model="form.code"
            label="Equipment Code"
            label-placement="stacked"
            placeholder="EQ-001"
            readonly
          />

        </ion-item>


        <!-- =================================================
             EQUIPMENT NAME
        ================================================== -->

        <ion-item>

          <ion-input
            v-model="form.name"
            label="Equipment Name"
            label-placement="stacked"
            placeholder="Example: Projector"
            required
          />

        </ion-item>


        <!-- =================================================
             CATEGORY
        ================================================== -->

        <ion-item>

          <ion-select
            v-model="form.category"
            label="Category"
            label-placement="stacked"
            placeholder="Select category"
            required
          >

            <ion-select-option value="Computer Laboratory">
              Computer Laboratory
            </ion-select-option>

            <ion-select-option value="Visual">
              Visual
            </ion-select-option>

            <ion-select-option value="Furniture">
              Furniture
            </ion-select-option>

            <ion-select-option value="Audio Equipment">
              Audio Equipment
            </ion-select-option>

            <ion-select-option value="Electrical">
              Electrical
            </ion-select-option>

            <ion-select-option value="Cleaning Materials">
              Cleaning Materials
            </ion-select-option>

            <ion-select-option value="Others">
              Others
            </ion-select-option>

          </ion-select>

        </ion-item>


        <!-- =================================================
             CLASSROOM
        ================================================== -->

        <ion-item>

          <ion-input
            v-model="form.classroom"
            label="Classroom"
            label-placement="stacked"
            placeholder="Example: Room 101"
            required
          />

        </ion-item>


        <!-- =================================================
             QUANTITY
        ================================================== -->

        <ion-item>

          <ion-input
            v-model.number="form.quantity"
            type="number"
            min="1"
            label="Quantity"
            label-placement="stacked"
            required
          />

        </ion-item>


        <!-- =================================================
             CONDITION
        ================================================== -->

        <ion-item>

          <ion-select
            v-model="form.condition"
            label="Condition"
            label-placement="stacked"
          >

            <ion-select-option value="Good">
              Good
            </ion-select-option>

            <ion-select-option value="Fair">
              Fair
            </ion-select-option>

            <ion-select-option value="Damaged">
              Damaged
            </ion-select-option>

          </ion-select>

        </ion-item>


        <!-- =================================================
             STATUS
        ================================================== -->

        <ion-item>

          <ion-select
            v-model="form.status"
            label="Status"
            label-placement="stacked"
          >

            <ion-select-option value="Available">
              Available
            </ion-select-option>

            <ion-select-option value="In Use">
              In Use
            </ion-select-option>

            <ion-select-option value="Open">
              Open
            </ion-select-option>

            <ion-select-option value="Maintenance">
              Maintenance
            </ion-select-option>

            <ion-select-option value="Missing">
              Missing
            </ion-select-option>

            <ion-select-option value="Found">
              Found
            </ion-select-option>

          </ion-select>

        </ion-item>


        <!-- =================================================
             DATE ACQUIRED
        ================================================== -->

        <ion-item>

          <ion-input
            v-model="form.dateAcquired"
            type="date"
            label="Date Acquired"
            label-placement="stacked"
          />

        </ion-item>


        <!-- =================================================
             NOTES
        ================================================== -->

        <ion-item>

          <ion-textarea
            v-model="form.notes"
            label="Notes"
            label-placement="stacked"
            placeholder="Enter additional information..."
            :auto-grow="true"
          />

        </ion-item>


        <!-- =================================================
             BUTTONS
        ================================================== -->

        <div class="form-buttons">

          <ion-button
            expand="block"
            fill="outline"
            color="medium"
            type="button"
            @click="cancel"
          >

            Cancel

          </ion-button>


          <ion-button
            expand="block"
            type="submit"
          >

            <ion-icon
              slot="start"
              :icon="saveOutline"
            />

            Update Equipment

          </ion-button>

        </div>

      </form>

    </ion-content>

  </ion-modal>

</template>


<script setup lang="ts">

import {

  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonIcon,

} from "@ionic/vue";


import {

  saveOutline,

} from "ionicons/icons";


import {

  ref,
  watch,

} from "vue";


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

const props =
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
   FORM DATA
===================================================== */

const form =
  ref<Equipment>({

    id: "",

    code: "",

    name: "",

    category: "",

    classroom: "",

    quantity: 1,

    condition: "",

    status: "",

    dateAcquired: "",

    notes: "",

  });


/* =====================================================
   LOAD EQUIPMENT FOR UPDATE
===================================================== */

watch(

  () => [
    props.isOpen,
    props.equipment,
  ],

  () => {

    if (
      !props.isOpen ||
      !props.equipment
    ) {

      return;

    }


    form.value = {

      ...props.equipment,

    };

  },

  {

    deep: true,

    immediate: true,

  }

);


/* =====================================================
   SUBMIT FORM
===================================================== */

const submitForm = () => {


  if (
    !form.value.name.trim()
  ) {

    alert(
      "Please enter equipment name."
    );

    return;

  }


  if (
    !form.value.classroom.trim()
  ) {

    alert(
      "Please enter classroom."
    );

    return;

  }


  if (
    form.value.quantity < 1
  ) {

    alert(
      "Quantity must be at least 1."
    );

    return;

  }


  emit(
    "save",
    {

      ...form.value,

      quantity:
        Number(
          form.value.quantity
        ),

    }
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


<style scoped>

form {

  max-width: 700px;

  margin: auto;

}


ion-item {

  margin-bottom: 12px;

}


.form-buttons {

  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 10px;

  margin-top: 25px;

}


@media (max-width: 500px) {

  .form-buttons {

    grid-template-columns:
      1fr;

  }

}

</style>
```
