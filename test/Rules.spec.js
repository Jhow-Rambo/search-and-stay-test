import { mount } from '@vue/test-utils'
import Rules from '@/components/Rules.vue'

describe('Rules', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Rules)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
