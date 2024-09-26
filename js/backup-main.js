document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header'); 
    const headerNavBar = document.querySelector('.nav-bar');
    const grandMenu = document.querySelector('.grand-menu');
    const menuOpen = document.querySelector('.menuOpen');
    const menuItems = document.querySelectorAll('.grand-menu > .menu-list > li');

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // 모든 li 요소에서 on 클래스를 제거
        menuItems.forEach(el => el.classList.remove('on'));

        // 클릭한 li에 on 클래스를 toggle
        item.classList.toggle('on');
    });
});

    menuOpen.addEventListener('click', () => {
        menuOpen.classList.toggle('active');
        grandMenu.classList.toggle('active');
        header.classList.toggle('on-mo')
    });

    const toggleActive = (isActive) => {
        if (window.innerWidth >= 769) { // 769px 이상일 때만 적용
            grandMenu.classList.toggle('active', isActive);

            // 헤더에 배경 추가
            if (isActive) {
                header.style.background = 'rgba(178, 147, 119, 0.8)';
            } else {
                header.style.background = ''; // 배경 제거
            }

            // 헤더에 active가 있으면 grand-menu에 headerActive 추가
            if (header.classList.contains('active')) {
                grandMenu.classList.add('headerActive');
            } else {
                grandMenu.classList.remove('headerActive');
            }
        }
    };

    // nav-bar와 grand-menu에 동일한 이벤트 리스너 적용
    [headerNavBar, grandMenu].forEach(element => {
        element.addEventListener('mouseenter', () => toggleActive(true));
        element.addEventListener('mouseleave', () => toggleActive(false));
    });

    // resize 시에도 769px 이상에서만 적용
    window.addEventListener('resize', () => {
        if (window.innerWidth < 769) {
            // 화면이 769px 미만으로 줄어들 때 클래스 제거 및 배경 초기화
            grandMenu.classList.remove('active', 'headerActive');
            header.style.background = '';
            console.log(window.innerWidth)
        }
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
            height: '100vh',
            position: 'fixed',
            borderRadius: '0',
            backgroundPosition: 'center',
            scrollTrigger: {
                trigger: ".visual-section",
                start: "top top", 
                end: `${type1VisualHeight} top`,
                toggleActions: "play none none reverse",
                scrub: true,
                markers: false,
                pin: '.visual-section',
                onUpdate: (self) => {
                    if (self.progress >= 0.5) { // 진행 상태가 50% 이상일 때
                        gsap.to(".visual-text-sub", { 
                            opacity: 1, 
                            duration: 1, 
                            ease: "power2.out" 
                        });
                    } else { // 스크롤이 50% 미만일 때
                        gsap.to(".visual-text-sub", { 
                            opacity: 0, 
                            duration: 1, 
                            ease: "power2.out" 
                        });
                    }
                }
            },
            duration: 1.5,
            ease: "power2.out"
        }
    );

    gsap.fromTo(".type2",
        { 
            top: '100vh',
        },
        { 
            top: '0',
            position: 'fixed',
            borderRadius: 0,
            scrollTrigger: {
                trigger: ".type2",
                start: "top top",
                end: "bottom top",
                scrub: true, 
                pin: '.visual-section', 
                pinSpacing: false,
                markers: false,
                onUpdate: (self) => {
                    if (self.progress >= 0.9) {
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
                },
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

    slideNext.addEventListener('click', () => {
        const currentTabIndex = getCurrentTabIndex();
        const slideItems = floorTab[currentTabIndex].querySelectorAll('.slide-item');
        const nextSlideIndex = (currentSlideIndexes[currentTabIndex] + 1) % slideItems.length;
        updateSlides(currentTabIndex, nextSlideIndex);
    });

    slidePrev.addEventListener('click', () => {
        const currentTabIndex = getCurrentTabIndex();
        const slideItems = floorTab[currentTabIndex].querySelectorAll('.slide-item');
        const prevSlideIndex = (currentSlideIndexes[currentTabIndex] - 1 + slideItems.length) % slideItems.length;
        updateSlides(currentTabIndex, prevSlideIndex);
    });

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
    
    
    

    const spans = document.querySelectorAll('.doctors-controls .tit span');

    spans.forEach((span, index) => {
        gsap.fromTo(span, 
        { y: 100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', 
            scrollTrigger: {
            trigger: span,
            start: 'top 80%',
            end: 'top 20%',
            markers: false,
            toggleActions: 'play none none reverse',
            },
            delay: index * 1
        });
    });

    const doctorsListItems = document.querySelectorAll('.doctors-list > li');
    const tabContents = document.querySelectorAll('.tab-content .tab');
    const doctorName = document.querySelector('.name strong');
    const doctorPosition = document.querySelector('.name span');
    const doctorsSliders = [];

    // 각 탭의 슬라이더와 페이지네이션을 초기화
    tabContents.forEach((tab, tabIndex) => {
        const slider = tab.querySelector('.doctors-slider');
        const pager = tab.querySelector('.pager');

        // drop-list 동적으로 생성
        const dropList = doctorsListItems[tabIndex].querySelector('.drop-list');
        dropList.innerHTML = '';  // 기존 항목을 비워줍니다.
        
        const slides = tab.querySelectorAll('.swiper-slide');
        slides.forEach((slide, slideIndex) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.setAttribute('href', '#none');
            a.textContent = slide.dataset.name || `Slide ${slideIndex + 1}`; // slide에 있는 dataset 사용

            li.appendChild(a);
            dropList.appendChild(li);

            a.addEventListener('click', (event) => {
                event.preventDefault();
                doctorsSliders[tabIndex].slideTo(slideIndex);
            });
        });

        // Swiper 초기화
        const swiper = new Swiper(slider, {
            grabCursor: true,
            loop: false,  // loop를 false로 유지
            effect: 'slide',
            allowTouchMove: true,
            speed: 900,
            slidesPerView: 1,
            spaceBetween: 0,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: pager,
                clickable: true,
                renderCustom: function (swiper, current, total) {
                    return current + ' of ' + total;
                },
            },
            navigation: {
                nextEl: '.next-button',  // Swiper 내장 네비게이션을 사용
            },
        });

        // 첫 번째 drop-list 항목을 active로 설정
        const dropListItems = doctorsListItems[tabIndex].querySelectorAll('.drop-list li');
        if (dropListItems.length > 0) {
            dropListItems[0].classList.add('active'); // 첫 번째 항목에 active 추가
        }

        // 슬라이드 변경 시 데이터 업데이트 및 drop-list 항목 active 처리
        swiper.on('slideChange', () => {
            const activeIndex = swiper.realIndex;
            const activeSlide = swiper.slides[activeIndex];

            // activeSlide가 유효한지 확인하고, dataset 속성을 체크합니다.
            if (activeSlide && activeSlide.dataset) {
                const dataName = activeSlide.dataset.name || 'Unknown';
                const dataPosition = activeSlide.dataset.position || 'Unknown';

                updateDoctorName(dataName, dataPosition);
                updatePagination(tabIndex, activeIndex);
            } else {
                console.error('activeSlide is undefined or does not have dataset properties.');
            }
        });

        // 슬라이더를 doctorsSliders 배열에 추가
        doctorsSliders.push(swiper);
    });

    // doctors-list의 <a> 클릭 시 탭 변경 처리
    doctorsListItems.forEach((listItem, tabIndex) => {
        const link = listItem.querySelector('a');
        const dropListItems = listItem.querySelectorAll('.drop-list li');

        link.addEventListener('click', (event) => {
            event.preventDefault();

            // 모든 doctors-list와 tab-content에서 active 클래스 제거
            doctorsListItems.forEach(item => item.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            // 클릭한 리스트 항목과 해당 탭에 active 클래스 추가
            listItem.classList.add('active');
            tabContents[tabIndex].classList.add('active');

            // 선택한 탭의 슬라이드로 초기화
            doctorsSliders.forEach((swiper, index) => {
                if (index === tabIndex) {
                    swiper.update(); // 슬라이더 업데이트
                    swiper.slideTo(0);  // 현재 탭의 슬라이드만 초기화

                    // 슬라이드가 완전히 로드된 이후에 updateDoctorName 호출
                    setTimeout(() => {
                        const firstSlide = swiper.slides[0];
                        if (firstSlide && firstSlide.dataset) {
                            updateDoctorName(firstSlide.dataset.name, firstSlide.dataset.position);
                            updatePagination(tabIndex, 0);
                        } else {
                            console.error('First slide data is missing.');
                        }
                    }, 100); // 약간의 지연을 두어 슬라이드 데이터가 준비되도록 합니다.
                } else {
                    swiper.allowTouchMove = false;  // 비활성화된 탭의 슬라이드는 터치 이동 비활성화
                }
            });
        });

        // drop-list의 각 항목 클릭 시 슬라이더 이동 및 active 처리
        dropListItems.forEach((dropItem, slideIndex) => {
            dropItem.addEventListener('click', (event) => {
                event.preventDefault();

                dropListItems.forEach(item => item.classList.remove('active'));
                dropItem.classList.add('active');

                const activeTabIndex = [...doctorsListItems].findIndex(item => item.classList.contains('active'));
                doctorsSliders[activeTabIndex].slideTo(slideIndex);
            });
        });
    });

    // 슬라이드 변경 시 페이지네이션 업데이트 함수
    function updatePagination(tabIndex, activeIndex) {
        const dropListItems = doctorsListItems[tabIndex].querySelectorAll('.drop-list li');

        dropListItems.forEach((item, index) => {
            item.classList.toggle('active', index === activeIndex);
        });
    }

    // doctor의 이름과 직책을 업데이트하는 함수
    function updateDoctorName(name, position){
        doctorName.textContent = name;
        doctorPosition.textContent = position;
    }




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

    console.log(window.innerWidth )
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
