/* Search functionality for the physics teacher wiki */

// The searchIndex array is defined in search-index.js
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  if (searchInput && searchResults && window.searchIndex) {
    searchInput.addEventListener('input', function() {
      const query = this.value.trim().toLowerCase();
      // Clear previous results
      searchResults.innerHTML = '';
      if (query.length > 1) {
        // Filter pages where title or any keyword matches the query
        const results = window.searchIndex.filter(item => {
          const inTitle = item.title.toLowerCase().includes(query);
          const inKeywords = item.keywords.some(k => k.toLowerCase().includes(query));
          return inTitle || inKeywords;
        }).slice(0, 10);
        // Display results
        results.forEach(item => {
          const link = document.createElement('a');
          // Calculate prefix based on current path depth so that links
          // always resolve relative to the site root. For example,
          // when viewing a page in /workflows/ or /sops/, prefix becomes "../".
          const pathParts = window.location.pathname.replace(/\/$/, '').split('/');
          // Remove the last element (filename)
          const depth = pathParts.length - 1;
          // Depth of 1 means we are at the root (e.g. index.html)
          const upLevels = depth - 1;
          let prefix = '';
          if (upLevels > 0) {
            prefix = '../'.repeat(upLevels);
          }
          link.href = prefix + item.url;
          link.className = 'list-group-item list-group-item-action';
          link.textContent = item.title;
          searchResults.appendChild(link);
        });
      }
    });
  }
});
