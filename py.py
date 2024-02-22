"""
this generates json log file
"""
import json
import random
import uuid

LOG_LINES = 1000

IP = ['10.12.13.12', '25.10.134.21', '12.120.145.125', '20.123.212.145']
PATH = ['/api/login', '/api/users', '/api/passwords', '/api/addresses', '/api/watches']
METHOD = ['GET', 'POST']

STATUS = [200, 201, 403]

f = open('./json-log.log', 'w', encoding='ascii')

for i in range(LOG_LINES):
    request_data = {
        "ip": IP[random.randint(0,3)],
        "trace_id": str(uuid.uuid4()),
        "method": METHOD[random.randint(0, 1)],
        "path": PATH[random.randint(0, 4)]
    }
    response_data = {
        "status": STATUS[random.randint(0, 2)]
    }
    string = json.dumps({
        "request": request_data,
        "response": response_data
    })
    f.write(f'{string}\n')

f.close()
