import { shallowMount, mount } from '@vue/test-utils'
import Login from '@/components/Login.vue'

describe('Login.vue', () => {
  it('should render email and password input fields', () => {
    const wrapper = shallowMount(Login)
    expect(wrapper.find('#email-input').exists()).toBe(true)
    expect(wrapper.find('#password-input').exists()).toBe(true)
  })

  it('should update email and password data properties when input values change', async () => {
    const wrapper = mount(Login)
    const emailInput = wrapper.find('#email-input')
    const passwordInput = wrapper.find('#password-input')

    await emailInput.setValue('test@gmail.com')
    await passwordInput.setValue('password123')

    expect(wrapper.vm.email).toBe('test@gmail.com')
    expect(wrapper.vm.password).toBe('password123')
  })
})
