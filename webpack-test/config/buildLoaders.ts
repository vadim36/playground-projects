import { ModuleOptions } from "webpack";
import MiniCSSExtractPlugin from 'mini-css-extract-plugin'
import { BuildOptions } from "./types";
import ReactRefreshTypescript from 'react-refresh-typescript'
import buildBabelLoader from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development'
  
  const tsLoader = {
    test: /\.tsx?$/,
    use: [{
      loader: 'ts-loader',
      options: { 
        transpileOnly: true,
        getCustomTransformers: () => ({
          before: [isDev && ReactRefreshTypescript()].filter(Boolean)
        })
      }
    }],
    exclude: /node_modules/,
  }

  const babelLoader = {
    test: /\.tsx?$/,
    use: buildBabelLoader(options)
  }

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? MiniCSSExtractPlugin.loader : 'style-loader', 
      "css-loader", 
      "sass-loader"
    ]
  }

  const assetLoader = {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: 'asset/resource'
  }

  return [ tsLoader, babelLoader, scssLoader, assetLoader ]
}