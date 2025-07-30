# Assignment no. 2
 
# This is second assignment for propello ai. 
# Goal is to  create login system with token authentication.

Here's a cleaned-up and polished version of your text with improved grammar, spelling, and clarity:

**Instructions to Set Up and Run the Project**

1.  **Get the Project:**
    
    *   Either download the project archive or clone it using the GitHub repository URL.
        
    *   Extract the project files and navigate inside the project folder.
        
2.  **Create and Activate Python Virtual Environment:**
    
    *   Create a virtual environment for Python (assuming you know how to do this).
        
    *   Activate the virtual environment.
        
    *   (Skipping detailed instructions for this step.)
        
3.  **Open Terminals:**
    
    *   Open two PowerShell windows, or open two terminals inside VS Code.
        
    *   One terminal will run the backend, the other will run the frontend.
        

### Backend Setup and Run

1.  In the first terminal:
    
    *   Activate the Python virtual environment.
        
    *   cd ./backend
        
    *   pip install -r requirements.txt
        
    *   python manage.py makemigrationspython manage.py migrate
        
    *   python manage.py runserver
        

### Frontend Setup and Run

1.  In the second terminal:
    
    *   cd ./frontend
        
    *   npm install
        
    *   npm run dev
        

### Accessing the Application

*   http://localhost:3000
    
*   The full-stack application should now be running.
    

### Using the Application

*   **User Registration:**
    
    *   Register a new user via the Signup page.
        
*   **User Management:**
    
    *   Update or delete your user profile on the User Profile page.
        
*   **Firm Management:**
    
    *   Register, update (partial or full), or delete firms on the My Firm page (accessible via the first link in the navbar dropdown).
        
*   **Logout:**
    
    *   Click the Logout button in the navbar to automatically delete the authentication token from the backend, frontend, and the database.
        
### Using the Application After Project Steup
If project already steuped then you can dirclty use this command in terminal
npm run dev
python manage.py runserver
I