<template>
  <div class="base-header">
      <div class="menu">
        <div class="menu-item logo">
            <img src="~/assets/img/logo.svg" alt="Attribute me logo">
        </div>
        <div class="menu-item">Home</div>
        <div class="menu-item menu-item-active">Analytics</div>
        <div class="menu-item">Link Generator</div>
        <div class="menu-item">Power-tweeters</div>
        <div class="menu-item">SKALD Marketers</div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.base-header{
    background-color: #fff;
    .menu{
        height: 4.3125rem;
        display: flex;
        align-items: center;
        margin-left: 0.8rem;
        font-family: ProductSans;
        font-size: 1rem;
        font-weight: bold ;
        color: #000B12;
        .menu-item{
            margin-right: 2.5rem;
            &:first-child{
                margin-right: 2.4rem;
            }
        }
        .menu-item-active{
            color: #FD624F;
        }

    }
    border-bottom: 1px solid #DADCE0;
}
</style>