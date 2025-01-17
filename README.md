# 🛍️ CGT Technical Test -  Marketplace MVP

## Original Test Requirements

### Overview

The goal of this task is to test the ability to test, refactor and implement new functionality on a given system. Note
that this repository does not represent actual production code, but only acts as a testing ground.

### Context

Management has assigned a task to implement basic MVP functionality for the marketplace. Users should be able to navigate between home page, product page and cart page, add multiple items to the cart and see the total amount for payment.

### Required Tasks

1. Implement MVP cart functionality
2. Refactor implementation code and tests where needed. Full freedom is given for improvements
3. Take UI and UX into consideration. Improve the layout and styles using css/scss
4. Ensure test suite runs successfully through all tests

### Notes & Requirements

- Time spent is flexible
- Both application code and tests can be refactored
- Use git for version control. **Fork or clone the repository** and commit frequently
- When finished, send the project link or zip via e-mail

---

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Material UI](https://img.shields.io/badge/Material_UI-5.0-blue?logo=mui)
![React Router](https://img.shields.io/badge/React_Router-6.0-red?logo=react-router)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.0-pink)
![Testing Library](https://img.shields.io/badge/Testing_Library-14-red?logo=testing-library)
![Emotion](https://img.shields.io/badge/Emotion-11-purple?logo=emotion)
![Notistack](https://img.shields.io/badge/Notistack-3.0-green)
![PropTypes](https://img.shields.io/badge/PropTypes-15.8-blue)

A modern, user-friendly marketplace MVP that demonstrates essential e-commerce functionality. This project showcases a clean, maintainable codebase with comprehensive test coverage and a polished user interface.

## 🔗 Live Demo

Check out the [**Live Demo**](cgt-test-fe-marketplace-81s8wuc0l-julioale21s-projects.vercel.app) deployed on Vercel.

## 🚀 Key Features

- **Product Browsing**: Navigate through an intuitive home page with product listings
- **Product Details**: Detailed product pages with comprehensive information
- **Shopping Cart**: Fully functional cart with add, remove, and quantity management
- **Form Validation**: Robust form handling using React Hook Form
- **Toast Notifications**: User-friendly notifications using Notistack
- **Modern UI**: Clean and intuitive interface using Material UI

## 🔧 Technology Stack

- **React 18**: Modern UI development with JSX and PropTypes
- **Material UI**: Comprehensive design system for consistent styling
- **React Router**: Client-side routing with protected routes
- **React Hook Form**: Efficient form validation and handling
- **Notistack**: Toast notifications management
- **Emotion**: Powerful CSS-in-JS styling
- **React Testing Library**: Component testing with AAA pattern
- **PropTypes**: Runtime type checking for React props

## 📂 Project Structure

```plaintext
src/
├── components/        # Reusable components
│   ├── cart/          # Cart-related components
    ├── checkout/      # Cart-related components
│   ├── product/       # Product-related components
    ├── shared/        # Cross site components
│   └── ..
├── hooks/             # Custom React hooks
├── constants/          
├── context/           # React context providers
├── pages/             # Main page components
├── services/          # API services
├── routes/            # App router
└── __tests__/         # Test files
```

## 🚀 Getting Started

1. **Clone the repository:**

```bash
git clone [repository-url]
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 💻 Development Guidelines

### Component Structure

```jsx
import React from 'react';
import PropTypes from 'prop-types';

const ComponentName = ({ prop1, prop2 }) => {
  return (
    // JSX structure
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number
};

export { ComponentName };
```

### Commit Convention

We follow the Conventional Commits specification:

```bash
feat: add new product card component
fix: resolve cart total calculation
refactor: update form validation logic
test: add tests for checkout process
docs: update installation instructions
style: format component spacing
```

## 🧪 Testing Guidelines

### Test Structure

We follow the AAA (Arrange-Act-Assert) pattern with descriptive "should" statements:

```javascript
import { render, screen } from '@testing-library/react';

describe('ComponentName', () => {
  it('should display correct title when provided', () => {
    // Arrange
    const title = 'Test Title';

    // Act
    render(<ComponentName title={title} />);

    // Assert
    expect(screen.getByText(title)).toBeInTheDocument();
  });
});
```

### Testing Best Practices

- Use descriptive "should" statements for test descriptions
- Follow AAA pattern consistently
- Test component rendering and interactions
- Use meaningful test data
- Avoid testing implementation details
- Focus on user-centric behaviors

## 🔄 State Management
- **Context API**: Cart state management with Context Provider
- **Local Storage**: Data persistence for cart items
- **Local State**: For component-specific state
- **Form State**: Managed by React Hook Form
- **Navigation State**: Handled by React Router

## 📱 Responsive Design

The application is fully responsive across:

- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔗 Available Scripts

```bash
npm start          # Start development server
npm run test       # Run test suite
npm run test:coverage  # Run test coverage
npm run build     # Build for production
```
