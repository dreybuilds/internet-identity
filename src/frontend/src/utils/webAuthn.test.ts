import { extractAAGUID, lookupAAGUID } from "$src/utils/webAuthn";
import { beforeAll } from "vitest";

describe("webauthn", () => {
  describe("extractAAGUID", () => {
    const authData = new Uint8Array([
      73, 150, 13, 229, 136, 14, 140, 104, 116, 52, 23, 15, 100, 118, 96, 91,
      143, 228, 174, 185, 162, 134, 50, 199, 153, 92, 243, 186, 131, 29, 151,
      99, 93, 0, 0, 0, 0, 251, 252, 48, 7, 21, 78, 78, 204, 140, 11, 110, 2, 5,
      87, 215, 189, 0, 20, 122, 46, 179, 234, 216, 32, 95, 40, 25, 98, 51, 103,
      119, 135, 36, 186, 252, 180, 113, 170, 165, 1, 2, 3, 38, 32, 1, 33, 88,
      32, 206, 3, 195, 95, 65, 83, 178, 99, 56, 213, 138, 103, 0, 55, 200, 157,
      227, 19, 87, 237, 41, 86, 208, 27, 181, 242, 180, 75, 41, 151, 172, 127,
      34, 88, 32, 235, 3, 49, 22, 206, 49, 150, 40, 230, 221, 162, 178, 167, 68,
      145, 168, 200, 14, 192, 74, 54, 102, 205, 211, 146, 89, 61, 60, 116, 54,
      145, 67,
    ]);
    const anonymousAuthData = new Uint8Array([
      73, 150, 13, 229, 136, 14, 140, 104, 116, 52, 23, 15, 100, 118, 96, 91,
      143, 228, 174, 185, 162, 134, 50, 199, 153, 92, 243, 186, 131, 29, 151,
      99, 93, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20,
      122, 46, 179, 234, 216, 32, 95, 40, 25, 98, 51, 103, 119, 135, 36, 186,
      252, 180, 113, 170, 165, 1, 2, 3, 38, 32, 1, 33, 88, 32, 206, 3, 195, 95,
      65, 83, 178, 99, 56, 213, 138, 103, 0, 55, 200, 157, 227, 19, 87, 237, 41,
      86, 208, 27, 181, 242, 180, 75, 41, 151, 172, 127, 34, 88, 32, 235, 3, 49,
      22, 206, 49, 150, 40, 230, 221, 162, 178, 167, 68, 145, 168, 200, 14, 192,
      74, 54, 102, 205, 211, 146, 89, 61, 60, 116, 54, 145, 67,
    ]);

    it("should return valid AAGUID", () => {
      expect(extractAAGUID(authData)).toBe(
        "fbfc3007-154e-4ecc-8c0b-6e020557d7bd" // iCloud Keychain
      );
    });

    it("should return undefined", () => {
      expect(extractAAGUID(anonymousAuthData)).toBeUndefined();
    });
  });

  describe("lookupAAGUID", () => {
    beforeAll(() => {
      vi.mock("../assets/passkey_aaguid_data.json", () => ({
        default: {
          "fbfc3007-154e-4ecc-8c0b-6e020557d7bd": "iCloud Keychain",
        },
      }));
    });

    it("should return expected value", async () => {
      expect(await lookupAAGUID("fbfc3007-154e-4ecc-8c0b-6e020557d7bd")).toBe(
        "iCloud Keychain"
      );
    });
  });
});
