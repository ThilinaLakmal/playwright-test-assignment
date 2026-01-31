const { test, expect } = require('@playwright/test');

// ------------------------------------------------------------------
// 1. CONFIGURATION
// ------------------------------------------------------------------
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 5000,
    translation: 5000, // Increased wait time
    betweenTests: 5000
  },
  selectors: {
    inputField: 'textarea', // The input is a simple textarea
    // The output is a DIV with specific styling (taken from your friend's working code)
    outputField: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};
// INCREASE GLOBAL TIMEOUT TO 2 MINUTES (Fixes the "30000ms exceeded" error)
test.setTimeout(120000);

// ------------------------------------------------------------------
// 2. TEST DATA (Your Specific Cases)
// ------------------------------------------------------------------
const TEST_DATA = {
  positive: [
    {id: "Pos_Fun_0001", input: "mama raeeta pothak kiyavanavaa.", expected: "මම රෑට පොතක් කියවනවා." },
    { id: "Pos_Fun_0002", input: "mata dhaenma yanna baehae, mokadha mata vaedak thiyenavaa ivara karanna.", expected: "මට දැන්ම යන්න බැහැ, මොකද මට වැඩක් තියෙනවා ඉවර කරන්න." },
    { id: "Pos_Fun_0003", input: "vaessa vahina nisaa api adha gedhara innavaa.", expected: "වැස්ස වහින නිසා අපි අද ගෙදර ඉන්නවා." },
    { id: "Pos_Fun_0004", input: "oyaa heta apee gedhara enavaadha?", expected: "ඔයා හෙට අපේ ගෙදර එනවාද?" },
    { id: "Pos_Fun_0005", input: "api heta beach yamudha?", expected: "අපි හෙට beach යමුද?" },
    { id: "Pos_Fun_0006", input: "karuNaakara ehema karanna epaa.", expected: "කරුණාකර එහෙම කරන්න එපා." },
    { id: "Pos_Fun_0007", input: "mama dhaen online class ekakata innavaa.", expected: "මම දැන් online class එකකට ඉන්නවා." },
    { id: "Pos_Fun_0008", input: "api pasugiya sathiyee Galle giyaa.", expected: "අපි පසුගිය සතියේ Galle ගියා." },
    { id: "Pos_Fun_0009", input: "mama iiLaGa maasee job ekakata apply karannam.", expected: "මම ඊළඟ මාසේ job එකකට apply කරන්නම්." },
    { id: "Pos_Fun_0010", input: "eyaalaa school yannee bus eken.", expected: "එයාලා school යන්නේ bus එකෙන්." },
    { id: "Pos_Fun_0011", input: "eyaa gahana gahana paara hayayi.", expected: "එයා ගහන ගහන පාර හයයි." },
    { id: "Pos_Fun_0012", input: "ehema nam api passe balamu.", expected: "එහෙම නම් අපි පස්සෙ බලමු." },
    { id: "Pos_Fun_0013", input: "suBha raathriyak veevaa!", expected: "සුභ රාත්‍රියක් වේවා!" },
    { id: "Pos_Fun_0014", input: "mata eeka karanna baehae.", expected: "මට ඒක කරන්න බැහැ." },
    { id: "Pos_Fun_0015", input: "api 7.30 AM meeting ekakata enavaa.", expected: "අපි 7.30 AM meeting එකකට එනවා." },
    { id: "Pos_Fun_0016", input: "mama adha udhee naegitalaa vaeda patangaththaa. passee kaeema kaalaa office yanavaa.", expected: "මම අද උදේ නැගිටලා වැඩ පටන්ගත්තා. පස්සේ කෑම කාලා office යනවා." },
    { id: "Pos_Fun_0017", input: "mee bottle ekee 500ml k vitharayi thiyennee.", expected: "මේ bottle එකේ 500ml ක් විතරයි තියෙන්නේ." },
    { id: "Pos_Fun_0018", input: "ticket eka USD 150 k venavaa.", expected: "ticket එක USD 150 ක් වෙනවා." },
    { id: "Pos_Fun_0019", input: "mama WiFi password eka hoyanavaa.", expected: "මම WiFi password එක හොයනවා." },
    { id: "Pos_Fun_0020", input: "puLuvannam magee document tika balanna.", expected: "පුළුවන්නම් මගේ document ටික බලන්න." },
    { id: "Pos_Fun_0021", input: "eLa kiri vaedak machan!", expected: "එළ කිරි වැඩක් මචන්!" },
    { id: "Pos_Fun_0022", input: "api heta library ekata gihin passe coffee shop ekata yamudha?", expected: "අපි හෙට library එකට ගිහින් පස්සෙ coffee shop එකට යමුද?" },
    { id: "Pos_Fun_0023", input: "mama adha office yanne naethi nisaa home work karanna onee.", expected: "මම අද office යන්නෙ නැති නිසා home work කරන්න ඔනේ." },
    { id: "Pos_Fun_0024", input: "apita jiivithayeedhii viviDha vuu kadayim pasu kiriimata sidhu venavaa...", expected: "අපිට ජීවිතයේදී විවිධ වූ කඩයිම් පසු කිරීමට සිදු වෙනවා..." },
    { id: "Pos_Fun_0025", input: "eeka 30m vithara usa gahak.", expected: "ඒක 30m විතර උස ගහක්." } ],
  negative: [
    { id: "Neg_Fun_0001", input: "mama eeka miladhii gaththee daraz eken", expected: "මම ඒක මිලදී ගත්තේ daraz එකෙන්" },
    { id: "Neg_Fun_0002", input: "Photo eka jpg format eken evanna", expected: "Photo එක jpg format එකෙන් එවන්න" },
    { id: "Neg_Fun_0003", input: "api nitharama courseweb eka gaena update ekee imu.", expected: "අපි නිතරම courseweb එක ගැන update එකේ ඉමු." },
    { id: "Neg_Fun_0004", input: "Sri Lanka kiyannee indhiyan saagarayee muthu aetayayi.", expected: "Sri Lanka කියන්නේ ඉන්දියන් සාගරයේ මුතු ඇටයයි" },
    { id: "Neg_Fun_0005", input: "api godak velaavata chat karannee singlish valin", expected: "අපි ගොඩක් වෙලාවට chat කරන්නේ singlish වලින්" },
    { id: "Neg_Fun_0006", input: "ikmankaranna.", expected: "ඉක්මන් කරන්න." },
    { id: "Neg_Fun_0007", input: "eeka huawei vargayee phone ekak.", expected: "ඒක huawei වර්ගයේ phone එකක්." },
    { id: "Neg_Fun_0008", input: "mama aasama nissan raThayakata. ", expected: "මම ආසම nissan රථයකට." },
    { id: "Neg_Fun_0009", input: "Mern stack project ekaka frontend eka saha backend eka vena venama run kala yuthuya.", expected: "Mern stack project එකක frontend එක සහ backend එක වෙන වෙනම run කල යුතුය." },
    { id: "Neg_Fun_0010", input: "ema maadhiliya siyaluma softlogic pradharshanaagaara valin labaa gatha haeka.", expected: "එම මාදිලිය සියලුම softlogic ප්‍රදර්ශනාගාර වලින් ලබා ගත හැක." },
    { id: "Neg_Fun_0011", input: "ammaa thaniyama ehe yannee kohomdha?", expected: "අම්මා තනියම එහෙ යන්නේ කොහොමද?" }]
};

// ------------------------------------------------------------------
// 3. PAGE OBJECT (The Helper Class)
// ------------------------------------------------------------------
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle'); // Wait for network to settle
  }

  async clearAndWait() {
    const input = this.page.locator(CONFIG.selectors.inputField).first();
    await input.click();
    await input.clear();
    await this.page.waitForTimeout(500);
  }

  async performTranslation(text) {
    const input = this.page.locator(CONFIG.selectors.inputField).first();
    
    // 1. Type
    await input.pressSequentially(text, { delay: 100 });
    
    // 2. Trigger (Space key + Click on Body)
    await this.page.keyboard.press('Space');
    await this.page.waitForTimeout(500);
    await this.page.locator('body').click({ position: { x: 0, y: 0 } });
    
    // 3. Wait for Output to appear
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getActualOutput() {
    // This selector is from your friend's code which worked correctly
    // It targets the specific DIV class that holds the output
    const outputLocator = this.page.locator(CONFIG.selectors.outputField);

    // Filter to ensure we don't accidentally grab the input textarea
    // We want the DIV that is NOT the textarea
    const correctOutputBox = outputLocator.filter({ hasNot: this.page.locator('textarea') }).first();

    let actualText = "";
    try {
      actualText = await correctOutputBox.textContent();
    } catch (e) {
      actualText = "Error: Could not find output box";
    }

    return actualText ? actualText.trim() : "";
  }
}

// ------------------------------------------------------------------
// 4. TEST SUITE
// ------------------------------------------------------------------
test.describe('Assignment 1 - SwiftTranslator Automation', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // --- POSITIVE FUNCTIONAL TESTS ---
  test.describe('Positive Functional Tests', () => {
    for (const tc of TEST_DATA.positive) {
      test(`${tc.id}: Input "${tc.input}"`, async () => {
        await translator.clearAndWait();
        await translator.performTranslation(tc.input);
        const actual = await translator.getActualOutput();
        
        // Console Reporting
        const isMatch = actual.includes(tc.expected);
        console.log(`\nFor ${tc.id}:`);
        console.log(`Input Box has: "${tc.input}"`);
        console.log(`Expected:      "${tc.expected}"`);
        console.log(`Actual:        "${actual}"`);
        console.log(`Comparison:    ${isMatch ? 'Match! (Pass)' : 'No Match! (Fail)'}`);
        console.log('--------------------------------------------------');

        // Assertion
        expect(actual).toContain(tc.expected);
      });
    }
  });

  // --- NEGATIVE FUNCTIONAL TESTS ---
  test.describe('Negative Functional Tests', () => {
    for (const tc of TEST_DATA.negative) {
      test(`${tc.id}: Input "${tc.input}"`, async () => {
        await translator.clearAndWait();
        await translator.performTranslation(tc.input);
        const actual = await translator.getActualOutput();
        
        // Console Reporting
        const isMatch = actual.includes(tc.expected);
        console.log(`\nFor ${tc.id}:`);
        console.log(`Input Box has: "${tc.input}"`);
        console.log(`Expected:      "${tc.expected}"`);
        console.log(`Actual:        "${actual}"`);
        console.log(`Comparison:    ${isMatch ? 'Match! (Pass)' : 'No Match! (Fail)'}`);
        console.log('--------------------------------------------------');

        // Assertion
        expect(actual).toContain(tc.expected);
      });
    }
  });

});