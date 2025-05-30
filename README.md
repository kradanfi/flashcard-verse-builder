
# Flashcard Verse Builder

A modern web application for generating vocabulary flashcards using webhooks. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🎯 Generate flashcards from any topic
- 🔗 Webhook integration for dynamic content
- 🔐 Secure secret key support
- 📚 Interactive flashcard display with flip animation
- ✅ Mark cards as remembered
- 🎚️ Difficulty level indicators
- 📱 Fully responsive design

## Live Demo

Visit the live application: [https://yourusername.github.io/flashcard-verse-builder/](https://yourusername.github.io/flashcard-verse-builder/)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/flashcard-verse-builder.git
cd flashcard-verse-builder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Usage

1. Enter a topic for vocabulary learning (e.g., "Animals", "Food", "Colors")
2. Provide a webhook URL that returns vocabulary data
3. Optionally add a secret key for secure webhook calls
4. Click "สร้าง Flashcard" to generate your flashcards
5. Use the interactive flashcards to study vocabulary

### Webhook Format

Your webhook should return JSON in this format:
```json
{
  "vocabularies": [
    {
      "word": "Apple",
      "translation": "แอปเปิล"
    },
    {
      "word": "Banana", 
      "translation": "กล้วย"
    }
  ]
}
```

## Deployment

### GitHub Pages (Automatic)

1. Fork this repository
2. Go to repository Settings > Pages
3. Set source to "GitHub Actions"
4. Push changes to main branch - deployment happens automatically

### Manual Deployment

```bash
npm run build
# Deploy the `dist` folder to your hosting service
```

## Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Data Fetching**: TanStack Query
- **Routing**: React Router DOM

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/yourusername/flashcard-verse-builder/issues).
