# Bhashini Project

## Getting Started

Before you begin, ensure you have [Node.js](https://nodejs.org/) and [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.

## Installation Steps

### For Linux Users

#### Using Node.js

1. Create a `.env.local` file in the root folder of the project.
2. Add the following environment variables with appropriate values to the file:
    ```env
    NEXT_PUBLIC_userID=
    NEXT_PUBLIC_ulcaApiKey=
    NEXT_PUBLIC_pipelineId=
    ```
3. Install Poppler utilities:
    ```sh
    sudo apt-get install poppler-utils -y
    ```
4. Install project dependencies:
    ```sh
    npm install
    ```
5. Run the development server:
    ```sh
    npm run dev
    ```
6. Open [http://localhost:3000/intro](http://localhost:3000/intro) in your browser.
7. Click on the "Create New" button.

#### Using Docker
1. Create a `.env.local` file in the root folder of the project.
2. Add the following environment variables with appropriate values to the file:
    ```env
    NEXT_PUBLIC_userID=
    NEXT_PUBLIC_ulcaApiKey=
    NEXT_PUBLIC_pipelineId=
    ```
3. Install Poppler utilities:
    ```sh
    sudo apt-get install poppler-utils -y
    ```
4. Build the Docker image:
    ```sh
    sudo docker build -t bhashini .
    ```
5. Run the Docker container:
    ```sh
    sudo docker run -d -p 3000:3000 bhashini
    ```
6. Open [http://localhost:3000/intro](http://localhost:3000/intro) in your browser.
7. Click on the "Create New" button.

### For Windows and macOS Users

1. Create a `.env.local` file in the root folder of the project.
2. Add the following environment variables with appropriate values to the file:
    ```env
    NEXT_PUBLIC_userID=
    NEXT_PUBLIC_ulcaApiKey=
    NEXT_PUBLIC_pipelineId=
    ```
3. Download the Poppler archive from [this link](https://drive.google.com/file/d/1z8CcMGqDaFJbNky8CZTDMJxJBbwOheGM/view?usp=drive_link).
4. Extract the zip file to a directory on your computer.
5. Configure the path for Poppler binaries:
    - Locate the `poppler-0.68.0/bin` directory on your computer.
    - Update the path in `src/app/api/ocr/pdftocairo-wrapper.js` according to your operating system. For example:
      ```javascript
      if (os.platform() === 'win32') {
          pdftocairoPath = path.normalize("C:/poppler/poppler-0.68.0/bin/pdftocairo.exe");
      } else if (os.platform() === 'darwin') {
          pdftocairoPath = path.normalize("/opt/homebrew/bin/pdftocairo");
      }
      ```
#### Using Node.js

1. Install project dependencies:
    ```sh
    npm install
    ```
2. Install the pdf-poppler package:
    ```sh
    npm install pdf-poppler
    ```
3. Run the development server:
    ```sh
    npm run dev
    ```
4. Open [http://localhost:3000/intro](http://localhost:3000/intro) in your browser.

5. Click on the "Create New" button.

#### Using Docker

1. Build the Docker image:
    ```sh
    docker build -t bhashini .
    ```
2. Run the Docker container:
    ```sh
    docker run -d -p 3000:3000 bhashini
    ```

## Accessing the Application

After starting the server, open [http://localhost:3000/intro](http://localhost:3000/intro) in your browser to view the application.

