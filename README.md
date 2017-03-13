# Ghost Https Index.js

## Usage

### Installing Libraries

Since this is a drop in replacement for the original Ghost `index.js`, there is no `package.json` file. Libraries have to be installed manually.

In your Ghost installation root, issue following command:

`npm i url http https`

### Enable nodejs to open port 80 and 443

To enable nodejs (not running as root) to open port below 1024, issue following command:

`sudo setcap 'cap_net_bind_service=+ep' /usr/bin/nodejs`

### Installing the `Index.js`

In your Ghost installtion root, rename the original `index.js`:

`mv index.js index.js.original`

Then copy the `ghost-https-index.js` into the folder as `index.js`:

`cp ghost-https-index.js index.js`

Remember to fill in the certification info at the top of the new `index.js`

```javascript
// Fill in your certificate files
const serverKey='';
const serverCrt='';
const serverCa='';
```

Once everything is ready, start Ghost normally:

`npm start --production`

## Changelog
- 0.1.0 - Initial commit, tested with Ghost 0.11.4 & 0.11.7

## License

The MIT License

Copyright (c) 2017

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
