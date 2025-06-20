document.addEventListener('DOMContentLoaded', () => {
    let donorsData = JSON.parse(localStorage.getItem('donorsData'));
    if (!Array.isArray(donorsData) || donorsData.length === 0) {
        donorsData = [
            { id: "1", name: "Rahul Sharma", bloodGroup: "O+", city: "Mumbai", location: "Andheri West", available: false, phone: "+91-9876543210" },
            { id: "2", name: "Priya Singh", bloodGroup: "A+", city: "Delhi", location: "Connaught Place", available: true, phone: "+91-9916259010" },
            { id: "3", name: "Naga Teja", bloodGroup: "B+", city: "Bellary", location: "Somewhere in", available: true, phone: "+91-9620569007" },
            // ... static entries 4–6 ...
        ];
        localStorage.setItem('donorsData', JSON.stringify(donorsData));
    }

    window.donorsData = donorsData;

    const searchForm = document.getElementById('searchForm'),
          searchBtn = document.getElementById('searchBtn'),
          loadingState = document.getElementById('loadingState'),
          resultsHeader = document.getElementById('resultsHeader'),
          resultsCount = document.getElementById('resultsCount'),
          donorsGrid = document.getElementById('donorsGrid'),
          noResults = document.getElementById('noResults');

    searchForm.addEventListener('submit', handleSearch);
    function handleSearch(e) {
        e.preventDefault();
        showLoading();
        setTimeout(() => displayResults(filterDonors(
            new FormData(searchForm).get('bloodGroup'),
            new FormData(searchForm).get('location')
        )), 1500);
    }

    function filterDonors(bloodGroup, location) {
        return donorsData.filter(d => {
            const matchBG = !bloodGroup || d.bloodGroup === bloodGroup;
            const matchLoc = !location || (d.city + ' ' + d.location).toLowerCase().includes(location.toLowerCase());
            return matchBG && matchLoc;
        });
    }

    function showLoading() {
        hideAllSections();
        loadingState.style.display = 'block';
        searchBtn.disabled = true;
        searchBtn.innerHTML = '<div class="spinner"></div><span>Searching...</span>';
    }

    function displayResults(list) {
        hideAllSections();
        searchBtn.disabled = false;
        searchBtn.innerHTML = '<i class="fas fa-search"></i><span>Search Donors</span>';

        if (list.length === 0) {
            noResults.style.display = 'block';
            return;
        }

        resultsHeader.style.display = 'block';
        resultsCount.textContent = `Found ${list.length} donor${list.length !== 1 ? 's' : ''}`;
        donorsGrid.innerHTML = '';
        list.forEach(d => donorsGrid.appendChild(createDonorCard(d)));
    }

    function createDonorCard(donor) {
        const c = document.createElement('div');
        c.className = 'donor-card';
        const wa = donor.phone.replace(/\D/g, '');
        c.innerHTML = `
            <div class="donor-header">
              <div><h3>${donor.name}</h3>
              <div class="donor-location"><i class="fas fa-map-marker-alt"></i><span>${donor.location}, ${donor.city}</span></div></div>
              <div class="blood-group-badge">${donor.bloodGroup}</div>
            </div>
            <div class="donor-footer">
              <div class="availability ${donor.available ? 'available' : 'unavailable'}">
                <div class="availability-dot"></div><span>${donor.available ? 'Available' : 'Unavailable'}</span>
              </div>
              ${donor.available ? `
                <div class="contact-buttons">
                  <a href="tel:${donor.phone}" class="contact-btn call-btn"><i class="fas fa-phone"></i></a>
                  <a href="https://wa.me/${wa}?text=Hi, I'm looking for blood donation" target="_blank" class="contact-btn whatsapp-btn"><i class="fab fa-whatsapp"></i></a>
                </div>` : ''}
            </div>`;
        return c;
    }

    function hideAllSections() {
        loadingState.style.display = 'none';
        resultsHeader.style.display = 'none';
        donorsGrid.innerHTML = '';
        noResults.style.display = 'none';
    }

    window.clearSearch = function () {
        searchForm.reset();
        hideAllSections();
        displayResults(donorsData);
    };

    window.displayResults = displayResults;
    window.addEventListener('load', () => displayResults(donorsData));

    // Placeholder for backend sync
    window.syncWithBackend = function () {
        // e.g. fetch('/api/donors').then(...).then(data => { window.donorsData = data; localStorage.setItem('donorsData', JSON.stringify(data)); displayResults(data); });
    };
});