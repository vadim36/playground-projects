import { BuildOptions } from "../types";
import removeDataTestIdBabelPlugin from "./removeDataTestIdBabelPlugin";

export default function buildBabelLoader({mode}: BuildOptions) {
  const isDev = mode === 'development'
  const plugins = []
  
  if (!isDev) {
    plugins.push([
      removeDataTestIdBabelPlugin,
      {
        "props": ["data-testid"]
      }
    ])
  }

  return {
    loader: 'babel-loader',
    options: {
      presets: [
        "@babel/preset-env", 
        "@babel/preset-typescript",
        ["@babel/preset-react", {
          runtime: isDev ? "automatic" : 'classic'
        }]
      ],
      plugins
    }
  }
}