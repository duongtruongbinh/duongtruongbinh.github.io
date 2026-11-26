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
  assert.equal([...home.matchAll(/class="diagram-stage"/g)].length, 3);
  const interests = [
    ...home.matchAll(/<h3 class="diagram-stage-title">([^<]+)<\/h3>/g),
  ].map((match) => match[1]);
  assert.deepEqual(interests, [
    "Robust Multimodal Reasoning",
    "World Models",
    "Vision-Language-Action",
  ]);
  assert.match(home, /<h2 id="research-interests-heading"/);
  assert.doesNotMatch(home, /\[object Object\]/);
});

test("readers can skip navigation and see the editorial update date", async () => {
  for (const page of pages) {
    const html = await readFile(`dist/${page}`, "utf8");
    assert.match(html, /href="#main-content"/);
    assert.match(html, /<main\b[^>]*id="main-content"/);
    assert.match(
      html,
      /Last updated:[\s\S]*?<time datetime="\d{4}-\d{2}-\d{2}"/,
    );
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
  assert.match(
    html,
    /\* equal contribution · full list on <a\b[^>]*href="https:\/\/scholar\.google\.com\/citations\?user=GW6kjhEAAAAJ&hl=en"[^>]*>google scholar<\/a>/i,
  );
  assert.doesNotMatch(html, /Code \/ (Dataset|Benchmark)/);
});

test("publication figures are local, accessible images without image links", async () => {
  const html = await readFile("dist/publications/index.html", "utf8");
  const articles = [
    ...html.matchAll(
      /<article class="publication-item">([\s\S]*?)<\/article>/g,
    ),
  ];
  assert.equal(articles.length, 6);
  for (const [, article] of articles) {
    const figure = article.match(
      /<div class="publication-figure">\s*<img\b([^>]+)>/,
    );
    assert.ok(figure, "each available paper must have a labeled figure");
    assert.match(figure[1], /alt="[^"]+"/);
    const imagePath = figure[1].match(/\ssrc="([^"]+)"/);
    assert.ok(imagePath);
    assert.ok(
      imagePath[1].startsWith("/_astro/"),
      "figures must be served locally",
    );
    assert.ok((await readFile(`dist${imagePath[1]}`)).length > 0);
  }
});

test("publication venues show conference names and abbreviations without volume or pages", async () => {
  const html = await readFile("dist/publications/index.html", "utf8");
  const venues = [
    ...html.matchAll(/<p class="publication-venue">([^<]+)<\/p>/g),
  ].map((match) => match[1]);
  assert.equal(venues.length, 6);
  for (const venue of venues) {
    assert.match(venue, /\([A-Z][^)]+20\d{2}\)/);
    assert.doesNotMatch(
      venue,
      /\b(?:vol\.|pp\.|pages\b|Springer\b|Elsevier\b|Procedia\b)/i,
    );
  }
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
    assert.match(html, /<h2 id="visitors-heading"[^>]*>Visitors<\/h2>/);
    assert.match(html, /map\.png[^"]*w=600/);
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
      document: {
        querySelector: () => map,
        documentElement: { getAttribute: () => "light" },
        addEventListener() {},
      },
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

test("publications put first-author papers first within each year", async () => {
  const html = await readFile("dist/publications/index.html", "utf8");
  const groups = [
    ...html.matchAll(
      /<h2 id="year-(\d{4})"[\s\S]*?(?=<h2 id="year-|<\/main>)/g,
    ),
  ];
  assert.deepEqual(
    groups.map((group) => group[1]),
    ["2026", "2025"],
  );
  for (const [group] of groups) {
    const leads = [
      ...group.matchAll(/<p class="publication-authors">\s*(<strong>)?/g),
    ].map((match) => Boolean(match[1]));
    assert.ok(leads[0], "a first-author paper leads each year");
    assert.deepEqual(
      leads,
      [...leads].sort((a, b) => Number(b) - Number(a)),
    );
  }
});

test("BibTeX is available and prefers DOI records", async () => {
  const html = await readFile("dist/publications/index.html", "utf8");
  const panels = [
    ...html.matchAll(/<div class="bibtex-panel" id="([^"]+)" hidden>/g),
  ];
  assert.ok(panels.length >= 5);
  for (const [, id] of panels) {
    assert.match(html, new RegExp(`aria-controls="${id}"`));
  }
  for (const doi of [
    "10.1016/j.procs.2026.09.191",
    "10.1109/MAPR72750.2026.11685754",
    "10.1007/978-981-95-1746-6_18",
  ]) {
    assert.ok(html.includes(`doi       = {${doi}}`), doi);
  }
});

test("404 is not indexed and links back into the site", async () => {
  const html = await readFile("dist/404.html", "utf8");
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/);
  assert.match(html, /<a href="\/">Back to home<\/a>/);
  assert.doesNotMatch(html, /history\.back/);
});

test("sitemap lists only indexable pages", async () => {
  const sitemap = await readFile("dist/sitemap-0.xml", "utf8");
  assert.doesNotMatch(sitemap, /\/cv\//);
  assert.match(sitemap, /\/publications\//);
});

test("icons and preview image are published", async () => {
  const html = await readFile("dist/index.html", "utf8");
  for (const file of ["favicon.svg", "favicon.ico", "apple-touch-icon.png"]) {
    assert.ok((await readFile(`dist/${file}`)).length > 0, file);
    assert.ok(html.includes(`href="/${file}"`), file);
  }
  assert.match(html, /<link rel="preload"[^>]*as="font"/);
  await assert.rejects(readFile("dist/profile.jpg"));
});

test("structured data describes the person and marks the homepage as a profile", async () => {
  for (const page of pages) {
    const html = await readFile(`dist/${page}`, "utf8");
    const json = html.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    );
    assert.ok(json, `${page} must include JSON-LD`);
    const graph = JSON.parse(json[1])["@graph"];
    const person = graph.find((node) => node["@type"] === "Person");
    assert.equal(person.name, "Truong-Binh Duong");
    assert.match(person.image, /^https:\/\/duongtruongbinh\.github\.io\/.+/);
    assert.ok(person.knowsAbout.includes("World Models"));
    assert.ok(person.sameAs.some((url) => url.includes("orcid.org")));
    const pageNode = graph.find((node) => node["@type"].endsWith("Page"));
    assert.equal(
      pageNode["@type"],
      page === "index.html" ? "ProfilePage" : "WebPage",
    );
  }
  assert.ok((await readFile("dist/profile-portrait.webp")).length > 0);
});
