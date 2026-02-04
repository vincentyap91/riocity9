import puppeteer from 'puppeteer';

const baseUrl = process.env.E2E_BASE_URL || 'http://localhost:5173';
const password = process.env.E2E_PASSWORD || 'qwer1234';
const suffix = Date.now().toString().slice(-6);
const username = process.env.E2E_USERNAME || `e2e${suffix}`;
const mobile =
  process.env.E2E_MOBILE ||
  String(Math.floor(10000000 + Math.random() * 90000000));

const timeoutMs = Number(process.env.E2E_TIMEOUT_MS || 20000);

const getPathname = (url) => {
  try {
    return new URL(url).pathname;
  } catch {
    return url;
  }
};

const waitForPath = async (page, expectedPath) => {
  await page.waitForFunction(
    (path) => window.location.pathname === path,
    { timeout: timeoutMs },
    expectedPath
  );
};

const captureErrors = async (page) => {
  const messages = await page.$$eval(
    '[class*="text-red-"]',
    (nodes) => nodes.map((node) => node.textContent?.trim()).filter(Boolean)
  );
  return messages.length ? messages.join(' | ') : 'Unknown error (no red text found).';
};

const registerFlow = async (page) => {
  console.log('Opening register page...');
  await page.goto(`${baseUrl}/register`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('#username', { timeout: timeoutMs });

  await page.type('#username', username);
  await page.type('#mobile', mobile);
  await page.type('#password', password);

  const captchaRaw = await page.$eval(
    '[data-testid="captcha-display"]',
    (el) => el.textContent || ''
  );
  const captcha = captchaRaw.replace(/\s/g, '');
  await page.type('#captcha', captcha);

  await page.click('[data-testid="register-submit"]');

  try {
    await waitForPath(page, '/');
    console.log('Register success: redirected to /.');
  } catch (error) {
    const errors = await captureErrors(page);
    throw new Error(`Register failed: ${errors}`);
  }

  await page.goto(`${baseUrl}/settings`, { waitUntil: 'networkidle0' });
  const path = getPathname(page.url());
  if (path === '/login') {
    throw new Error('Register persistence check failed: redirected to /login.');
  }
  console.log('Register persistence check passed.');
};

const negativeRegisterFlow = async (context) => {
  console.log('Running negative register checks...');
  const page = await context.newPage();
  await page.goto(`${baseUrl}/register`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('#username', { timeout: timeoutMs });

  const alternateMobile =
    mobile.length > 2 ? mobile.slice(0, -1) : `${mobile}1`;

  await page.type('#username', username);
  await page.type('#mobile', alternateMobile);
  await page.type('#password', password);

  const captchaRaw = await page.$eval(
    '[data-testid="captcha-display"]',
    (el) => el.textContent || ''
  );
  const captcha = captchaRaw.replace(/\s/g, '');
  await page.type('#captcha', captcha);

  await page.click('[data-testid="register-submit"]');

  await page.waitForTimeout(1500);
  const path = getPathname(page.url());
  if (path === '/') {
    throw new Error('Duplicate username check failed: registration succeeded unexpectedly.');
  }

  const duplicateErrors = await captureErrors(page);
  if (!duplicateErrors.toLowerCase().includes('not available')) {
    throw new Error(`Duplicate username error missing or unexpected: ${duplicateErrors}`);
  }
  console.log('Duplicate username check passed.');

  const altUsername = `${username.slice(0, 8)}x`;
  await page.goto(`${baseUrl}/register`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('#username', { timeout: timeoutMs });
  await page.type('#username', altUsername);
  await page.type('#mobile', mobile);
  await page.type('#password', '123');

  const captchaRaw2 = await page.$eval(
    '[data-testid="captcha-display"]',
    (el) => el.textContent || ''
  );
  const captcha2 = captchaRaw2.replace(/\s/g, '');
  await page.type('#captcha', captcha2);

  await page.click('[data-testid="register-submit"]');
  await page.waitForTimeout(500);
  const invalidErrors = await captureErrors(page);
  if (!invalidErrors.toLowerCase().includes('at least 6 characters')) {
    throw new Error(`Password length error missing or unexpected: ${invalidErrors}`);
  }
  console.log('Password length check passed.');

  if (process.env.E2E_CHECK_MOBILE_DUPLICATE === '1') {
    const altUsername2 = `${username.slice(0, 7)}y2`;
    await page.goto(`${baseUrl}/register`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('#username', { timeout: timeoutMs });
    await page.type('#username', altUsername2);
    await page.type('#mobile', mobile);
    await page.type('#password', password);

    const captchaRaw3 = await page.$eval(
      '[data-testid="captcha-display"]',
      (el) => el.textContent || ''
    );
    const captcha3 = captchaRaw3.replace(/\s/g, '');
    await page.type('#captcha', captcha3);

    await page.click('[data-testid="register-submit"]');
    await page.waitForTimeout(1500);
    const mobileErrors = await captureErrors(page);
    if (!mobileErrors.toLowerCase().includes('mobile number is not available')) {
      throw new Error(`Duplicate mobile error missing or unexpected: ${mobileErrors}`);
    }
    console.log('Duplicate mobile check passed.');
  } else {
    console.log('Duplicate mobile check skipped (set E2E_CHECK_MOBILE_DUPLICATE=1 to enable).');
  }
};

const loginFlow = async (context) => {
  console.log('Opening login page in fresh session...');
  const page = await context.newPage();
  await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('#username', { timeout: timeoutMs });

  await page.type('#username', username);
  await page.type('#password', password);
  await page.click('button[type="submit"]');

  try {
    await waitForPath(page, '/');
    console.log('Login success: redirected to /.');
  } catch (error) {
    const errors = await captureErrors(page);
    throw new Error(`Login failed: ${errors}`);
  }

  await page.goto(`${baseUrl}/settings`, { waitUntil: 'networkidle0' });
  const path = getPathname(page.url());
  if (path === '/login') {
    throw new Error('Login persistence check failed: redirected to /login.');
  }
  console.log('Login persistence check passed.');
};

const run = async () => {
  console.log('Starting auth E2E test...');
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Username: ${username}`);
  console.log(`Mobile: ${mobile}`);

  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();
    await registerFlow(page);

    const negativeContext = await browser.createIncognitoBrowserContext();
    await negativeRegisterFlow(negativeContext);
    await negativeContext.close();

    const context = await browser.createIncognitoBrowserContext();
    await loginFlow(context);
    await context.close();
  } finally {
    await browser.close();
  }

  console.log('Auth E2E test completed.');
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
