// Talent filtering and data management
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ talents-filter.js loaded!');

    // Subgroups data structure
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
        'myth': `hololive English -Myth- - также известное как holoMyth и неофициально известно как 1-ое поколение hololive English. Эта группа стала первой среди всех поколений hololive, которые дебютировали со своим лором и определённой тематикой.`,
        'hope': `Project: HOPE - проект виртуальных певцов, который фокусируется на выпуске музыки и озарением всего мира надеждой.`,
        'council': `hololive English -Council- - второе поколение hololive English, также известное как holoCouncil. Эта группа представляет собой совет концепций, где каждый член олицетворяет фундаментальную концепцию существования.`,
        'promise': `hololive English -Promise- - реорганизованная группа, включающая участниц из Council и Project: HOPE. Группа представляет собой обещание продолжать приносить радость и надежду через свое творчество.`,
        'advent': `hololive English -Advent- - третье поколение hololive English, дебютировавшее в 2023 году. Группа представляет собой приключение в неизведанные миры и новые истории.`,
        'justice': `hololive English -Justice- - четвертое поколение hololive English, представляющее собой силы правосудия и порядка в виртуальном мире.`
    };

    // Complete talents data
    const talents = [
        // Myth
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
        
        // Project: HOPE
        {
            id: 6,
            name: "IRyS",
            group: "EN - Project: HOPE",
            subgroup: "hope",
            branch: "en",
            image: "https://via.placeholder.com/400x300/8B0000/000000?text=IRyS",
            colors: ["#8B0000", "#000000", "#FFFFFF"],
            description: "Англоязычная виртуальная певица, член английской ветви hololive в рамках Project HOPE",
            page: "irys.html"
        },
        
        // Council
        {
            id: 7,
            name: "Tsukumo Sana",
            group: "EN - Council", 
            subgroup: "council",
            branch: "en",
            image: "https://via.placeholder.com/400x300/8B4513/FFD700?text=Tsukumo+Sana",
            colors: ["#8B4513", "#FFD700", "#FFFFFF"],
            description: "Астрономический советник • Speaker of Space",
            page: "tsukumo-sana.html"
        },
        {
            id: 8,
            name: "Ceres Fauna",
            group: "EN - Council",
            subgroup: "council", 
            branch: "en",
            image: "https://via.placeholder.com/400x300/228B22/90EE90?text=Ceres+Fauna",
            colors: ["#228B22", "#90EE90", "#FFFFFF"],
            description: "Хранительница природы • Keeper of Nature",
            page: "ceres-fauna.html"
        },
        {
            id: 9, 
            name: "Ouro Kronii",
            group: "EN - Council",
            subgroup: "council",
            branch: "en",
            image: "https://via.placeholder.com/400x300/4169E1/87CEEB?text=Ouro+Kronii",
            colors: ["#4169E1", "#87CEEB", "#FFFFFF"],
            description: "Воплощение времени • Warden of Time",
            page: "ouro-kronii.html"
        },
        {
            id: 10,
            name: "Nanashi Mumei",
            group: "EN - Council", 
            subgroup: "council",
            branch: "en",
            image: "https://via.placeholder.com/400x300/8B4513/D2B48C?text=Nanashi+Mumei",
            colors: ["#8B4513", "#D2B48C", "#FFFFFF"],
            description: "Хранительница цивилизации • Guardian of Civilization",
            page: "nanashi-mumei.html"
        },
        {
            id: 11,
            name: "Hakos Baelz",
            group: "EN - Council",
            subgroup: "council",
            branch: "en",
            image: "https://via.placeholder.com/400x300/DC143C/FF69B4?text=Hakos+Baelz",
            colors: ["#DC143C", "#FF69B4", "#FFFFFF"],
            description: "Воплощение хаоса • Chaos",
            page: "hakos-baelz.html"
        },

        // Promise (дополнительные записи для тех же витуберов)
        {
            id: 12,
            name: "IRyS",
            group: "EN - Promise",
            subgroup: "promise",
            branch: "en",
            image: "https://via.placeholder.com/400x300/8B0000/000000?text=IRyS",
            colors: ["#8B0000", "#000000", "#FFFFFF"],
            description: "Англоязычная виртуальная певица, член английской ветви hololive в рамках Project HOPE",
            page: "irys.html"
        },
        {
            id: 13,
            name: "Ceres Fauna",
            group: "EN - Promise",
            subgroup: "promise",
            branch: "en",
            image: "https://via.placeholder.com/400x300/228B22/90EE90?text=Ceres+Fauna",
            colors: ["#228B22", "#90EE90", "#FFFFFF"],
            description: "Хранительница природы • Keeper of Nature",
            page: "ceres-fauna.html"
        },
        {
            id: 14,
            name: "Ouro Kronii",
            group: "EN - Promise",
            subgroup: "promise",
            branch: "en",
            image: "https://via.placeholder.com/400x300/4169E1/87CEEB?text=Ouro+Kronii",
            colors: ["#4169E1", "#87CEEB", "#FFFFFF"],
            description: "Воплощение времени • Warden of Time",
            page: "ouro-kronii.html"
        },
        {
            id: 15,
            name: "Nanashi Mumei",
            group: "EN - Promise",
            subgroup: "promise",
            branch: "en",
            image: "https://via.placeholder.com/400x300/8B4513/D2B48C?text=Nanashi+Mumei",
            colors: ["#8B4513", "#D2B48C", "#FFFFFF"],
            description: "Хранительница цивилизации • Guardian of Civilization",
            page: "nanashi-mumei.html"
        },
        {
            id: 16,
            name: "Hakos Baelz",
            group: "EN - Promise",
            subgroup: "promise",
            branch: "en",
            image: "https://via.placeholder.com/400x300/DC143C/FF69B4?text=Hakos+Baelz",
            colors: ["#DC143C", "#FF69B4", "#FFFFFF"],
            description: "Воплощение хаоса • Chaos",
            page: "hakos-baelz.html"
        },

        // Advent
        {
            id: 17,
            name: "Shiori Novella",
            group: "EN - Advent",
            subgroup: "advent",
            branch: "en",
            image: "https://via.placeholder.com/400x300/6B46C1/9F7AEA?text=Shiori+Novella",
            colors: ["#6B46C1", "#9F7AEA", "#FFFFFF"],
            description: "Архивариус забытых историй • Archiver of Forgotten Stories",
            page: "shiori-novella.html"
        },
        {
            id: 18,
            name: "Koseki Bijou",
            group: "EN - Advent", 
            subgroup: "advent",
            branch: "en",
            image: "https://via.placeholder.com/400x300/059669/10B981?text=Koseki+Bijou",
            colors: ["#059669", "#10B981", "#FFFFFF"],
            description: "Драгоценный кристалл • Precious Gemstone",
            page: "koseki-bijou.html"
        },
        {
            id: 19,
            name: "Nerissa Ravencroft",
            group: "EN - Advent",
            subgroup: "advent", 
            branch: "en",
            image: "https://via.placeholder.com/400x300/DC2626/EF4444?text=Nerissa+Ravencroft",
            colors: ["#DC2626", "#EF4444", "#000000"],
            description: "Певица зари • Singer of the Dawn",
            page: "nerissa-ravencroft.html"
        },
        {
            id: 20,
            name: "Fuwawa Abyssgard",
            group: "EN - Advent",
            subgroup: "advent",
            branch: "en",
            image: "https://via.placeholder.com/400x300/7C3AED/A855F7?text=Fuwawa+Abyssgard",
            colors: ["#7C3AED", "#A855F7", "#FFFFFF"],
            description: "Старший близнец-страж • Elder Twin Guardian",
            page: "fuwawa-abyssgard.html"
        },
        {
            id: 21,
            name: "Mococo Abyssgard", 
            group: "EN - Advent",
            subgroup: "advent",
            branch: "en",
            image: "https://via.placeholder.com/400x300/DB2777/EC4899?text=Mococo+Abyssgard",
            colors: ["#DB2777", "#EC4899", "#FFFFFF"],
            description: "Младший близнец-страж • Younger Twin Guardian",
            page: "mococo-abyssgard.html"
        },

        // Justice
        {
            id: 22,
            name: "Elizabeth Rose Bloodflame",
            group: "EN - Justice",
            subgroup: "justice",
            branch: "en",
            image: "https://via.placeholder.com/400x300/7F1D1D/DC2626?text=Elizabeth+Rose+Bloodflame",
            colors: ["#7F1D1D", "#DC2626", "#FECACA"],
            description: "Аристократическая вампиресса с пламенным сердцем",
            page: "elizabeth-rose-bloodflame.html"
        },
        {
            id: 23,
            name: "Gigi Murin",
            group: "EN - Justice",
            subgroup: "justice",
            branch: "en",
            image: "https://via.placeholder.com/400x300/065F46/059669?text=Gigi+Murin",
            colors: ["#065F46", "#059669", "#A7F3D0"],
            description: "Энергичная и жизнерадостная лесная фея",
            page: "gigi-murin.html"
        },
        {
            id: 24,
            name: "Cecilia Immergreen",
            group: "EN - Justice",
            subgroup: "justice",
            branch: "en",
            image: "https://via.placeholder.com/400x300/1E40AF/3B82F6?text=Cecilia+Immergreen",
            colors: ["#1E40AF", "#3B82F6", "#BFDBFE"],
            description: "Мудрая хранительница вечного леса",
            page: "cecilia-immergreen.html"
        },
        {
            id: 25,
            name: "Raora Panthera",
            group: "EN - Justice",
            subgroup: "justice",
            branch: "en",
            image: "https://via.placeholder.com/400x300/701A75/A855F7?text=Raora+Panthera",
            colors: ["#701A75", "#A855F7", "#E9D5FF"],
            description: "Грациозная и могущественная пантера-воительница",
            page: "raora-panthera.html"
        }
    ];

    // ... остальной код без изменений (DOM Elements, функции и т.д.)
    // DOM Elements
    const branchButtons = document.querySelectorAll('.branch-btn');
    const subgroupSection = document.getElementById('subgroupSection');
    const subgroupButtons = document.getElementById('subgroupButtons');
    const talentsContainer = document.getElementById('talentsContainer');
    const emptyState = document.getElementById('emptyState');
    const groupInfoSection = document.getElementById('groupInfoSection');
    const groupTitle = document.getElementById('groupTitle');
    const groupDescription = document.getElementById('groupDescription');

    console.log('DOM Elements:', {
        branchButtons: branchButtons.length,
        talentsContainer: !!talentsContainer,
        emptyState: !!emptyState
    });

    // Current filters
    let currentBranch = 'all';
    let currentSubgroup = 'all';

    // Initialize
    function initialize() {
        console.log('🚀 Initializing talents page...');
        console.log('Total talents:', talents.length);
        
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
                console.log('Branch clicked:', branch);
                selectBranch(branch);
            });
        });
    }

    // Select branch
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
        
        // Показываем подменю
        subgroupSection.classList.remove('d-none');
        
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

    // Filter talents based on current selections
    function filterTalents() {
        console.log('🔍 Filtering talents. Branch:', currentBranch, 'Subgroup:', currentSubgroup);
        
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
        console.log('🎨 Displaying talents:', talentsToShow.length);
        
        if (!talentsContainer) {
            console.error('❌ talentsContainer not found!');
            return;
        }
        
        talentsContainer.innerHTML = '';
        
        if (talentsToShow.length === 0) {
            emptyState.classList.remove('d-none');
            talentsContainer.classList.add('d-none');
            console.log('No talents to show');
        } else {
            emptyState.classList.add('d-none');
            talentsContainer.classList.remove('d-none');
            
            console.log('Displaying talents:', talentsToShow.length);
            
            talentsToShow.forEach(talent => {
                const talentCard = createTalentCard(talent);
                talentsContainer.appendChild(talentCard);
            });

            console.log('✅ Successfully displayed', talentsToShow.length, 'talents');
        }
    }

    // Create talent card HTML
    function createTalentCard(talent) {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4 col-xl-3 mb-4';
        
        // ИСПРАВЛЕННЫЙ ПУТЬ - правильный относительный путь
        const talentPagePath = `talents/${talent.page}`;
        
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