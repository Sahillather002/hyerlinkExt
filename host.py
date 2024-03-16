import json
import sqlite3
import sys

# Function to insert or update hyperlink data in SQLite database
def update_database(data):
    try:
        # Connect to SQLite database (create one if not exists)
        conn = sqlite3.connect('hyperlink_data.db')
        cursor = conn.cursor()

        # Create table if not exists
        cursor.execute('''CREATE TABLE IF NOT EXISTS hyperlinks
                          (site TEXT, hyperlink TEXT, occurrences INTEGER)''')

        # Insert or update hyperlink data
        for site, hyperlink, occurrences in data:
            cursor.execute('''INSERT INTO hyperlinks (site, hyperlink, occurrences)
                              VALUES (?, ?, ?)
                              ON CONFLICT(site, hyperlink) DO UPDATE SET occurrences = occurrences + ?''',
                              (site, hyperlink, occurrences, occurrences))

        # Commit changes and close connection
        conn.commit()
        conn.close()
    except Exception as e:
        print("Error:", e)

# Main function to handle incoming messages
def main():
    while True:
        # Read message from Chrome extension
        message = sys.stdin.readline().strip()

        try:
            # Parse JSON message
            data = json.loads(message)

            # Process the received data and update the database
            update_database(data)

            # Send acknowledgment back to Chrome extension
            response = {"status": "success"}
            sys.stdout.write(json.dumps(response) + '\n')
            sys.stdout.flush()
        except Exception as e:
            # Send error message back to Chrome extension
            response = {"status": "error", "message": str(e)}
            sys.stdout.write(json.dumps(response) + '\n')
            sys.stdout.flush()

if __name__ == '__main__':
    main()
