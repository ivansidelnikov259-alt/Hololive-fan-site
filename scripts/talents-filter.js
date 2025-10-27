// Talent filtering and data management
document.addEventListener('DOMContentLoaded', function() {
    // Subgroups data structure - ОБНОВЛЕНО С ВСЕМИ ПОКОЛЕНИЯМИ
    const subgroups = {
        'en': [
            { value: 'myth', name: 'Myth' },
            { value: 'hope', name: 'Project: HOPE' },
            { value: 'council', name: 'Council' },
            { value: 'promise', name: 'Promise' },
            { value: 'advent', name: 'Advent' },
            { value: 'justice', name: 'Justice' }
        ],
        'jp': [
            { value: 'gen0', name: 'Gen 0' },
            { value: 'gen1', name: 'Gen 1' },
            { value: 'gen2', name: 'Gen 2' },
            { value: 'gamers', name: 'GAMERS' },
            { value: 'gen3', name: 'Gen 3' },
            { value: 'gen4', name: 'Gen 4' },
            { value: 'gen5', name: 'Gen 5' },
            { value: 'holox', name: 'holoX' },
            { value: 'dev_is', name: 'hololive DEV_IS' },
            { value: 'regloss', name: 'ReGLOSS' },
            { value: 'flowglow', name: 'FLOW GLOW' },
            { value: 'holoan', name: 'holoAN' }
        ],
        'id': [
            { value: 'zone15', name: 'Zone 15' },
            { value: 'holoro', name: 'holoro' },
            { value: 'holoh3roes', name: 'Holoh3roes' }
        ]
    };

    // Group descriptions
    const groupDescriptions = {
        'myth': `hololive English -Myth- - также известное как holoMyth и неофициально известно как 1-ое поколение hololive English. Эта группа стала первой среди всех поколений hololive, которые дебютировали со своим лором и определённой тематикой. В случае holoMyth, таланты этой группы являются мифологическими существами и детективом, который расследует дело этих мифов. Отсюда и пошло название -Myth-.`
    };

    // Sample talents data - ИСПРАВЛЕНЫ ПУТИ К СТРАНИЦАМ
    const talents = [
        {
            id: 1,
            name: "Mori Calliope",
            group: "EN - Myth",
            subgroup: "myth",
            branch: "en",
            image: "https://via.placeholder.com/400x300/1e293b/94a3b8?text=Mori+Calliope",
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
            image: "https://via.placeholder.com/400x300/1e293b/94a3b8?text=Takanashi+Kiara",
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
            image: "https://via.placeholder.com/400x300/1e293b/94a3b8?text=Ninomae+Ina'nis",
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
            image: "https://via.placeholder.com/400x300/1e293b/94a3b8?text=Watson+Amelia",
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
            image: "https://via.placeholder.com/400x300/1e293b/94a3b8?text=Gawr+Gura",
            colors: ["#4f46e5", "#ffffff", "#dc2626"],
            description: "Виртуальная ютуберша, часть первого поколения hololive English",
            page: "gawr-gura.html"
        },
        {
            id: 6,
            name: "Usada Pekora",
            group: "JP - Gen 3",
            subgroup: "gen3",
            branch: "jp",
            image: "https://via.placeholder.com/400x300/1e293b/94a3b8?text=Usada+Pekora",
            colors: ["#dc2626", "#ffffff", "#fbbf24"],
            description: "Японская витуберша, часть 3-го поколения hololive JP",
            page: "usada-pekora.html"
        },
        {
            id: 7,
            name: "Hoshimachi Suisei",
            group: "JP - Gen 0",
            subgroup: "gen0",
            branch: "jp",
            image: "https://via.placeholder.com/400x300/1e293b/94a3b8?text=Hoshimachi+Suisei",
            colors: ["#3b82f6", "#ffffff", "#dc2626"],
            description: "Японская витуберша, часть 0-го поколения hololive JP",
            page: "hoshimachi-suisei.html"
        },
        {
            id: 8,
            name: "Moona Hoshinova",
            group: "ID - Zone 15",
            subgroup: "zone15",
            branch: "id",
            image: "https://via.placeholder.com/400x300/1e293b/94a3b8?text=Moona+Hoshinova",
            colors: ["#8b5cf6", "#ec4899", "#f59e0b"],
            description: "Индонезийская витуберша, часть Zone 15 hololive ID",
            page: "moona-hoshinova.html"
        }
        // В массиве talents добавьте эту карточку:
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
        
        // Устанавливаем активную кнопку "All" по умолчанию
        const allBranchBtn = document.querySelector('.branch-btn[data-branch="all"]');
        if (allBranchBtn) {
            allBranchBtn.classList.add('active');
        }
        
        // Скрываем subgroup section по умолчанию
        hideSubgroupSection();
        hideGroupInfo();
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

    // Select branch - ИСПРАВЛЕННАЯ ЛОГИКА
    function selectBranch(branch) {
        console.log('Selecting branch:', branch);
        
        // Update active branch button
        branchButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.branch === branch) {
                btn.classList.add('active');
            }
        });

        currentBranch = branch;
        currentSubgroup = 'all';

        // Show/hide subgroup section - ИСПРАВЛЕННАЯ ЛОГИКА
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

    // Select subgroup - ИСПРАВЛЕННАЯ ЛОГИКА
    function selectSubgroup(subgroup) {
        console.log('Selecting subgroup:', subgroup);
        
        currentSubgroup = subgroup;

        // Update active subgroup button
        const allSubgroupButtons = subgroupButtons.querySelectorAll('.subgroup-btn');
        allSubgroupButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.subgroup === subgroup) {
                btn.classList.add('active');
            }
        });

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
    // В функции showSubgroupSection добавьте:
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
    
    // Показываем подменю с анимацией
    subgroupSection.classList.remove('d-none');
    
    // Прокручиваем к подменю для мобильных устройств
    if (window.innerWidth < 768) {
        subgroupSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    console.log('Subgroup section shown for branch:', branch);
}

    // Hide subgroup section
    function hideSubgroupSection() {
        subgroupSection.classList.add('d-none');
        subgroupButtons.innerHTML = '';
        console.log('Subgroup section hidden');
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

    // Filter talents based on current selections - ИСПРАВЛЕННАЯ ЛОГИКА
    function filterTalents() {
        console.log('Filtering talents. Branch:', currentBranch, 'Subgroup:', currentSubgroup);
        
        let filteredTalents = talents;
        
        // Filter by branch
        if (currentBranch !== 'all') {
            filteredTalents = filteredTalents.filter(talent => talent.branch === currentBranch);
        }
        
        // Filter by subgroup
        if (currentSubgroup !== 'all') {
            filteredTalents = filteredTalents.filter(talent => talent.subgroup === currentSubgroup);
        }
        
        console.log('Filtered talents count:', filteredTalents.length);
        displayTalents(filteredTalents);
    }

    // Display talents in grid
    function displayTalents(talentsToShow) {
        talentsContainer.innerHTML = '';
        
        if (talentsToShow.length === 0) {
            emptyState.classList.remove('d-none');
            talentsContainer.classList.add('d-none');
        } else {
            emptyState.classList.add('d-none');
            talentsContainer.classList.remove('d-none');
            
            talentsToShow.forEach(talent => {
                const talentCard = createTalentCard(talent);
                talentsContainer.appendChild(talentCard);
            });
        }
    }

    // Create talent card HTML - ИСПРАВЛЕН ПУТЬ К СТРАНИЦАМ
    function createTalentCard(talent) {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 col-xl-3 mb-4';
        
        // ИСПРАВЛЕННЫЙ ПУТЬ - правильная структура папок
        const talentPagePath = `../pages/talents/${talent.page}`;
        
        col.innerHTML = `
            <div class="talent-card h-100">
                <img src="${talent.image}" alt="${talent.name}" class="talent-image">
                <div class="talent-info">
                    <h3 class="talent-name">${talent.name}</h3>
                    <p class="talent-group">${talent.group}</p>
                    <div class="talent-badges">
                        <span class="badge badge-custom bg-primary">${talent.branch.toUpperCase()}</span>
                        <span class="badge badge-custom bg-secondary">${talent.subgroup}</span>
                    </div>
                    <p class="text-muted small mb-3">${talent.description}</p>
                    <a href="${talentPagePath}" class="btn btn-outline-primary w-100">
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