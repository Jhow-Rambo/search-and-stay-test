import { mount } from '@vue/test-utils'
import index from '@/pages/index.vue'

describe('index', () => {
  it('renders Login component', () => {
    const wrapper = mount(index)
    expect(wrapper.findComponent(index).exists()).toBe(true)
  })
})
