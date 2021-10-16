from flask import Flask,jsonify,request
import socket
app=Flask(__name__)

@app.route('/',methods=['GET'])
def home():
    return '<html><body>hello world</body></html>'

@app.route('/send',methods=['POST'])
def get_data_from_app():
    gyroscope=request.json['gyroscope']
    accelerometer=request.json['accelerometer']
    # hello=request.json['hello']
    print(gyroscope)

if __name__=="__main__":
    app.run(host=socket.gethostbyname(socket.gethostname()),port=5000,debug=True)