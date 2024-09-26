document.addEventListener('DOMContentLoaded', () => {

    function updateViewportHeight() {
        // 뷰포트 높이 업데이트
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    updateViewportHeight();
    
    // 뷰포트 크기 업데이트 후 ScrollTrigger를 새로고침
    window.addEventListener('resize', () => {
        updateViewportHeight();
        ScrollTrigger.refresh();
    });
    
    // GSAP의 ScrollTrigger가 페이지 로드 후 바로 새로고침 되도록
    ScrollTrigger.addEventListener("load", () => {
        ScrollTrigger.refresh(); 
    });

    // GSAP과 ScrollTrigger 플러그인 등록
    gsap.registerPlugin(ScrollTrigger);

    


    gsap.to(".first-visual-text", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.2
    })

    gsap.fromTo(".stiky-counsel", 
        { 
            opacity: 0,
            y: 100,
        },
        { 
            opacity: 1,
            y: 0,
            transition: 'opacity, transform .5s',
            scrollTrigger: {
                trigger: ".visual-section",
                start: "1% top",
                end: "bottom bottom",
                toggleActions: "play none none reverse",
                scrub: true,
                markers: false,
            },
            duration: 1.5,
            ease: "power2.out"
        }
    );

    const type1VisualHeight = document.querySelector('.visual-section').offsetHeight;

// type1 애니메이션 설정
gsap.fromTo(".type1 .img-visual", 
    { 
        scale: 0.4,
        top: '14vw',
        height: '1734px',
    },
    { 
        scale: 1,
        top: '0vh',
        width: '100vw',
        height: '100dvh',
        position: 'fixed',
        borderRadius: '0',
        backgroundPosition: 'center',
        scrollTrigger: {
            trigger: ".visual-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
            markers: false,
            pin: '.visual-section',
            pinSpacing: true,
            onUpdate: (self) => {
                if (self.progress >= 0.5) {
                    gsap.to(".visual-text-sub", { 
                        opacity: 1, 
                        duration: 1, 
                        ease: "power2.out" 
                    });
                } else {
                    gsap.to(".visual-text-sub", { 
                        opacity: 0, 
                        duration: 1, 
                        ease: "power2.out" 
                    });
                }

                // type1 애니메이션이 99% 진행되었을 때 type2 애니메이션 시작
                if (self.progress >= 0.99) {
                    gsap.to(".type2", {
                        yPercent: -100,  // type2가 아래에서 위로 올라옴
                        duration: 1.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: ".type2",
                            start: "top bottom",  // type2가 화면에 나타날 때
                            end: "bottom top",
                            scrub: true,
                            markers: true,
                        }
                    });
                }
            }
        },
        duration: 1.5,
        ease: "power2.out"
    }
);
    
    gsap.fromTo("#header",{ },
        { 
            scrollTrigger: {
                trigger: ".main-content",
                start: "top top",
                end: "bottom top",
                scrub: 1, 
                pin: false, 
                markers: false,
                onEnter: () => {
                    document.querySelector("#header").classList.add("active");
                    gsap.to(".stiky-counsel", { 
                        y: 200, 
                        ease: "power2.out" 
                    });
                },
                onLeaveBack: () => {
                    document.querySelector("#header").classList.remove("active");
                    gsap.to(".stiky-counsel", { 
                        y: 0, 
                        ease: "power2.out" 
                    });
                }
            },
            ease: "power2.out"
        }
    );

    document.querySelector(".a").addEventListener("click", () => {
        gsap.to(".stiky-counsel", { 
            y: 0, 
            ease: "power2.out" 
        });
    });


    let tl; // 타임라인 변수를 전역으로 선언
    let scrollTriggerId = "principle-section-trigger"; // ScrollTrigger id

    function initTimeline() {
        // 기존 ScrollTrigger 인스턴스 제거
        ScrollTrigger.getById(scrollTriggerId)?.kill();

        // 타임라인을 초기화
        tl = gsap.timeline({
            scrollTrigger: {
                id: scrollTriggerId,
                trigger: ".principle-section",
                start: "top top",
                end: "bottom top",
                scrub: true,
                pin: true, 
                pinSpacing: true, // pinSpacing을 false로 설정
                markers: false,
                defaults: {
                    ease: "power2.out",
                    duration: 1.5, // 애니메이션 지속 시간을 늘려서 부드럽게
                }
            }
        });
        
        // 애니메이션 시퀀스 설정
        tl.fromTo(".principle-wrap .title-wrap .tit", {opacity: 0}, {opacity: 1})
        .fromTo(".principle-wrap .title-wrap .progress", {}, {width: 0, margin: '0 1vw'})
        .fromTo(".principle-wrap .title-wrap .desc", {opacity: 0}, {opacity: 1})
        .fromTo('.principle-list .list-item .round', {opacity: 0, width: 10, height: 10, bottom: -50}, {width: 50, height: 50, bottom: 0, opacity: 1})
        .fromTo('.principle-list .list-item .round', {width: 10, height: 10}, {width: '26.0417vw', height: '26.0417vw'})
        .fromTo('.principle-list .list-item', {x: '90vw', marginRight: '40.1200vw'}, {marginRight: 0, x: (i) => (i === 0 ? '6.1200vw' : i === 2 ? '-6.1200vw' : '0')})
        .fromTo('.principle-list .list-item .text-box', {opacity: 0}, {opacity: 1})
        .fromTo('.principle-list .list-item .text-box', {opacity: 1}, {opacity: 0})
        .fromTo('.principle-list .list-item', {opacity: 1}, {x: (i) => (i === 0 ? '-10.1200vw' : i === 2 ? '10.1200vw' : '0'), opacity: 0});

        // 윈도우 리사이즈 시 스크롤 트리거 업데이트
        window.addEventListener("resize", () => {
            ScrollTrigger.refresh();
        });
    }

    function checkWindowSize() {
        // 화면 크기 체크
        if (window.innerWidth >= 769) {
            // 769px 이상일 때만 타임라인을 초기화
            initTimeline();
        } else {
            // 769px 미만일 경우 기존 타임라인 제거
            ScrollTrigger.getById(scrollTriggerId)?.kill();
        }
    }

    // 최초 실행 시 화면 크기 확인
    checkWindowSize();

    // 리사이즈 이벤트에 따른 재조정
    window.addEventListener('resize', () => {
        checkWindowSize();
    });

    // fromTo('.principle-list .list-item', 
    //     {
    //         opacity: 0,
    //         width: 0,
    //         height: 0,
    //         //x: (i) => `0px`,  // 각 아이템을 20px씩 겹치도록 설정
    //     },
    //     {
    //         opacity: 1,
    //         width:'28.3200vw',
    //         height:'28.3200vw',
    //         //x: (i) => `-${i * 153}px`,  // 각 아이템을 20px씩 차이나게 좌측으로 이동
    //         ease: "power2.out",
    //         stagger: {
    //             amount: 1,  // 전체 애니메이션 간격 (1초 동안 분배)
    //         }
    //     }
    // );
    

    const distances = [500, 250, 250, 500];  // 각 요소가 이동할 거리 설정
    const directions = [-1, -1, 1, 1]; // 첫 번째, 두 번째는 좌측(-1), 세 번째, 네 번째는 우측(1)

    gsap.utils.toArray(".text-motion").forEach((element, i) => {
        gsap.fromTo(element, 
            {
                x: `${directions[i] * distances[i]}%`, // 각 인덱스에 맞는 방향과 거리 설정
                opacity: 0
            },
            {
                x: '0%', // 중앙으로 이동
                opacity: 1,
                duration: 4,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.type2',
                    start: "150% 80%", 
                    end: "200% 100%", 
                    scrub: true, 
                    markers: false 
                }
            }
        );
    });

    const accordionItems = document.querySelectorAll('.accordion-item');
    let lastHoveredItem = null;

    accordionItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            // 기존에 active 상태인 아이템에서 active 클래스 제거
            accordionItems.forEach(i => i.classList.remove('active'));

            // 현재 마우스가 올라온 아이템에 active 클래스 추가
            item.classList.add('active');
            lastHoveredItem = item;
        });
    });

    
    gsap.fromTo(".slider-first", {},
        { 
            scrollTrigger: {
                trigger: ".department-section",
                start: "-20% top",
                end: "top top",
                scrub: 1, 
                pin: false, 
                markers: false,
                onEnter: () => {
                    document.querySelector(".slider-first").classList.add("active");
                    document.querySelectorAll(".info-left").forEach(info => {
                        info.classList.add("active");
                    })
                    document.querySelector(".info-right").classList.add("active");
                },
                onLeaveBack: () => {
                    document.querySelector(".slider-first").classList.remove("active");
                    document.querySelectorAll(".info-left").forEach(info => {
                        info.classList.remove("active");
                    })
                    document.querySelector(".info-right").classList.remove("active");
                }
            },
            ease: "power2.out"
        }
    );




    /* */
    const floorList = document.querySelectorAll('.floor-list li');
    const floorTab = document.querySelectorAll('.floor-tab');
    const slideNext = document.querySelector('.next-slider');
    const slidePrev = document.querySelector('.prev-slider');
    const floor = document.querySelector('.floor');
    const slideSubject = document.querySelector('.section-subject');

    let currentSlideIndexes = Array(floorTab.length).fill(0);

    floorList.forEach((listItem, tabIndex) => {
        listItem.addEventListener('click', () => {
            floorList.forEach(item => item.classList.remove('on'));
            listItem.classList.add('on');
            floor.textContent = listItem.textContent;

            floorTab.forEach(tab => tab.classList.remove('active'));
            floorTab[tabIndex].classList.add('active');

            updateSlides(tabIndex, 0);
        });
    });

    function updateSlides(tabIndex, slideIndex) {
        const slides = floorTab[tabIndex].querySelectorAll('.slide-item');
        const sectionSubject = document.querySelector('.section-subject');

        slides.forEach(slide => slide.classList.remove('on'));
        slides[slideIndex].classList.add('on');

        sectionSubject.innerHTML = '';

        slides.forEach((slide, index) => {
            const subjectText = slide.dataset.subject;
            if (subjectText) {
                const span = document.createElement('span');
                span.textContent = subjectText;
                if (index === slideIndex) {
                    span.classList.add('on');
                }
                sectionSubject.appendChild(span);
            }
        });

        currentSlideIndexes[tabIndex] = slideIndex;
    }

    function getCurrentTabIndex() {
        return Array.from(floorTab).findIndex(tab => tab.classList.contains('active'));
    }

    function updateControllBoxPosition() {
        const currentTabIndex = getCurrentTabIndex();
        const slideItems = floorTab[currentTabIndex].querySelectorAll('.slide-item');
    
        slideItems.forEach((item) => {
            if (item.classList.contains('on')) {
                // 현재 슬라이드의 높이값 가져오기
                const itemHeight = item.offsetHeight;
                const contorllBox = document.querySelector('.controll-box');
                const windowWidth = window.innerWidth;
    
                if (windowWidth <= 768) {
                    // top 값을 vw로 설정 (36.36과 80을 더한 후 vw로 변환)
                    contorllBox.style.top = `${itemHeight + 36.36 + 35}px`;
                } else {
                    // 768px 이상일 때 top 값 초기화
                    contorllBox.style.top = '';
                }
            }
        });
    }
    
    // slideNext 클릭 시 업데이트
    slideNext.addEventListener('click', () => {
        const currentTabIndex = getCurrentTabIndex();
        const slideItems = floorTab[currentTabIndex].querySelectorAll('.slide-item');
        const nextSlideIndex = (currentSlideIndexes[currentTabIndex] + 1) % slideItems.length;
    
        updateSlides(currentTabIndex, nextSlideIndex);
        updateControllBoxPosition(); // slideNext 클릭 시 높이 업데이트
    });

    slidePrev.addEventListener('click', () => {
        const currentTabIndex = getCurrentTabIndex();
        const slideItems = floorTab[currentTabIndex].querySelectorAll('.slide-item');
        const prevSlideIndex = (currentSlideIndexes[currentTabIndex] - 1 + slideItems.length) % slideItems.length;

        updateSlides(currentTabIndex, prevSlideIndex);
        updateControllBoxPosition();
    });

    
    // 윈도우 리사이즈 시에도 적용
    window.addEventListener('resize', updateControllBoxPosition);
    
    // 처음 페이지 로드 시에도 실행
    updateControllBoxPosition();

    
    function initializeSubjects() {
        const sectionSubject = document.querySelector('.section-subject');
        sectionSubject.innerHTML = '';

        const currentTabIndex = getCurrentTabIndex();
        if (currentTabIndex !== -1) {
            const slides = floorTab[currentTabIndex].querySelectorAll('.slide-item');
            slides.forEach((slide, index) => {
                const subjectText = slide.dataset.subject;
                if (subjectText) {
                    const span = document.createElement('span');
                    span.textContent = subjectText;
                    if (index === 0) {
                        span.classList.add('on');
                    }
                    sectionSubject.appendChild(span);
                }
            });
        }
    }

    // 슬라이드 변경 처리 함수
    function handleSlideChange(swiperInstance) {
    
        // 현재 활성화된 .slider-desc 요소 보이기
        const realIndex = swiperInstance.realIndex;
        const infoDesc = Array.from(document.querySelectorAll(".slider-desc"));

        
        // 현재 슬라이드 번호 업데이트
        const slideNumber = (realIndex + 1).toString().padStart(2, '0'); // 01, 02, 03 형식
        const numberElement = document.querySelector(".number");
        // if (numberElement) {
        //     numberElement.textContent = slideNumber;
        // }
    }

    const mainSwipers = document.querySelectorAll(".main_slide").forEach(swiperContainer => {
        const mainSwiper = new Swiper(swiperContainer, {
            parallax: true,
            grabCursor: true,
            loop: false,
            effect: 'slide',
            allowTouchMove: true,
            direction: "vertical",
            speed: 900,
            slidesPerView: 1,
            spaceBetween: 0,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            on: {
                slideChange: function() {
                    handleSlideChange(this);
                }
            }
        });
    });

    initializeSubjects();


    


    /* */
    
    
    // Swiper 초기화
    const doctorsSlider = new Swiper('.doctors-slider', {
        loop: false,
        slidesPerView: 1,
        effect : 'slide',
        navigation: {
            nextEl: '.next-button',
        },
        pagination: {
            el: '.pager',
            clickable: true,
        },
        on: {
            slideChange: function () {
                updateDoctorsInfo(this.activeIndex);
            }
        }
    });

    let isSliding = false;  // 슬라이드가 이동 중인지 체크하는 플래그

    // 정보를 업데이트하는 함수
    function updateDoctorsInfo(index) {
        const activeSlide = document.querySelectorAll('.doctors-slider .swiper-slide')[index];
        const name = activeSlide.dataset.name;
        const position = activeSlide.dataset.position;
        const depth = activeSlide.dataset.depth;

        // name, position 업데이트
        document.querySelector('.doctors-info .name strong').textContent = name;
        document.querySelector('.doctors-info .name span').textContent = position;

        // depth에 따라 doctors-list 및 drop-list 업데이트
        const doctorsListItems = document.querySelectorAll('.doctors-list > li');
        
        doctorsListItems.forEach((item, i) => {
            const dropList = item.querySelector('.drop-list');
            dropList.innerHTML = ''; // 기존 내용을 비움
            
            document.querySelectorAll('.doctors-slider .swiper-slide').forEach((slide, slideIndex) => {
                if (parseInt(slide.dataset.depth) === i + 1) {
                    const newLi = document.createElement('li');
                    const newA = document.createElement('a');
                    newA.href = '#none';
                    newA.textContent = slide.dataset.name;
                    newA.dataset.slideIndex = slideIndex; // slideIndex 저장

                    newLi.appendChild(newA); // a 태그를 li에 추가
                    dropList.appendChild(newLi); // li를 dropList에 추가

                    if (slideIndex === index) {
                        newLi.classList.add('active');
                    }
                }
            });

            if (i + 1 === parseInt(depth)) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // drop-list 항목 클릭 시 슬라이드 이동 처리
        document.querySelectorAll('.drop-list a').forEach((link) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                if (!isSliding) {  // 슬라이드 이동 중이 아닐 때만 동작
                    const slideIndex = parseInt(link.dataset.slideIndex);
                    if (!isNaN(slideIndex)) {
                        isSliding = true;  // 슬라이드 이동 시작
                        doctorsSlider.slideTo(slideIndex);
                    }
                }
            });
        });
    }

    // doctors-list 항목 클릭 시 해당 리스트의 첫 번째 슬라이드로 이동
    document.querySelectorAll('.doctors-list > li').forEach((listItem) => {
        listItem.addEventListener('click', () => {
            const dropList = listItem.querySelector('.drop-list');
            if (dropList) {
                const firstDropListItem = dropList.querySelector('li a');
                if (firstDropListItem && !isSliding) {  // 슬라이드 이동 중이 아닐 때만 동작
                    const firstSlideIndex = parseInt(firstDropListItem.dataset.slideIndex);
                    if (!isNaN(firstSlideIndex)) {
                        isSliding = true;  // 슬라이드 이동 시작
                        doctorsSlider.slideTo(firstSlideIndex);
                    }
                }
            }
        });
    });

    // 슬라이드 이동이 완료되면 플래그를 해제하는 이벤트 리스너
    doctorsSlider.on('slideChangeTransitionEnd', () => {
        isSliding = false;  // 슬라이드 이동 종료
    });

    // 초기 상태로 첫 번째 슬라이드 정보를 적용
    updateDoctorsInfo(0);
    


    /* */

    
    

    // 탭과 스와이퍼를 초기화합니다.
    const tabListItems = document.querySelectorAll('.space-tab-list > a');
    const tabContentsSpace = document.querySelectorAll('.space-tab-content .space-tab');
    const swipers = [];

    // 스와이퍼 슬라이더 초기화
    tabContentsSpace.forEach(tab => {
        const swiperContainer = tab.querySelector('.space-swiper');
        const swiper = new Swiper(swiperContainer, {
            grabCursor: true,
            loop: true,
            effect: 'slide',
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.space-next-button',
                prevEl: '.space-prev-button',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
        swipers.push(swiper);
    });

    // 탭 클릭 시 이벤트 처리
    tabListItems.forEach((tabListItem, index) => {
        tabListItem.addEventListener('click', () => {
            // 모든 탭과 스와이퍼 초기화
            tabListItems.forEach(item => item.classList.remove('active'));
            tabContentsSpace.forEach(content => content.classList.remove('active'));

            // 클릭한 탭과 해당 탭의 콘텐츠를 활성화
            tabListItem.classList.add('active');
            tabContentsSpace[index].classList.add('active');

            // 해당 탭의 스와이퍼로 이동
            swipers[index].update(); // 업데이트
        });
    });


    // 타임라인 생성 시 ScrollTrigger를 별도로 저장할 필요 없음, spaceTime에 포함됨
    let spaceTime;

    function initGsap() {
        if (window.innerWidth >= 769) {
            // GSAP 타임라인 생성
            spaceTime = gsap.timeline({
                scrollTrigger: {
                    trigger: ".space-section",
                    start: "top top",
                    end: "50% top",
                    scrub: 1, 
                    pin: true, 
                    markers: false,
                    defaults: {
                        ease: "power2.out",
                        duration: 1.5, // 애니메이션 지속 시간을 늘려서 부드럽게
                    }
                }
            });

            spaceTime.fromTo(".space-swiper", {scale: 1.5, borderRadius: 0}, { scale: 1, borderRadius: '32.0000vw' })
            .fromTo(".title-wrap .index-up", { opacity: 0, y: 100 }, { opacity: 1, y: 0 }, 0)
            .fromTo(".title-wrap .index-down", { opacity: 0, y: -100 }, { opacity: 1, y: 0 }, 0)
            .fromTo(".space-tab-list", { opacity: 0 }, { opacity: 1 });
        }
    }

    // 초기 실행
    initGsap();

    window.addEventListener('resize', function() {
        // 특정 타임라인의 ScrollTrigger만 제거
        if (spaceTime && spaceTime.scrollTrigger) {
            spaceTime.scrollTrigger.kill();
            spaceTime.kill(); // 필요하다면 타임라인도 삭제
        }

        // 다시 초기화
        initGsap();
    });
        

    const snsSwiper = new Swiper(".sns-gallery-swiper", {
        grabCursor: true,
        loop: true,
        effect: 'slide',
        slidesPerView: 2, // 슬라이드 개수를 2로
                spaceBetween: 1 * 768 / 100, // 5vw로 설정
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        breakpoints: {
            
            // 769px 이상일 때 기본 설정으로 돌아가도록 보장
            769: {
                slidesPerView: 5,
                spaceBetween: 0.5 * 1920 / 100, // 다시 기본 간격 설정
            }
        }
    });

    gsap.fromTo(".notice",{ },
        { 
            scrollTrigger: {
                trigger: ".notice",
                start: "-80% top",
                end: "50% top",
                scrub: 1, 
                pin: false, 
                markers: false,
                onEnter: () => {
                    document.querySelector(".notice-table").classList.add("active");
                },
                onLeaveBack: () => {
                    document.querySelector(".notice-table").classList.remove("active");
                }
            },
            ease: "power2.out"
        }
    );


    const distancesFoot = [325, 200, 75, 75, 200, 325];  // 각 요소가 이동할 거리 설정
    const directionsFoot = [-1, -1, -1, 1, 1, 1]; // 첫 번째, 두 번째는 좌측(-1), 세 번째, 네 번째는 우측(1)

    gsap.utils.toArray(".foot-about .tit span").forEach((element, i) => {
        gsap.fromTo(element, 
            {
                x: ((distancesFoot[i] * directionsFoot[i]) * 100) / 2500 + 'vw', // 각 인덱스에 맞는 방향과 거리 설정
                opacity:0,
            },
            {
                opacity:1,
                x: '0%', // 중앙으로 이동
                width: 'auto',
                duration: 3,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: '.foot-banner',
                    start: "top top", 
                    end: "30% top", 
                    scrub: true, 
                    markers: false 
                }
            }
        );
    });

    const familysite = document.querySelector('.familysite');

    const selectToggleHandler = (dropItem) => {
        dropItem.addEventListener('click', () => {
            dropItem.classList.toggle('on');
        })
    }

    selectToggleHandler(familysite);
    
})
