import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import axios from "axios";
import HomeView from "@/views/HomeView.vue";
import { useDevicesStore } from "@/stores/customDevicesStore";
import type { MockedFunction } from "vitest";
vi.mock("axios");

describe("HomeView Component", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    const devicesStore = useDevicesStore();
    vi.spyOn(devicesStore, "getCustomDevices", "get").mockReturnValue([
      "1",
      "2",
    ]);

    (
      axios.get as unknown as MockedFunction<typeof axios.get>
    ).mockResolvedValue({
      data: [
        {
          id: "1",
          name: "Device A",
          data: {
            price: 100,
            category: "Phones",
            color: "Black",
            storage: "128GB",
          },
        },
      ],
    });
  });

  it("mounts the component and interacts with buttons", async () => {
    const wrapper = mount(HomeView, {
      global: {
        stubs: {
          RouterLink: true,
          DeviceCardItem: true,
        },
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.exists()).toBe(true);

    const buttons = wrapper.findAll("button#cardButton");
    expect(buttons.length).toBeGreaterThan(0);

    if (buttons.length > 0) {
      await buttons[0].trigger("click");
      expect(wrapper.vm.selectedView).toBe("card");
    }
  });
});
