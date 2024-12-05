export class SearchManager {
  constructor(searchInput, resultsContainer, template) {
    this.searchInput = searchInput;
    this.resultsContainer = resultsContainer;
    this.template = template;
    this.searchResults = [];
    this.init();
  }

  init() {
    this.loadSearchData();
    this.setupEventListeners();
  }

  async loadSearchData() {
    try {
      const [mayuriData, ubData] = await Promise.all([
        fetch('/json/mayuri.json').then((res) => res.json()),
        fetch('/json/ub.json').then((res) => res.json()),
      ]);

      this.searchResults = [
        ...this.formatSearchData(mayuriData, 'mayuri'),
        ...this.formatSearchData(ubData, 'ub'),
      ];
    } catch (error) {
      console.error('Error loading search data:', error);
    }
  }

  formatSearchData(data, restaurant) {
    return data.map((item) => ({
      ...item,
      restaurant,
      url: `/${restaurant}.html#${item.id}`, // Add URL for redirect
    }));
  }

  setupEventListeners() {
    this.searchInput.addEventListener('input', () => {
      const value = this.searchInput.value.toLowerCase();
      this.updateResults(value);
    });

    this.resultsContainer.addEventListener('click', (e) => {
      const card = e.target.closest('[data-search-result]');
      if (card) {
        const url = card.dataset.url;
        if (url) window.location.href = url;
      }
    });
  }

  updateResults(searchTerm) {
    this.resultsContainer.innerHTML = '';
    if (!searchTerm) return;

    const filtered = this.searchResults.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.description?.toLowerCase().includes(searchTerm)
    );

    filtered.forEach((item) => {
      const card = this.template.content.cloneNode(true).children[0];
      const header = card.querySelector('[data-header]');
      const body = card.querySelector('[data-body]');
      const image = card.querySelector('[data-image]');

      card.dataset.searchResult = '';
      card.dataset.url = item.url;
      header.textContent = item.name;
      body.textContent = `${item.description || ''} - ₹${item.price}`;
      if (image) image.src = item.image || '';

      this.resultsContainer.append(card);
    });
  }
}
