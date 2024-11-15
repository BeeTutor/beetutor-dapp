import { verifyCloudProof } from "@worldcoin/idkit";
import { configMap } from "../config.js";
import { contractService } from "../service/contract.service.js";

class TokenController {
  claimAirDropToken = async (req, res) => {
    const { proof, to } = req.body;

    const app_id = configMap.wordCoin.appId;
    const action = configMap.wordCoin.actionId.airDrop;
    const verifyRes = await verifyCloudProof(proof, app_id, action);
    if (verifyRes.success) {
      // This is where you should perform backend actions if the verification succeeds
      // Such as, setting a user as "verified" in a database
      await contractService.claimAirDrop(to);
      res.status(200).send(verifyRes);
    } else if (verifyRes.code === "max_verifications_reached") {
      res.status(400).json({
        success: false,
        reason: "max_verifications_reached",
      });
    } else {
      // This is where you should handle errors from the World ID /verify endpoint.
      // Usually these errors are due to a user having already verified.
      res.status(400).send(verifyRes);
    }
  };
}

export const tokenController = new TokenController();
