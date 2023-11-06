const STATUS_MAP = {
    shelf: {
        color: 'green',
        canReserve: true,
        canCheckout: true,
        canCheckIn: false,
    },
    reserved: {
        color: 'blue',
        canReserve: false,
        canCheckout: true,
        canCheckIn: false,
    },
    overdue: {
        color: 'red',
        canReserve: false,
        canCheckout: false,
        canCheckIn: true,
    },
    checkedOut: {
        color: 'orange',
        canReserve: false,
        canCheckout: false,
        canCheckIn: true,
    }
}

// Edit below line 

// Get all the book divs and update their content
const bookDivs = document.querySelectorAll('div[id^="book"]');
bookDivs.forEach((bookDiv, index) => {
    const statusText = bookDiv.querySelector('.status');
    const reserveButton = bookDiv.querySelector('.reserve');
    const checkoutButton = bookDiv.querySelector('.checkout');
    const checkinButton = bookDiv.querySelector('.checkin');

    // Get the status value for the book div
    const status = statusText.textContent;

    // Update the status text color
    statusText.style.color = STATUS_MAP[status].color;

    // Update button status and color
    reserveButton.disabled = !STATUS_MAP[status].canReserve;
    reserveButton.style.color = 'black';
    checkoutButton.disabled = !STATUS_MAP[status].canCheckout;
    checkoutButton.style.color = 'black';
    checkinButton.disabled = !STATUS_MAP[status].canCheckIn;
    checkinButton.style.color = 'black';

    
});
