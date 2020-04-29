<Head {nonce} {...$$props} />

<div class="app">
  <Header />
  <Carousel />
  <Store />
  <Map />
  <Services />
  <Footer />
</div>

<style lang="scss">
  @import 'styles/index';

  .app {
    background-color: var(--colors-white);
    border: 1px solid var(--colors-light-grey);
    border-radius: 4px;
    margin: 22px auto;
    max-width: 1065px;

    @include breakpoint(m) {
      border-width: 0;
      margin: 0;
    }
  }

  :global(:focus:not(.focus-visible)) {
    outline: none;
  }
</style>

<script>
  import 'focus-visible';
  import './styles/global';
  import './styles/colors';
  import './styles/typography';
  import { setContext } from 'svelte';
  import Carousel from 'components/carousel';
  import Footer from 'components/footer';
  import Head from './head';
  import Header from 'components/header';
  import Map from 'components/map';
  import Services from 'components/services';
  import Store from 'components/store';

  let general;
  let images;
  let nonce;
  let store;
  let services;

  setContext('general', general);
  setContext('images', images);
  setContext('services', services);
  setContext('store', store);

  export {
    general,
    images,
    nonce,
    services,
    store,
  };
</script>
