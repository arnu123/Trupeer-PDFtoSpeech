This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
install nvm in machine
npm install next
npm install franc (REMEMBER TO GO IN COMMAND PROMPT AND EXECUTE THIS COMMAND IN THE PATH OF YOUR PROJECT FOLDER)

Extract zip file to C:/poppler. 
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


├── public/
│   └── assets/
│   |    ├── common/  # Folder for general purpose assets
│   |    ├── covers/  # Subfolder for cover images
│   |    ├── covers-ff/  # Subfolder for a specific feature's cover images  
│   |    ├── home/  # Subfolder for home page assets
│   |    ├── icons/  # Subfolder for application icons
│   |    ├── chat-header-demo.jpg  # Example chat header image
│   |    ├── chat-header.jpg  # Chat header image
│   |    ├── LogoCheveron.png  # Chevron logo
│   ├── logo.png  # Main logo
│   |── next.svg  # Next icon
│   |── vercel.svg  # Vercel icon
├── src/  # Source code for the application 
│   ├── app/  # Application code
│   │   ├── api/  # Code for the application's API
│   │   │   ├── bhashiniCompute/
│   │   │   │   ├── JS route.js  # Routing for the bhashiniCompute API
│   │   │   ├── bhashiniConfig/
│   │   │   │   ├── JS route.js  # Routing for the bhashiniConfig API
│   │   │   ├── initialBhashiniConfig.js  
│   │   │   |   |── JS route.js  # Initial configuration for Bhashini
|   |   |   ├── ocr
|   |   |   |   ├── JS route.js
│   │   ├── intro/  # Code for the application's intro page
│   │   │   └── JS page.js  
│   │   ├── new/  
│   │   │   └── JS page.js  
|   |   ├── favicon.ico
|   |   ├── globals.css
|   |   ├── layout.tsx
│   │   ├── components/  
│   │   │   ├── controls.tsx  # Component for controls
│   │   │   ├── header.tsx  # Component for the header
│   │   │   ├── logo.tsx  # Component for the logo
│   │   │   ├── margin-width-wrapper.tsx  # Component for a wrapper with a margin width
│   │   │   ├── page-wrapper.tsx  # Component for a page wrapper
│   │   │   └── side-nav.tsx  # Component for the side navigation
│   │   ├── hooks/  
│   │   │   └── use-scroll.tsx  
│   │   ├── icons/  
│   │   │   ├── lucid.tsx  
│   │   |   └── main.tsx  
│   |   ├── lib/  # Utility library for the project
│   │   |   └── utils.tsx  # Utility functions
│   |   ├── constants.tsx  # Application constants
│   |   └── types.tsx  # Application types
├── .env.local  # Local environment variables
├── eslintrc.json  # ESLint configuration file
|── .gitignore  # Git configuration file
├── Dockerfile
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── tsconfig.json

Client-side Data Fetching
    API Routes: Located in src/app/api/ directory, handling server-side API requests.
        bhashiniCompute/route.js: Endpoint for compute-related operations.
        bhashiniConfig/route.js: Endpoint for configuration settings.
        initialBhashiniConfig/route.js: Endpoint for initial configuration settings.
        ocr/route.js: Endpoint for OCR-related operations.


