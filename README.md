# IVF Success Estimator

A web application that calculates IVF success rates based on CDC data, providing personalized estimates to help patients understand their fertility journey.

## How It Works

The app collects patient information and uses CDC ART (Assisted Reproductive Technology) program data to estimate IVF success rates. Users input details about their age, physical characteristics, medical history, and infertility diagnosis to receive a personalized success estimate.

## Pages

### Home (`/`)
Landing page where users choose between two ways to enter their information.

### Guided Questionnaire (`/questionnaire`)
A step-by-step flow that walks users through each question one at a time. Best for users who prefer a guided experience.

### Direct Calculator (`/calculator`)
A single-page form showing all questions at once. Best for users who want to fill everything out quickly.

## Getting Started

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run production build
```bash
npm run build
npm run start
```

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- React Query (TanStack Query)
