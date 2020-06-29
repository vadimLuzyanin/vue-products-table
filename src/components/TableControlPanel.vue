<template>
  <div class="table-control-panel" @mouseleave="closeModals">
    <!--sorting products properties -->

    <div class="sorting-fields-container">
      <div class="bold-text">Sorting by:</div>
      <div
        v-for="(filter, name) of columnsList"
        :filter="filter"
        :name="name"
        :key="columnsList[filter]"
        @click="filterBy.includes(name) && $emit('sorting-field-selection', name)"
        :class="!filterBy.includes(name) ? 'disabled-sorting-field' : selectedSortingField === name ? 'selected-sorting-field' : null"
        class="sorting-field"
      >{{filter}}</div>
    </div>

    <!-- actions buttons -->

    <div class="actions-buttons-container">
      <!-- delete selected -->

      <button
        @click="$emit('delete-selected-confirm')"
        :disabled="markedProducts.length === 0"
        class="button"
        :class="markedProducts.length !== 0 && 'button-active'"
      >Delete {{markedProducts.length ? `(${markedProducts.length})` : ''}}</button>

      <!-- per page dropdown -->

      <div class="dropdown">
        <div
          @click="showRowsPerPageDropdown = !showRowsPerPageDropdown"
          class="dropdown-header"
        >{{visibleRows}} per page</div>

        <div v-show="showRowsPerPageDropdown" class="dropdown-content-visible">
          <div v-for="value of [10, 15, 20]" :key="value">
            <label>
              <input :value="value" v-model="computedVisibleRows" type="radio" />
              {{value}}
            </label>
          </div>
        </div>
      </div>

      <!-- pagination -->

      <button @click="$emit('go-back')" :disabled="currentPage === 1" class="button arrow-button">
        <img class="arrow-back" src="../assets/img/Chevron.svg" />
      </button>

      <div class="bold-text">{{paginationState}}</div>

      <button
        @click="$emit('go-forward')"
        :disabled="currentPage === Math.ceil(productsLength/visibleRows)"
        class="button arrow-button"
      >
        <img class="arrow-forward" src="../assets/img/Chevron.svg" />
      </button>

      <!-- select columns -->

      <div class="dropdown">
        <div
          @click="showSelectedColumnsDropdown = !showSelectedColumnsDropdown"
          class="dropdown-header"
        >{{this.filterBy.length === 1 ? `${this.filterBy.length} column selected` : `${this.filterBy.length} columns selected` }}</div>
        <div v-show="showSelectedColumnsDropdown" class="dropdown-content-visible">
          <div class="bold-text select-item">
            <input
              class="custom-checkbox"
              checked
              type="checkbox"
              id="chooseAll"
              @change="switchSelectAll"
            />
            <label for="chooseAll" />
            Select All
          </div>
          <div
            v-for="(filter, name) of columnsList"
            :key="name"
            :filter="filter"
            :name="name"
            class="select-item"
          >
            <input
              class="custom-checkbox"
              v-model="computedVisibleColumns"
              :value="name"
              :id="name"
              type="checkbox"
            />
            <label :for="name" />
            {{filter}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TableControlPanel",
    props: [
      "filterBy",
      "markedProducts",
      "visibleRows",
      "currentPage",
      "productsLength",
      "columnsList",
      "selectedSortingField"
    ],
    data() {
      return {
        showRowsPerPageDropdown: false,
        showSelectedColumnsDropdown: false,
        allSelected: true
      };
    },
    methods: {
      switchSelectAll() {
        if (this.allSelected) {
          this.allSelected = false;
          this.computedVisibleColumns = [];
        } else {
          this.allSelected = true;
          this.computedVisibleColumns = [
            "product",
            "calories",
            "fat",
            "carbs",
            "protein",
            "iron"
          ];
        }
      },
      closeModals() {
        this.showRowsPerPageDropdown = false;
        this.showSelectedColumnsDropdown = false;
      }
    },
    computed: {
      computedVisibleRows: {
        get() {
          return this.visibleRows;
        },
        set(val) {
          this.$emit("visible-rows-change", val);
        }
      },
      computedVisibleColumns: {
        get() {
          return this.filterBy;
        },
        set(val) {
          this.$emit("visible-columns-change", val);
        }
      },
      paginationState() {
        return `${(this.currentPage - 1) * this.visibleRows + 1}-${this.currentPage * this.visibleRows} of ${this.productsLength}`;
      }
    }
  };
</script>

<style scoped>
  .table-control-panel {
    display: flex;
    flex-direction: row;
    width: 1140px;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 16px 0;
  }
  .sorting-fields-container {
    display: flex;
    flex-direction: row;
    width: 540px;
    justify-content: space-between;
    align-items: center;
  }
  .sorting-field {
    display: flex;
    align-items: center;
    border-radius: 2px;
    height: 32px;
  }
  .sorting-field:hover {
    color: #00a11e;
    cursor: pointer;
  }
  .selected-sorting-field {
    padding: 4px 8px;
    background-color: #00a11e;
    color: #ffffff !important;
  }
  .disabled-sorting-field {
    color: #c6cbd4 !important;
    cursor: default !important;
  }
  .actions-buttons-container {
    display: flex;
    flex-direction: row;
    width: 540px;
    justify-content: space-between;
    align-items: center;
  }
  .arrow-button {
    padding: 0 12px;
  }
  .arrow-back {
    transform: rotate(90deg);
  }
  .arrow-forward {
    transform: rotate(270deg);
  }
  .select-item {
    display: flex;
    margin-bottom: 12px;
  }
</style>