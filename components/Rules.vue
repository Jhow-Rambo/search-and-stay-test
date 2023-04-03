<template>
  <b-container
    class="rules-container d-flex justify-content-center align-items-center"
  >
    <b-container class="rules-content">
      <div class="mb-4 header-content">
        <h2>Rules of House</h2>
        <div>
          <b-button variant="success" size="lg" @click="showCreateModal = true"
            >Create</b-button
          >
          <b-button variant="danger" size="lg" @click="logout">Logout</b-button>
        </div>
      </div>

      <div
        v-if="isLoading"
        class="d-flex justify-content-center align-items-center"
      >
        <b-spinner variant="primary" label="Loading..."></b-spinner>
      </div>

      <div v-else>
        <ul>
          <li v-for="entity in rules" :key="entity.id">
            <div class="rule-input-container">
              <input
                v-model="entity.name"
                class="rule-input"
                type="text"
                maxlength="50"
              />
            </div>
            <div class="rule-buttons-container">
              <b-button
                variant="danger"
                size="lg"
                @click="removeRule(entity.id)"
                >Delete</b-button
              >
              <b-button variant="primary" size="lg" @click="updateRule(entity)"
                >Save</b-button
              >
            </div>
          </li>
        </ul>
      </div>
    </b-container>

    <b-modal
      v-model="showCreateModal"
      title="New Rule"
      hide-footer
      @hide="resetModalInput"
    >
      <b-form @submit.prevent="createRule">
        <b-form-group
          id="input-group-1"
          label="Name of rule:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="newRuleName"
            class="rule-input"
            maxlength="50"
            required
          ></b-form-input>
        </b-form-group>
        <b-container class="d-flex justify-content-end">
          <b-button type="submit" variant="success" size="lg">Save</b-button>
          <b-button
            type="button"
            variant="secondary"
            size="lg"
            class="ml-2"
            @click="showCreateModal = false"
            >Cancel</b-button
          >
        </b-container>
      </b-form>
    </b-modal>
  </b-container>
</template>

<script>
import { BContainer, BButton, BSpinner } from 'bootstrap-vue'
import axios from 'axios'

export default {
  name: 'RulesPage',
  components: {
    BContainer,
    BButton,
    BSpinner,
  },
  data() {
    return {
      rules: [],
      showCreateModal: false,
      newRuleName: '',
      isLoading: true,
    }
  },
  created() {
    this.loadRules()
  },
  methods: {
    loadRules() {
      const token = localStorage.getItem('token')

      axios
        .get('https://sys-dev.searchandstay.com/api/admin/house_rules', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.rules = response.data.data.entities
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    removeRule(id) {
      const token = localStorage.getItem('token')
      axios
        .delete(
          `https://sys-dev.searchandstay.com/api/admin/house_rules/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((_response) => {
          this.$toast.error('Rule deleted successfully')
          this.loadRules()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateRule(rule) {
      const token = localStorage.getItem('token')

      const data = {
        house_rules: {
          name: rule.name,
          active: 0,
        },
      }
      axios
        .put(
          `https://sys-dev.searchandstay.com/api/admin/house_rules/${rule.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((_response) => {
          this.$toast.info('Rule updated successfully')
          this.loadRules()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    createRule() {
      const token = localStorage.getItem('token')

      const data = {
        house_rules: {
          name: this.newRuleName,
          active: 1,
        },
      }
      axios
        .post('https://sys-dev.searchandstay.com/api/admin/house_rules', data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((_response) => {
          this.showCreateModal = false
          this.$toast.success('Rule created successfully')
          this.loadRules()
        })
        .catch((error) => {
          console.log(error)
        })
    },

    resetModalInput() {
      this.newRuleName = ''
    },

    logout() {
      localStorage.removeItem('token')
      this.$router.push('/')
    },
  },
}
</script>
<style scoped>
.rules-container {
  max-width: 1500px;
  margin: auto;
  padding: 50px;
  background-color: rgb(255 255 255);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-wrap: wrap;
}

.rules-content {
  padding: 20px;
  max-width: 600px;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0 4px 14px rgb(0 0 0 / 50%);
  margin: 0 auto;
}

.rules-content ul {
  list-style-type: none;
  padding: 0;
  padding-inline-start: 0;
}

.rules-content li {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}

.header-content {
  flex-wrap: wrap;
  padding: 0;
  display: flex;
  justify-content: space-between;
}

.rules-content button {
  margin-left: 10px;
}

.rule-input {
  width: 100%;
  max-width: 400px;
  height: 40px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}

.rules-content h2 {
  margin-top: 0;
}

@media only screen and (max-width: 768px) {
  .rules-container {
    padding: 10px;
  }

  .rule-input-container {
    width: 100%;
  }

  .rule-input {
    max-width: 100%;
  }

  .rule-buttons-container {
    width: 100%;
    display: flex;
    margin-top: 10px;
    justify-content: flex-end;
  }
}

@media only screen and (max-width: 500px) {
  .header-content {
    flex-wrap: wrap;
    padding: 0;
    display: flex;
    justify-content: center;
  }
}
</style>
