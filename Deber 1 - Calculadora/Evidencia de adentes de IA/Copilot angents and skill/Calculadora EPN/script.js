# agents.md

# Architecture and Logic of the Calculadora EPN

The **Calculadora EPN** is a web application designed to help students of the Escuela Politécnica Nacional (EPN) determine their academic status based on their grades. The application is structured into three main components: HTML, CSS, and JavaScript.

## 1. HTML (index.html)

The HTML file serves as the main interface for the application. It includes:

- A title section that introduces the calculator.
- An information box that explains the grading criteria.
- Input fields for the user to enter grades for the first bimester, second bimester, and the supletorio (supplementary exam).
- Result display areas for showing the final semester grade and the final grade of the subject.
- A button to trigger the calculation of grades.
- A message area to display feedback based on the calculated results.

## 2. CSS (styles.css)

The CSS file is responsible for styling the calculator, ensuring a user-friendly and visually appealing interface. Key features include:

- A responsive layout that centers the calculator on the screen.
- A gradient background that enhances the visual aesthetics.
- Distinct styles for input fields, buttons, and result cards to improve usability.
- Color-coded messages to provide clear feedback on the user's performance.

## 3. JavaScript (script.js)

The JavaScript file contains the core logic of the application, which includes:

- Functions to validate user input, ensuring grades are within acceptable ranges.
- A calculation function that computes the final semester grade based on user inputs.
- Logic to determine the outcome based on the calculated grades, displaying appropriate messages for passing, failing, or needing to take a supplementary exam.
- Event listeners that trigger calculations when the user interacts with the input fields or clicks the calculate button.

Overall, the architecture of the Calculadora EPN is designed to provide a seamless user experience, allowing students to easily input their grades and receive immediate feedback on their academic status.