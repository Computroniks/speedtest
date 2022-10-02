// SPDX-FileCopyrightText: 2021-2022 vuejs
// SPDX-License-Identifier: MIT

import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import HelloWorld from "../HelloWorld.vue";

describe("HelloWorld", () => {
    it("renders properly'", () => {
        const wrapper = mount(HelloWorld, { props: { msg: "Hello Vitest" } });
        expect(wrapper.text()).toContain("Hello Vitest");
    });
});
