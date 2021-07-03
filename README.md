

## js2xlsx
😌 😃 👿 A simple module for excel and js converts each other, which works in the browser and can be used to help manage multilingual entries and so on.

## Installation

It is recommended to run webpack on node 10.x or higher.

Install the pkg with npm:

```
npm install js2xlsx --save
```


## Usage

### Convert js to excel(.xlsx/.xls) 
```
// es6
import {js2excel} from 'js2xlsx';

//CommonJS
let { js2excel } = require('js2xlsx');

js2excel('../src/lang','../src/lang.xlsx');

// for webpack 3: dynamic import

    import(/* webpackChunkName: "js2xlsx" */ 'js2xlsx').then(({js2excel}) => {
      js2excel('../src/lang','../src/lang.xlsx');
    }).catch((e) => {
    });
    
```

### Convert excel(.xlsx/.xls) to js
```
// es6
import {excel2js} from 'js2xlsx';

//CommonJS
let { excel2js } = require('js2xlsx');

excel2js('../src/lang','../src/lang.xlsx');

// for webpack 3: dynamic import

    import(/* webpackChunkName: "js2xlsx" */ 'js2xlsx').then(({excel2js}) => {
      excel2js('../src/lang','../src/lang.xlsx');
    }).catch((e) => {
    });
    
```

## API

### js2excel(opts)
Convert js to excel(.xlsx/.xls).

**opts**
Type: `Object`

`opts.filePath`

Type: `String`<br/>

Excel's file path.

`opts.fileName`

Type: `String`<br/>
Default: `excel`

Excel's name, whose suffix is `.xlsx` or `.xls`.


### excel2js(opts)
Convert excel(.xlsx/.xls) to js.

**opts**
Type: `Object`

`opts.filePath`

Type: `String`<br/>

Excel's file path.

`opts.fileName`

Type: `String`<br/>
Default: `excel`

Excel's name, whose suffix is `.xlsx` or `.xls`.

## Supported browsers
* [xlsx](https://app.saucelabs.com/open_sauce/user/sheetjs)

## License
MIT
