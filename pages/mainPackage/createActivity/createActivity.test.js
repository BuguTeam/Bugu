const automator = require('miniprogram-automator')

describe('createActivity页面测试', () => {
  let miniProgram;
  let page;
  // 运行测试前调用
  beforeAll(async () => {
    miniProgram = await automator.connect({
      wsEndpoint: 'ws://localhost:9420',
    });

    page = await miniProgram.reLaunch('/pages/createActivity/createActivity');

  });

  // 运行测试后调用
  afterAll(() => {
    miniProgram.disconnect();
  });

  // 测试内容
  it("地图是否正常显示", async () => {
    jest.setTimeout(150000);
    const map = await page.$('map');
    expect(map).not.toEqual(null);
  })

  it("活动位置输入框是否正常显示", async () => {
    const activityLocation = await page.$('.activity-location');
    expect(await activityLocation.wxml()).toContain('位置');
  })

  it("点击活动位置标签,转换为不限制活动地点是否成功", async () => {
    jest.setTimeout(150000);
    const activityLocation = await page.$('.activity-location');
    const activityLocationLabel = await page.$('.activity-location-label');
    expect(await activityLocation.wxml()).toContain('background-color:#39C5BB');
    activityLocationLabel.tap();
    await page.waitFor(1500);
    expect(await activityLocation.wxml()).toContain('background-color:grey');
    activityLocationLabel.tap()
    await page.waitFor(1500);
    expect(await activityLocation.wxml()).toContain('background-color:#39C5BB');
  })

  it("活动名称输入框是否正常显示", async () => {
    const activityName = await page.$('.activity-name');
    expect(await activityName.wxml()).toContain('名称');
  })

  it("活动开始时间输入框是否正常显示", async () => {
    const startTime = await page.$('.start-time');
    expect(await startTime.wxml()).toContain('开始时间');
  })

  it("活动报名截止时间输入框是否正常显示", async () => {
    const registerDDL = await page.$('.register-ddl');
    expect(await registerDDL.wxml()).toContain('截止时间');
  })

  it("活动最大参与人数输入框是否正常显示", async () => {
    const participants = await page.$('.participants');
    expect(await participants.wxml()).toContain('最大参与人数');
  })

  it("活动描述输入框是否正常显示", async () => {
    const description = await page.$('.description');
    expect(await description.wxml()).toContain('描述');
  })

  it("按钮是否正常显示", async () => {
    const button = await page.$('.myButton')
    expect(await button.wxml()).toContain('ok')
  })

});