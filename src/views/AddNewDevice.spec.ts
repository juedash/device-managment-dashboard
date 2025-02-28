import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { useDevicesStore } from "@/stores/customDevicesStore";
import axios from "axios";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AddNewDeviceView from "@/views/AddNewDeviceView.vue";
import { toast } from "vue3-toastify";
import type { MockedFunction } from "vitest";

vi.mock("axios");
vi.mock("vue3-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: HomeView }],
});

describe("AddDevice Component", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    router.push("/add-device");
  });

  it("submits the form and adds a new device", async () => {
    const devicesStore = useDevicesStore();
    const addDeviceSpy = vi.spyOn(devicesStore, "addDevice");

    (
      axios.post as unknown as MockedFunction<typeof axios.post>
    ).mockResolvedValue({ data: { id: "123" } });

    const wrapper = mount(AddNewDeviceView, {
      global: {
        plugins: [router],
        stubs: { BackButton: true },
      },
    });

    await wrapper.find("#device-name").setValue("Test Device");
    await wrapper.find("#price").setValue("100");
    await wrapper.find("#category").setValue("Smartphone");
    await wrapper.find("#color").setValue("Black");
    await wrapper.find("#storageSize").setValue("128");
    await wrapper.find("#storageUnit").setValue("GB");

    await wrapper.find("form").trigger("submit.prevent");

    expect(axios.post).toHaveBeenCalledWith("api/objects", {
      name: "Test Device",
      data: {
        capacity: "128 GB",
        price: "100",
        category: "Smartphone",
        color: "Black",
      },
    });

    expect(toast.success).toHaveBeenCalledWith(
      "Device was added successsfully"
    );
  });
});
