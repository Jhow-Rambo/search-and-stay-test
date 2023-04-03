import { mount } from '@vue/test-utils'
import rules from '@/pages/rules.vue'

describe('index', () => {
  it('renders Login component', () => {
    const wrapper = mount(rules)
    expect(wrapper.findComponent(rules).exists()).toBe(true)
  })
})
