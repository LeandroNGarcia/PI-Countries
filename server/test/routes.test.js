const server = require("../src/server");
const session = require("supertest");
const agent = session(server);

describe("Testeo de rutas", () => {
  describe("GET Countries", () => {
    test("Deberia responder con status 200", async () => {
      await agent.get("/countries").expect(200);
    });
    test("Deberia responder con un array de objetos", async () => {
      const res = await agent.get("/countries");
      expect(typeof res.body).toBe("object");
    });
  });
  describe("GET Countries/id", () => {
    test("Deberia responder con status 200", async () => {
        await agent.get("/countries/AFG").expect(200)
    });
    test('Deberia responder con un objeto con todas sus propiedades', async () => {
      const res = await agent.get("/countries/AFG");
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("name");
      expect(res.body).toHaveProperty("capital");
      expect(res.body).toHaveProperty("continent");
      expect(res.body).toHaveProperty("area");
      expect(res.body).toHaveProperty("population");
      expect(res.body).toHaveProperty("Activities");
      expect(res.body).toHaveProperty("subRegion");
      expect(res.body).toHaveProperty("flag");
      expect(res.body).toHaveProperty("maps");
    })
  })
});
