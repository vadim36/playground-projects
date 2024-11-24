import { Configuration } from "webpack";
import buildWebpack from "./config/buildWebpack";
import { BuildMode, BuildPaths, BuildPlatform } from "./config/types";
import path from 'path'

type EnvVariabes = Partial<{
  mode: BuildMode,
  port: number,
  analyser: boolean,
  platform: BuildPlatform
}>

export default (env: EnvVariabes): Configuration => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public')
  }

  const config: Configuration = buildWebpack({
    port: env.port ?? 5000,
    mode: env.mode ?? 'development',
    paths,
    analyser: env.analyser ?? false,
    platform: env.platform ?? 'desktop'
  })

  return config
}