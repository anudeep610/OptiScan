# Eye Disease Detection Website

A web application built with React and NodeJs that allows users to analyze their eyes for various diseases and provides insights into eye health.

## Features

- Analyze eye diseases with uploaded iris images.
- Learn about how the website works and its benefits.
- Free to use with no hidden charges.
- Easy-to-use and user-friendly interface.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/anudeep610/major-project.git
   ```
2. Add Local path upto the repo in 
    line 9 in /backend/routes/submission.js
    line 12 in /backend/app.py
3. Go into the frontend folder and install the required dependencies and start:
    ```bash
    npm i
    npm run start
    ```
4. Go into the backend folder and install the required dependencies and start:

    ```bash
    npm i
    npx nodemon index.js
    ```
5. Open one more terminal and then run the python server:

    ```bash
    flask run --reload
    ```
6. Replace the fields of config object in /backend/routes/submission.js with the approitate parameters.
7. Upload all the DL model files in it.(files with extension .hdf5)
    Note : You contact me on my email for the models