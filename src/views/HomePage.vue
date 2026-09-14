```vue
<template>
  <ion-page>

    <!-- =====================================================
         HEADER
    ====================================================== -->

    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>
          Classroom Equipment Tracker
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <hr />

      <!-- =====================================================
           FIREBASE CONNECTION
      ====================================================== -->

      <ion-card>

        <ion-card-header>

          <ion-card-title>
            Firebase Connection
          </ion-card-title>

        </ion-card-header>

        <ion-card-content>

          <ion-badge
            :color="
              firebaseConnected
                ? 'success'
                : 'danger'
            "
          >

            {{
              firebaseConnected
                ? "Connected"
                : "Disconnected"
            }}

          </ion-badge>

          <p>
            {{
              firebaseConnected
                ? "Realtime Database connection is working."
                : "Realtime Database is not connected."
            }}
          </p>

          <ion-button
            expand="block"
            fill="outline"
            @click="checkFirebaseConnection"
          >

            Check Firebase Connection

          </ion-button>

        </ion-card-content>

      </ion-card>

      <!-- =====================================================
           TITLE / ADD BUTTON
      ====================================================== -->

      <div class="equipment-header">

        <div>

          <h1>
            Classroom Equipment Tracker
          </h1>

          <p>
            Manage classroom equipment records
          </p>

        </div>

        <ion-button
          color="primary"
          @click="openAddForm"
        >

          <ion-icon
            slot="start"
            :icon="addOutline"
          />

          Add Equipment

        </ion-button>

      </div>

      <!-- =====================================================
           DASHBOARD
      ====================================================== -->

      <div class="dashboard-grid">

        <!-- TOTAL -->

        <ion-card>

          <ion-card-content>

            <div class="dashboard-icon">

              <ion-icon
                :icon="cubeOutline"
              />

            </div>

            <div>

              <div class="dashboard-label">
                Total Equipment
              </div>

              <div class="dashboard-number">

                {{ equipments.length }}

              </div>

            </div>

          </ion-card-content>

        </ion-card>

        <!-- AVAILABLE -->

        <ion-card>

          <ion-card-content>

            <div class="dashboard-icon">

              <ion-icon
                :icon="checkmarkCircleOutline"
              />

            </div>

            <div>

              <div class="dashboard-label">
                Available
              </div>

              <div class="dashboard-number">

                {{ availableCount }}

              </div>

            </div>

          </ion-card-content>

        </ion-card>

        <!-- MAINTENANCE -->

        <ion-card>

          <ion-card-content>

            <div class="dashboard-icon">

              <ion-icon
                :icon="constructOutline"
              />

            </div>

            <div>

              <div class="dashboard-label">
                Maintenance
              </div>

              <div class="dashboard-number">

                {{ maintenanceCount }}

              </div>

            </div>

          </ion-card-content>

        </ion-card>

      </div>

      <!-- =====================================================
           SEARCH
      ====================================================== -->

      <ion-searchbar
        v-model="searchText"
        placeholder="Search equipment..."
      />

      <!-- =====================================================
           EQUIPMENT RECORDS
      ====================================================== -->

      <ion-card>

        <ion-card-header>

          <ion-card-title>
            Equipment Records
          </ion-card-title>

        </ion-card-header>

        <ion-card-content>

          <!-- LOADING -->

          <div
            v-if="loading"
            class="loading-container"
          >

            <ion-spinner />

            <p>
              Loading equipment...
            </p>

          </div>

          <!-- NO DATA -->

          <div
            v-else-if="
              filteredEquipments.length === 0
            "
            class="empty-container"
          >

            <p>
              No equipment records found.
            </p>

          </div>

          <!-- EQUIPMENT LIST -->

          <div
            v-else
            class="equipment-list"
          >

            <div
              v-for="
                equipment in filteredEquipments
              "
              :key="equipment.id"
              class="equipment-item"
            >

              <!-- INFORMATION -->

              <div class="equipment-info">

                <h2>
                  {{ equipment.name }}
                </h2>

                <p>

                  <strong>
                    Code:
                  </strong>

                  {{ equipment.code }}

                </p>

                <p>

                  <strong>
                    Classroom:
                  </strong>

                  {{ equipment.classroom }}

                </p>

                <p>

                  <strong>
                    Category:
                  </strong>

                  {{ equipment.category }}

                </p>

                <p>

                  <strong>
                    Quantity:
                  </strong>

                  {{ equipment.quantity }}

                </p>

                <p>

                  <strong>
                    Date Acquired:
                  </strong>

                  {{ equipment.dateAcquired || "N/A" }}

                </p>

                <p
                  v-if="equipment.notes"
                >

                  <strong>
                    Notes:
                  </strong>

                  {{ equipment.notes }}

                </p>

                <!-- BADGES -->

                <div class="badges">

                  <ion-badge
                    :color="
                      conditionColor(
                        equipment.condition
                      )
                    "
                  >

                    {{ equipment.condition }}

                  </ion-badge>

                  <ion-badge
                    :color="
                      statusColor(
                        equipment.status
                      )
                    "
                  >

                    {{ equipment.status }}

                  </ion-badge>

                </div>

              </div>

              <!-- ACTION BUTTONS -->

              <div class="equipment-actions">

                <!-- EDIT -->

                <ion-button
                  fill="clear"
                  color="primary"
                  @click="
                    openEditForm(
                      equipment
                    )
                  "
                >

                  <ion-icon
                    :icon="createOutline"
                  />

                </ion-button>

                <!-- DELETE -->

                <ion-button
                  fill="clear"
                  color="danger"
                  @click="
                    deleteEquipmentRecord(
                      equipment
                    )
                  "
                >

                  <ion-icon
                    :icon="trashOutline"
                  />

                </ion-button>

              </div>

            </div>

          </div>

        </ion-card-content>

      </ion-card>

      <!-- =====================================================
           EQUIPMENT FORM
      ====================================================== -->

      <EquipmentForm

        :is-open="
          showEquipmentForm
        "

        :equipment="
          selectedEquipment
        "

        @save="
          saveEquipment
        "

        @cancel="
          closeForm
        "

      />

    </ion-content>

  </ion-page>

</template>

<script setup lang="ts">

/* =====================================================
   IONIC
===================================================== */

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonSearchbar,
  IonSpinner,
} from "@ionic/vue";


/* =====================================================
   ICONS
===================================================== */

import {
  addOutline,
  cubeOutline,
  checkmarkCircleOutline,
  constructOutline,
  createOutline,
  trashOutline,
} from "ionicons/icons";


/* =====================================================
   VUE
===================================================== */

import {
  ref,
  computed,
  onMounted,
} from "vue";


/* =====================================================
   EQUIPMENT COMPONENT
===================================================== */

import EquipmentForm
  from "@/components/EquipmentForm.vue";


/* =====================================================
   EQUIPMENT SERVICE
===================================================== */

import {
  addEquipment,
  getEquipments,
  updateEquipment,
  deleteEquipment,
} from "@/services/equipmentServices";


/* =====================================================
   EQUIPMENT TYPE
===================================================== */

import type {
  Equipment,
  EquipmentData,
} from "@/services/equipmentServices";


/* =====================================================
   FIREBASE REALTIME DATABASE
===================================================== */

import {
  ref as firebaseRef,
  onValue,
} from "firebase/database";


import { db } from "@/firebase";


/* =====================================================
   EQUIPMENT DATA
===================================================== */

const equipments =
  ref<Equipment[]>([]);


/* =====================================================
   SELECTED EQUIPMENT
===================================================== */

const selectedEquipment =
  ref<Equipment | null>(
    null
  );


/* =====================================================
   FORM STATE
===================================================== */

const showEquipmentForm =
  ref(false);


/* =====================================================
   SEARCH
===================================================== */

const searchText =
  ref("");


/* =====================================================
   LOADING
===================================================== */

const loading =
  ref(false);


/* =====================================================
   FIREBASE CONNECTION
===================================================== */

const firebaseConnected =
  ref(false);


/* =====================================================
   CHECK FIREBASE CONNECTION
===================================================== */

const checkFirebaseConnection =
  () => {

    const connectedRef =
      firebaseRef(
        db,
        ".info/connected"
      );


    onValue(

      connectedRef,

      (snapshot) => {

        firebaseConnected.value =
          snapshot.val() === true;


        if (
          firebaseConnected.value
        ) {

          alert(
            "Firebase Connected!"
          );

        }

        else {

          alert(
            "Firebase is not connected."
          );

        }

      },

      {
        onlyOnce: true,
      }

    );

  };


/* =====================================================
   LOAD EQUIPMENT
===================================================== */

const loadEquipments =
  async () => {

    try {

      loading.value =
        true;


      const data =
        await getEquipments();


      equipments.value =
        data;

    }

    catch (error) {

      console.error(
        "Error loading equipment:",
        error
      );


      alert(
        "Failed to load equipment from Firebase."
      );

    }

    finally {

      loading.value =
        false;

    }

  };


/* =====================================================
   SEARCH FILTER
===================================================== */

const filteredEquipments =
  computed(() => {

    const search =
      searchText.value
        .trim()
        .toLowerCase();


    if (!search) {

      return equipments.value;

    }


    return equipments.value.filter(
      (equipment) => {

        return (

          equipment.code
            .toLowerCase()
            .includes(search)

          ||

          equipment.name
            .toLowerCase()
            .includes(search)

          ||

          equipment.category
            .toLowerCase()
            .includes(search)

          ||

          equipment.classroom
            .toLowerCase()
            .includes(search)

          ||

          equipment.status
            .toLowerCase()
            .includes(search)

        );

      }
    );

  });


/* =====================================================
   AVAILABLE COUNT
===================================================== */

const availableCount =
  computed(() => {

    return equipments.value.filter(
      (equipment) =>
        equipment.status ===
        "Available"
    ).length;

  });


/* =====================================================
   MAINTENANCE COUNT
===================================================== */

const maintenanceCount =
  computed(() => {

    return equipments.value.filter(
      (equipment) =>
        equipment.status ===
        "Maintenance"
    ).length;

  });


/* =====================================================
   OPEN ADD FORM
===================================================== */

const openAddForm =
  () => {

    selectedEquipment.value =
      null;


    showEquipmentForm.value =
      true;

  };


/* =====================================================
   OPEN EDIT FORM
===================================================== */

const openEditForm =
  (
    equipment: Equipment
  ) => {

    selectedEquipment.value = {

      ...equipment,

    };


    showEquipmentForm.value =
      true;

  };


/* =====================================================
   CLOSE FORM
===================================================== */

const closeForm =
  () => {

    showEquipmentForm.value =
      false;


    selectedEquipment.value =
      null;

  };


/* =====================================================
   SAVE EQUIPMENT
===================================================== */

const saveEquipment =
  async (
    equipment: Equipment
  ) => {

    try {

      loading.value =
        true;


      /* =================================================
         DATA TO SAVE
      ================================================== */

      const equipmentData:
        EquipmentData = {

        code:
          equipment.code,

        name:
          equipment.name,

        category:
          equipment.category,

        classroom:
          equipment.classroom,

        quantity:
          Number(
            equipment.quantity
          ),

        condition:
          equipment.condition,

        status:
          equipment.status,

        dateAcquired:
          equipment.dateAcquired,

        notes:
          equipment.notes,

      };


      /* =================================================
         ADD
      ================================================== */

      if (
        !equipment.id
      ) {

        await addEquipment(
          equipmentData
        );

      }


      /* =================================================
         UPDATE
      ================================================== */

      else {

        await updateEquipment(

          equipment.id,

          equipmentData

        );

      }


      /* =================================================
         RELOAD
      ================================================== */

      await loadEquipments();


      closeForm();


      alert(

        equipment.id

          ? "Equipment updated successfully!"

          : "Equipment added successfully!"

      );

    }

    catch (error) {

      console.error(
        "Error saving equipment:",
        error
      );


      alert(
        "Failed to save equipment to Firebase."
      );

    }

    finally {

      loading.value =
        false;

    }

  };


/* =====================================================
   DELETE EQUIPMENT
===================================================== */

const deleteEquipmentRecord =
  async (
    equipment: Equipment
  ) => {

    const confirmed =
      confirm(

        `Are you sure you want to delete "${equipment.name}"?`

      );


    if (!confirmed) {

      return;

    }


    try {

      loading.value =
        true;


      await deleteEquipment(
        equipment.id
      );


      await loadEquipments();


      alert(
        "Equipment deleted successfully!"
      );

    }

    catch (error) {

      console.error(
        "Error deleting equipment:",
        error
      );


      alert(
        "Failed to delete equipment."
      );

    }

    finally {

      loading.value =
        false;

    }

  };


/* =====================================================
   CONDITION COLOR
===================================================== */

const conditionColor =
  (
    condition: string
  ) => {

    switch (condition) {

      case "Good":

        return "success";


      case "Fair":

        return "warning";


      case "Damaged":

        return "danger";


      default:

        return "medium";

    }

  };


/* =====================================================
   STATUS COLOR
===================================================== */

const statusColor =
  (
    status: string
  ) => {

    switch (status) {

      case "Available":

        return "success";


      case "In Use":

        return "primary";


      case "Maintenance":

        return "warning";


      case "Missing":

        return "danger";


      default:

        return "medium";

    }

  };


/* =====================================================
   PAGE LOAD
===================================================== */

onMounted(
  async () => {

    await loadEquipments();

    checkFirebaseConnection();

  }
);

</script>


<style scoped>

/* =====================================================
   HEADER
===================================================== */

.equipment-header {

  display: flex;

  justify-content:
    space-between;

  align-items:
    center;

  gap: 20px;

  margin-top:
    30px;

  margin-bottom:
    25px;

}


.equipment-header h1 {

  margin: 0;

  font-size:
    30px;

  font-weight:
    700;

}


.equipment-header p {

  margin-top:
    8px;

  color:
    var(--ion-color-medium);

}


/* =====================================================
   DASHBOARD
===================================================== */

.dashboard-grid {

  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 20px;

  margin-bottom:
    20px;

}


.dashboard-grid ion-card {

  margin: 0;

}


.dashboard-grid ion-card-content {

  display: flex;

  align-items:
    center;

  gap: 20px;

}


.dashboard-icon {

  font-size:
    42px;

  color:
    var(--ion-color-primary);

}


.dashboard-label {

  color:
    var(--ion-color-medium);

  font-size:
    16px;

}


.dashboard-number {

  font-size:
    30px;

  font-weight:
    600;

  margin-top:
    5px;

}


/* =====================================================
   EQUIPMENT LIST
===================================================== */

.equipment-list {

  display: flex;

  flex-direction:
    column;

}


.equipment-item {

  display: flex;

  justify-content:
    space-between;

  align-items:
    center;

  gap: 20px;

  padding:
    20px 15px;

  border-bottom:
    1px solid
    var(--ion-color-light);

}


.equipment-item:last-child {

  border-bottom:
    none;

}


.equipment-info {

  flex: 1;

}


.equipment-info h2 {

  margin:
    0 0 8px;

  font-size:
    18px;

  font-weight:
    700;

  text-transform:
    uppercase;

}


.equipment-info p {

  margin:
    5px 0;

  color:
    var(--ion-color-medium);

}


.badges {

  display: flex;

  gap: 8px;

  margin-top:
    12px;

}


.equipment-actions {

  display: flex;

  align-items:
    center;

}


/* =====================================================
   LOADING
===================================================== */

.loading-container {

  display: flex;

  flex-direction:
    column;

  align-items:
    center;

  justify-content:
    center;

  padding:
    40px;

}


.empty-container {

  text-align:
    center;

  padding:
    40px;

  color:
    var(--ion-color-medium);

}


/* =====================================================
   MOBILE
===================================================== */

@media (max-width: 700px) {

  .equipment-header {

    flex-direction:
      column;

    align-items:
      stretch;

  }


  .equipment-header h1 {

    font-size:
      24px;

  }


  .dashboard-grid {

    grid-template-columns:
      1fr;

  }


  .equipment-item {

    align-items:
      flex-start;

  }

}


@media (max-width: 450px) {

  .equipment-item {

    flex-direction:
      column;

  }


  .equipment-actions {

    width:
      100%;

    justify-content:
      flex-end;

  }

}

</style>
```
