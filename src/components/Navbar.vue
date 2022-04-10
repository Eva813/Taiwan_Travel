<style lang="scss" scoped>
@import "~@/assets/all.scss";
.nav-collapse {
  flex-basis: 100%;
  flex-grow: 0 !important;
  align-items: center;
}
</style>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">台灣走走 Tai Walk</a>
      <!-- <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button> -->
      <div id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">探索景點</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">節慶活動</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">品嚐美食</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
</script>
