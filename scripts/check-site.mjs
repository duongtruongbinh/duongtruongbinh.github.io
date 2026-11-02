import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { runInNewContext } from "node:vm";

const pages = ["index.html", "publications/index.html"];

test("profile contact is readable and the retained research content is rendered", async () => {
  for (const page of pages) {
    const html = await readFile(`dist/${page}`, "utf8");
    assert.match(html, /href="mailto:duongtruongbinh2003@gmail.com"/);
    assert.match(html, />duongtruongbinh2003@gmail.com<\/span>/);
    for (const label of ["GitHub", "Google Scholar", "ORCID", "LinkedIn"]) {
      assert.ok(html.includes(`<span>${label}</span>`));
    }
  }
  const home = await readFile("dist/index.html", "utf8");
  assert.match(home, /<figure[^>]*aria-labelledby="research-loop-caption"/);
  assert.equal([...home.matchAll(/class="diagram-stage"/g)].length, 3);
  assert.match(home, /<h3>World Models<\/h3>/);
  assert.match(home, /<h3>Vision-Language-Action<\/h3>/);
  assert.match(home, /<h3>Robust Multimodal Reasoning<\/h3>/);
  assert.doesNotMatch(home, /\[object Object\]/);
});

test("readers can skip navigation and see the editorial update date", async () => {
  for (const page of pages) {
    const html = await readFile(`dist/${page}`, "utf8");
    assert.match(html, /href="#main-content"/);
    assert.match(html, /<main\b[^>]*id="main-content"/);
    assert.match(html, /Last updated:[\s\S]*?<time datetime="2026-11-06"/);
  }
});

test("CV navigation opens the original PDF without forcing a download", async () => {
  const redirect = await readFile("dist/cv/index.html", "utf8");
  assert.match(redirect, /http-equiv="refresh"/);
  for (const page of pages) {
    const html = await readFile(`dist/${page}`, "utf8");
    const link = html.match(/<a\b[^>]*href="([^"]+\.pdf)"[^>]*>CV</);
    assert.ok(link, "CV navigation must link directly to the PDF");
    assert.doesNotMatch(link[0], /\bdownload\b/);
    assert.ok(
      redirect.includes(`url=${link[1]}`),
      "static /cv must redirect to the same PDF",
    );
    assert.deepEqual(
      await readFile(`dist${link[1]}`),
      await readFile("public/CV.pdf"),
    );
  }
});

test("publication contribution markers are explained", async () => {
  const html = await readFile("dist/publications/index.html", "utf8");
  assert.match(html, /\* Equal contribution\./);
  assert.doesNotMatch(html, /Code \/ (Dataset|Benchmark)/);
});

test("visitor map uses the owner's account without third-party JavaScript", async () => {
  for (const page of pages) {
    const html = await readFile(`dist/${page}`, "utf8");
    assert.doesNotMatch(html, /<script[^>]+src="https:\/\/mapmyvisitors/);
    assert.ok(
      html.includes(
        "https://mapmyvisitors.com/map.png?d=Fj41EQW4zT0Jm1z8_PXs15124rtk-Hrs01vZxgbUoMo",
      ),
    );
    assert.match(html, /https:\/\/mapmyvisitors.com\/web\/1c98s/);
    assert.match(html, /approximate visitor locations/);
    assert.match(html, /data-production-host="duongtruongbinh.github.io"/);
    assert.ok(
      html.includes(`data-show-map="${page === "index.html"}"`),
      "only About should display the visitor map",
    );
    assert.doesNotMatch(html, /<img[^>]*\ssrc="https:\/\/mapmyvisitors/);
  }
});

test("previews use a snapshot without contacting the live counter", async () => {
  const html = await readFile("dist/index.html", "utf8");
  const script = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match) => match[1])
    .find((source) => source.includes('querySelector("[data-visitor-map]")'));
  assert.ok(script, "visitor map initializer is missing");
  for (const hostname of [
    "localhost",
    "127.0.0.1",
    "preview.example",
    "duongtruongbinh.github.io",
  ]) {
    let onError;
    const image = {
      dataset: {
        src: "https://mapmyvisitors.com/map.png?d=owner-id&w=560",
        previewSrc: "/visitor-map-preview.png",
      },
      addEventListener(event, listener) {
        if (event === "error") onError = listener;
      },
    };
    const map = {
      hidden: true,
      dataset: { productionHost: "duongtruongbinh.github.io", showMap: "true" },
      querySelector: () => image,
    };
    const context = {
      URL,
      window: { location: { hostname } },
      document: { querySelector: () => map, documentElement: {} },
      getComputedStyle: () => ({ getPropertyValue: () => " #1e40af " }),
    };
    runInNewContext(script, context);
    if (hostname === "duongtruongbinh.github.io") {
      assert.equal(map.hidden, false);
      assert.equal(new URL(image.src).searchParams.get("co"), "1e40af");
      onError();
      assert.equal(image.hidden, true);
      assert.equal(map.hidden, false);
    } else {
      assert.equal(
        image.src,
        "/visitor-map-preview.png",
        `${hostname} must not send a tracking request`,
      );
      assert.equal(map.hidden, false);
      assert.match(image.alt, /preview/i);
    }
    map.dataset.showMap = "false";
    runInNewContext(script, { ...context });
    assert.equal(map.hidden, true, "other pages must not display the map");
  }
});
