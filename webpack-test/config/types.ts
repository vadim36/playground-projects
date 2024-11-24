export type BuildPaths = {
  entry: string;
  html: string
  output: string,
  src: string,
  public: string
}

export type BuildMode = 'production' | 'development'
export type BuildPlatform = 'desktop' | 'mobile'

export type BuildOptions = {
  port: number
  paths: BuildPaths,
  mode: BuildMode,
  analyser?: boolean,
  platform: BuildPlatform
}