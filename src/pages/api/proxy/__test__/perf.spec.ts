import { NextApiRequest, NextApiResponse } from "next";
import httpMocks from "node-mocks-http";
import { Prefecture } from "~/domain/prefecture";
import { ProxyAPIResponse } from "~/dto/proxyAPIResponse";
import handler from "../pref.page";

describe("Prefecture proxy page", () => {
  it("fetches the prefecture data", async () => {
    const req = httpMocks.createRequest<NextApiRequest>();
    const res = httpMocks.createResponse<NextApiResponse>();

    await handler(req, res);

    const jsonResponse: ProxyAPIResponse<Array<Prefecture>> =
      res._getJSONData();

    expect(res.statusCode).toBe(200);
    expect(jsonResponse.status).toBe("success");
    if (jsonResponse.status !== "success") {
      return;
    }

    expect(jsonResponse.data).toHaveLength(50);
  });
});
