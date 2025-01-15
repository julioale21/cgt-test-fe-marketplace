// src/setupTests.js

jest.mock('react-router-dom', () => {
  const React = require('react');
  const actualRouter = jest.requireActual('react-router-dom');

  const MockRouter = ({ children }) => {
    const { MemoryRouter } = actualRouter;
    return <MemoryRouter>{children}</MemoryRouter>;
  };
  MockRouter.displayName = 'MockRouter';

  const MockLink = React.forwardRef(({ children, to, ...props }, ref) => (
    <a href={to} ref={ref} {...props}>
      {children}
    </a>
  ));
  MockLink.displayName = 'MockLink';

  return {
    ...actualRouter,
    BrowserRouter: MockRouter,
    Link: MockLink
  };
});

import '@testing-library/jest-dom';

const originalError = console.error;
console.error = (...args) => {
  if (
    /Warning: Failed prop type/.test(args[0]) ||
    /Warning: Function components cannot be given refs/.test(args[0])
  ) {
    return;
  }
  originalError.call(console, ...args);
};