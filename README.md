# Portfolio React

A modern portfolio website built with React.js, featuring smooth animations, responsive design, and professional styling.

## Features

- React 18 with functional components and hooks
- AOS (Animate On Scroll) animations
- Bootstrap 5 styling
- React Icons for iconography
- Responsive sidebar navigation
- Preloader animation
- Scroll to top functionality
- Smooth scroll navigation

## Sections Included

1. **Hero** - Introduction with social links
2. **About** - Personal information and strengths
3. **Skills** - Progress bars showing technical skills
4. **Services** - Service offerings
5. **Contact** - Contact form and information

## Installation

1. Make sure you have Node.js installed (version 14 or higher)

2. Navigate to the project directory:

   ```bash
   cd portfolio-react
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open your browser and visit: `http://localhost:3000`

## Building for Production

To create a production build:

```bash
npm run build
```

The build folder will contain the optimized static files that can be deployed to any web hosting service.

## Customization

### Update Personal Information

Edit `src/App.js` to update:

- Your name in the sidebar and hero section
- About section content
- Skills percentages
- Services offered
- Contact information

### Update Styling

Edit `src/index.css` to customize:

- Colors (modify CSS variables in :root)
- Fonts
- Spacing
- Any other styling

### Add Images

Place your images in `public/assets/img/` directory and update the paths in `src/App.js`

## Technologies Used

- **React** - UI library
- **React Icons** - Icon components
- **AOS** - Scroll animations
- **Bootstrap 5** - CSS framework
- **Google Fonts** - Typography

## License

This project is based on the iPortfolio template by BootstrapMade.
Original template: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/

## Learn More

To learn more about React, check out the [React documentation](https://reactjs.org/).

To learn more about Create React App, check out the [CRA documentation](https://facebook.github.io/create-react-app/).

## Deployment

You can deploy this React app to various platforms:

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Deploy the build folder to Netlify
```

### GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add scripts to package.json:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Run: `npm run deploy`

## Project Structure

```
portfolio-react/
├── public/
│   ├── index.html
│   └── assets/          # Images and static files
├── src/
│   ├── index.js         # Entry point
│   ├── index.css        # Global styles
│   └── App.js           # Main component
├── package.json
└── README.md
```

## Contributing

Feel free to customize this portfolio for your own use. Add more sections, modify the styling, or change the content to match your personal brand.

## Support

If you have any questions or need help, feel free to reach out!

Enjoy your new React portfolio! 🚀
