import { NextApiRequest, NextApiResponse } from "next";
import httpMocks from "node-mocks-http";
import { PopulationChange } from "~/domain/polulationChange";
import { ProxyAPIResponse } from "~/dto/proxyAPIResponse";
import handler from "../population.page";

describe("Population change proxy page", () => {
  it("fetches the population data when the correct query parameter is passed", async () => {
    const prefIDs = ["pref-1", "pref-2", "pref-3", "pref-4", "pref-5"];

    const req = httpMocks.createRequest<NextApiRequest>({
      query: { prefIDs: prefIDs.join(",") },
    });
    const res = httpMocks.createResponse<NextApiResponse>();

    await handler(req, res);

    const jsonResponse: ProxyAPIResponse<Array<PopulationChange>> =
      res._getJSONData();

    expect(res.statusCode).toBe(200);
    expect(jsonResponse.status).toBe("success");
    if (jsonResponse.status !== "success") {
      return;
    }

    expect(jsonResponse.data).toHaveLength(5);
    expect(jsonResponse.data.map((d) => d.pref.id)).toStrictEqual(prefIDs);
  });

  it("declines the request with invalid_request when no query parameter is passed", async () => {
    const req = httpMocks.createRequest<NextApiRequest>();
    const res = httpMocks.createResponse<NextApiResponse>();

    await handler(req, res);

    const jsonResponse: ProxyAPIResponse<
      Array<PopulationChangeWithPrefectureID>
    > = res._getJSONData();

    expect(res.statusCode).toBe(400);
    expect(jsonResponse.status).toBe("invalid_request");
  });
});
