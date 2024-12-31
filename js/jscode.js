let countdownStart = 5;

// Countdown before displaying the content
function countdown() {
    if (countdownStart > 0) {
        document.getElementById('countdownDisplay').innerText = countdownStart;
        countdownStart--;
    } else {
        document.getElementById('countdownWrapper').style.display = 'none';
        document.querySelector('.content').style.display = 'block'; 
        startSlideshow(); // Start slideshow after countdown ends
        updateCountdown(); 
        return;
    }
}

setInterval(countdown, 1000);

// Image slideshow and quote display
const images = [
    "./FAMILY.jpg", 
    "./Trops.jpg",
    "./trio.jpg",
    "./lola.jpg",
];

const quotes = [
    "The journey of a thousand miles begins with one step.",
    "Keep going, you're getting there!",
    "Believe in yourself and all that you are.",
    "You are stronger than you think!",
    "Make today amazing!"
];

let currentImageIndex = 0;

function startSlideshow() {
    const slideshowImage = document.getElementById("slideshowImage");
    const quoteContainer = document.getElementById("quoteContainer");

    // Show the first image right away
    slideshowImage.src = images[currentImageIndex];

    // Start the slideshow to change the images every 5 seconds
    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        slideshowImage.src = images[currentImageIndex];
        
        // Display a random quote only if it's your birthday
        if (isBirthdayToday()) {
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
            quoteContainer.innerHTML = `<p>${randomQuote}</p>`;
        }
    }, 20000); // Change image every 5 seconds
}

// Function to check if today is your birthday
function isBirthdayToday() {
    const now = new Date();
    return now.getMonth() === 2 && now.getDate() === 13; // March 13
}

function updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    const birthdayThisYear = new Date(`March 13, ${currentYear}`);
    
    const birthday = birthdayThisYear > now ? birthdayThisYear : new Date(`March 13, ${currentYear + 1}`);
    const diff = birthday - now;

    const birthdayMessage = document.getElementById('birthdayMessage');
    if (isBirthdayToday()) {
        birthdayMessage.innerText = 'Happy Birthday Genie James Arsenal!';
        // Stop countdown sound and play birthday sound
        document.getElementById('countdownSound').pause();
        document.getElementById('birthdaySound').play();
        startSlideshow(); // Start slideshow and quotes
    } else {
        birthdayMessage.innerText = 'Countdown to your birthday';
        document.getElementById('countdownSound').play();
    }

    if (diff <= 0) {
        document.getElementById('countdown').innerText = 'Happy Birthday!';
        document.getElementById('age').innerText = `You are now ${getAge()} years old!`;
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerText = `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    document.getElementById('age').innerText = `
Your journey of ${getAge()} years has been started, filled with lessons, challenges, and growth. Each day has shaped who you are, and the road ahead holds endless possibilities. With the wisdom you've gained, you're ready to face whatever comes next, knowing that every step brings you closer to becoming the person you're meant to be. Keep moving forward with confidence!
`;


}

function getAge() {
    const birthday = new Date('March 13, 2004');
    const now = new Date();
    let age = now.getFullYear() - birthday.getFullYear();
    const m = now.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birthday.getDate())) {
        age--;
    }
    return age;
}

updateCountdown(); // Initial call to start the countdown
