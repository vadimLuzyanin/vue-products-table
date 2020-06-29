<template>
  <div id="app">
    <h1 class="app-header">Table UI</h1>
    <hr class="line" color="#EDEDED" size="1px" />
    <TableComponent />
  </div>
</template>

<script>
  import TableComponent from "./components/TableComponent.vue";

  export default {
    name: "App",
    components: {
      TableComponent
    }
  };
</script>

<style>
  * {
    box-sizing: border-box;
  }
  html,
  body {
    margin: 0;
    padding: 0;
    background-color: #fbfbfb;
  }
  .app-header {
    font-size: 32px;
    line-height: 40px;
    margin: 0;
    margin-bottom: 16px;
  }
  .line {
    margin: 0;
  }
  #app {
    font-family: "Source Sans Pro", sans-serif;
    font-size: 14px;
    line-height: 24px;
    color: #282136;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0 auto;
    width: 1140px;
    padding-top: 32px;
  }

  /* global styles */

  /* text */

  .bold-text {
    font-weight: 600;
  }
  .semi-bold-text {
    font-weight: 600;
    opacity: 0.8;
  }

  /* button */

  .button {
    border: 1px solid #c6cbd4;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 0 16px;
    height: 32px;
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: #ffffff;
  }
  .button:hover {
    border: 1px solid #00a11e;
  }
  .button-active {
    background-color: #00a11e;
    border: 1px solid #00a11e;
    color: #ffffff;
  }
  .button:disabled {
    background-color: #ffffff;
    border: 1px solid #c6cbd4;
    color: #3d374a;
    opacity: 0.2;
    cursor: default;
  }

  /* dropdown */

  .dropdown {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .dropdown-header {
    height: 32px;
    padding: 12px;
    border: 1px solid #c6cbd4;
    border-radius: 2px;
    color: #333333;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    cursor: default;
  }
  .dropdown-header:hover {
    border: 1px solid #00a11e;
    color: #00a11e;
    cursor: pointer;
  }
  .dropdown-header::after {
    content: "";
    display: block;
    width: 8px;
    height: 5px;
    background-image: url("./assets/img/Chevron.svg");
    margin-left: 10px;
  }
  .dropdown-content-visible {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    top: 46px;
    padding: 16px;
    max-height: 243px;
    min-width: 100%;
    background-color: #fff;
    overflow-y: auto;
    white-space: nowrap;
    z-index: 10;
  }
  .dropdown-content-hidden {
    display: none;
  }
  .dropdown-item {
    margin: 0;
    font-size: 14px;
    padding: 12px;
  }
  .dropdown-item input {
    margin-right: 12px;
  }

  /* checkbox */

  .custom-checkbox {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  .custom-checkbox + label {
    display: inline-flex;
    align-items: center;
    margin-right: 12px;
  }
  .custom-checkbox + label::before {
    content: "";
    width: 12px;
    height: 12px;
    border: 1px solid #adb5bd;
    border-radius: 1px;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .custom-checkbox:checked + label::before {
    border-color: #00a11e;
    background-color: #00a11e;
    background-image: url("./assets/img/Checkbox.svg");
  }

  /* modal */

  .modal {
    width: 254px;
    height: 96px;
    z-index: 10;
    position: absolute;
    background: #ffffff;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  .modal-buttons {
    display: flex;
    width: 168px;
    justify-content: space-between;
  }
</style>
