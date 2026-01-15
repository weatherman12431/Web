// Chase data storage using localStorage
const ChaseManager = {
    // Initialize with default chases
    defaultChases: [
        {
            id: 1,
            date: 'May 15, 2026',
            location: 'Oklahoma City, OK',
            status: 'Active',
            participants: 8
        },
        {
            id: 2,
            date: 'May 20, 2026',
            location: 'Wichita, KS',
            status: 'Scheduled',
            participants: 6
        },
        {
            id: 3,
            date: 'May 25, 2026',
            location: 'Amarillo, TX',
            status: 'Scheduled',
            participants: 10
        }
    ],

    // Get all chases
    getChases() {
        const stored = localStorage.getItem('stormChases');
        if (!stored) {
            // Initialize with default chases
            this.saveChases(this.defaultChases);
            return this.defaultChases;
        }
        return JSON.parse(stored);
    },

    // Save chases to localStorage
    saveChases(chases) {
        localStorage.setItem('stormChases', JSON.stringify(chases));
    },

    // Add new chase
    addChase(chaseData) {
        const chases = this.getChases();
        const newChase = {
            id: Date.now(),
            date: chaseData.date,
            location: chaseData.location,
            status: chaseData.status || 'Scheduled',
            participants: chaseData.participants || 0
        };
        chases.push(newChase);
        this.saveChases(chases);
        return newChase;
    },

    // Update chase
    updateChase(id, chaseData) {
        const chases = this.getChases();
        const index = chases.findIndex(chase => chase.id === id);
        if (index !== -1) {
            chases[index] = { ...chases[index], ...chaseData };
            this.saveChases(chases);
            return chases[index];
        }
        return null;
    },

    // Delete chase
    deleteChase(id) {
        const chases = this.getChases();
        const filtered = chases.filter(chase => chase.id !== id);
        this.saveChases(filtered);
        return filtered;
    },

    // Get single chase
    getChase(id) {
        const chases = this.getChases();
        return chases.find(chase => chase.id === id);
    }
};
