import { NextApiHandler } from "next";
import { apiClient } from "~/api/client";
import { PopulationChange } from "~/domain/polulationChange";
import { ProxyAPIResponse } from "~/dto/proxyAPIResponse";

const handler: NextApiHandler<
  ProxyAPIResponse<Array<PopulationChange>>
> = async (req, res) => {
  const prefIDsQuery: string | string[] | undefined = req.query.prefIDs;
  if (prefIDsQuery === undefined) {
    res.status(400).json({
      status: "invalid_request",
      message: "`prefIDs` query must be set",
    });
    return;
  }

  const prefIDs = Array.isArray(prefIDsQuery)
    ? prefIDsQuery
    : prefIDsQuery.split(",");

  try {
    const prefs = await apiClient.pref.fetchPrefectures();
    const selectedPrefs = prefs.filter((p) => prefIDs.includes(p.id));

    if (selectedPrefs.length !== prefIDs.length) {
      res.status(404).json({
        status: "invalid_request",
        message: "Some prefectures was not found",
      });
      return;
    }

    const population = await apiClient.population.fetchPopulationChange(
      selectedPrefs
    );
    res.status(200).json({ status: "success", data: population });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: "internal_error" });
  }
};

export default handler;
