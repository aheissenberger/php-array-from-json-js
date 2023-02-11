# PHP Array from JSON/JS

Create PHP Array from JSON or JavaScript object notation Code.

## Installation

**npm**

```sh
npm install php-array-from-json-js
```

**Yarn**

```sh
yarn install php-array-from-json-js
```

## Usage

**ES Modules / ES6**

```Javascript
import {json2phpArray,js2phpArray} from 'php-array-from-json-js'

const json = '{"key":[1,"string",true]}'
const phparray = json2phpArray(json)
console.log(phparray) // ["key"=>[1,"string",true]]

const js = '{key:[1,"string",null,,true]}'
const phparray = js2phpArray(js)
console.log(phparray) // ["key"=>[1,"string",null,null,true]]

```

**UMD**

```Javascript
const {json2phpArray} = require('php-array-from-json-js')
```

### Roadmap

- [ ] support for function output in `js2phpArray`
- [ ] options to ignore errors from not supported types

### Contribution

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
1. Create your Feature Branch (git checkout -b feature/AmazingFeature)
1. Commit your Changes (git commit -m 'Add some AmazingFeature')
1. Push to the Branch (git push origin feature/AmazingFeature)
1. Open a Pull Request

### Built With

**no dependencies**

- [vitejs](https://vitejs.dev)
- [vitest](https://vitest.dev)

development with Vitejs is based on this [documentation](https://onderonur.netlify.app/blog/creating-a-typescript-library-with-vite/)

### License

Distributed under the "bsd-2-clause" License. See [LICENSE.txt](LICENSE.txt) for more information.
