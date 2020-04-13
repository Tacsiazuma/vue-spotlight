## Vue spotlight

> A macOS Spotlight like widget for websites with Vue

## Installation

```bash
    npm install vue-spotlight -S
```

## [Demo](https://tacsiazuma.github.io/vue-spotlight-demo)

## Usage

```js
    import Spotlight from 'vue-spotlight'

    // register globally
    Vue.component('Spotlight', Spotlight)

    // or locally
    export default {
        components: { Spotlight}
    }

```
And then you can place it in your template

```html
    <Spotlight field-name="symbol" :data-provider="dataProvider" :widget-open="open" :action="action" :match-renderer="renderer"/>
```


## Props

## Development

To start webpack in watch mode run:

```bash
    npm run dev
```

## Author

Krisztian Papp [@tacsiazuma](https://github.com/tacsiazuma)

## License

[MIT](http://opensource.org/licenses/MIT)