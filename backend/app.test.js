const { once } = require("node:events");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const app = require("./app");

test("health endpoint returns an OK status", async () => {
  const server = app.listen(0);
  await once(server, "listening");

  try {
    for (const endpoint of ["/health", "/", "/trading"]) {
      const response = await fetch(
        `http://127.0.0.1:${server.address().port}${endpoint}`
      );

      if (endpoint === "/health") {
        const body = await response.json();
        assert.equal(response.status, 200);
        assert.equal(body.status, "ok");
      } else {
        assert.notEqual(response.status, 401);
        if (fs.existsSync(path.resolve(__dirname, "../frontend/dist/index.html"))) {
          assert.equal(response.status, 200);
          assert.match(response.headers.get("content-type"), /text\/html/);
        }
      }
    }
  } finally {
    server.close();
    await once(server, "close");
  }
});
