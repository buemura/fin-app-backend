import http from "http";
import { server } from "../server-config";

describe("Server Config test", () => {
  it("should export server config", () => {
    expect(server).toBeInstanceOf(http.Server);
  });
});
