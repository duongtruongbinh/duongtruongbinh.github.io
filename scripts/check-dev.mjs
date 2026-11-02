import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const baseURL = process.env.DEV_URL ?? "http://localhost:4321";
const navigationHeaders = {
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
};

for (const [path, heading] of [
  ["/", "About"],
  ["/publications/", "Publications"],
]) {
  test(`dev server renders ${path} with its content`, async () => {
    const response = await fetch(new URL(path, baseURL));
    assert.equal(
      response.status,
      200,
      `${path} failed; inspect the dev server logs`,
    );
    const html = await response.text();
    assert.ok(html.includes(heading));
  });
}

test("the old CV route redirects to the PDF for browser viewing", async () => {
  const response = await fetch(new URL("/cv/", baseURL), {
    redirect: "manual",
  });
  assert.equal(response.status, 302);
  const pdf = await fetch(new URL(response.headers.get("location"), baseURL), {
    headers: navigationHeaders,
  });
  assert.equal(pdf.status, 200);
  assert.match(pdf.headers.get("content-type"), /application\/pdf/);
  assert.doesNotMatch(
    pdf.headers.get("content-disposition") ?? "",
    /attachment/,
  );
  assert.deepEqual(
    Buffer.from(await pdf.arrayBuffer()),
    await readFile("public/CV.pdf"),
  );
});

test("clicking the rendered CV link works as a browser navigation", async () => {
  const html = await (await fetch(baseURL)).text();
  const link = html.match(/<a\b[^>]*href="([^"]+\.pdf)"[^>]*>CV</);
  assert.ok(link, "CV navigation link is missing");
  const pdf = await fetch(new URL(link[1], baseURL), {
    headers: navigationHeaders,
  });
  assert.equal(pdf.status, 200, `browser navigation to ${link[1]} failed`);
  assert.match(pdf.headers.get("content-type"), /application\/pdf/);
});
