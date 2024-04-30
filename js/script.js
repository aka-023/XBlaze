document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;
    
    // You can add validation here
    
    // For demonstration purposes, just log the form data
    console.log('Name: ' + name);
    console.log('Email: ' + email);
    console.log('Subject: ' + subject);
    console.log('Message: ' + message);
    
    // Clear form fields after submission
    document.getElementById('contactForm').reset();
  });
  