// Talent filtering and data management
document.addEventListener('DOMContentLoaded', function() {
    // Subgroups data structure
    const subgroups = {
        'all': [],
        'en': [
            { value: 'myth', name: 'Myth', description: 'hololive English -Myth- - первое поколение английского подразделения' },
            { value: 'hope', name: 'Project: HOPE', description: 'Сольный проект ИРЫ' },
            { value: 'council', name: 'Council', description: 'Второе поколение английского подразделения' },
            { value: 'promise', name: 'Promise', description: 'Третье поколение английского подразделения' },
            { value: 'advent', name: 'Advent', description: 'Четвертое поколение английского подразделения' },
            { value: 'justice', name: 'Justice', description: 'Пятое поколение английского подразделения' }
        ],
        'jp': [
            { value: 'gen0', name: 'Gen 0', description: 'Нулевое поколение японского подразделения' },
            { value: 'gen1', name: 'Gen 1', description: 'Первое поколение японского подразделения' },
            { value: 'gen2', name: 'Gen 2', description: 'Второе поколение японского подразделения' },
            { value: 'gamers', name: 'GAMERS', description: 'Игровое подразделение' },
            { value: 'gen3', name: 'Gen 3', description: 'Третье поколение японского подразделения' },
            { value: 'gen4', name: 'Gen 4', description: 'Четвертое поколение японского подразделения' },
            { value: 'gen5', name: 'Gen 5', description: 'Пятое поколение японского подразделения' },
            { value: 'holox', name: 'holoX', description: 'Шестое поколение японского подразделения' },
            { value: 'regloss', name: 'ReGLOSS', description: 'DEV_IS подразделение' },
            { value: 'flowglow', name: 'FLOW GLOW', description: 'DEV_IS подразделение' },
            { value: 'holoan', name: 'holoAN', description: 'DEV_IS подразделение' }
        ],
        'id': []
    };

    // Group descriptions
    const groupDescriptions = {
        'myth': `hololive English -Myth- - также известное как holoMyth и неофициально известно как 1-ое поколение hololive English. Эта группа стала первой среди всех поколений hololive, которые дебютировали со своим лором и определённой тематикой. В случае holoMyth, таланты этой группы являются мифологическими существами и детективом, который расследует дело этих мифов. Отсюда и пошло название -Myth-.`
    };

    // Sample talents data (will be expanded)
    const talents = [
        {
            id: 1,
            name: "Mori Calliope",
            group: "EN - Myth",
            subgroup: "myth",
            branch: "en",
            image: "../images/talents/mori-calliope/avatar.jpg",
            colors: ["#000000", "#ec4899", "#dc2626"],
            description: "Англоговорящая виртуальная ютуберша, часть первого поколения hololive English",
            page: "mori-calliope.html"
        },
        {
            id: 2,
            name: "Takanashi Kiara",
            group: "EN - Myth",
            subgroup: "myth",
            branch: "en",
            image: "../images/talents/takanashi-kiara/avatar.jpg",
            colors: ["#f59e0b", "#60a5fa", "#2563eb"],
            description: "Англоговорящая витуберша, часть 1-го поколения hololive EN",
            page: "takanashi-kiara.html"
        },
        {
            id: 3,
            name: "Ninomae Ina'nis",
            group: "EN - Myth",
            subgroup: "myth",
            branch: "en",
            image: "../images/talents/ninomae-inanis/avatar.jpg",
            colors: ["#8b5cf6", "#f59e0b", "#ffffff"],
            description: "Англоговорящая виртуальная ютуберша, часть первого поколения hololive English",
            page: "ninomae-inanis.html"
        },
        {
            id: 4,
            name: "Watson Amelia",
            group: "EN - Myth",
            subgroup: "myth",
            branch: "en",
            image: "../images/talents/watson-amelia/avatar.jpg",
            colors: ["#fbbf24", "#60a5fa", "#f59e0b"],
            description: "Витуберша, часть первого поколения hololive English",
            page: "watson-amelia.html"
        },
        {
            id: 5,
            name: "Gawr Gura",
            group: "EN - Myth",
            subgroup: "myth",
            branch: "en",
            image: "../images/talents/gawr-gura/avatar.jpg",
            colors: ["#4f46e5", "#ffffff", "#dc2626"],
            description: "Виртуальная ютуберша, часть первого поколения hololive English",
            page: "gawr-gura.html"
        }
    ];

    // DOM Elements
    const mainBranchFilter = document.getElementById('mainBranchFilter');
    const subgroupFilter = document.getElementById('subgroupFilter');
    const resetFilters = document.getElementById('resetFilters');
    const quickFilters = document.querySelectorAll('.quick-filter');
    const talentsContainer = document.getElementById('talentsContainer');
    const emptyState = document.getElementById('emptyState');
    const groupInfoSection = document.getElementById('groupInfoSection');
    const groupTitle = document.getElementById('groupTitle');
    const groupDescription = document.getElementById('groupDescription');

    // Initialize filters
    function initializeFilters() {
        updateSubgroupFilter();
        displayTalents(talents);
        
        // Check URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const branch = urlParams.get('branch');
        const subgroup = urlParams.get('subgroup');
        
        if (branch) {
            mainBranchFilter.value = branch;
            updateSubgroupFilter();
            if (subgroup) {
                subgroupFilter.value = subgroup;
            }
            filterTalents();
        }
    }

    // Update subgroup filter based on main branch selection
    function updateSubgroupFilter() {
        const selectedBranch = mainBranchFilter.value;
        const subgroupsList = subgroups[selectedBranch] || [];
        
        subgroupFilter.innerHTML = '<option value="all">Все подгруппы</option>';
        
        subgroupsList.forEach(subgroup => {
            const option = document.createElement('option');
            option.value = subgroup.value;
            option.textContent = subgroup.name;
            subgroupFilter.appendChild(option);
        });
    }

    // Display talents in grid
    function displayTalents(talentsToShow) {
        talentsContainer.innerHTML = '';
        
        if (talentsToShow.length === 0) {
            emptyState.classList.remove('d-none');
            return;
        }
        
        emptyState.classList.add('d-none');
        
        talentsToShow.forEach(talent => {
            const talentCard = createTalentCard(talent);
            talentsContainer.appendChild(talentCard);
        });
    }

    // Create talent card HTML
    function createTalentCard(talent) {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 col-xl-3 mb-4';
        
        col.innerHTML = `
            <div class="talent-card h-100">
                <img src="${talent.image}" alt="${talent.name}" class="talent-image" 
                     onerror="this.src='https://via.placeholder.com/400x300/1e293b/94a3b8?text=${encodeURIComponent(talent.name)}'">
                <div class="talent-info">
                    <h3 class="talent-name">${talent.name}</h3>
                    <p class="talent-group">${talent.group}</p>
                    <div class="talent-badges">
                        <span class="badge badge-custom bg-primary">${talent.branch.toUpperCase()}</span>
                        <span class="badge badge-custom bg-secondary">${talent.subgroup}</span>
                    </div>
                    <p class="text-muted small mb-3">${talent.description}</p>
                    <a href="talents/${talent.page}" class="btn btn-outline-primary w-100">
                        Подробнее
                    </a>
                </div>
            </div>
        `;
        
        return col;
    }

    // Filter talents based on selections
    function filterTalents() {
        const selectedBranch = mainBranchFilter.value;
        const selectedSubgroup = subgroupFilter.value;
        
        let filteredTalents = talents;
        
        // Filter by branch
        if (selectedBranch !== 'all') {
            filteredTalents = filteredTalents.filter(talent => talent.branch === selectedBranch);
        }
        
        // Filter by subgroup
        if (selectedSubgroup !== 'all') {
            filteredTalents = filteredTalents.filter(talent => talent.subgroup === selectedSubgroup);
        }
        
        // Show/hide group info
        if (selectedSubgroup !== 'all' && groupDescriptions[selectedSubgroup]) {
            groupInfoSection.classList.remove('d-none');
            groupTitle.textContent = `${selectedBranch.toUpperCase()} - ${getSubgroupName(selectedBranch, selectedSubgroup)}`;
            groupDescription.textContent = groupDescriptions[selectedSubgroup];
        } else {
            groupInfoSection.classList.add('d-none');
        }
        
        displayTalents(filteredTalents);
    }

    // Get subgroup name by value
    function getSubgroupName(branch, subgroupValue) {
        const branchSubgroups = subgroups[branch] || [];
        const subgroup = branchSubgroups.find(sg => sg.value === subgroupValue);
        return subgroup ? subgroup.name : subgroupValue;
    }

    // Event Listeners
    mainBranchFilter.addEventListener('change', function() {
        updateSubgroupFilter();
        filterTalents();
    });

    subgroupFilter.addEventListener('change', filterTalents);

    resetFilters.addEventListener('click', function() {
        mainBranchFilter.value = 'all';
        updateSubgroupFilter();
        filterTalents();
        groupInfoSection.classList.add('d-none');
    });

    quickFilters.forEach(button => {
        button.addEventListener('click', function() {
            const branch = this.dataset.branch;
            const subgroup = this.dataset.subgroup;
            
            mainBranchFilter.value = branch;
            updateSubgroupFilter();
            subgroupFilter.value = subgroup;
            filterTalents();
            
            // Update URL
            const url = new URL(window.location);
            url.searchParams.set('branch', branch);
            url.searchParams.set('subgroup', subgroup);
            window.history.pushState({}, '', url);
        });
    });

    // Initialize
    initializeFilters();
});