import { mount, shallowMount } from "@vue/test-utils";
import Validation from "@/utils/Validation";

import Register from "@/views/Register";


describe("Registration tests", ()=>{
    it("Prompts user to register", ()=>{
        const wrapper = shallowMount(Register, {
            propts: {
                user: undefined
            }
        })

        expect(wrapper.text()).toMatch("RegisterContinue Already have an account? Sign in");      
    })

   

    it("should display a button displaying the word continue", ()=>{
        const wrapper = shallowMount(Register)
        expect(wrapper.find('button').text()).toEqual('Continue')
    })

    it("should have inputs for email, password and confirm password", ()=>{
        const wrapper = shallowMount(Register)
        expect(wrapper.find('input#email')).toBeTruthy;
        expect(wrapper.find('input#password')).toBeTruthy;
        expect(wrapper.find('input#confirmPassword')).toBeTruthy;
    })

    it("Test to see if user can input details", ()=>{
        

        const wrapper = mount(Register)
        wrapper.find("#email").setValue("emailTest")
        wrapper.find("#password").setValue("passwordTest");
        wrapper.find("#confirmPassword").setValue("passwordTest");

        expect(wrapper.vm.email.value).toBe("emailTest");
        expect(wrapper.vm.password.value).toBe("passwordTest");
        expect(wrapper.vm.confirmPassword.value).toBe("passwordTest");
    })


    it("tests the password validation method", ()=>{
        const wrapper = mount(Register);
 
        wrapper.find("#email").setValue("test");
        wrapper.find("#password").setValue("test");
         wrapper.find("#confirmPassword").setValue("wrongTest");
 
        //wrapper.vm.continueRegister();
 
        let result = Validation.continueRegister(
        wrapper.vm.email.value,
        wrapper.vm.password.value,
        wrapper.vm.confirmPassword.value
       );
 
        //expect(wrapper.vm.showNextForm).toEqual(false);
 
        expect(result).toMatch("Passwords do not match!");
 
        wrapper.find("#confirmPassword").setValue("test");
 
        //wrapper.vm.continueRegister();
 
        result = Validation.continueRegister(
        wrapper.vm.email.value,
        wrapper.vm.password.value,
        wrapper.vm.confirmPassword.value
       );
 
        //expect(wrapper.vm.showNextForm).toEqual(true);
 
        expect(result).toEqual(null);
         });
    
})