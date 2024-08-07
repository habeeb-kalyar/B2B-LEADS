document.getElementById('scraperForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedSources = [];
    document.querySelectorAll('input[name="sources"]:checked').forEach((checkbox) => {
        selectedSources.push(checkbox.value);
    });

    const location = document.getElementById('location').value;
    const businessType = document.getElementById('businessType').value;
    const companyName = document.getElementById('companyName').value;
    const userEmail = document.getElementById('userEmail').value;
    const userContact = document.getElementById('userContact').value;
    const leadsRequired = parseInt(document.getElementById('leadsRequired').value, 10);
    const mustHaveColumns = document.getElementById('mustHaveColumns').value;

    if (selectedSources.length && location && businessType && userEmail && !isNaN(leadsRequired)) {
        // Send data to Flask app
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                selectedSources: selectedSources,
                location: location,
                businessType: businessType,
                companyName: companyName,
                userEmail: userEmail,
                userContact: userContact,
                leadsRequired: leadsRequired,
                mustHaveColumns: mustHaveColumns
            })
        })
        .then(response => response.json())
        .then(data => {
            // Display the total cost
            calculateCost(data.totalCost);
            // Display the success message
            document.getElementById('successMessage').textContent = data.message;
            document.getElementById('successMessage').style.display = 'block';
            // Reset the form
            document.getElementById('scraperForm').reset();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('Please fill all mandatory fields correctly!');
    }
});

function calculateCost(totalCost) {
    document.getElementById('totalCost').textContent = `Total cost: $${totalCost.toFixed(2)} (Including $10 bonus for every 1000 leads)`;
}
