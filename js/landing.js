/* ============================================================
   QUANTUM FREQUENCY RECORDS
   LANDING PAGE JAVASCRIPT
   ============================================================ */


/* ------------------------------------------------------------
   DOM ELEMENTS
------------------------------------------------------------ */

const landing = document.getElementById("landing");

const canvas = document.getElementById("particleCanvas");

const exploreButton =
    document.getElementById("exploreButton");

const backgroundImage =
    document.querySelector(".background-image");

const subtitleWords =
    document.querySelectorAll(".subtitle-word");


/* ------------------------------------------------------------
   OPTIONAL BACKGROUND IMAGE DETECTION
------------------------------------------------------------ */

if (backgroundImage) {

    const image =
        new Image();

    image.src =
        "assets/images/backgrounds/landing-background.jpg";

    image.onload = () => {

        document.body.classList.add(
            "background-loaded"
        );

    };

}


/* ------------------------------------------------------------
   SUBTITLE ANIMATION
------------------------------------------------------------ */

let currentWord = 0;

const WORD_DURATION = 2000;


function activateNextWord() {

    subtitleWords.forEach(
        word => word.classList.remove("active")
    );

    currentWord++;

    if (
        currentWord >= subtitleWords.length
    ) {
        currentWord = 0;
    }

    subtitleWords[currentWord]
        .classList.add("active");
}


setInterval(
    activateNextWord,
    WORD_DURATION
);


/* ------------------------------------------------------------
   PARTICLE SYSTEM
------------------------------------------------------------ */

const context =
    canvas.getContext("2d");

let particles = [];

let animationFrame;

let width = 0;

let height = 0;

let devicePixelRatioValue = 1;


/* ------------------------------------------------------------
   PARTICLE SETTINGS
------------------------------------------------------------ */

const particleSettings = {

    desktopCount: 115,

    mobileCount: 65,

    minSize: 0.4,

    maxSize: 1.7,

    minSpeed: 0.05,

    maxSpeed: 0.25,

    connectionDistance: 105

};


/* ------------------------------------------------------------
   RESIZE CANVAS
------------------------------------------------------------ */

function resizeCanvas() {

    devicePixelRatioValue =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );

    width =
        window.innerWidth;

    height =
        window.innerHeight;

    canvas.width =
        width * devicePixelRatioValue;

    canvas.height =
        height * devicePixelRatioValue;

    canvas.style.width =
        `${width}px`;

    canvas.style.height =
        `${height}px`;

    context.setTransform(
        devicePixelRatioValue,
        0,
        0,
        devicePixelRatioValue,
        0,
        0
    );

    createParticles();
}


/* ------------------------------------------------------------
   CREATE PARTICLES
------------------------------------------------------------ */

function createParticles() {

    particles = [];

    const isMobile =
        width < 700;

    const particleCount =
        isMobile
            ? particleSettings.mobileCount
            : particleSettings.desktopCount;


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        particles.push({

            x:
                Math.random() * width,

            y:
                Math.random() * height,

            radius:
                particleSettings.minSize +
                Math.random() *
                (
                    particleSettings.maxSize -
                    particleSettings.minSize
                ),

            speed:
                particleSettings.minSpeed +
                Math.random() *
                (
                    particleSettings.maxSpeed -
                    particleSettings.minSpeed
                ),

            angle:
                Math.random() *
                Math.PI *
                2,

            opacity:
                0.18 +
                Math.random() *
                0.55,

            drift:
                (
                    Math.random() -
                    0.5
                ) * 0.12

        });

    }

}


/* ------------------------------------------------------------
   UPDATE PARTICLES
------------------------------------------------------------ */

function updateParticles() {

    particles.forEach(
        particle => {

            particle.y -=
                particle.speed;

            particle.x +=
                Math.sin(
                    particle.angle
                ) *
                particle.drift;

            particle.angle +=
                0.003;


            /*
             * Wrap around the screen.
             */

            if (
                particle.y < -10
            ) {

                particle.y =
                    height + 10;

                particle.x =
                    Math.random() *
                    width;

            }


            if (
                particle.x < -10
            ) {

                particle.x =
                    width + 10;

            }


            if (
                particle.x > width + 10
            ) {

                particle.x =
                    -10;

            }

        }
    );

}


/* ------------------------------------------------------------
   DRAW PARTICLES
------------------------------------------------------------ */

function drawParticles() {

    context.clearRect(
        0,
        0,
        width,
        height
    );


    /*
     * Draw particles.
     */

    particles.forEach(
        particle => {

            context.beginPath();

            context.arc(
                particle.x,
                particle.y,
                particle.radius,
                0,
                Math.PI * 2
            );

            context.fillStyle =
                `rgba(
                    255,
                    255,
                    255,
                    ${particle.opacity}
                )`;

            context.fill();

        }
    );


    /*
     * Draw extremely subtle connections.
     */

    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const particleA =
                particles[i];

            const particleB =
                particles[j];


            const dx =
                particleA.x -
                particleB.x;

            const dy =
                particleA.y -
                particleB.y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance <
                particleSettings.connectionDistance
            ) {

                const opacity =
                    (
                        1 -
                        distance /
                        particleSettings.connectionDistance
                    ) *
                    0.045;


                context.beginPath();

                context.moveTo(
                    particleA.x,
                    particleA.y
                );

                context.lineTo(
                    particleB.x,
                    particleB.y
                );

                context.strokeStyle =
                    `rgba(
                        255,
                        255,
                        255,
                        ${opacity}
                    )`;

                context.lineWidth =
                    0.5;

                context.stroke();

            }

        }

    }

}


/* ------------------------------------------------------------
   ANIMATION LOOP
------------------------------------------------------------ */

function animateParticles() {

    updateParticles();

    drawParticles();

    animationFrame =
        requestAnimationFrame(
            animateParticles
        );

}


/* ------------------------------------------------------------
   START PARTICLES
------------------------------------------------------------ */

resizeCanvas();

animateParticles();


/* ------------------------------------------------------------
   HANDLE RESIZE
------------------------------------------------------------ */

let resizeTimeout;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimeout
        );

        resizeTimeout =
            setTimeout(
                resizeCanvas,
                200
            );

    }
);


/* ------------------------------------------------------------
   EXPLORE BUTTON
------------------------------------------------------------ */

if (exploreButton) {

    exploreButton.addEventListener(
        "click",
        () => {

            /*
             * Prepare the cinematic transition.
             */

            landing.classList.add(
                "is-exiting"
            );


            /*
             * Give the animation time to play.
             *
             * For Phase 2 this will become:
             *
             * home.html
             *
             */

            setTimeout(
                () => {

                    window.location.href =
                        "pages/home.html";

                },
                1100
            );

        }
    );

}


/* ------------------------------------------------------------
   FREQUENCY CANVAS
------------------------------------------------------------ */

const freqCanvas = document.getElementById("frequencyCanvas");
let freqFrame = 0;

function startFrequencyCanvas() {
    if (!freqCanvas) return;
    const ctx = freqCanvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let t = 0;
    const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        freqCanvas.width = window.innerWidth * dpr;
        freqCanvas.height = window.innerHeight * dpr;
        freqCanvas.style.width = window.innerWidth + "px";
        freqCanvas.style.height = window.innerHeight + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const loop = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        ctx.clearRect(0, 0, w, h);
        t += 0.018;
        const waves = [
            { amp: h * 0.045, freq: 0.0042, speed: 1.1, y: h * 0.62, a: 0.55 },
            { amp: h * 0.07, freq: 0.0028, speed: 0.7, y: h * 0.72, a: 0.35 },
            { amp: h * 0.03, freq: 0.006, speed: 1.6, y: h * 0.8, a: 0.28 },
        ];
        waves.forEach((wave) => {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(46, 230, 214, " + wave.a + ")";
            ctx.lineWidth = 1.2;
            for (let x = 0; x <= w; x += 4) {
                const y =
                    wave.y +
                    Math.sin(x * wave.freq + t * wave.speed) * wave.amp +
                    Math.sin(x * wave.freq * 0.35 + t * 0.4) * wave.amp * 0.35;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        });
        freqFrame = requestAnimationFrame(loop);
    };
    loop();
}

startFrequencyCanvas();


/* ------------------------------------------------------------
   FX TOGGLE
------------------------------------------------------------ */

const fxToggle = document.getElementById("fxToggle");
let fxOn = true;
try {
    if (localStorage.getItem("qfr-fx") === "0") fxOn = false;
} catch (e) {}

function applyFx() {
    if (!landing) return;
    landing.classList.toggle("fx-off", !fxOn);
    if (fxToggle) {
        fxToggle.textContent = fxOn ? "FX ON" : "FX OFF";
        fxToggle.setAttribute("aria-pressed", fxOn ? "true" : "false");
        fxToggle.setAttribute("aria-label", fxOn ? "Turn atmosphere off" : "Turn atmosphere on");
    }
    if (!fxOn && animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
    }
    if (!fxOn && freqFrame) {
        cancelAnimationFrame(freqFrame);
        freqFrame = 0;
    }
    if (fxOn && !animationFrame) animateParticles();
    if (fxOn && !freqFrame) startFrequencyCanvas();
}

applyFx();

if (fxToggle) {
    fxToggle.addEventListener("click", () => {
        fxOn = !fxOn;
        try { localStorage.setItem("qfr-fx", fxOn ? "1" : "0"); } catch (e) {}
        applyFx();
    });
}


/* ------------------------------------------------------------
   CLEANUP
------------------------------------------------------------ */

window.addEventListener(
    "beforeunload",
    () => {

        if (animationFrame) {

            cancelAnimationFrame(
                animationFrame
            );

        }

        if (freqFrame) {
            cancelAnimationFrame(freqFrame);
        }

    }
);