import { Configuration, DefinePlugin } from "webpack";
import HTMLWebpackPlugin from 'html-webpack-plugin'
import MiniCSSExtractPlugin from 'mini-css-extract-plugin'
import { BuildOptions } from "./types";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";

export default function buildPlugins(options: BuildOptions): Configuration['plugins'] {
  const isDev = options.mode === 'development'
  
  const plugins: Configuration['plugins'] = [
    new HTMLWebpackPlugin({ template: options.paths.html }),
    new DefinePlugin({ __PLATFORM__: JSON.stringify(options.platform) })
  ]

  if (!isDev) {
    return [
      ...plugins, 
      new MiniCSSExtractPlugin(),
      options.analyser && new BundleAnalyzerPlugin()
    ].filter(Boolean)
  }

  return [
    ...plugins, 
    new ForkTsCheckerWebpackPlugin(),
    new ReactRefreshPlugin()
  ]
}