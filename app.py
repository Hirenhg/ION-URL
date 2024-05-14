from flask import Flask, render_template, request
import requests
import json

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    url = "https://ion.ics-global.in/applicant/find"
    payload = json.dumps({
        "email": request.form.get('emailId'),
    })
    headers = {
        'Content-type': 'application/json',
        'Access-Token': 'DmtMfWfrIH1FXpX9eVtZ0bT268b_0g9biBnGhpoqcQ0',
    }
    response = requests.request("GET", url, headers=headers, data=payload)
    return response.text


if __name__ == '__main__':
    app.run(debug=True) 
