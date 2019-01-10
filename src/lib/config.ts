/**
 *
 */
export interface Configuration {
  css?: string;
  preserveMediaQueries?: boolean;
  apply: ApplyTags;
  remove: RemoveTags;
}

/**
 *
 */
export interface ApplyTags {
  style: boolean;
  link: boolean;
}

/**
 *
 */
export interface RemoveTags {
  style: boolean;
  link: boolean;
  script: boolean;
}

/**
 *
 */
const config: Configuration = {
  preserveMediaQueries: true,
  apply: {
    style: true,
    link: true
  },
  remove: {
    style: true,
    link: true,
    script: true
  }
};

/**
 *
 */
export const mergeConfigurations = (ext: Configuration): Configuration => {
  Object.keys(config).forEach(key => {
    if (ext[key]) {
      config[key] = { ...config[key], ...ext[key] };
    }
  });

  return config;
}

/**
 *
 */
export const PRESERVE_MEDIA_QUERIES = () => config.preserveMediaQueries;
