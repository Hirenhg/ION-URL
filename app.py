from flask import Flask, render_template, request
import requests
import json

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    url = "http://00641-qa-staging.iondev.ics-global.in/applicant/find"
    payload = json.dumps({
        "email": request.form.get('emailId'),
    })
    headers = {
        'Content-type': 'application/json',
        'Access-Token': 'b3QQPix1s0M0d-LnuBalcq4rOvfJdiyeRHswYv1w25Y',
    }
    response = requests.request("GET", url, headers=headers, data=payload)
    return response.text


if __name__ == '__main__':
    app.run(debug=True) 
