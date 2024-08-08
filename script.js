document.getElementById('findButton').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Initialize the map
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: latitude, lng: longitude },
        zoom: 14
    });

    // Add a marker for the user's location
    new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: "Your Location"
    });

    // Fetch nearby barber shops (sample data or API call)
    const barberShops = [
        { name: 'Niks barber shop', address: 'Kylänevantie 2 00320 Helsinki', website: 'https://barber.fi/', Contact: '' },
        { name: 'Mr Jacks barber shops', address: 'Helsinginkatu 23 00510 Helsinki, Finland', website: 'https://varaa.timma.fi/mrjackbarbershop',  Contact: '' },
       
    ];

    const shopList = document.getElementById('barberShops');
    shopList.innerHTML = '';

    barberShops.forEach(shop => {
        const shopItem = document.createElement('li');
        shopItem.innerHTML = `
            <h2>${shop.name}</h2>
            <p>${shop.address}</p>
            <a href="${shop.website}" target="_blank">Visit Website</a>
        `;
        shopList.appendChild(shopItem);

        // Add a marker for each barber shop
        new google.maps.Marker({
            position: { lat: shop.lat, lng: shop.lng },
            map: map,
            title: shop.name
        });
    });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
