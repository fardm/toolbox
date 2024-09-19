let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
let intervalId; // متغیری برای ذخیره `setInterval`

// تابع نمایش اسلاید
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  currentSlide = index;
}

// تابع رفتن به اسلاید بعدی
function nextSlide() {
  const nextIndex = (currentSlide + 1) % slides.length;
  showSlide(nextIndex);
}

// شروع خودکار اسلایدها
function startSlider() {
  intervalId = setInterval(nextSlide, 3500); // هر 3 ثانیه اسلاید بعدی
}

// توقف اسلایدها
function stopSlider() {
  clearInterval(intervalId); // متوقف کردن اسلایدها
}

// شروع انیمیشن اسلایدر در ابتدا
startSlider();

// رویدادها برای متوقف کردن و ادامه دادن اسلایدر هنگام قرارگیری موس
const slider = document.querySelector('.testimonial-slider');
slider.addEventListener('mouseover', stopSlider); // توقف هنگام قرارگیری موس
slider.addEventListener('mouseout', startSlider); // ادامه هنگام خارج شدن موس

// مدیریت کلیک بر روی نقاط (dots)
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    showSlide(i);
    stopSlider(); // توقف اسلایدها هنگام کلیک
  });
});
