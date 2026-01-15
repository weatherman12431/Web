// Booking data storage using localStorage
const BookingManager = {
    // Initialize with default bookings
    defaultBookings: [
        {
            id: 1,
            name: 'John Smith',
            email: 'john@email.com',
            chaseDate: 'May 15, 2026',
            status: 'pending',
            phone: '(555) 123-4567',
            participants: 2,
            createdAt: new Date('2026-01-10').toISOString()
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            email: 'sarah@email.com',
            chaseDate: 'May 20, 2026',
            status: 'confirmed',
            phone: '(555) 987-6543',
            participants: 1,
            createdAt: new Date('2026-01-12').toISOString()
        },
        {
            id: 3,
            name: 'Mike Davis',
            email: 'mike@email.com',
            chaseDate: 'May 25, 2026',
            status: 'pending',
            phone: '(555) 456-7890',
            participants: 3,
            createdAt: new Date('2026-01-13').toISOString()
        }
    ],

    // Get all bookings
    getBookings() {
        const stored = localStorage.getItem('customerBookings');
        if (!stored) {
            // Initialize with default bookings
            this.saveBookings(this.defaultBookings);
            return this.defaultBookings;
        }
        return JSON.parse(stored);
    },

    // Save bookings to localStorage
    saveBookings(bookings) {
        localStorage.setItem('customerBookings', JSON.stringify(bookings));
    },

    // Add new booking
    addBooking(bookingData) {
        const bookings = this.getBookings();
        const newBooking = {
            id: Date.now(),
            name: bookingData.name,
            email: bookingData.email,
            chaseDate: bookingData.chaseDate,
            status: bookingData.status || 'pending',
            phone: bookingData.phone || '',
            participants: bookingData.participants || 1,
            createdAt: new Date().toISOString()
        };
        bookings.push(newBooking);
        this.saveBookings(bookings);
        return newBooking;
    },

    // Update booking
    updateBooking(id, bookingData) {
        const bookings = this.getBookings();
        const index = bookings.findIndex(booking => booking.id === id);
        if (index !== -1) {
            bookings[index] = { ...bookings[index], ...bookingData };
            this.saveBookings(bookings);
            return bookings[index];
        }
        return null;
    },

    // Delete booking
    deleteBooking(id) {
        const bookings = this.getBookings();
        const filtered = bookings.filter(booking => booking.id !== id);
        this.saveBookings(filtered);
        return filtered;
    },

    // Get single booking
    getBooking(id) {
        const bookings = this.getBookings();
        return bookings.find(booking => booking.id === id);
    },

    // Approve booking
    approveBooking(id) {
        return this.updateBooking(id, { status: 'confirmed' });
    },

    // Decline booking
    declineBooking(id) {
        return this.deleteBooking(id);
    },

    // Cancel booking
    cancelBooking(id) {
        return this.updateBooking(id, { status: 'cancelled' });
    }
};
