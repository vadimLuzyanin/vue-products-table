<template>
  <tr class="table-header">
    <!-- checkbox select all products -->

    <td class="table-header-checkbox">
      <input
        type="checkbox"
        class="custom-checkbox"
        id="select-all-visible-products"
        @change="$emit('switch-select-all-products')"
      />
      <label for="select-all-visible-products" />
    </td>

    <!-- product properties -->

    <td
      v-for="filter of filterBy"
      :filter="filter"
      :key="filter"
      @click="selectedSortingField === filter && $emit('do-sort', filter)"
      :class="selectedSortingField === filter && 'selected-sorting-field-text'"
      class="table-header-row bold-text"
    >
      {{columnsList[filter]}}
      <img
        src="../assets/img/Arrow.svg"
        v-show="sortBy === filter"
        :class="sortOrder === 'asc' ? 'arrow-up' : 'arrow-down'"
      />
    </td>

    <!-- delete button field (for table consistency) -->

    <td></td>
  </tr>
</template>

<script>
  export default {
    name: "TableHeaderRow",
    props: ["filterBy", "sortBy", "selectedSortingField", "sortOrder", "columnsList"]
  };
</script>

<style scoped>
  .table-header {
    border-bottom: 1px solid #ededed;
    background-color: #ffffff;
  }
  .table-header-checkbox {
    padding: 16px 0 16px 37px;
    width: 80px;
  }
  .table-header-row {
    padding: 16px 0;
  }
  .selected-sorting-field-text {
    color: #00a11e;
    cursor: pointer;
  }
  .arrow-up {
    transform: rotate(0deg);
  }
  .arrow-down {
    transform: rotate(180deg);
  }
</style>