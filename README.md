## Getting Started
Before you begin, ensure you have Node.js and Docker Desktop installed.

## Installation Steps
1) Download Poppler:

    - Download the Poppler archive from https://drive.google.com/file/d/1z8CcMGqDaFJbNky8CZTDMJxJBbwOheGM/view?usp=drive_link.
    - Extract the zip file to a directory on your computer.
    - Configure Path for Poppler Binaries:

      - Locate the poppler-0.68.0/bin directory on your computer.
      - Update the path in the below code snippet of pdftocairo-wrapper.js according to your operating system:
       ```
       if (os.platform() === 'win32') {
          pdftocairoPath = process.env.PDFTOCAIRO_PATH|| path.normalize("C:/poppler/poppler-0.68.0/bin/pdftocairo.exe");
        } else if (os.platform() === 'darwin') {
          pdftocairoPath = process.env.PDFTOCAIRO_PATH || path.normalize("/opt/homebrew/bin/pdftocairo");
        } else if (os.platform() === 'linux') {
          pdftocairoPath = process.env.PDFTOCAIRO_PATH || '/usr/bin/pdftocairo'; // Example path for Linux
        } else {
          throw new Error('Unsupported platform');
        }
        ```
       
2) Create a .env.local file in the root folder of the project.

    - Put the below three things in the file with the appropriate values:
        ```
         NEXT_PUBLIC_userID = 
         NEXT_PUBLIC_ulcaApiKey =
         NEXT_PUBLIC_pipelineId = 
        ```
3) Install Dependencies:

    - Run the following command to install dependencies.
        ```
            docker build -t trupeerpdftospeech .
            docker run -d -p 3000:3000 trupeerpdftospeech
        ```

## Running the Development Server
To run the development server, execute one of the following commands:
```
npm run dev 
or 
yarn dev 
or 
pnpm dev
or 
bun dev
```

After the server starts, open http://localhost:3000/intro in your browser to view the application.


