const automator = require('miniprogram-automator')

describe('exploreActivity页面测试', () => {
  let miniProgram;

  // 运行测试前调用
  beforeAll(async () => {
    miniProgram = await automator.connect({
      wsEndpoint: 'ws://localhost:9420',
    });
  });

  // 运行测试后调用
  afterAll(() => {
    miniProgram.disconnect();
  });

  // 测试内容
  it("活动卡片是否正常显示", async () => {
    const page = await miniProgram.reLaunch('/pages/exploreActivity/exploreActivity');
    const cardTitle = await page.$$('.card-title');
    expect(cardTitle.length > 0).toBe(true);
  })

  it("点击卡片是否可以跳转到活动详情页面", async () => {
    jest.setTimeout(20000);
    const page = await miniProgram.reLaunch('/pages/exploreActivity/exploreActivity');
    const card = await page.$('.card-li');
    await card.tap();
    await page.waitFor(1000);
    const currentPage = await miniProgram.currentPage();
    expect(currentPage.path).toContain('pages/activityInfo/activityInfo');
    await miniProgram.navigateBack();
  })

});