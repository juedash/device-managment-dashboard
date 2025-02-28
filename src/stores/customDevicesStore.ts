import { defineStore } from "pinia";

export const useDevicesStore = defineStore("devices", {
  state: () => ({
    customDevices: [] as Array<string>,
  }),

  actions: {
    addDevice(device: any) {
      console.log(this.customDevices);
    },
  },

  getters: {
    getCustomDevices: (state) => state.customDevices,
  },
});
