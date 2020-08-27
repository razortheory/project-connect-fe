const queryString = (parameters: QueryParams) => {
  const qs = String(new URLSearchParams(parameters));
  return qs ? `?${qs}` : '';
};

const joinBase = (url: string, baseUrl: string) =>
  `${baseUrl.replace(/\/$/, '')}/${url.replace(/^\/|\/$/, '')}/`;

const contentTypeJson = { 'Content-Type': 'application/json' };

type BaseConfig = {
  baseUrl: string;
  headers?: HeadersInit;
};
type CustomConfig<T> = {
  params?: QueryParams;
  silent?: boolean;
  url: string;
  data?: unknown;
  fn?: ({ jsonData }: { jsonData: T | undefined }) => unknown;
  method: string;
};
type QueryParams =
  | {
      [key: string]: string;
    }
  | undefined;

export const createRequest = <T>(baseConfig: BaseConfig) => async (
  customConfig: CustomConfig<T>
) => {
  const config = { ...baseConfig, ...customConfig };
  const { baseUrl, url, data, params, fn, silent, ...init } = config;
  const resource = `${joinBase(url, baseUrl)}${queryString(params)}`;

  if (data) {
    Object.assign(init, {
      headers: { ...contentTypeJson, ...config.headers },
      body: JSON.stringify(data),
    });
  }

  const request = new Request(resource, init);

  const handleRequestErrors = (response: Response) => {
    if (!response.ok) {
      const error = new Error(response.statusText);
      Object.assign(error, { config, request, response, resource, baseConfig });
      throw error;
    }
    return response;
  };

  return fetch(request)
    .then(silent ? (x) => x : handleRequestErrors)
    .then(async (response) => {
      let jsonData;
      try {
        jsonData = (await response.json()) as T;
      } catch (error) {
        /* skip */
        console.log(error);
      }
      return fn ? fn({ jsonData }) : jsonData;
    });
};
