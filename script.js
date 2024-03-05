document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        adPopup: document.getElementById('adPopup'),
        watchAdBtn: document.getElementById('watchAdBtn'),
        dontShowAgain: document.getElementById('dontShowAgain'),
        showAdBtn: document.getElementById('showAdBtn'),
        phoneNumberInput: document.getElementById('phoneNumberInput'),
        toast: document.getElementById('toastMessage'),
        phoneNumberDisplay: document.getElementById('phoneNumberDisplay'),
        adOverlay: document.getElementById('adOverlay')

    };

    // Simplify checking the local storage and URL parameters
    const shouldShowPopup = !localStorage.getItem('dontShowPopup');
    const phoneNumberFromURL = new URLSearchParams(window.location.search).get('number');
    console.log(phoneNumberFromURL);

    const isValidPhoneNumber = number => /^\+?[1-9]\d{1,14}$/.test(number);
    const showToast = (message, isSuccess = true) => {
        elements.toast.textContent = message;
        elements.toast.className = 'toast-message show-toast'; // Reset class list and add 'show-toast'
        elements.toast.style.backgroundColor = isSuccess ? '#4CAF50' : '#F44336';
        setTimeout(() => elements.toast.classList.remove('show-toast'), 3000);
    };
    //showToast(phoneNumberFromURL, true);

    if (phoneNumberFromURL && isValidPhoneNumber(phoneNumberFromURL)) {
        elements.phoneNumberDisplay.textContent = phoneNumberFromURL;
        elements.adPopup.style.display = 'block';
        console.log('Showing ad for phone number from URL...');
    } else if (shouldShowPopup) {
        elements.adPopup.style.display = 'none';
        console.log('Ad popup is not shown...');
    }

    const handleAdWatch = () => {
        elements.watchAdBtn.classList.add('rubber-band');

        /*// Clear previous ad content
        adOverlay.innerHTML = '';

        // Create and append the <ins> tag for the ad
        const adIns = document.createElement('ins');
        adIns.className = 'adsbygoogle';
        adIns.style.display = 'block';
        adIns.setAttribute('data-ad-client', 'ca-pub-1473387262476360');
        adIns.setAttribute('data-ad-slot', '2255211751');
        adIns.setAttribute('data-ad-format', 'auto');
        adIns.setAttribute('data-full-width-responsive', 'true');
        adOverlay.appendChild(adIns);

        // Create and append the ad script
        const adScript = document.createElement('script');
        adScript.async = true;
        adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1473387262476360';
        adScript.crossOrigin = 'anonymous';
        document.body.appendChild(adScript);

        // Initialize the ad
        (adsbygoogle = window.adsbygoogle || []).push({});

        // Display the overlay
        adOverlay.style.display = 'block';*/


        const enteredNumber = elements.phoneNumberInput.value;
        if (isValidPhoneNumber(enteredNumber)) {
            elements.adPopup.style.display = 'block';
            elements.phoneNumberDisplay.textContent = enteredNumber;
        }
        else showToast('Please enter a valid phone number.', false);

        alert('Pretend an ad is being shown...');
        console.log('Ad was viewed, incrementing credits...');
        if (elements.dontShowAgain.checked) localStorage.setItem('dontShowPopup', 'true');

        elements.adPopup.style.display = 'none';
        showToast('Credit Added Successfully!', true);
    };

    elements.watchAdBtn.addEventListener('click', handleAdWatch);
    elements.watchAdBtn.addEventListener('animationend', () => elements.watchAdBtn.classList.remove('rubber-band'));

    elements.showAdBtn.addEventListener('click', () => {
        const phoneNumber = elements.phoneNumberInput.value;
        if (isValidPhoneNumber(phoneNumber)) {
            if (!localStorage.getItem('dontShowPopup')) elements.adPopup.style.display = 'block';
            else showToast('You have opted not to show ads.', false);
        } else {
            alert("Please enter a valid phone number with country code.");
            showToast('Please enter a valid phone number.', false);
        }
    });

    /*document.getElementById('watchAdBtn').addEventListener('click', () => {
        const enteredNumber = elements.phoneNumberInput.value;
        if (isValidPhoneNumber(enteredNumber)) elements.adPopup.style.display = 'block';
        else showToast('Please enter a valid phone number.', false);
    });*/
});
