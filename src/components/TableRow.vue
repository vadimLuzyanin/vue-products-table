<template>
  <tr
    :class="mouseOverProduct ? 'green-row' : index % 2 === 1 ? 'gray-row' : 'white-row'"
    @mouseover="mouseOverProduct = true"
    @mouseleave="mouseOverProduct = false"
  >
    <!-- checkbox -->

    <td>
      <input
        class="custom-checkbox"
        type="checkbox"
        :value="product.id"
        :id="product.id"
        v-model="markedProductsInner"
      />
      <label :for="product.id" class="table-row-checkbox" />
    </td>

    <!-- product properties -->

    <td
      v-for="filter of filterBy"
      :filter="filter"
      :key="'id: '+product.id + ', filter: ' + filter"
      :class="filter === 'product' && mouseOverProduct ? 'bold-text' : markedProductsInner.includes(product.id) ? 'semi-bold-text' : null"
      class="table-row-content"
    >
      <label :for="product.id" class="table-row-label">{{product[filter]}}</label>
    </td>

    <!-- delete button -->

    <td class="table-row-delete-cell">
      <label :for="product.id" class="table-row-label">
        <button
          @click="showConfirmDeleteModal = true"
          :class="mouseOverProduct ? 'delete-button-visible' : 'delete-button-hidden'"
        >
          <img src="../assets/img/Delete.svg" />delete
        </button>
      </label>

      <!-- confirm delete modal -->

      <div v-show="showConfirmDeleteModal" class="modal-wrapper">
        <div class="modal">
          <div class="modal-text">
            Are you sure you want to
            <span class="bold-text">delete item</span>?
          </div>
          <div class="modal-buttons">
            <button @click="showConfirmDeleteModal = false" class="button">Cancel</button>
            <button @click="deleteProduct" class="button button-active">Confirm</button>
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
  export default {
    name: "TableRow",
    props: ["product", "index", "markedProducts", "filterBy"],
    data() {
      return {
        showConfirmDeleteModal: false,
        mouseOverProduct: false
      };
    },
    computed: {
      markedProductsInner: {
        get() {
          return this.markedProducts;
        },
        set(val) {
          this.$emit("marked-products-change", val);
        }
      }
    },
    methods: {
      deleteProduct() {
        this.showConfirmDeleteModal = false;
        this.$emit("delete-product", this.product.id);
      }
    },
    watch: {
      mouseOverProduct(val) {
        if (!val) {
          this.showConfirmDeleteModal = false;
        }
      }
    }
  };
</script>

<style scoped>
  .green-row {
    background-color: rgba(0, 161, 30, 0.07);
  }
  .gray-row {
    background-color: #f8f9fa;
  }
  .white-row {
    background-color: #ffffff;
  }
  .table-row-checkbox {
    padding: 16px 0;
    padding-left: 37px;
    cursor: pointer;
  }
  .table-row-content {
    min-width: 155px;
  }
  .table-row-delete-cell {
    width: 93px;
  }
  .table-row-label {
    width: 100%;
    min-height: 46px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }
  .delete-button-visible {
    opacity: 1;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 70px;
  }
  .delete-button-hidden {
    opacity: 0;
  }
</style>