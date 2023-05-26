

# Expense Tracker Application

I am proud of this application because it shows my Angular skills and challenged me to learn new approaches in order to get the same results

This is an expense tracker application that allows users to manage their expenses. The application provides features such as user authentication, registration, chart visualization, downloading expenses as CSV, form validation, modular architecture with lazy loading, and unit tests.


## Features

- User Authentication: Users can register and log in to access their expenses.

- Registration: New users can create an account with their email and password.

- Charts Visualization: Users can view their expenses in a pie chart for better insights.

- Download Expenses as CSV: Users can download their expenses as a CSV file for further analysis.

- Form Validation: Input forms have validation to ensure data integrity 

- Modular Architecture: The application follows a modular architecture with lazy loading for optimal performance.

- Unit Tests:  unit tests are included to ensure code quality and functionality.

- List Expenses: Users can view a list of their expenses with details and delete individual expenses.

## Installation

Follow these steps to set up the expense tracker application:

NODE VERSION 16.14

1\. Clone the repository to your local machine:

```bash

git clone https://github.com/frescobar/expenseTracker.git

```


2\. Navigate to the project directory:

```bash

cd expenseTracker

```


3\. Install the dependencies using a package manager such as npm or yarn:
  
   ```bash

npm install

```


4\. Build the application:

```bash

ng build

```


5\. Start the server:

```bash

ng serve

```


6\. Open the application in your browser:

```bash

http://localhost:4200

```


## Usage

Once the application is installed and running, follow these steps to use the expense tracker:

1\. Register a new account:

   - Open the registration page.

   - Enter your email and password.

   - Submit the form to create a new account.

   - Or use this default user test@admin.com

2\. Log in to your account:

   - Open the login page.

   - Enter  email and password.

   - Submit the form to log in.

3\. View your expenses:

   - Once logged in, you will be redirected to the dashboard.

   - The dashboard displays a summary of your expenses and charts for visualization.


4\. Download expenses as CSV:

   - From the dashboard, click on the "Download" button.

   - The expenses will be downloaded as a CSV file to your local machine.

5\. Add a new expense:

   - Click on the "Add Expense" button.

   - Fill in the required details for the expense.

   - Submit the form to add the expense to your list.

6\. Delete an expense:

   - On the dashboard or expenses list, find the expense you want to delete.

   - Click on the delete button or icon associated with the expense.

   - Confirm the deletion to remove the expense from your list.

## Architecture

The expense tracker application follows a modular architecture with lazy loading for better performance and scalability. The main modules and their responsibilities.

Component Module**: Contains shared components used across multiple modules.


- **Dashboard Module**: Displays the dashboard page with expense summary and charts.


- **Guards**: Implements route guards to protect authenticated routes.

## Testing

The expense tracker application includes  unit tests to ensure code quality and functionality. The tests cover componentss using the Jasmine testing framework. To run the unit tests, use the following command:

```bash

ng test

```
