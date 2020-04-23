<div class="container" aria-hidden="true">
  <div class="carousel" use:carousel>
    {#each images.carousel as image}
      <img alt="" class="image" src="{image}">
    {/each}
  </div>

  <div class="indicators">
    {#each images.carousel as image, slide$}
      <button
        class="indicator"
        class:selected={slide$ === slide}
        on:click={partial(change, slide$)}
        type="button">
      </button>
    {/each}
  </div>
</div>

<style lang="scss">
  @import "styles/index";

  .container {
    --height: 488px;

    position: relative;

    @include breakpoint(m) {
      --height: 45vw;
    }
  }

  .carousel {
    height: var(--height);
    overflow: hidden;
  }

  .image {
    display: block;
    height: var(--height);
    object-fit: cover;
    width: 100%;
  }

  .indicators {
    bottom: 30px;
    display: flex;
    left: 50%;
    position: absolute;
    transform: translate(-50%);

    @include breakpoint(m) {
      bottom: 5%;
    }
  }

  .indicator {
    --margin-horizontal: 4px;
    --size: 16px;

    background-color: var(--colors-white);
    border-radius: 50%;
    cursor: pointer;
    height: var(--size);
    margin-left: var(--margin-horizontal);
    margin-right: var(--margin-horizontal);
    margin-top: 0;
    opacity: 0.5;
    width: var(--size);

    @include breakpoint(s) {
      --size: 8px;
    }

    &.selected {
      opacity: 1;
    }
  }
</style>

<script>
  import Siema from 'siema';
  import partial from 'lodash-es/partial';
  import { getContext, onMount } from 'svelte';

  const images = getContext('images');

  let slide = 0;
  let siema;

  onMount(() => {
    (function self() {
      setTimeout(() => {
        siema.goTo(slide === images.carousel.length - 1 ? 0 : slide + 1);
        self();
      }, 4000);
    }());
  });

  function change(slide$) {
    siema.goTo(slide$);
    slide = slide$;
  }

  function carousel(element) {
    siema = new Siema({
      selector: element,
      duration: 500,
      onChange() {
        slide = this.currentSlide;
      },
    });
  }
</script>
