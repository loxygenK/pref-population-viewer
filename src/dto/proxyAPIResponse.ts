export type Status = "success" | "invalid_request" | "internal_error";
export type ProxyAPIResponse<T> =
  | {
      status: "success";
      data: T;
    }
  | {
      status: "invalid_request";
      message: string;
    }
  | {
      status: "internal_error";
    };
