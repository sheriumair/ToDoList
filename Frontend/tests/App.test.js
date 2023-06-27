

const { expect } = require('chai');
const { render, fireEvent } = require('@testing-library/react');
const App = require('../src/App');

describe('App component', () => {
  it('should render the App component', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.app')).to.exist;
  });

  it('should handle form submission and add a new item', () => {
    const { container, getByPlaceholderText, getByText } = render(<App />);
    const inputElement = getByPlaceholderText('Enter task here');
    const addButtonElement = getByText('Add');

    // Simulate user input and form submission
    fireEvent.change(inputElement, { target: { value: 'New task' } });
    fireEvent.click(addButtonElement);

    // Assert that the new item is added
    expect(container.querySelector('.list')).to.have.text('New task');
  });
});