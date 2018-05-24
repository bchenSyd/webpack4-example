# minimum babel

`npm i babel-core babel-loader babel-preset-env babel-preset-react -D`

```json
{
    "presets": [
        "env",
        "react"
    ]
}
```

```json
//package.json
{
    "scripts":{
        "lib":"babel src/*.js -d lib"
    }
}

```


# webpack plugin

```
$ webpack
=========================================================================
 my previous plugin's output is now my input
=========================================================================
=========================================================================
 my previous plugin's output is now my input
=========================================================================
=========================================================================
 my previous plugin's output is now my input
=========================================================================
Hash: 3e3c2ceb034f29b9b719
Version: webpack 4.6.0
Time: 442ms
Built at: 2018-05-04 01:35:50
    Asset      Size  Chunks             Chunk Names
bundle.js  5.99 KiB    main  [emitted]  main
Entrypoint main = bundle.js
external "react" 42 bytes {main} [built]
external "react-dom" 42 bytes {main} [built]
[./src/index.js] 2.47 KiB {main} [built]
Done in 0.98s.

```

