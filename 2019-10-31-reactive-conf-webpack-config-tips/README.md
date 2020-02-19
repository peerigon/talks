# webpack-config-tips

**Not so secret tips and examples on how to write good webpack configs.**

## Config features

### [You don't need a webpack config](examples/no-config)

When no config is provided webpack assumes the following default config:

```js
const {resolve} = require("path");

module.exports = {
    entry: resolve(process.cwd(), "src", "index.js"),
    output: {
        path: resolve(process.cwd(), "dist"),
        filename: "main.js",
    },
};
```

You will still see an error like this in your console:

![](./assets/stdout-error-mode.jpg)

This means that webpack used production defaults because you haven't specified a <code>mode</code>.

The <code>mode</code> has been introduced with webpack 4 and can be set to <code>development</code>, <code>production</code> and <code>none</code>. It allows webpack to choose the best default configuration for the given environment.

**It's strongly recommended to set the <code>mode</code> and let webpack do the rest. 😎**

You can set the `mode` via the command line...

```sh
webpack --mode development
```

...or inside your webpack config:

```js
module.exports = {
    mode: "development",
};
```

### [You can use TypeScript in your webpack config](examples/typescript)

- Step 1: Rename your `webpack.config.js` to `webpack.config.ts`.
- Step 2: Install `@types/webpack` and `ts-node`.
- Step 3: Create a variable using the `webpack.Configuration` type:

```ts
import webpack from "webpack";

const config: webpack.Configuration = {
    // ...
};

export default config;
```

You also need to set the `esModuleInterop` flag in your `tsconfig.json`:

```json
{
    "compilerOptions": {
        "esModuleInterop": true
    }
}
```

This gives you nice intellisense in your config:

![](./assets/ts-config-1.jpg)
![](./assets/ts-config-2.jpg)

**Note:**
- This is a [webpack-cli](https://webpack.js.org/api/cli/) feature. It won't work if you're using webpack's node API.
- [`ts-node`](https://github.com/TypeStrong/ts-node) needs to be available in your `node_modules`
- webpack-cli uses [interpret](https://github.com/gulpjs/interpret) which maintains a dictionary of file extensions and associated module loaders.
- This means that you can also use [Babel](https://babeljs.io/) to precompile your `webpack.config.js`. Rename it to `webpack.config.babel.js` and make sure that there is a Babel config.
- Devon Zuegel has written a [comprehensive guide on using TypeScript in your webpack config](https://medium.com/webpack/unambiguous-webpack-config-with-typescript-8519def2cac7).

### [Did you know that your webpack config can also export a function?](examples/function)

The function should return the webpack config:

```js
module.exports = () => {
    return {
        mode: "development",
    };
};
```

Where is that useful?

Now you can pass arguments to your config via webpack's CLI:

```sh
webpack --env.mode=production --env.debug
```

```js
module.exports = (env = {}) => {
    const {
        mode = "development",
        debug = false,
    } = env;

    return {
        mode,
        output: {
            pathinfo: debug === true,
        },
    };
};
```

This feature is called [Environment Options](https://webpack.js.org/api/cli/#environment-options).

### [Multi-compiler mode](examples/multi)

You can also return an array of configurations. This switches webpack into **multi-compiler mode**:

```js
module.exports = [
    {
        name: "web",
        target: "web",
        output: {
            path: resolve(__dirname, "dist", "web"),
        },
    },
    {
        name: "node",
        target: "node",
        output: {
            path: resolve(__dirname, "dist", "node"),
        },
    },
];
```

![](./assets/stdout-multi-compiler.jpg)

This is useful for isomorphic apps that need to create two bundles, one for the browser and one for Node.

It's also useful for creating localized bundles:

```js
const I18nPlugin = require("i18n-webpack-plugin");

module.exports = Object
    .entries({
        en: require("./en.json"),
        de: require("./de.json"),
    })
    .map(([language, translations]) => ({
        name: language,
        output: {
            path: resolve(__dirname, "dist", language),
        },
        plugins: [new I18nPlugin(translations)],
    }));
```

In multi-compiler mode webpack builds each config concurrently in the same process while re-using the file system cache.

**Note:**

**Multi-compiler mode does not execute each build in parallel**. Often you will see significant longer build times.

Use [parallel-webpack](https://www.npmjs.com/package/parallel-webpack) from [Trivago](https://tech.trivago.com/), one of our Platinum sponsors, if you want to execute each config in parallel.

### [Async webpack configs](examples/async)

Just put an `async` before your config function:

```js
module.exports = async () => {
    // load some config values from database
    return {
        // ...
    };
};
```

With the language example from the previous tip:

```js
module.exports = async () => {
    const languages = await loadLanguagesFromProvider();

    return Object
        .entries(languages)
        .map(([language, translations]) => ({
            /* ...*/
        }));
};
```

**Question:** Is the following config valid?

```js
module.exports = {
    entry: async () => loadEntriesFromDb(),
};
```

Yes or no?

**Answer:** Yes! The `entry` option can also be an async function.

This can be useful if you're building a static site generator that pulls all entries from a database.

It's not the most important feature but still good to know 😉.

**Question:** Is the following config valid?

```js
module.exports = {
    output: {
        path: fs.createWriteStream("/some/path"),
    },
};
```

Yes or no?

**Answer:** No 😝

### Development tips

#### [Use nodemon to restart webpack everytime the config changes](examples/webpack-nodemon)

Running `webpack --watch` tells webpack to watch all source files that contribute to the bundle. But what if you made changes to the webpack config itself? webpack does not notice any changes to files that are required by webpack itself.

With [nodemon](https://github.com/remy/nodemon) you can restart webpack everytime you make changes to the webpack config:

```sh
nodemon --watch webpack.config.js --exec "webpack --watch"
```

**Make sure to only watch the `webpack.config.js`** otherwise you might loose webpack's incremental build feature.

#### [Use `require.resolve` when referencing absolute paths](examples/webpack-nodemon)

When writing your own webpack config it can happen easily that a file path is not correct.
Although webpack will report some errors like a missing entry file, it will not complain about all errors.

For instance: when using `resolve.alias` it can happen easily that the path to be aliased is not correct anymore.
In this case it's good to use Node's `require.resolve` which will throw an error as soon as the file can not be found.

This is the easiest and safest way to replace one module with another using `resolve.alias`:

```js
module.exports = {
    resolve: {
        alias: {
            // Each require.resolve() will throw an error if the module cannot be found
            [require.resolve("./src/index.js")]: require.resolve("./src/replaced.js"),
        },
    },
};
```

Also useful if you want to execute a loader just on a certain file:

```js
module.exports = {
    module: {
        rules: [
            {
                include: [require.resolve("./src/replaced.js")],
                use: "raw-loader",
            },
        ],
    },
};
```

Now everytime you move the file but don't update the path in your webpack config, `require.resolve` will complain about it.

#### [Use `.filter(Boolean)` to remove unwanted loaders or plugins depending on the env](examples/webpack-nodemon)

Adding `.filter(Boolean)` at the end of an array removes all falsy values from an array:

```js
module.exports = {
    module: {
        rules: [
            isDev && {
                test: /\.css$/,
                loader: "style-loader",
            },
        ].filter(Boolean),
    },
    plugins: [
        analyze && new BundleAnalyzerPlugin(),
    ].filter(Boolean),
};
```

#### Be careful about config abstractions

Since the webpack config is just JavaScript, people tend to treat it as regular code. They create abstractions as soon as they spot repetition.

While there are legitimate use-cases for this—such as sharing configs across projects—it's often better to keep everything in one file.

For instance, with the previous tip it's not necessary to split your webpack config into env-specific configs:

```js
    plugins: [
        isBrowser &&
            new CopyPlugin(),
        isBrowser && new WriteAssetsJsonPlugin(),
        isBrowser &&
            new MiniCssExtractPlugin(),
        isAnalysis &&
            isBrowser &&
            new BundleAnalyzerPlugin(),
        isProd &&
            isBrowser &&
            new webpack.optimize.UglifyJsPlugin(),
        isProd &&
            isBrowser &&
            isAnalysis === false &&
            new CompressionPlugin(),
    ].filter(Boolean)
```

### Loader configuration tips

#### [Prefer `module.rules[].oneOf`](examples/rules-best-practice)

When it comes to configuring loaders there are three important things to remember:

- The order of rules is important
- Loaders are executed from bottom to top and from right to left
- **Every rule that matches gets applied**

**Question:** Given this `rules` config, what loaders will be executed on a `.js` module and in which order?

```js
    rules: [{
        use: ["a-loader", "b-loader"],
    }, {
        use: ["c-loader"],
    }],
```

1. b a
2. a b c
3. c b a
4. none

**Answer:** 3. All matching rules will be applied from bottom to top and from right to left. The `test` property is not required.

Since this behavior is confusing for a lot of people, we recommend to use the `oneOf` condition. This tells webpack to bail out on the first matching rule:

```js
    rules: [{
        oneOf: [{
            use: ["a-loader", "b-loader"],
        }, {
            use: ["c-loader"],
        }],
    }],
```

1. b a
2. a
3. c b a
4. none

**Answer:** 1. Only the first rule is applied. Since the first rule contains two loaders, both loaders are executed from right to left.

#### Prefer `module.rules[].include` over `exclude`

There are a lot of ways—probably too many 😔—to configure rules and when they should be applied.

**The good news is:** You only need to remember 2. In 99.99995437% of all cases it's sufficient to use:

- `test` for file extensions
- `include` for directories or absolute paths

```js
    rules: [{
        include: [path.resolve(__dirname, "src")],
        test: [/\.ts$/, /\.tsx$/],
        use: ["ts-loader"],
    }, {
        include: [path.resolve(__dirname, "src")],
        test: [/\.css$/],
        use: ["css-loader"],
    }],
```

Technically, `test` and `include` (and `resource`) work all the same way. But most people use `include` for absolute paths and `test` for regular expressions.

**Be careful:** Only one condition in the array needs to match.

```js
    rules: [{
        // Matches any module that is inside "src" OR that ends on ".ts"
        include: [
            path.resolve(__dirname, "src"),
            /\.ts$/,
        ],
        use: ["ts-loader"],
    }],
```

#### ["How to apply different loaders on the same module" Part 1](examples/resource-query)

Imagine you want to use the [react-svg-loader](https://www.npmjs.com/package/react-svg-loader). The loader turns an SVG file into a React component:

```html
<svg height="100" width="100">
  <circle cx="50" cy="50" r="40" fill="red" />
</svg>
```

...becomes...

```jsx
export default () => (
    <svg height="100" width="100">
      <circle cx="50" cy="50" r="40" fill="red" />
    </svg>
);
```

This allows you to import the SVG right into your React app without creating a custom wrapper:

```js
import CircleComponent from "./circle.svg";

const component = <CircleComponent />;
```

But the problem arises when you're also using the same SVG in a CSS file like this:

```css
body {
    background: url("./circle.svg");
}
```

Should webpack transform the module with the react-svg-loader or with the file-loader?

**One possible solution:** Use the react-svg-loader chain only if there is an `?component` query.

```js
import CircleComponent from "./circle.svg?component";

const component = <CircleComponent />;
```

You can achieve this using the `resourceQuery` condition:

```js
    rules: [{
        oneOf: [{
            test: /\.svg$/,
            resourceQuery: "?component",
            use: ["react-svg-loader"],
        },
        {
            test: /\.svg$/,
            use: ["file-loader"],
        }]
    }],
```

#### ["How to apply different loaders on the same module" Part 2](examples/resource-query)

**Same situation, but different solution:** Use the react-svg-loader chain only if the importing module is a `.js` module:

```js
    rules: [{
        oneOf: [{
            test: /\.svg$/,
            // issuer matches on the importing module
            issuer: /\.jsx?$/,
            use: ["react-svg-loader"],
        },
        {
            test: /\.svg$/,
            use: ["file-loader"],
        }]
    }],
```

Now you can just write:

```js
import CircleComponent from "./circle.svg";

const component = <CircleComponent />;
```

### Speed up webpack build

#### [Find out what's slow](examples/profile)

This can be quite challenging in bigger webpack projects 😔.

First you need to add

```js
    stats: {
        maxModules: Infinity, // show all modules
    }
```

to your webpack config so that webpack doesn't hide modules in the output. **⚠️ Warning:** the output can be very long.

Then run `webpack --profile --progress` to get an idea which modules took long to build.

![](/assets/stdout-profile-1.jpg)

This output is from an example project where I've delayed each step artificially using `setTimeout`. The example project consists of 3 modules:

- `a.js` is the entry
- `a.js` depends on `b.js`
- `b.js` depends on `c.js`

The output is full of information:

- building all modules took 5 seconds
- writing them to disk (emitting) took 3 seconds
- resolving each module (factory) took 1 second
- module `a.js`
    - took 1 second to resolve (factory)
    - took 6ms to build
    - was finished after 1 second
- module `b.js`
    - was discovered after 1 second (`a.js` had to be built)
    - took 1 second to resolve
    - took 2 seconds to build
    - was finished after 4 seconds
- module `c.js`
    - was discovered after 4 seconds (`b.js` had to be built)
    - took 1 second to resolve
    - took 1ms to build
    - was finished after 5 seconds

You can also try out the excellent [speed-measure-webpack-plugin](https://www.npmjs.com/package/speed-measure-webpack-plugin).

For the given example it would print out the following stats:

![](/assets/stdout-profile-2.jpg)

You will get the best insights by profiling the webpack process itself:

- Run `node --inspect-brk ./node_modules/.bin/webpack`

![](/assets/inspect-1.jpg)

- Open Chrome and go to [chrome://inspect](chrome://inspect)
- Click on `inspect`

![](/assets/inspect-2.jpg)

- Record a profile

![](/assets/inspect-3.jpg)

You will get a flame graph that looks like this:

![](/assets/inspect-4.jpg)

In our example it would show a flame graph like this:

![](/assets/inspect-5.jpg)

which would be really bad in a real-world application because it shows that the process was idling most of the time 😉.

Once you know what's slow, you can apply specific improvements.

But there are also general tips that will keep your webpack process fast.

#### Use webpack's watch mode

By running `webpack --watch` or using the `webpack-dev-server`, webpack switches to incremental builds. When a file changes only the necessary changes are rebuild.

A common error is to use a different tool for watching files (like [gulp](https://gulpjs.com/)) to restart the webpack process. In that case each build is started from scratch.

#### Restrict loaders using `include`

Use `include` to run loaders only on the `src` folder:

```js
    rules: [{
        include: resolve(__dirname, "src"),
        test: /\.js$/,
        use: ["babel-loader"],
    }],
```

Anyone with a config like this deserves a slow build 😝:

```js
    rules: [{
        test: /\.js$/,
        use: ["babel-loader"],
    }],
```

This will transform every module in `node_modules` using Babel.

If a module is not compatible with your browser targets, use `include` to only transpile files from that particular module:

```js
    rules: [{
        include: [
            resolve(__dirname, "src"),
            resolve(__dirname, "node_modules", "super-modern", "src"),
        ],
        test: /\.js$/,
        use: ["babel-loader"],
    }],
```

#### Skip unnecessary build steps

Ask yourself, is it really necessary...

- ...to run the linter or
- ...to do type-checking

...during a webpack build?

Better move these two steps to `posttest`.

**Secret protip for a fast webpack build:** Do as less as possible 😎

#### [Use the cache-loader](examples/with-cache-loader)

The [cache-loader](https://github.com/webpack-contrib/cache-loader) caches the result of the following loader chain.

Given this configuration:

```js
    rules: [{
        include: [
            resolve(__dirname, "src"),
        ],
        test: /\.less$/,
        use: [
            "style-loader", // not cached
            "cache-loader",
            "css-loader", // cached
            "less-loader",
        ],
    }],
```

It would cache the result of the `css-loader` (and thus also the result of the `less-loader`) on disk.

When webpack gets executed again and the given module hasn't changed, the cache-loader restores the result from disk.

The cache-loader is not a silver bullet. Sometimes you won't see any improvement. This is because restoring the result from disk can sometimes be just as expensive as building it from scratch.

Some loaders—like the babel-loader—already use a persistent file cache.

#### [Use the thread-loader](examples/with-thread-loader)

The [thread-loader](https://github.com/webpack-contrib/thread-loader) moves the following loader chain to a separate thread.

Given this configuration:

```js
    rules: [{
        include: [
            resolve(__dirname, "src"),
        ],
        test: /\.less$/,
        use: [
            "style-loader",
            "thread-loader",
            "css-loader", // on a separate thread
            "less-loader", // on a separate thread
        ],
    }],
```

It would run the css-loader and the less-loader in a worker pool using child processes.

Spawning child processes is rather expensive (~600ms). Only use the thread-loader for very expensive transformations that would otherwise block the event loop.

#### Use `noParse` for prebuilt libraries

As a last resort you can tell webpack to not parse prebuilt libraries:

```js
module.exports = {
    module: {
        noParse: [
            require.resolve("react")
        ],
    }
};
```

This might speed up the build but it also disables other optimizations such as tree-shaking.

### Optimization

-   webpack-bundle-analyzer
-   `maxSize` with HTTP2
    -   Webpack's defaults are usually good enough for most people
    -   If you've already done your homework (reduce JS payload), you can optimize here
    -   The goal: create smaller chunks than can be cached individually
    -   Why? HTTP2 has no head-of-line blocking
    -   The problem: find a good algorithm that selects modules that change often together (you could group by folder structure)
    -   Also problem: GZIP works better with larger files
-   `output.jsonpScriptType: "module"`
    -   Loads async chunks as modules instead of oldschool script tags
    -   Be careful with dependencies: All code is interpreted in strict mode.

### Debugging and error reporting

-   `module.strictExportPresence`
    -   true turns missing export warnings into errors
    -   Could be true for production builds in the future
-   `output.crossOriginLoading: "anonymous"`
    -   Uses the crossorigin attribute when loading chunks
    -   Useful when the bundle is served via a CDN with a different origin
    -   With no attribute, the global error handler will only report "Script error"
    -   https://stackoverflow.com/a/7778424
-   `stats.errorDetails: true` adds more information to errors like "Module not found"
-   `stats.logging: "verbose"`
-   `stats.optimizationBailout` shows which optimization didn't work for which module
    -   Example: Concatenation
-   `output.pathinfo: true`
    -   Enabled in development by default
    -   Disabled in production
    -   Useful to debug production build
