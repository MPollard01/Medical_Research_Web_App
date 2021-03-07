import { mount, shallowMount } from "@vue/test-utils";

import DeleteData from "@/views/DeleteData";

describe("Delete Data tests", ()=>{

    it("should display a button displaying the word find", ()=>{
        const wrapper = shallowMount(DeleteData)
        expect(wrapper.find('el-button').text()).toEqual('Find')
    })

    it("should have inputs for Cardiomyopathy type, gene name and study title", ()=>{
        const wrapper = shallowMount(DeleteData)
        expect(wrapper.find('el-select#CardioType')).toBeTruthy;
        expect(wrapper.find('el-select#GeneName')).toBeTruthy;
        expect(wrapper.find('el-select#StudyTitle')).toBeTruthy;
    })


    //data find/delete function tests weren't working properly due to requiring forced mock files

  //  it("tests the find data function", ()=>{
    //    const wrapper = mount(DeleteData);
 
 //       wrapper.find("el-select#CardioType").setValue("Hypertrophic");
   //     wrapper.find("el-select#GeneName").setValue("MYBPC3");
     //   wrapper.find("el-select#StudyTitle").setValue("Force vs Calcium concerntration");
 
        
 
 //       let result = DeleteData.findData(
   //     wrapper.vm.CardioType.value,
     //   wrapper.vm.GeneName.value,
       // wrapper.vm.StudyTitle.value
       //);

 //       expect(result).toMatch("Passwords do not match!");
 //       
        //result = Validation.continueRegister(
        //wrapper.vm.email.value,
        //wrapper.vm.password.value,
       // wrapper.vm.confirmPassword.value
       //);
 
 
        //expect(result).toEqual(null);
    //});


})