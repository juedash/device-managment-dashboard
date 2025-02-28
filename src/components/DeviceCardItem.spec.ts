import { mount } from "@vue/test-utils";
import { vi, describe, it, expect } from "vitest";
import DeviceCardtem from "@/components/DeviceCardtem.vue";
import type { ResponseData } from "@/types/main";

describe("DeviceCardtem deletion", () => {
  it("should call window.confirm and emit deleteItem event when delete button is clicked", async () => {
    const confirmMock = vi.fn().mockReturnValue(true); // Simulating "OK" click
    window.confirm = confirmMock;

    const item = {
      id: "123",
      name: "Device 1",
      data: { price: "100" },
    } as unknown as ResponseData;

    // Mount the component
    const wrapper = mount(DeviceCardtem, {
      props: {
        item,
      },
    });

    await wrapper.find("button").trigger("click");
    expect(confirmMock).toHaveBeenCalledWith("Do you want to delete the item?");

    expect(wrapper.emitted("deleteItem")).toBeTruthy();
    expect(wrapper.emitted("deleteItem")?.[0])?.toEqual([item.id]);
  });
});
