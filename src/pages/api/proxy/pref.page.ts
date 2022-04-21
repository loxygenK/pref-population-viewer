import { NextApiHandler } from "next";
import { apiClient } from "~/api/client/client";
import { Prefecture } from "~/domain/prefecture";
import { ProxyAPIResponse } from "~/dto/proxyAPIResponse";

const handler: NextApiHandler<ProxyAPIResponse<Array<Prefecture>>> = async (
  _,
  res
) => {
  try {
    const prefs = await apiClient.pref.fetchPrefectures();
    res.status(200).json({ status: "success", data: prefs });
  } catch (e) {
    console.log(e);
    res.status(500).json({ status: "internal_error" });
  }
};

export default handler;
