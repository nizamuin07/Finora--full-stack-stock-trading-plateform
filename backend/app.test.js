const { once } = require("node:events");
const { after, test } = require("node:test");
const app = require("./app");

test("health endpoint returns an OK status", async () => {
  const server = app.listen(0);
  await once(server, "listening");

  try {
    const response = await fetch(`http://127.0.0.1:${server.address().port}/health`);
    const body = await response.json();

    if (!response.ok || body.status !== "ok") {
      throw new Error(`Unexpected health response: ${response.status}`);
    }
  } finally {
    server.close();
    await once(server, "close");
  }
});
