import { ethers } from "ethers";
import crypto from "crypto";
import fs from "fs";

const PROFILE_FILE = "profiles.json";

let profileCache = {};
if (fs.existsSync(PROFILE_FILE)) {
  profileCache = JSON.parse(fs.readFileSync(PROFILE_FILE, "utf8"));
}

function saveProfiles() {
  fs.writeFileSync(PROFILE_FILE, JSON.stringify(profileCache, null, 2));
}

export function buildProfile(privateKey, proxy, ua) {
  privateKey = privateKey.replace(/\r/g, "").trim();

  const wallet = new ethers.Wallet(privateKey);
  const address = wallet.address.toLowerCase();

  if (!profileCache[address]) {
    const uuid = crypto.randomUUID();
    const device = proxy ? proxy.split("@").pop() : "NO_PROXY";

    profileCache[address] = {
      wallet: wallet.address,
      device,
      ua,
      uuid
    };

    saveProfiles();
  }

  return profileCache[address];
}
