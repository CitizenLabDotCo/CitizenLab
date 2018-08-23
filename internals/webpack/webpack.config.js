const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const argv = require('yargs').argv;
// const API_HOST = process.env.API_HOST || 'localhost';
// const API_PORT = process.env.API_PORT || 4000;

const config = {
  entry: {
    app: path.join(process.cwd(), 'app/app.tsx')
  },

  output: {
    path: path.resolve(process.cwd(), 'build'),
    pathinfo: false,
    publicPath: '/',
    filename: isDev ? '[name].js' : '[name].[chunkhash].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash].chunk.js',
  },

  mode: isDev ? 'development' : 'production',

  devServer: {
    contentBase: path.join(process.cwd(), 'build'),
    hot: true,
    // compress: true,
    // stats: 'errors-only',
    // host: '0.0.0.0',
    // port: 3000,
    // historyApiFallback: true,
    // proxy: {
    //   '/web_api': `http://${API_HOST}:${API_PORT}`,
    //   '/auth/': `http://${API_HOST}:${API_PORT}`,
    // },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        }],
      },
      {
        test: /\.css$/,
        use: [
          { loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.(svg|jpg|png|gif)$/,
        use: [
          { loader: 'cache-loader' },
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
      {
        test: /\.htaccess/,
        include: path.resolve(process.cwd(), 'app'),
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_HOST: JSON.stringify(process.env.API_HOST),
        API_PORT: JSON.stringify(process.env.API_PORT),
        CROWDIN_PLUGIN_ENABLED: !!process.env.CROWDIN_PLUGIN_ENABLED,
        SEGMENT_API_KEY: JSON.stringify(process.env.SEGMENT_API_KEY),
        SENTRY_DSN: JSON.stringify(process.env.SENTRY_DSN),
        CI: JSON.stringify(process.env.CI),
        CIRCLECI: JSON.stringify(process.env.CIRCLECI),
        CIRCLE_BUILD_NUM: JSON.stringify(process.env.CIRCLE_BUILD_NUM),
        CIRCLE_SHA1: JSON.stringify(process.env.CIRCLE_SHA1),
        CIRCLE_BRANCH: JSON.stringify(process.env.CIRCLE_BRANCH),
      },
    }),

    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      tsconfig: path.join(process.cwd(), 'app/tsconfig.json'),
      silent: !!argv.json, // silent when trying to profile the chunks sizes
    }),

    new CleanWebpackPlugin(['build']),

    new HtmlWebpackPlugin({
      template: 'app/index.html',
      preload: [
        'main.js',
        'main.*.js',
        '*.eot',
        '*.ttf',
        '*.woff',
        '*.woff2',
      ],
      prefetch: [
        '*.chunk.js',
      ],
    }),

    new ResourceHintWebpackPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[chunkhash].css',
      chunkFilename: isDev ? '[name].chunk.css' : '[name].[chunkhash].chunk.css',
    }),
  ],

  resolve: {
    modules: ['app', 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};

if (isDev) {
  config.plugins.push(new webpack.ProgressPlugin());
}

module.exports = config;
