import { SearchManager } from './search.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('[data-search]');
  const resultsContainer = document.querySelector('[data-search-results]');
  const template = document.querySelector('[data-search-template]');

  if (searchInput && resultsContainer && template) {
    new SearchManager(searchInput, resultsContainer, template);
  }
});
