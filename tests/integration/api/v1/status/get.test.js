import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status returns status 200 and correct body", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const data = await response.json();
  expect(data.updated_at).toBeDefined();

  const expectedUpdatedAt = new Date(data.updated_at).toISOString();
  expect(data.updated_at).toEqual(expectedUpdatedAt);

  expect(data.dependencies.database.version).toEqual("16.0");
  expect(data.dependencies.database.max_connections).toEqual(100);
  expect(data.dependencies.database.opened_connections).toBeGreaterThanOrEqual(
    1,
  );
});
