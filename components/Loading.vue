<template>
  <div class="loading">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {

}
</script>

<style>

/*
 * Loading Dots
 * Can we use pseudo elements here instead :after?
 */
.loading span {
  display: inline-block;
  vertical-align: middle;
  width: .6em;
  height: .6em;
  margin: .19em;
  background: #ecf335f5;
  border-radius: .6em;
  animation: loading 1s infinite alternate;
}

/*
 * Dots Colors
 * Smarter targeting vs nth-of-type?
 */
.loading span:nth-of-type(2) {
  background: #ffed88;
  animation-delay: 0.2s;
}
.loading span:nth-of-type(3) {
  background: #ffaa38;
  animation-delay: 0.4s;
}
.loading span:nth-of-type(4) {
  background: #ff8b3b;
  animation-delay: 0.6s;
}
.loading span:nth-of-type(5) {
  background: #ff5b42;
  animation-delay: 0.8s;
}
.loading span:nth-of-type(6) {
  background: #ffbaa1;
  animation-delay: 1.0s;
}
.loading span:nth-of-type(7) {
  background: #f3b335;
  animation-delay: 1.2s;
}

/*
 * Animation keyframes
 * Use transition opacity instead of keyframes?
 */
@keyframes loading {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>