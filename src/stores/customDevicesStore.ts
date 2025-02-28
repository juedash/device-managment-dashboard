import { defineStore } from "pinia";

export const useDevicesStore = defineStore("devices", {
  state: () => ({
    customDevices: [] as Array<string>,
  }),

  actions: {
    addDevice(device: string) {
      this.customDevices.push(device);
      console.log("Updated customDevices:", this.customDevices);
    },
  },

  getters: {
    getCustomDevices: (state) => state.customDevices,
  },
});
