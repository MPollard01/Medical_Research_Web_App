import { mount, shallowMount } from "@vue/test-utils";
import Validation from "@/utils/Validation";

import Login from "@/views/Login";


describe("Login tests", ()=>{
    it("Prompts user to login", ()=>{
        const wrapper = shallowMount(Login, {
            propts: {
                user: undefined
            }
        })

        expect(wrapper.text()).toMatch("Don't have an account yet? Register for free");      
    })

   

    it("should display a button displaying the word Sign In", ()=>{
        const wrapper = shallowMount(Login)
        expect(wrapper.find('button').text()).toEqual('Sign in')
    })

    it("should have inputs for email and password", ()=>{
        const wrapper = shallowMount(Login)
        expect(wrapper.find('input#email')).toBeTruthy;
        expect(wrapper.find('input#password')).toBeTruthy;
    })

    it("Test to see if user can input details", ()=>{
        

        const wrapper = mount(Login)
        wrapper.find("#email").setValue("emailTest")
        wrapper.find("#password").setValue("passwordTest");

        expect(wrapper.vm.email.value).toBe("emailTest");
        expect(wrapper.vm.password.value).toBe("passwordTest");
    })


    it("shows that the login function will throw an error if incorrect data but will work if correct", ()=>{
        const wrapper = mount(Login);
 
        wrapper.find("#email").setValue("dragon13@gmail.com");
        wrapper.find("#password").setValue("");
 
        let result = Validation.login(
        wrapper.vm.email.value,
        wrapper.vm.password.value,
       );
 
        expect(result).toMatch("Please enter a password");
 
        wrapper.find("#password").setValue("testing123");
 
        //wrapper.vm.continueRegister();
 
        result = Validation.login(
        wrapper.vm.email.value,
        wrapper.vm.password.value,
       );
 
        //expect(wrapper.vm.showNextForm).toEqual(true);
 
        expect(result).toEqual(null);
         });
    
});