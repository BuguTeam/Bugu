const automator = require('miniprogram-automator')

describe('index页面测试', () => {
  let miniProgram;
  let page;
  // 运行测试前调用
  beforeAll(async () => {
    miniProgram = await automator.connect({
      wsEndpoint: 'ws://localhost:9420',
    });
    page = await miniProgram.reLaunch('../index/index');
  });

  // 运行测试后调用
  afterAll(() => {
    miniProgram.disconnect();
  });

  // 测试内容
  it("发起活动卡片是否正常显示", async () => {
    const card = await page.$$('.card-li-init');
    expect(card.length > 0).toBe(true);
  })

  it("参与活动卡片是否正常显示", async () => {
    const card = await page.$$('.card-li-part');
    expect(card.length > 0).toBe(true);
  })

  it("点击发起活动卡片是否可以跳转到活动详情页面", async () => {
    jest.setTimeout(20000);
    const card = await page.$('.card-li-init');
    await card.tap();
    await page.waitFor(1000);
    const currentPage = await miniProgram.currentPage();
    expect(currentPage.path).toContain('pages/activityInfo/activityInfo');
    await miniProgram.navigateBack();
  })

  it("点击参与活动卡片是否可以跳转到活动详情页面", async () => {
    jest.setTimeout(20000);
    const card = await page.$('.card-li-part');
    await card.tap();
    await page.waitFor(1000);
    const currentPage = await miniProgram.currentPage();
    expect(currentPage.path).toContain('pages/activityInfo/activityInfo');
    await miniProgram.navigateBack();
  })

  it("点击发起活动处‘查看更多’是否能跳转到initiatedActivity页面", async () => {
    jest.setTimeout(20000);
    const card = await page.$('.init-more');
    await card.tap();
    await page.waitFor(1000);
    const currentPage = await miniProgram.currentPage();
    expect(currentPage.path).toContain('pages/initiatedActivity/initiatedActivity');
    await miniProgram.navigateBack();
  })

  it("点击参与活动处‘查看更多’是否能跳转到participatedActivity页面", async () => {
    jest.setTimeout(20000);
    const card = await page.$('.part-more');
    await card.tap();
    await page.waitFor(1000);
    const currentPage = await miniProgram.currentPage();
    expect(currentPage.path).toContain('pages/participatedActivity/participatedActivity');
    await miniProgram.navigateBack();
  })
});