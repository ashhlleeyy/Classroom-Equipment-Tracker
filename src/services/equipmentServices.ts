import {
  ref as databaseRef,
  push,
  set,
  get,
  update,
  remove,
} from "firebase/database";

import { db } from "@/firebase";


/* =====================================================
   EQUIPMENT TYPE
===================================================== */

export interface Equipment {

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
   EQUIPMENT DATA WITHOUT ID
===================================================== */

export type EquipmentData = Omit<
  Equipment,
  "id"
>;


/* =====================================================
   DATABASE LOCATION
===================================================== */

const equipmentRef =
  databaseRef(
    db,
    "classroom_equipment"
  );


/* =====================================================
   ADD EQUIPMENT
===================================================== */

export const addEquipment = async (
  equipment: EquipmentData
): Promise<Equipment> => {

  const newEquipmentRef =
    push(equipmentRef);

  const id =
    newEquipmentRef.key;

  if (!id) {

    throw new Error(
      "Firebase failed to generate equipment ID."
    );

  }

  await set(
    newEquipmentRef,
    equipment
  );

  return {

    id,

    ...equipment,

  };

};


/* =====================================================
   GET ALL EQUIPMENT
===================================================== */

export const getEquipments =
  async (): Promise<Equipment[]> => {

    const snapshot =
      await get(equipmentRef);

    if (!snapshot.exists()) {

      return [];

    }

    const data =
      snapshot.val();

    const equipments:
      Equipment[] = [];

    Object.keys(data).forEach(
      (id) => {

        equipments.push({

          id,

          code:
            data[id].code ?? "",

          name:
            data[id].name ?? "",

          category:
            data[id].category ?? "",

          classroom:
            data[id].classroom ?? "",

          quantity:
            Number(
              data[id].quantity ?? 0
            ),

          condition:
            data[id].condition ?? "Good",

          status:
            data[id].status ?? "Available",

          dateAcquired:
            data[id].dateAcquired ?? "",

          notes:
            data[id].notes ?? "",

        });

      }
    );

    return equipments;

  };


/* =====================================================
   UPDATE EQUIPMENT
===================================================== */

export const updateEquipment =
  async (
    id: string,
    equipment: EquipmentData
  ): Promise<void> => {

    const itemRef =
      databaseRef(
        db,
        `classroom_equipment/${id}`
      );

    await update(
      itemRef,
      equipment
    );

  };


/* =====================================================
   DELETE EQUIPMENT
===================================================== */

export const deleteEquipment =
  async (
    id: string
  ): Promise<void> => {

    const itemRef =
      databaseRef(
        db,
        `classroom_equipment/${id}`
      );

    await remove(
      itemRef
    );

  };