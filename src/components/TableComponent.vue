<template>
  <div>
    <TableControlPanel
      :filterBy="filterBy"
      :selectedSortingField="selectedSortingField"
      :markedProducts="markedProducts"
      :visibleRows="visibleRows"
      :currentPage="currentPage"
      :productsLength="products.length"
      :columnsList="columnsList"
      v-on:sorting-field-selection="handleSortingFieldSelection"
      v-on:delete-selected-confirm="deleteSelected"
      v-on:visible-rows-change="changeVisibleRows"
      v-on:go-back="goBack"
      v-on:go-forward="goForward"
      v-on:visible-columns-change="changeVisibleColumns"
    />
    <div v-if="loading">Loading</div>
    <div v-else-if="!filterBy.length">No columns selected, select some</div>
    <table v-else style="border-collapse: collapse" width="100%">
      <thead class="table-header">
        <TableHeaderRow
          :filterBy="filterBy"
          :selectedSortingField="selectedSortingField"
          :sortBy="sortBy"
          :sortOrder="sortOrder"
          :columnsList="columnsList"
          v-on:do-sort="(filter) => doSort(filter)"
          v-on:switch-select-all-products="switchSelectAllProducts"
        />
      </thead>
      <tbody>
        <TableRow
          v-for="(product, index) of visibleProducts"
          :product="product"
          :index="index"
          :key="product.id"
          :markedProducts="markedProducts"
          :filterBy="filterBy"
          v-on:marked-products-change="(val) => markedProducts = val"
          v-on:delete-product="(id) => deleteProduct(id)"
        />
      </tbody>
    </table>
    <br />
  </div>
</template>

<script>
  import TableControlPanel from "@/components/TableControlPanel.vue";
  import TableHeaderRow from "@/components/TableHeaderRow.vue";
  import TableRow from "@/components/TableRow.vue";
  export default {
    name: "TableComponent",
    components: { TableControlPanel, TableHeaderRow, TableRow },
    data() {
      return {
        sortBy: "",
        selectedSortingField: "",
        sortOrder: "desc",
        filterBy: ["product", "calories", "fat", "carbs", "protein", "iron"],
        visibleRows: "10",
        currentPage: 1,
        markedProducts: [],
        allProductsSelected: false,
        columnsList: {
          product: "Product(100g serving)",
          calories: "Calories",
          fat: "Fat (g)",
          carbs: "Carbs (g)",
          protein: "Protein (g)",
          iron: "Iron (%)"
        }
      };
    },
    computed: {
      products() {
        return this.$store.getters.getProducts(this.sortBy, this.sortOrder);
      },
      loading() {
        return this.$store.state.loading;
      },
      visibleProducts() {
        return this.products.slice(
          (this.currentPage - 1) * this.visibleRows,
          this.currentPage * this.visibleRows
        );
      }
    },
    watch: {
      visibleProducts(val) {
        if (val.length === 0) {
          this.goBack();
        }
      },
    },
    methods: {
      loadProducts() {
        this.$store.dispatch("fetchProducts");
      },
      deleteProduct(id) {
        this.markedProducts = this.markedProducts.filter(
          product => product != id
        );
        this.$store.dispatch("deleteProduct", [id]);
      },
      doSort() {
        this.sortBy = this.selectedSortingField;
        this.sortOrder = this.sortOrder === "desc" ? "asc" : "desc";
      },
      goBack() {
        this.currentPage--;
      },
      goForward() {
        this.currentPage++;
      },
      deleteSelected() {
        this.$store.dispatch("deleteProduct", this.markedProducts);
        this.markedProducts = [];
      },
      switchSelectAll() {
        if (this.allSelected) {
          this.allSelected = false;
          this.filterBy = [];
        } else {
          this.allSelected = true;
          this.filterBy = Object.keys(columnsList);
        }
      },
      changeVisibleRows(newValue) {
        this.visibleRows = newValue;
      },
      changeVisibleColumns(newColumns) {
        if (newColumns.includes(this.selectedSortingField)) {
          this.selectedSortingField = "";
        }
        this.filterBy = newColumns;
      },
      handleSortingFieldSelection(val) {
        this.sortBy = "";
        this.sortOrder = "desc";
        this.filterBy.splice(
          this.filterBy.findIndex(item => item === val),
          1
        );
        this.filterBy.unshift(val);
        this.selectedSortingField = val;
      },
      switchSelectAllProducts() {
        if (this.allProductsSelected) {
          this.allProductsSelected = false;
          this.markedProducts = [];
        } else {
          this.allProductsSelected = true;
          this.markedProducts = this.visibleProducts.map(product => product.id);
        }
      }
    },
    mounted() {
      this.loadProducts();
    }
  };
</script>

<style>
</style>
