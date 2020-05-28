const automator = require('miniprogram-automator')
/*
const miniProgram = automator.connect({
  wsEndpoint: 'ws://localhost:9420',
}).then(async miniProgram => {
  const page = await miniProgram.reLaunch('/pages/exploreActivity/exploreActivity');
  //await page.waitFor(500)
  const cardTitle = await page.$$('.card-title');
  const card = await page.$('.card-li');
  console.log(cardTitle.length)
  console.log(card)
}).catch(e => {
  console.log('catch a error', e);
});*/

describe('activityInfo页面测试', () => {
  let miniProgram;
  let page;
  // 运行测试前调用
  beforeAll(async () => {
    miniProgram = await automator.connect({
      wsEndpoint: 'ws://localhost:9420',
    });

    let test_json={
        id:0, 
        name:'約奶茶', 
        startTime: '2020-04-05 00:02:00', 
        registrationDDL: '2020-04-01 00:02:00',
        maxParticipantNumber:4,
        currentParticipantNumber:2,
        description: "约奶茶吗",
        location: {
            name: '理教',
            longitude: 116.0,
            latitude: 40.0,
        },
        password: undefined
    }

    let test_query = JSON.stringify(test_json)

    page = await miniProgram.reLaunch('/pages/subPackage/activityInfo/activityInfo?query='+test_query);

  });

  // 运行测试后调用
  afterAll(() => {
    miniProgram.disconnect();
  });

  // 测试内容
  it("活动名称是否正确显示", async()=>{
    jest.setTimeout(150000);
    const activityName = await page.$('.activity-name');
    expect(await activityName.wxml()).toContain('約奶茶'); 
  })

  it("活动报名截止时间是否正确显示", async () => {
    const registerDDL = await page.$('.register-ddl');
    expect(await registerDDL.wxml()).toContain('2020-04-01 00:02:00');
  })

  it("活动开始时间是否正确显示", async () => {
    const startTime = await page.$('.start-time');
    expect(await startTime.wxml()).toContain('2020-04-05 00:02:00');
  })

  it("人数是否正确显示", async () => {
    const participants = await page.$('.participants');
    expect(await participants.wxml()).toContain('2/4');
  })

  it("活动描述是否正确显示", async () => {
    const description = await page.$('.description');
    expect(await description.wxml()).toContain('约奶茶吗');
  })

  it("地图是否正常显示", async () => {
    const map = await page.$('map');
    expect(map).not.toEqual(null);
  })

  it("按钮是否正常显示", async () => {
    const button= await page.$('.activity-info-button')
    expect(await button.wxml()).toContain('点击参与活动')
  })

});