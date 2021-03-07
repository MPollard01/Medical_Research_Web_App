import { mount, shallowMount } from "@vue/test-utils";

import AdvancedSearch from "@/components/AdvancedSearch";



describe("Add Data tests", ()=>{
    
     it("should display a button displaying the word upload", ()=>{
        const wrapper = shallowMount(AdvancedSearch)
        expect(wrapper.find('el-button').text()).toEqual('Display')
    })

    it("should confirm that the forms are displayed on the page", ()=>{
        const wrapper = shallowMount(AdvancedSearch)
        expect(wrapper.find('el-form#terms')).toBeTruthy;
        expect(wrapper.find('el-form#genes')).toBeTruthy;
    })
})
