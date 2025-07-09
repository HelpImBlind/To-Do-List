function loadSlides() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'carousel.json', true);
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                try {
                    const slides = JSON.parse(xhr.responseText);
                    const carouselContainer = document.querySelector('#carousel-container');

                    // Create the entire carousel DOM
                    carouselContainer.innerHTML = `
                        <div id="multi-slide" data-carousel='{ "loadingClasses": "opacity-0", "slidesQty": { "xs": 1, "sm": 4, "md": 4, "lg": 5, "xl": 6, "xxl": 8 } }' class="relative w-full">
                            <div class="carousel overflow-hidden h-full w-11/12 mx-auto">
                                <div class="carousel-body h-full opacity-0 justify-center gap-10 xl:gap-8 p-4"></div>
                            </div>
                            <button type="button" class="carousel-prev md:left-[15px] w-0">
                                <span class="cust-carousel-btn">
                                    <span class="simple-line-icons--arrow-prev"></span>
                                </span>
                                <span class="sr-only">Previous</span>
                            </button>
                            <button type="button" class="carousel-next md:right-[15px] w-0">
                                <span class="sr-only">Next</span>
                                <span class="cust-carousel-btn">
                                    <span class="simple-line-icons--arrow-prev simple-line-icons--arrow-next"></span>
                                </span>
                            </button>
                        </div>
                    `;

                    // Now append slides to the newly created carousel body
                    const carouselBody = carouselContainer.querySelector('.carousel-body');

                    slides.forEach((slideData, i) => {
                        const slideEl = document.createElement('div');
                        slideEl.classList.add('carousel-slide');
                        slideEl.setAttribute("aria-haspopup", "dialog");
                        // slideEl.setAttribute("aria-expanded", "false");
                        slideEl.setAttribute("aria-controls", `middle-center-modal-${slideData.id}`);
                        slideEl.setAttribute("data-overlay", `#middle-center-modal-${slideData.id}`);
                        // slideEl.setAttribute("alt", `${slideData.alt}`);
                        if (i === 0) slideEl.classList.add('active');

                        slideEl.innerHTML = `
                            <button class="relative border-0 w-full h-full flex justify-center cursor-pointer">
                                <img src="${slideData.bgImage}" width="100%" loading="lazy" class="rounded-2xl">
                                <span class="absolute font-bold text-black text-6xl left-0 ml-[-15px]" style="-webkit-text-stroke: 0.125rem #ffffff;">${slideData.id}</span>
                            </button>`;
                        
                        carouselBody.appendChild(slideEl);
                    });

                    // Initialize FlyonUI (optional fallback if needed)
                    if (window.HSStaticMethods?.autoInit) {
                        window.HSStaticMethods.autoInit();
                    } else {
                        console.warn('HSStaticMethods.autoInit not found. Ensure FlyonUI is loaded.');
                    }

                } catch (err) {
                    console.error('Error parsing slide data:', err);
                }
            } else {
                console.error('Failed to load carousel.json:', xhr.status);
            }
        }
    };

    xhr.send();
}

document.addEventListener('DOMContentLoaded', loadSlides);
