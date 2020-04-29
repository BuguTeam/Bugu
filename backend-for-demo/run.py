# run.py


import json
from flask import Flask, render_template, request
app = Flask(__name__)

if __name__ == '__main__':
    app.run()
    
    
@app.route('/')
def  index():

    return  '''<div>Hello </div>'''


@app.route('/getActivityList', methods=['GET', 'POST'])
def getActivityList():
    if request.method == 'POST':
        #limit = int(json.loads(request.values.get("limit")))
        
        jsonData = []
        cnt = 0
        for i in range(4):
            result = {
            'id':1, 
            'name':'借电脑充电器（来自后端）', 
            'startTime': '2020-04-02 00:01:00', 
            'registrationDDL': '2020-04-01 00:01:00',
            'maxParticipantNumber':6,
            'currentParticipantNumber':4,
            'description': "",
            'location': {
                'name': '理教',
                'longitude': 116.0,
                'latitude': 40.0,
            },
            'password': "",}
            jsonData.append(result)
        print(jsonData)
        return json.dumps(jsonData, ensure_ascii=False)

    else:
        return '''<div>there </div>'''