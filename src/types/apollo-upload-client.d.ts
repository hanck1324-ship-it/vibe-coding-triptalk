declare module "apollo-upload-client" {
  import { ApolloLink } from "@apollo/client";

  export interface ReactNativeFileOptions {
    uri: string;
    type?: string;
    name?: string;
  }

  export class ReactNativeFile {
    constructor(options: ReactNativeFileOptions);
  }

  export interface CreateUploadLinkOptions {
    uri?: string;
    includeExtensions?: boolean;
    headers?: Record<string, any>;
    credentials?: string;
    fetch?: WindowOrWorkerGlobalScope["fetch"];
    isExtractableFile?: (value: any) => boolean;
    [key: string]: any;
  }

  export function createUploadLink(options?: CreateUploadLinkOptions): ApolloLink;
  
  export function isExtractableFile(value: any): boolean;
}
