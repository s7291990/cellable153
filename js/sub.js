document.addEventListener('DOMContentLoaded', () => {
    // GSAP과 ScrollTrigger 플러그인 등록
    gsap.registerPlugin(ScrollTrigger);

    // 화면 너비에 따른 변수 설정
    const getViewportValue = () => (window.innerWidth <= 768) ? 768 : 1920;
    const widthSize = () => (window.innerWidth <= 768) ? 670 : 1599;
    const heightSize = () => (window.innerWidth <= 768) ? 1200 : 1222;
    let viewportValue = getViewportValue(); // 초기 값 설정
    let viewportWidthSize = widthSize(); // 초기 값 설정
    let viewportHeightSize = heightSize(); // 초기 값 설정
    let lastWidth = window.innerWidth; // 마지막 너비 저장


    function updateViewportHeight() {
        // 뷰포트 높이 업데이트
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    updateViewportHeight();
    
    // 뷰포트 크기 업데이트 후 ScrollTrigger를 새로고침
    window.addEventListener('resize', () => {
        updateViewportHeight();
        checkViewportAndApplyGsap();
    });

    const header = document.getElementById('header');
    const visualSection = document.querySelector('.sub-section');
    const grandMenu = document.querySelector('.grand-menu');

    // active 클래스를 토글하는 함수
    function toggleHeaderClass() {
        const visualSectionBottom = visualSection.getBoundingClientRect().bottom;
        const headerHeight = header.offsetHeight;

        // 스크롤 위치가 visualSection의 끝과 일치할 때 active 클래스 추가
        if (visualSectionBottom <= headerHeight) {
            header.classList.add('active');
            grandMenu.classList.add('headerActive');
        } else {
            header.classList.remove('active');
            grandMenu.classList.remove('headerActive');
        }
    }

    // 스크롤 및 리사이즈 이벤트 리스너 추가
    window.addEventListener('scroll', toggleHeaderClass);
    window.addEventListener('resize', toggleHeaderClass);

    // 페이지 로드 시 초기 상태 확인
    toggleHeaderClass();

    let subSectionTrigger; // 특정 ScrollTrigger 인스턴스를 저장할 변수

    function initializeGsapAnimation() {
        if (window.innerWidth > 768) {
            // 768px보다 클 때만 애니메이션 적용
            subSectionTrigger = gsap.fromTo(".sub-section .img-visual", 
                { 
                    top: `${(371 / viewportValue) * 100}vw`,
                    width: `${(viewportWidthSize / viewportValue) * 100}vw`,
                    height: `${(viewportHeightSize / viewportValue) * 100}vw`,
                },
                { 
                    top: '0vh',
                    width: '100vw',
                    height: '100dvh',
                    position: 'fixed',
                    borderRadius: '0',
                    backgroundPosition: 'center',
                    scrollTrigger: {
                        trigger: ".sub-section",
                        start: "top top", 
                        end: `bottom top`,
                        toggleActions: "play none none reverse",
                        scrub: true,
                        markers: false,
                        pin: true,
                        pinSpacing: true,
                    },
                    duration: 1.5,
                    ease: "power2.out"
                }
            ).scrollTrigger; // ScrollTrigger 인스턴스 저장
        }
    }

    function killGsapAnimation() {
        // subSectionTrigger만 제거
        if (subSectionTrigger) {
            subSectionTrigger.kill();
            subSectionTrigger = null; // 인스턴스 초기화
        }
    }

    function checkViewportAndApplyGsap() {
        const currentScrollPos = window.scrollY; // 현재 스크롤 위치 저장
        if (window.innerWidth > 768) {
            // 애니메이션 적용
            killGsapAnimation(); // 기존 애니메이션 제거
            initializeGsapAnimation(); // 새로 적용
        } else {
            // 768px 이하일 경우 애니메이션 삭제
            killGsapAnimation();
        }
        // 리사이즈 후 스크롤 위치 복원
        window.scrollTo(0, currentScrollPos);
    }

    // 초기 로드 시 한 번 실행
    checkViewportAndApplyGsap();

    gsap.to(".visual-text", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        delay: 0.2
    });

    // 리사이즈 될 때마다 viewportValue를 갱신
    window.addEventListener('resize', () => {
        viewportValue = getViewportValue();
        viewportWidthSize = widthSize();
        viewportHeightSize = heightSize();
        console.log(`${(viewportHeightSize / viewportValue) * 100}vw`);
    });
});