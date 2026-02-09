import { api } from "./api";

jest.mock("./auth", () => ({
  auth: {
    getToken: () => Promise.resolve("token")
  }
}));

describe("api", () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve([])
    });
  });

  it("requests profiles list", async () => {
    const data = await api.getProfiles();
    expect(Array.isArray(data)).toBe(true);
    expect(global.fetch).toHaveBeenCalled();
  });
});
