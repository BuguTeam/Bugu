const automator = require('miniprogram-automator')

describe('exploreActivity页面测试', () => {
  let miniProgram;
  let page;

  // 运行测试前调用
  beforeAll(async () => {
    miniProgram = await automator.connect({
      wsEndpoint: 'ws://localhost:9420',
    });
    page = await miniProgram.reLaunch('/pages/mainPackage/exploreActivity/exploreActivity');
    page.setData({
        activitylist: [
        {
            id:0,
            name:'約奶茶',
            startTime: '2020-04-01 00:02:00',
            registrationDDL: '2020-04-01 00:02:00',
            maxParticipantNumber:4,
            currentParticipantNumber:2,
            description: "",
            location: {
                name: '理教',
                longitude: 116.0,
                latitude: 40.0,
            },
        },
        {
            id:1,
            name:'借充电器',
            startTime: '2020-04-02 00:01:00',
            registrationDDL: '2020-04-01 00:01:00',
            maxParticipantNumber:6,
            currentParticipantNumber:4,
            description: "",
            location: {
                name: '理教',
                longitude: 116.0,
                latitude: 40.0,
            },
        }]
    })
  });

  // 运行测试后调用
  afterAll(() => {
    miniProgram.disconnect();
  });

  // 测试内容
  it("活动卡片是否正常显示", async () => {
    const cardTitle = await page.$$('.card-title');
    expect(cardTitle.length > 0).toBe(true);
  })

  it("点击卡片是否可以跳转到活动详情页面", async () => {
    jest.setTimeout(20000);
    const card = await page.$('.card-li');
    await card.tap();
    await page.waitFor(1000);
    const currentPage = await miniProgram.currentPage();
    expect(currentPage.path).toContain('pages/subPackage/activityInfo/activityInfo');
    await miniProgram.navigateBack();
  })

});