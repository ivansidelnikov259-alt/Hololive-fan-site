// Talent filtering and data management
document.addEventListener('DOMContentLoaded', function() {
    // Subgroups data structure
    const subgroups = {
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

    // Sample talents data
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
        },
        // Добавим несколько JP талантов для демонстрации
        {
            id: 6,
            name: "Usada Pekora",
            group: "JP - Gen 3",
            subgroup: "gen3",
            branch: "jp",
            image: "../images/talents/usada-pekora/avatar.jpg",
            colors: ["#dc2626", "#ffffff", "#fbbf24"],
            description: "Японская витуберша, часть 3-го поколения hololive JP",
            page: "usada-pekora.html"
        },
        {
            id: 7,
            name: "Shirakami Fubuki",
            group: "JP - Gen 1",
            subgroup: "gen1",
            branch: "jp",
            image: "../images/talents/shirakami-fubuki/avatar.jpg",
            colors: ["#ffffff", "#3b82f6", "#ef4444"],
            description: "Японская витуберша, часть 1-го поколения hololive JP",
            page: "shirakami-fubuki.html"
        }
    ];

    // DOM Elements
    const branchButtons = document.querySelectorAll('.branch-btn');
    const subgroupSection = document.getElementById('subgroupSection');
    const subgroupButtons = document.getElementById('subgroupButtons');
    const talentsContainer = document.getElementById('talentsContainer');
    const emptyState = document.getElementById('emptyState');
    const groupInfoSection = document.getElementById('groupInfoSection');
    const groupTitle = document.getElementById('groupTitle');
    const groupDescription = document.getElementById('groupDescription');

    // Current filters
    let currentBranch = 'all';
    let currentSubgroup = 'all';

    // Initialize
    function initialize() {
        displayTalents(talents);
        setupEventListeners();
        
        // Check URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const branch = urlParams.get('branch');
        const subgroup = urlParams.get('subgroup');
        
        if (branch) {
            selectBranch(branch);
            if (subgroup) {
                selectSubgroup(subgroup);
            }
        }
    }

    // Setup event listeners
    function setupEventListeners() {
        branchButtons.forEach(button => {
            button.addEventListener('click', function() {
                const branch = this.dataset.branch;
                selectBranch(branch);
            });
        });
    }

    // Select branch
    function selectBranch(branch) {
        // Update active branch button
        branchButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.branch === branch) {
                btn.classList.add('active');
            }
        });

        currentBranch = branch;
        currentSubgroup = 'all';

        // Show/hide subgroup section
        if (branch !== 'all' && subgroups[branch] && subgroups[branch].length > 0) {
            showSubgroupSection(branch);
        } else {
            hideSubgroupSection();
        }

        // Hide group info
        hideGroupInfo();

        // Filter talents
        filterTalents();
    }

    // Select subgroup
    function selectSubgroup(subgroup) {
        // Update active subgroup button
        const allSubgroupButtons = subgroupButtons.querySelectorAll('.subgroup-btn');
        allSubgroupButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.subgroup === subgroup) {
                btn.classList.add('active');
            }
        });

        currentSubgroup = subgroup;

        // Show group info if available
        if (subgroup !== 'all' && groupDescriptions[subgroup]) {
            showGroupInfo(currentBranch, subgroup);
        } else {
            hideGroupInfo();
        }

        // Filter talents
        filterTalents();
    }

    // Show subgroup section
    function showSubgroupSection(branch) {
        const branchSubgroups = subgroups[branch];
        
        // Clear previous buttons
        subgroupButtons.innerHTML = '';
        
        // Add "All" button
        const allButton = document.createElement('button');
        allButton.className = 'subgroup-btn active';
        allButton.dataset.subgroup = 'all';
        allButton.innerHTML = '<i class="bi bi-grid-3x3-gap me-1"></i>Все';
        allButton.addEventListener('click', function() {
            selectSubgroup('all');
        });
        subgroupButtons.appendChild(allButton);
        
        // Add subgroup buttons
        branchSubgroups.forEach(subgroup => {
            const button = document.createElement('button');
            button.className = 'subgroup-btn';
            button.dataset.subgroup = subgroup.value;
            button.textContent = subgroup.name;
            button.addEventListener('click', function() {
                selectSubgroup(subgroup.value);
            });
            subgroupButtons.appendChild(button);
        });
        
        subgroupSection.classList.remove('d-none');
    }

    // Hide subgroup section
    function hideSubgroupSection() {
        subgroupSection.classList.add('d-none');
        subgroupButtons.innerHTML = '';
    }

    // Show group info
    function showGroupInfo(branch, subgroup) {
        const branchSubgroups = subgroups[branch];
        const subgroupData = branchSubgroups.find(sg => sg.value === subgroup);
        
        if (subgroupData && groupDescriptions[subgroup]) {
            groupTitle.textContent = `${branch.toUpperCase()} - ${subgroupData.name}`;
            groupDescription.textContent = groupDescriptions[subgroup];
            groupInfoSection.classList.remove('d-none');
        }
    }

    // Hide group info
    function hideGroupInfo() {
        groupInfoSection.classList.add('d-none');
    }

    // Filter talents based on current selections
    function filterTalents() {
        let filteredTalents = talents;
        
        // Filter by branch
        if (currentBranch !== 'all') {
            filteredTalents = filteredTalents.filter(talent => talent.branch === currentBranch);
        }
        
        // Filter by subgroup
        if (currentSubgroup !== 'all') {
            filteredTalents = filteredTalents.filter(talent => talent.subgroup === currentSubgroup);
        }
        
        displayTalents(filteredTalents);
        
        // Update URL
        updateURL();
    }

    // Update URL with current filters
    function updateURL() {
        const url = new URL(window.location);
        
        if (currentBranch !== 'all') {
            url.searchParams.set('branch', currentBranch);
            if (currentSubgroup !== 'all') {
                url.searchParams.set('subgroup', currentSubgroup);
            } else {
                url.searchParams.delete('subgroup');
            }
        } else {
            url.searchParams.delete('branch');
            url.searchParams.delete('subgroup');
        }
        
        window.history.replaceState({}, '', url);
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

    // Initialize the page
    initialize();
});