import { mount, shallowMount } from "@vue/test-utils";

import AddData from "@/views/AddData";



describe("Add Data tests", ()=>{
    
     it("should display a button displaying the word upload", ()=>{
        const wrapper = shallowMount(AddData)
        expect(wrapper.find('el-button').text()).toEqual('Upload')
    })

    it("should have inputs for phenotype, gene name and study title", ()=>{
        const wrapper = shallowMount(AddData)
        expect(wrapper.find('el-select#Phenotype')).toBeTruthy;
        expect(wrapper.find('el-select#GeneName')).toBeTruthy;
        expect(wrapper.find('el-select#StudyTitle')).toBeTruthy;
    })

    it("should have an upload data submission area", ()=>{
       
        const wrapper = mount(AddData)
        expect(wrapper.find('el-upload#upload')).toBeTruthy;
        expect(wrapper.find('el-button#UploadButton')).toBeTruthy

    })

})
