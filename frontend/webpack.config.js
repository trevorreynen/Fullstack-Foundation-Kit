const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const dotenv = require('dotenv')


// Import the global .env for the frontend/backend.
dotenv.config({path: '../.env'})


// The APP_TITLE is imported via env variables.
const APP_TITLE = process.env.FRONTEND_WEBSITE_TITLE


const makeHTMLTemplate = ({ htmlWebpackPlugin }) => `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      ${htmlWebpackPlugin.tags?.headTags}
      <title>${APP_TITLE}</title>
    </head>
    <body>
      <div id="root"></div>
      ${htmlWebpackPlugin.tags?.bodyTags}
    </body>
  </html>
`


const makeHTMLPlugin = () =>
  new HtmlWebpackPlugin({
    templateContent: makeHTMLTemplate,
    filename: 'index.html',
    inject: false, // Disable automatic injection to use our custom template logic
    publicPath: '',
  })


// Function to find an available port and return the Webpack configuration
module.exports = async () => {
  const port = process.env.FRONTEND_PORT

  return {
    entry: './src/pages/Entry.tsx',
    output: {
      clean: true, // Clean old build files
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      //filename: 'bundle.js',
      assetModuleFilename: 'assets/[name][ext]',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
          /*
          use: {
            loader: 'ts-loader',
          }
          */
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'], // 'style-loader': Injects styles into the DOM, 'css-loader': Resolves CSS imports, 'sass-loader': Compiles SCSS to CSS
          //use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(svg|png|jpg|jpeg|gif|ico)$/i, // Handle images and SVGs
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name][ext]', // Customize output folder for images
          },
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|mp3|mp4|webm)$/i, // Handle fonts and media
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts-and-media/[name][ext]', // Customize output folder
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.API_BASE': JSON.stringify(process.env.API_BASE),
      }),
      makeHTMLPlugin(),
      /*
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
      */
    ],
    devServer: {
      static: './dist', // Serve files from 'dist'
      port,
      hot: true, // Enable hot module replacement
      open: true, // Supposed to automatically open the browser
      historyApiFallback: true, // Redirect all 404s to 'index.html'
    },
  }
}

