from flask import Flask, render_template
import csv
import pandas as pd


app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html', bar_csv='static/cardio_top_yrs.csv', scatter_csv='static/meat_vs_co2.csv');




@app.route('/meat_world')
def meat_world():
    return render_template('meat_world.html')

if __name__ == "__main__":
    app.run()
