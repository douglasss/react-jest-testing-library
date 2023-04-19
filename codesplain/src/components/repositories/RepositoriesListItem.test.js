import { screen, render } from '@testing-library/react';
import RepositoriesListItem from './RepositoriesListItem';
import { MemoryRouter } from 'react-router';

function renderComponent() {
  const repository = {
    full_name: 'facebook/react',
    language: 'Javascript',
    description: 'A js library',
    owner: {
      login: 'facebook',
    },
    name: 'react',
    html_url: 'https://github.com/TheAlgorithms/Python',
  };
  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );
  return {
    repository,
  };
}

test('shows a link to hte github homepage for this repository', async () => {
  const { repository } = renderComponent();
  await screen.findByRole('img', { name: 'Javascript' });

  const link = screen.getByRole('link', { name: /github repository/i });
  expect(link).toHaveAttribute('href', repository.html_url);
});

test('shows a file icon with the appropriate icon', async () => {
  const { repository } = renderComponent();
  const icon = await screen.findByRole('img', { name: repository.language });
  expect(icon).toHaveClass('js-icon');
});

test('shows a link to the code editor page', async () => {
  const { repository } = renderComponent();

  await screen.findByRole('img', { name: 'Javascript' });

  const link = await screen.findByRole('link', {
    name: new RegExp(repository.owner.login),
  });

  expect(link).toHaveAttribute('href', `/repositories/${repository.full_name}`);
});
