const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

exports.scrapeWebsiteData = async (url) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    await autoScroll(page);

    const data = await page.content();
    const $ = cheerio.load(data);

    const companyData = {
      name: getMetaContent($, 'og:site_name') || getMetaContent($, 'og:title') || $('title').text().trim() || 'N/A',
      description: $('meta[name="description"]').attr('content') || 'N/A',
      phoneNumber: getPhoneNumber($) || 'N/A',
      email: getEmail($) || 'N/A',
      logoUrl: await getLogoUrl(page) || 'N/A',
      backgroundUrl: await getBackgroundUrl(page) || 'N/A',
      facebookUrl: getSocialMediaUrl($, 'facebook') || null,
      linkedinUrl: getSocialMediaUrl($, 'linkedin') || null,
      twitterUrl: getSocialMediaUrl($, 'twitter') || null,
      instagramUrl: getSocialMediaUrl($, 'instagram') || null,
      address: getAddress($) || 'N/A',
      webHomePageImage: await getHomePageImage(page) || 'N/A',
      webUrl: url
    };

    await browser.close();
    return companyData;
  } catch (err) {
    console.error('Error scraping website data:', err.message);
    throw new Error(err.message);
  }
};

const autoScroll = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
};

const getMetaContent = ($, property) => {
  return $('meta[property="' + property + '"]').attr('content') || null;
};

const getHomePageImage = async (page) => {
  const heroImageSelectors = [
    '.hero img', 
    '.banner img', 
    '.hero-image img',
    '.main-banner img',
    'img[src*="hero"]',
    'img[src*="banner"]',
    'img[src*="homepage"]'
  ];

  for (const selector of heroImageSelectors) {
    try {
      const imageUrl = await page.$eval(selector, (el) => el.src);
      if (imageUrl) return imageUrl;
    } catch (err) {
    }
  }

  const backgroundImage = await page.evaluate(() => {
    const heroSections = document.querySelectorAll('.hero, .banner, .main-banner, .homepage');
    for (const section of heroSections) {
      const style = window.getComputedStyle(section);
      if (style.backgroundImage && style.backgroundImage.includes('url')) {
        const match = style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
        if (match && match[1]) {
          return match[1];
        }
      }
    }
    return null;
  });

  return backgroundImage || null;
};

const getBackgroundUrl = async (page) => {
  const backgroundUrl = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('*'));
    for (const el of elements) {
      const style = window.getComputedStyle(el);
      if (style.backgroundImage && style.backgroundImage.includes('url')) {
        const match = style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
        if (match && match[1]) {
          return match[1];
        }
      }
    }
    return null;
  });
  return backgroundUrl;
};

const getLogoUrl = async (page) => {
  const logoSelectors = [
    'img[alt*="logo"]',
    'img[src*="logo"]',
    'img[class*="logo"]',
    'img[id*="logo"]',
    'link[rel="icon"]',
    'link[rel="shortcut icon"]',
  ];

  for (const selector of logoSelectors) {
    try {
      const logoUrl = await page.$eval(selector, (element) => element.src || element.href);
      if (logoUrl) return logoUrl;
    } catch {}
  }

  const backgroundLogo = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('*'));
    for (const el of elements) {
      const style = window.getComputedStyle(el);
      if (style.backgroundImage && style.backgroundImage.includes('logo')) {
        const match = style.backgroundImage.match(/url\(["']?(.*?)["']?\)/);
        if (match && match[1]) {
          return match[1];
        }
      }
    }
    return null;
  });

  return backgroundLogo || null;
};

const getSocialMediaUrl = ($, platform) => {
  return $('a[href*="' + platform + '"]').first().attr('href') || null;
};

const getAddress = ($) => {
  const addressSelectors = [
    'address',
    'div[class*="address"]',
    'div[class*="location"]',
    'span[class*="address"]',
  ];
  for (const selector of addressSelectors) {
    const address = $(selector).text().trim();
    if (address) return address;
  }
  return null;
};

const getPhoneNumber = ($) => {
  const phoneSelectors = [
    'a[href^="tel:"]',
    'span[class*="phone"]',
    'div[class*="phone"]',
  ];
  for (const selector of phoneSelectors) {
    const phone = $(selector).text().trim();
    if (phone) return phone;
  }
  return null;
};

const getEmail = ($) => {
  const emailSelectors = [
    'a[href^="mailto:"]',
    'span[class*="email"]',
    'div[class*="email"]',
  ];
  for (const selector of emailSelectors) {
    const email = $(selector).text().trim();
    if (email) return email;
  }
  return null;
};
