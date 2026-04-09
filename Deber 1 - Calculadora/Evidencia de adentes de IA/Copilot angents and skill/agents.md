# agents.md

# Calculadora EPN - Architecture and Logic Summary

The **Calculadora EPN** project is structured to provide a user-friendly web application that allows students of the Escuela Politécnica Nacional (EPN) to calculate their final grades based on their bimonthly scores and supplementary exam results. The project consists of three main components: HTML, CSS, and JavaScript.

## 1. HTML (index.html)

The HTML file serves as the main interface of the application. It includes:

- A title that identifies the application.
- An information box that explains the grading criteria.
- Input fields for users to enter their grades for the first and second bimonthly evaluations, as well as the supplementary exam score.
- Result display areas for showing the final semester grade and the final grade for the subject.
- A button to trigger the calculation of the grades.
- A message area to display feedback based on the calculated results.

## 2. CSS (styles.css)

The CSS file is responsible for styling the calculator, ensuring a visually appealing and user-friendly interface. Key features include:

- A responsive layout that centers the calculator on the page.
- A gradient background that enhances the overall aesthetic.
- Distinct styles for input fields, buttons, and result cards to improve usability.
- Color-coded messages that provide visual feedback based on the calculation results (success, error, warning).

## 3. JavaScript (script.js)

The JavaScript file contains the core logic of the application. It includes:

- Functions to validate user input, ensuring that grades are within acceptable ranges.
- A calculation function that computes the final semester grade based on the input values.
- Logic to determine the appropriate messages to display based on the calculated grades, including conditions for passing without a supplementary exam, failing, and passing with a supplementary exam.
- Event listeners that trigger calculations when the user interacts with the input fields or clicks the calculate button.

Overall, the architecture of the Calculadora EPN is designed to provide a seamless experience for users, allowing them to easily input their grades and receive immediate feedback on their academic performance.