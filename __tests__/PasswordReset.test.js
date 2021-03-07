import { mount, shallowMount } from "@vue/test-utils";
import Validation from "@/utils/Validation";

import PasswordReset from "@/views/PasswordReset";


describe("Registration tests", ()=>{
    it("Prompts user to register", ()=>{
        const wrapper = shallowMount(PasswordReset, {
            propts: {
                user: undefined
            }
        })

        expect(wrapper.text()).toMatch("Please enter your email below to request a password reset link...");      
    })

   

    it("should display a button displaying the word Submit", ()=>{
        const wrapper = shallowMount(PasswordReset)
        expect(wrapper.find('button').text()).toEqual('Submit')
    })

    it("should have inputs for email", ()=>{
        const wrapper = shallowMount(PasswordReset)
        expect(wrapper.find('input#email')).toBeTruthy;
    })

    it("tests the password reset function calls an error", ()=>{
        const wrapper = mount(PasswordReset);
 
        wrapper.find("#email").setValue("");
 
 
        let result = Validation.passwordReset(
        wrapper.vm.email.value,
       );
 
 
        expect(result).toMatch("Please enter an email address");
    })
    
})