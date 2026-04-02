import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import App from './App';

describe('Header', () => {
  test('renders the CTEC Search title', () => {
    render(<App />);
    expect(screen.getByText('CTEC Search')).toBeInTheDocument();
  });

  test('renders the Northwestern subtitle', () => {
    render(<App />);
    expect(screen.getByText('Northwestern Course Evaluations')).toBeInTheDocument();
  });

  test('shows total course count', () => {
    render(<App />);
    expect(screen.getByText(/courses indexed/)).toBeInTheDocument();
  });
});

describe('Search', () => {
  test('renders the search input', () => {
    render(<App />);
    expect(
      screen.getByPlaceholderText('Search courses, professors, or departments...'),
    ).toBeInTheDocument();
  });

  test('filters results by course name', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(
      screen.getByPlaceholderText('Search courses, professors, or departments...'),
      'Machine Learning',
    );

    expect(screen.getByText('Machine Learning')).toBeInTheDocument();
    expect(screen.queryByText('Microeconomics')).not.toBeInTheDocument();
  });

  test('filters results by professor name', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(
      screen.getByPlaceholderText('Search courses, professors, or departments...'),
      'Bain',
    );

    expect(screen.getByText('Connor Bain')).toBeInTheDocument();
    expect(screen.queryByText('Bryan Pardo')).not.toBeInTheDocument();
  });

  test('filters results by course code', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(
      screen.getByPlaceholderText('Search courses, professors, or departments...'),
      'COMP_SCI 394',
    );

    expect(screen.getByText('COMP_SCI 394')).toBeInTheDocument();
    expect(screen.queryByText('MATH 220')).not.toBeInTheDocument();
  });

  test('shows empty state when no results match', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(
      screen.getByPlaceholderText('Search courses, professors, or departments...'),
      'xyznotacourse',
    );

    expect(screen.getByText('No courses found')).toBeInTheDocument();
  });

  test('clear button removes the query and restores all results', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(
      'Search courses, professors, or departments...',
    );
    await user.type(input, 'Bain');

    // clear button appears
    const clearBtn = screen.getByRole('button', { name: '' });
    await user.click(clearBtn);

    expect(input).toHaveValue('');
    // all courses visible again — spot-check two from different departments
    expect(screen.getByText('Microeconomics')).toBeInTheDocument();
    expect(screen.getByText('Machine Learning')).toBeInTheDocument();
  });
});

describe('Filters', () => {
  test('department filter narrows results', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.selectOptions(screen.getByRole('combobox', { name: '' }), 'Mathematics');

    expect(screen.getByText('MATH 220')).toBeInTheDocument();
    expect(screen.queryByText('COMP_SCI 111')).not.toBeInTheDocument();
  });

  test('term filter narrows results', async () => {
    const user = userEvent.setup();
    render(<App />);

    const selects = screen.getAllByRole('combobox');
    await user.selectOptions(selects[1], 'Winter');

    // winter courses should appear
    expect(
      screen.getByText('Fundamentals of Computer Programming II'),
    ).toBeInTheDocument();
    // fall-only course should not
    expect(screen.queryByText('Fund Comp Prog')).not.toBeInTheDocument();
  });
});

describe('Course cards', () => {
  test('each card shows course code, name, and professor', () => {
    render(<App />);
    expect(screen.getByText('COMP_SCI 111')).toBeInTheDocument();
    expect(screen.getByText('Fund Comp Prog')).toBeInTheDocument();
    expect(screen.getByText('Connor Bain')).toBeInTheDocument();
  });

  test('each card shows response count and rate', () => {
    render(<App />);
    // Bain's card: 183 responses at 84.3%
    expect(screen.getByText(/183 responses \(84\.3%\)/)).toBeInTheDocument();
  });

  test('expanding comments reveals student quotes', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Filter down to just Bain so there's one card
    await user.type(
      screen.getByPlaceholderText('Search courses, professors, or departments...'),
      'Bain',
    );

    const toggleBtn = screen.getByRole('button', { name: /Student Comments/ });
    await user.click(toggleBtn);

    expect(screen.getByText(/great intro class to CS/i)).toBeInTheDocument();
  });

  test('result count label updates with search', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(
      screen.getByPlaceholderText('Search courses, professors, or departments...'),
      'COMP_SCI',
    );

    const resultLabel = screen.getByText(/results? for/);
    expect(resultLabel).toBeInTheDocument();
    expect(resultLabel.textContent).toMatch(/COMP_SCI/);
  });

  test('card shows hours per week', () => {
    render(<App />);
    // Bain's card has 4-7 hrs/wk
    expect(screen.getAllByText(/hrs\/wk/).length).toBeGreaterThan(0);
  });

  test('card shows rating labels', () => {
    render(<App />);
    expect(screen.getAllByText('Instruction').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Course').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Learning').length).toBeGreaterThan(0);
  });
});

describe('Sort', () => {
  test('renders sort dropdown with expected options', () => {
    render(<App />);
    const selects = screen.getAllByRole('combobox');
    // third combobox is the sort select (dept, term, sort)
    const sortSelect = selects[2];
    expect(sortSelect).toBeInTheDocument();
    expect(sortSelect).toHaveValue('instructionQuality');
  });

  test('changing sort to Course Rating still shows results', async () => {
    const user = userEvent.setup();
    render(<App />);

    const selects = screen.getAllByRole('combobox');
    await user.selectOptions(selects[2], 'courseQuality');

    // results should still be present
    expect(screen.getByText(/results?/)).toBeInTheDocument();
    expect(screen.getByText('COMP_SCI 321')).toBeInTheDocument();
  });

  test('changing sort to Amount Learned still shows results', async () => {
    const user = userEvent.setup();
    render(<App />);

    const selects = screen.getAllByRole('combobox');
    await user.selectOptions(selects[2], 'amountLearned');

    expect(screen.getByText('Machine Learning')).toBeInTheDocument();
  });
});

describe('Footer', () => {
  test('renders footer disclaimer', () => {
    render(<App />);
    expect(
      screen.getByText(/Not affiliated with Northwestern University/),
    ).toBeInTheDocument();
  });
});
