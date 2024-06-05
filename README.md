# Rafiki Maths

Rafiki Maths is a web application designed for children from Pre-K to 6th grade to practice simple mathematics. The app allows parents to select their child's education level and math topic, providing exercises tailored to the selected parameters. 

The app is simple, intuitive, and can be hosted on GitHub Pages for easy access.

## Features

- Selectable education levels: Pre-K through 6th grade.
- Multiple math topics: Addition, Subtraction, Multiplication, and Division.
- Tailored exercises based on selected level and topic.
- Real-time feedback for correct and incorrect answers.
- Progress bar to track the child's progress.

## How to Use

1. **Select Education Level**:
    - Use the dropdown menu to select your child's education level (Pre-K, Kindergarten, 1st Grade, etc.).

2. **Select Math Topic**:
    - After selecting the education level, use the next dropdown menu to choose a math topic (Addition, Subtraction, Multiplication, Division).

3. **Answer Exercises**:
    - The app will display one exercise at a time. Enter the answer in the provided input box and click "Submit".
    - If the answer is correct, the app will show positive feedback and move to the next exercise.
    - If the answer is incorrect, the app will provide the correct answer and allow another attempt before moving on.

4. **Track Progress**:
    - A progress bar at the bottom of the screen shows how many exercises have been completed out of the total set.

## For Developers

### Project Structure

- **index.html**: The main HTML file that includes the structure of the web app.
- **styles.css**: The CSS file that contains the styles for the web app.
- **main.js**: The primary JavaScript file that handles the initialization, event listeners, and main logic of the app.
- **exercises.js**: The JavaScript file that contains functions to generate exercises for different levels and topics.
- **progress.js**: The JavaScript file that manages the progress bar and feedback display.

### Development Instructions

1. **Setting Up**:
    - Clone the repository: `git clone https://github.com/alainrafiki/rafikimaths.git`
    - Navigate to the project directory: `cd rafikimaths`

2. **Running Locally**:
    - You can simply open `index.html` in a web browser to run the app locally.

3. **Deploying on GitHub Pages**:
    - Commit your changes and push to your repository.
    - Go to your repository settings on GitHub.
    - Under the "GitHub Pages" section, select the `main` branch and `/ (root)` directory.
    - Save the settings, and your site will be published at `https://alainrafiki.github.io/rafikimaths`.

4. **Adding New Features**:
    - To add a new math topic or exercise type, define new functions in `exercises.js` similar to the existing ones.
    - Update `main.js` to include the new functions in the exercise generation logic.
    - Test your changes thoroughly to ensure everything works as expected.

5. **Improving the UI**:
    - You can enhance the UI by modifying `styles.css` or adding new styles.
    - Ensure that the user experience remains simple and intuitive, especially for younger children.

6. **Future Development**:
    - Consider adding user authentication to save progress.
    - Implement a reward system to motivate children.
    - Expand the app to include other subjects, using the current modular structure as a base.

### Contribution Guidelines

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to open an issue or contact me at https://rafikitechnology.com.

Enjoy using Rafiki Maths!