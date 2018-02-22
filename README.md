### What is this?

This is a module that reports AppStore ranking by genre for arbitrary app.

### Usage
```
npm install appstorerank
```

```
var appStoreRank = require("appstorerank")
var reporter = new appStoreRank.Reporter({
    appId:'0000000',  // App Tracking ID for application you want to know about ranking
    limit:'200'       // Rank limit
});

reporter.request(function success(result){
    const appName = result['appName'];
    const rank    = result['rank'];
    if (result['rank'] === -1) {
        console.log(`${appName}はランキング 圏外 です。`);
        return
    }
    console.log(`${appName}の現在の順位は ${rank}位 です。`)
},function error(res) {
    console.log("error: ",res);
});
```
### Author
misyobun

### License
(The MIT License)

Copyright (c) 2017 misyobun, appstorerank module creator

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
