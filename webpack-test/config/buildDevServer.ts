import { Configuration } from "webpack-dev-server";
import { BuildOptions } from "./types";

export function buildDevServer(options: BuildOptions): Configuration {
  return {
    port: options.port ?? 5000,
    open: true,
    historyApiFallback: true
  }
}