<div class="services">
  <h2 class="primary-heading">
    Services
  </h2>

  <nav>
    <ul class="buttons">
      {#each services as service, index}
        <li>
          <button
            class="button"
            class:selected={index === selected}
            on:click={partial(showService, index)}
            data-label={service.title} type="button">

            {service.title}
          </button>
        </li>
      {/each}
    </ul>
  </nav>

  {#each services as service, index}
    <div class="service" class:selected={index === selected}>
      {#if service.description}
        <p class="service-description">
          {service.description}
        </p>
      {/if}

      <ul class="items">
        {#each service.items as item}
          <li class="item" class:more={service.isMore}>
            <h3 class="secondary-heading">
              <button on:click={partial(openDialog, item)} type="button">
                {item.title}
              </button>
            </h3>

            <p class="price">{item.price}</p>

            {#if item.description}
              <p class="item-description">{item.description}</p>
            {/if}

            {#if item.addon}
              <p class="addon">{item.addon}</p>
            {/if}
          </li>
        {/each}
      </ul>

      {#if !services[index].isMore && service.items.length > 4}
        <button class="view-more" on:click={partial(viewMore, index)} type="button">
          See More
        </button>
      {/if}
    </div>
  {/each}

  {#if item}
    <Dialog on:close={onDialogClose}>
      <div class="dialog-content">
        <h2 class="dialog-heading">
          {item.title}
        </h2>

        <p class="dialog-price">
          {item.price}
        </p>

        <p class="dialog-description">
          {item.description}
        </p>
      </div>
    </Dialog>
  {/if}
</div>

<style lang="scss">
  @import "styles/index";

  .services {
    --padding-vertical: 72px;

    margin-left: auto;
    margin-right: auto;
    padding-bottom: var(--padding-vertical);
    padding-top: var(--padding-vertical);
    width: 75%;

    @include breakpoint(s) {
      --padding-vertical: 32px;

      width: auto;
    }
  }

  .service {
    align-items: stretch;
    display: none;
    flex-direction: column;

    @include breakpoint(s) {
      align-items: center;
    }

    &.selected {
      display: flex;
    }
  }

  .items {
    --margin-top: 65px;

    column-gap: 60px;
    columns: auto 2;
    margin-top: var(--margin-top);
    text-align: left;

    @include breakpoint(s) {
      --margin-top: 32px;

      columns: auto;
      text-align: center;
    }
  }

  .item {
    --padding-bottom: 38px;

    break-inside: avoid;

    &:not(:last-of-type) {
      padding-bottom: var(--padding-bottom);

      @include breakpoint(s) {
        --padding-bottom: 19px;
      }
    }

    &:nth-of-type(n+4) {
      @include breakpoint(s) {
        padding-bottom: 0;
      }
    }

    &:nth-of-type(n+5) {
      @include breakpoint(s) {
        display: none;
      }
    }

    &.more {
      &:nth-of-type(n+4) {
        display: block;

        &:not(:last-of-type) {
          @include breakpoint(s) {
            padding-bottom: var(--padding-bottom);
          }
        }
      }
    }
  }

  .primary-heading {
    font-size: 3rem;
    font-weight: 300;
    text-align: center;
    text-transform: uppercase;

    @include breakpoint(s) {
      font-size: 1.6rem;
    }
  }

  .addon {
    font-style: italic;
    font-weight: 300;
    margin-top: 16px;

    @include breakpoint(s) {
      display: none;
    }
  }

  .secondary-heading {
    color: var(--colors-pink);
    pointer-events: none;
    text-transform: uppercase;

    @include breakpoint(s) {
      font-size: 1.2rem;
      pointer-events: auto;
      text-decoration: underline;
    }
  }

  .price {
    @include breakpoint(s) {
      font-size: 1.2rem;
      margin-top: 0.4rem;
    }
  }

  .service-description {
    display: none;
    font-size: 1.2rem;
    font-weight: 300;
    margin-left: auto;
    margin-right: auto;
    margin-top: 22px;
    max-width: 256px;
    text-align: center;

    @include breakpoint(s) {
      display: block;
    }
  }

  .item-description {
    font-weight: 300;

    @include breakpoint(s) {
      display: none;
    }
  }

  .buttons {
    --margin-top: 60px;

    display: grid;
    grid-auto-flow: column;
    grid-gap: 256px;
    justify-content: center;
    margin-top: var(--margin-top);

    @include breakpoint(s) {
      --margin-top: 27px;

      grid-gap: 12px;
    }
  }

  .button {
    --padding-bottom: 24px;

    padding-bottom: var(--padding-bottom);
    position: relative;
    text-transform: uppercase;

    @include breakpoint(s) {
      --padding-bottom: 12px;

      font-size: 1.2rem;
    }

    &::before {
      color: transparent;
      content: attr(data-label);
      display: block;
      font-weight: 700;
      height: 1px;
      margin-bottom: -1px;
      overflow: hidden;
      visibility: hidden;
    }

    &::after {
      background-color: var(--colors-pink);
      bottom: 0;
      content: "";
      display: inline-block;
      height: 2px;
      left: 0;
      position: absolute;
      transform: scaleX(0);
      transition: transform 300ms ease;
      width: 100%;
    }

    &.selected,
    &:hover {
      color: var(--colors-pink);
      font-weight: 700;

      &::after {
        transform: scaleX(1);
      }
    }
  }

  .view-more {
    color: var(--colors-pink);
    display: none;
    font-size: 1.2rem;
    font-weight: 700;
    margin-top: 24px;
    text-decoration: underline;
    text-transform: uppercase;

    @include breakpoint(s) {
      display: block;
    }
  }

  .dialog-content {
    display: grid;
    grid-gap: 1.2rem;
  }

  .dialog-heading {
    font-size: 1.6rem;
    font-weight: 300;
    text-align: center;
    text-transform: uppercase;
  }

  .dialog-price {
    font-size: 1.2rem;
  }

  .dialog-description {
    color: #666666; // 🤘
    font-size: 1.2rem;
  }
</style>

<script>
  import partial from 'lodash-es/partial';
  import { getContext } from 'svelte';
  import Dialog from 'elements/dialog';

  const services = getContext('services');

  let item;
  let selected = 0;

  function showService(selected$) {
    selected = selected$;
  }

  function openDialog(item$) {
    item = item$;
  }

  function onDialogClose() {
    item = null;
  }

  function viewMore(index) {
    services[index].isMore = true;
  }
</script>
