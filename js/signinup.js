const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');
const wrapper = document.querySelector('.wrapper');
const signUpForm = document.querySelector('.form-wrapper.sign-up');

signUpBtnLink.addEventListener('click', () => {
    // Remove active class from login form
    wrapper.classList.remove('active');
    // Wait for the transition to complete
    setTimeout(() => {
        // Display the sign-up form
        signUpForm.style.display = 'flex';
        // Add active class to sign-up form wrapper
        wrapper.classList.add('active');
    }, 500); // Adjust the delay time to match your transition duration
});

signInBtnLink.addEventListener('click', () => {
    // Remove active class from wrapper
    wrapper.classList.remove('active');
    // Hide sign-up form
    signUpForm.style.display = 'none';
});
