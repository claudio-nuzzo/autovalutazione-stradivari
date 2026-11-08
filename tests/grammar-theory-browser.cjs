'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { launchBrowser } = require('./browser-runtime.cjs');

const root = path.resolve(__dirname, '../autovalutazione-app/grammatica');
const sourceLessons = ['parole', 'verbi', 'periodo'].flatMap(name =>
  JSON.parse(fs.readFileSync(path.join(root, `theory-${name}.json`), 'utf8'))
);
const stages = ['level', 'topic', 'theory', 'review', 'practice', 'assessment'];
const levelKeys = { 1: 'base', 2: 'consolidamento', 3: 'avanzato' };
const representatives = ['parole|Articolo', 'frase|Soggetto e predicato', 'periodo|Concessive'];
const mime = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.ttf': 'font/ttf', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root + path.sep)) return res.writeHead(403).end();
  try {
    res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
    res.end(fs.readFileSync(file));
  } catch {
    res.writeHead(404).end();
  }
});

function value(lesson) { return `${lesson.area}|${lesson.topic}`; }
function lessonFor(topic) {
  const lesson = sourceLessons.find(candidate => value(candidate) === topic);
  assert.ok(lesson, `Missing source lesson: ${topic}`);
  return lesson;
}

async function checkProductionGate(browser) {
  const origin = 'https://didattica.stradilab.org';
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, serviceWorkers: 'block' });
  const foreignRequests = [], apiRequests = [], missingAssets = [], errors = [];
  // All requests are fulfilled locally. No route ever continues to the network.
  await context.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.origin !== origin) {
      foreignRequests.push(url.href);
      return route.fulfill({ status: 403, contentType: 'text/plain', body: 'External service blocked by the offline test' });
    }
    if (/\/api\//.test(url.pathname)) {
      apiRequests.push(url.pathname);
      return route.fulfill({ status: 403, contentType: 'application/json', body: '{"ok":false,"error":"Offline test: no account"}' });
    }
    const file = path.resolve(root, '.' + (url.pathname === '/' ? '/index.html' : url.pathname));
    if (!file.startsWith(root + path.sep)) return route.fulfill({ status: 403, body: 'Forbidden' });
    try {
      return route.fulfill({ status: 200, contentType: mime[path.extname(file)] || 'application/octet-stream', body: fs.readFileSync(file) });
    } catch {
      missingAssets.push(url.pathname);
      return route.fulfill({ status: 404, body: 'Missing local asset' });
    }
  });
  await context.addInitScript(() => {
    // The stub deliberately never invokes onReady or provides an identity/token.
    window.google = { accounts: {} };
    window.__offlineAuthInitializations = 0;
    window.StradilabAuth = {
      idToken: () => '',
      esci: async () => {},
      init({ mount }) {
        window.__offlineAuthInitializations++;
        const host = document.getElementById(mount);
        if (host) host.textContent = 'Accesso simulato: nessun account.';
      }
    };
  });
  const page = await context.newPage();
  page.setDefaultTimeout(8000);
  page.on('pageerror', error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  try {
    await page.goto(origin + '/');
    assert.equal(await page.evaluate(() => window.AtelierAdapter.enabled), true);
    assert.equal(await page.evaluate(() => window.AtelierAdapter.session), null);
    assert.equal(await page.evaluate(() => window.__offlineAuthInitializations), 1);
    assert.equal(await page.evaluate(() => typeof window.ATELIER_REVIEW_BANK), 'undefined');
    await page.locator('[data-track="moda"]').click();
    await page.locator('.bottom a[href="#pillole"]').click();
    await page.locator('#theorySearch').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#theoryCatalogue [data-theory-slug]').count(), 80);
    for (const lesson of sourceLessons) {
      const topic = value(lesson);
      await page.locator('.bottom a[href="#home"]').click();
      await page.locator('#topic').waitFor({ state: 'visible' });
      await page.locator('#topic').selectOption(topic);
      await page.locator('#startSuggested').click();
      await page.waitForURL(/#teoria\//);
      await page.locator('.theory-lesson').waitFor({ state: 'visible' });
      assert.equal(await page.locator('.theory-lesson').getAttribute('data-theory-topic'), topic);
      assert.equal(await page.locator('.theory-anchor .example-sentence').innerText(), lesson.anchor.sentence);
      assert.equal(await page.locator('#accountDialog').isVisible(), false);
      await page.locator('#goReview').click();
      await page.waitForURL(/#ripasso\//);
      await page.locator('.theory-review').waitFor({ state: 'visible' });
      assert.equal(await page.locator('.theory-review').getAttribute('data-theory-topic'), topic);
      assert.equal(await page.locator('.review-questions details').count(), lesson.review.length);
      assert.equal(await page.locator('#accountDialog').isVisible(), false);
    }
    // Reading remains public; both ways of starting an activity require login.
    await page.locator('#goPractice').click();
    await page.locator('#accountDialog').waitFor({ state: 'visible' });
    assert.match(await page.locator('#loginNotice').innerText(), /Accedi.*account scolastico/i);
    assert.equal(await page.locator('#work .exercise').count(), 0);
    assert.notEqual(new URL(page.url()).hash, '#work');
    await page.locator('#closeAccount').click();
    await page.locator('#learningSteps [data-learning-go="assessment"]').click();
    await page.locator('#accountDialog').waitFor({ state: 'visible' });
    assert.match(await page.locator('#loginNotice').innerText(), /Accedi.*account scolastico/i);
    assert.equal(await page.locator('#work .exercise').count(), 0);
    assert.equal(await page.evaluate(() => window.AtelierAdapter.session), null);
    assert.equal(await page.evaluate(() => localStorage.getItem('atelier-events-v1:ospite')), null);
    assert.deepEqual(errors, []);
    assert.deepEqual(missingAssets, []);
    assert.deepEqual(apiRequests, [], 'Anonymous reading must not call account APIs');
    assert.deepEqual(foreignRequests, [], 'Google and Deepstrad remain outside this fully offline test');
    console.log('Production gate: 80 public theory/review journeys; practice and assessment require login; no identity, API calls or real network');
  } finally {
    await context.close();
  }
}

async function main() {
  assert.equal(sourceLessons.length, 80);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await launchBrowser();
  // A new, non-persistent context never reads the user's browser profile.
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, serviceWorkers: 'block' });
  const page = await context.newPage();
  page.setDefaultTimeout(8000);
  const errors = [], externalRequests = [], failedLocalRequests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => {
    if (response.url().startsWith(origin) && response.status() >= 400)
      failedLocalRequests.push(`${response.status()} ${new URL(response.url()).pathname}`);
  });
  // No account, API, CDN or other external request is allowed during the test.
  await context.route('**/*', route => {
    const url = route.request().url();
    if (url.startsWith(origin + '/')) return route.continue();
    externalRequests.push(url);
    return route.abort('blockedbyclient');
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });

  async function noOverflow(label) {
    const dimensions = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
    assert.ok(dimensions.scroll <= dimensions.width + 1, `${label}: page overflow ${JSON.stringify(dimensions)}`);
  }
  async function stepper(stage) {
    assert.equal(await page.locator('#learningSteps').isVisible(), true, `${stage}: learning path is visible`);
    const position = await page.locator('#learningSteps').boundingBox();
    const viewport = page.viewportSize();
    assert.ok(position && position.y >= -1 && position.y + position.height <= viewport.height + 1, `${stage}: learning path remains in the viewport`);
    assert.deepEqual(await page.locator('#learningSteps [data-learning-go]').evaluateAll(nodes => nodes.map(node => node.dataset.learningGo)), stages);
    assert.equal(await page.locator('#learningSteps [aria-current="step"]').getAttribute('data-learning-go'), stage);
    for (const name of stages)
      assert.equal(await page.locator(`#learningSteps [data-learning-go="${name}"]`).isVisible(), true, `${stage}: ${name} step visible`);
  }
  async function home() {
    await page.locator('.bottom a[href="#home"]').click();
    await page.locator('#level').waitFor({ state: 'visible' });
  }
  async function openTheory(topic, level = '1', support = 'standard') {
    await home();
    await page.locator('#level').selectOption(String(level));
    await page.locator('#topic').selectOption(topic);
    await page.locator('#path').selectOption(support);
    await page.locator('#startSuggested').click();
    await page.waitForURL(/#teoria\//);
    await page.locator('.theory-lesson').waitFor({ state: 'visible' });
    assert.equal(await page.locator('.theory-lesson').getAttribute('data-theory-topic'), topic);
    await stepper('theory');
  }
  async function practiceCoherent(topic) {
    await page.waitForURL(/#work$/);
    await page.locator('.exercise.active').waitFor({ state: 'visible' });
    const groups = await page.locator('.exercise').evaluateAll(nodes => nodes.map(node => node.dataset.topicGroup));
    assert.ok(groups.length > 0, `Empty practice: ${topic}`);
    assert.ok(groups.every(group => group === topic.split('|')[1]), `Mixed practice topics: ${topic}: ${groups}`);
    assert.equal(await page.locator('.exercise:visible').count(), 1);
    assert.equal(await page.locator('#work .worktop h2').innerText(), topic.split('|')[1]);
    assert.equal(await page.locator('#topic').inputValue(), topic);
    await noOverflow(`practice ${topic}`);
    await stepper('practice');
  }
  async function completeCurrentSeries(assessment) {
    const count = await page.locator('.exercise').count();
    assert.ok(count > 0);
    for (let index = 0; index < count; index++) {
      const card = page.locator('.exercise.active');
      const item = await card.evaluate(node => {
        const id = node.querySelector('input,textarea')?.name || node.querySelector('[data-token]')?.dataset.item;
        return window.ATELIER_REVIEW_BANK.find(candidate => candidate.id === id);
      });
      assert.ok(item, `Missing item at position ${index}`);
      if (assessment) assert.ok(['choice', 'exact', 'tokens'].includes(item.kind), 'Assessment must use automatically graded items');
      if (item.kind === 'choice') await card.locator('input[type=radio]').nth(item.answer).check();
      else if (item.kind === 'exact') await card.locator('.inline-gap').fill(item.answers[0]);
      else if (item.kind === 'tokens') {
        for (const token of item.answer) await card.locator(`[data-token="${token}"]`).click();
      } else {
        assert.equal(item.kind, 'open');
        await card.locator('textarea').fill(item.solution);
      }
      if (index < count - 1) await page.locator('#nextExercise').click();
    }
    await page.locator('#checkSeriesButton').click();
    assert.match(await page.locator('#seriesResult').innerText(), assessment ? /Verifica conclusa: 100%/ : /risposte corrette|Serie conclusa/);
    const feedback = await page.locator('[id^="feedback-"]').evaluateAll(nodes => nodes.map(node => ({ hidden: node.hidden, text: node.textContent.trim() })));
    assert.equal(feedback.length, count);
    assert.ok(feedback.every(item => !item.hidden && item.text.length > 20), 'Every answer receives explained feedback');
    const event = await page.evaluate(() => JSON.parse(localStorage.getItem('atelier-events-v1:ospite')).at(-1));
    assert.equal(event.total, count);
    assert.ok(event.durationMs >= 0);
    assert.equal(event.remote, false);
    if (assessment) {
      assert.equal(event.mode, 'closed');
      assert.equal(event.correct, event.total);
      assert.equal(event.stars, 3);
      assert.match(event.activityId, /^verifica-moda-/);
    }
  }

  try {
    await page.goto(origin + '/');
    assert.equal(await page.evaluate(() => window.AtelierAdapter.enabled), false);
    assert.equal(await page.evaluate(() => window.AtelierAdapter.session), null);
    assert.equal(await page.locator('#trackChoice').isVisible(), true);
    await page.locator('[data-track="moda"]').click();
    assert.match(await page.locator('.bottom a[href="#pillole"]').innerText(), /^Teoria e ripasso$/);
    assert.equal(await page.locator('#learningSetup label').first().locator('select').getAttribute('id'), 'level');
    assert.equal(await page.locator('#learningSetup label').nth(1).locator('select').getAttribute('id'), 'topic');
    assert.equal(await page.locator('#pillList, [data-pill-id], #bridgeLanguage').count(), 0);
    assert.equal(await page.evaluate(() => window.ATELIER_THEORY.length), 80);
    await page.evaluate(() => document.fonts.ready);
    assert.match(await page.locator('body').evaluate(node => getComputedStyle(node).fontFamily), /Titillium Web/);
    assert.equal(await page.evaluate(() => document.fonts.check('16px \"Titillium Web\"')), true);

    const choices = await page.locator('#topic option').evaluateAll(nodes => nodes.map(node => node.value).filter(Boolean));
    assert.equal(choices.length, 80);
    assert.deepEqual([...choices].sort(), sourceLessons.map(value).sort());

    // Every available topic follows the actual mobile reading-to-practice path.
    for (let index = 0; index < choices.length; index++) {
      const topic = choices[index], lesson = lessonFor(topic);
      await openTheory(topic);
      assert.equal(await page.locator('.theory-anchor .example-sentence').innerText(), lesson.anchor.sentence);
      assert.equal(await page.locator('.theory-memory').innerText(), lesson.anchor.memory);
      assert.equal(await page.locator('.theory-infographic').count(), 1);
      assert.equal(await page.locator('.theory-infographic ol > li').count(), lesson.diagram.steps.length);
      assert.equal(await page.locator('#fullTheory').isVisible(), true);
      assert.equal(await page.locator('#fullTheory .theory-part').count(), lesson.sections.length + 2);
      assert.ok((await page.locator('#fullTheory').innerText()).includes(lesson.sections[0].text));
      assert.equal(await page.locator('.theory-focus > p').innerText(), lesson.levels.base.focus);
      await noOverflow(`theory ${topic}`);
      await page.locator('#goReview').click();
      await page.waitForURL(/#ripasso\//);
      assert.equal(await page.locator('.theory-review').getAttribute('data-theory-topic'), topic);
      await stepper('review');
      assert.equal(await page.locator('.review-questions details').count(), lesson.review.length);
      const answer = page.locator('.review-questions details').first();
      assert.equal(await answer.getAttribute('open'), null);
      await answer.locator('summary').click();
      assert.equal(await answer.locator('p').innerText(), lesson.review[0].answer);
      await page.locator('#goPractice').click();
      await practiceCoherent(topic);
      if ((index + 1) % 20 === 0) console.log(`Mobile: ${index + 1}/80 topics passed theory, review and coherent practice`);
    }

    assert.deepEqual(errors, [], 'All 80 topic journeys remain free of page errors');
    // Each level and each reading support is checked in all three areas.
    for (const topic of representatives) {
      const lesson = lessonFor(topic);
      for (const level of ['1', '2', '3']) {
        await openTheory(topic, level);
        assert.equal(await page.locator('.theory-focus > p').innerText(), lesson.levels[levelKeys[level]].focus);
        assert.equal(await page.locator('.theory-focus .example-sentence').innerText(), lesson.levels[levelKeys[level]].example.sentence);
      }
      for (const support of ['standard', 'l2', 'dsa', 'pei']) {
        await openTheory(topic, '1', support);
        assert.equal(await page.locator('body').evaluate((body, expected) => body.classList.contains('path-' + expected), support), true);
        if (support === 'standard') assert.equal(await page.locator('.theory-support').count(), 0);
        else {
          assert.equal(await page.locator('.theory-support').isVisible(), true);
          assert.ok((await page.locator('.theory-support').innerText()).includes(support === 'pei' ? lesson.pei.rule : lesson.simplified.lead));
        }
        assert.equal(await page.locator('#fullTheory').isVisible(), support !== 'pei');
        if (support === 'pei') {
          await page.locator('[data-expand-theory]').click();
          assert.equal(await page.locator('#fullTheory').isVisible(), true);
        }
        await page.locator('#goReview').click();
        await page.locator('#goPractice').click();
        await practiceCoherent(topic);
        assert.ok(await page.locator('.exercise').count() <= (support === 'pei' ? 3 : support === 'standard' ? 6 : 4));
      }
    }
    console.log('Levels and supports: 3 levels, 4 paths, all 3 analysis areas passed');

    // A complete practice and final assessment, using the locally exposed bank.
    await openTheory('parole|Articolo');
    await page.locator('#goReview').click();
    await page.locator('#goPractice').click();
    await completeCurrentSeries(false);
    await page.locator('#learningSteps [data-learning-go="assessment"]').click();
    await page.locator('.exercise.active').waitFor({ state: 'visible' });
    await stepper('assessment');
    assert.match(await page.locator('#work .worktop').innerText(), /Verifica finale/i);
    await completeCurrentSeries(true);

    // Real infographics and six-person tables remain contained at every viewport.
    for (const viewport of [{ width: 375, height: 812 }, { width: 768, height: 1024 }, { width: 1440, height: 1000 }, { width: 812, height: 375 }]) {
      await page.setViewportSize(viewport);
      await openTheory('parole|Verbi · congiuntivo trapassato');
      await noOverflow(`viewport ${viewport.width}×${viewport.height}`);
      const geometry = await page.locator('.theory-infographic, .theory-infographic li, .theory-table').evaluateAll(nodes => nodes.map(node => {
        const rect = node.getBoundingClientRect();
        return { name: node.className || node.tagName, left: rect.left, right: rect.right, width: rect.width };
      }));
      assert.ok(geometry.length >= 5);
      assert.ok(geometry.every(rect => rect.width > 0 && rect.left >= -1 && rect.right <= viewport.width + 1), `Clipped graphic/table at ${viewport.width}: ${JSON.stringify(geometry)}`);
      assert.equal(await page.locator('.theory-table tbody tr').count(), 6);
      await stepper('theory');
      assert.match(await page.locator('.theory-anchor').innerText(), /Se avessi messo la sveglia/);
      await page.evaluate(() => document.querySelector('#teoria').scrollIntoView({ block: 'start' }));
      const returnLink = await page.locator('.back-to-theory').evaluate(link => {
        const rect = link.getBoundingClientRect();
        const x = rect.left + rect.width / 2, y = rect.top + rect.height / 2;
        const hit = document.elementFromPoint(x, y);
        return { x, y, inViewport: x >= 0 && x < innerWidth && y >= 0 && y < innerHeight,
          hitLink: hit === link || link.contains(hit), coveredBySteps: Boolean(hit?.closest('#learningSteps')) };
      });
      assert.equal(returnLink.inViewport, true, `Return link must be in view at ${viewport.width}: ${JSON.stringify(returnLink)}`);
      assert.equal(returnLink.coveredBySteps, false, `Learning steps cover the return link at ${viewport.width}`);
      assert.equal(returnLink.hitLink, true, `Return link is not clickable at its center at ${viewport.width}: ${JSON.stringify(returnLink)}`);
      if (viewport.width === 375 || viewport.width === 1440) {
        const name = viewport.width === 375 ? 'mobile' : 'desktop';
        await page.screenshot({ path: `/tmp/grammar-theory-${name}.png` });
      }
    }
    // The catalogue searches theory; the external reference is only a reminder.
    await page.locator('.bottom a[href="#pillole"]').click();
    await page.waitForURL(/#pillole$/);
    await page.locator('#theorySearch').waitFor({ state: 'visible' });
    assert.equal(await page.locator('#theoryHeading').innerText(), 'Teoria e ripasso');
    assert.equal(await page.locator('#theoryCatalogue [data-theory-slug]').count(), 80);
    const deepstrad = page.locator('#teoria a[href="https://deepstrad.stradilab.org/"]');
    assert.equal(await deepstrad.count(), 1);
    assert.equal(await deepstrad.getAttribute('target'), '_blank');
    assert.match(await page.locator('.deepstrad-reference').innerText(), /pillole.*Deepstrad/);
    await page.locator('#theorySearch').fill('trapassato');
    const filtered = await page.locator('#theoryCatalogue [data-theory-slug]').allTextContents();
    assert.ok(filtered.length > 0 && filtered.length < 80);
    assert.ok(filtered.every(title => /trapassato/i.test(title)));
    await page.locator('#theoryCatalogue [data-theory-slug]').first().click();
    await page.locator('.theory-lesson').waitFor({ state: 'visible' });
    assert.match(await page.locator('.theory-topic-heading h2').innerText(), /trapassato/i);

    assert.equal(await page.locator('#pillList, [data-pill-id], #bridgeLanguage').count(), 0);
    assert.equal(await page.evaluate(() => window.AtelierAdapter.session), null);
    assert.deepEqual(errors, [], 'No uncaught page errors');
    assert.deepEqual(failedLocalRequests, [], 'All local assets load');
    assert.deepEqual(externalRequests, [], 'Guest theory flow makes no external requests');
    await checkProductionGate(browser);
    console.log('PASS: 80 mobile topics; anchor and infographic for every topic; 3 levels × 3 areas; 4 supports × 3 areas; complete practice and assessment with explained feedback; theory catalogue; no legacy pills; 375/768/1440/landscape; isolated guest with no external requests');
  } finally {
    await context.close();
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}

main().catch(error => {
  console.error(error);
  server.close();
  process.exitCode = 1;
});
