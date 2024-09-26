document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const headerNavBar = document.querySelector('.nav-bar');
    const grandMenu = document.querySelector('.grand-menu');
    const menuOpen = document.querySelector('.menuOpen');
    const menuItems = document.querySelectorAll('.grand-menu > .menu-list > li');
    const distancesFoot = [325, 200, 75, 75, 200, 325];  // 각 요소가 이동할 거리 설정
    const directionsFoot = [-1, -1, -1, 1, 1, 1]; // 첫 번째, 두 번째는 좌측(-1), 세 번째, 네 번째는 우측(1)
    const familysite = document.querySelector('.familysite');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // 모든 li 요소에서 on 클래스를 제거
            menuItems.forEach(el => el.classList.remove('on'));

            // 클릭한 li에 on 클래스를 toggle
            item.classList.toggle('on');
        });
    });

    menuOpen.addEventListener('click', () => {
        // const isActive = grandMenu.classList.toggle('active');
        // menuOpen.classList.toggle('active');
        // header.classList.toggle('on-mo');
        // grandMenu.classList.toggle('active');

        // 스크롤 제어
        if (isActive) {
            disableScroll(); // active 상태일 때 스크롤 비활성화
        } else {
            enableScroll(); // active 상태 아닐 때 스크롤 활성화
        }
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
            // if (header.classList.contains('active')) {
            //     grandMenu.classList.add('headerActive');
            // } else {
            //     grandMenu.classList.remove('headerActive');
            // }
        }
    };

    // 스크롤 비활성화 함수
    function disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    // 스크롤 활성화 함수
    function enableScroll() {
        document.body.style.overflow = '';
    }

    // nav-bar와 grand-menu에 동일한 이벤트 리스너 적용
    [header, grandMenu].forEach(element => {
        element.addEventListener('mouseenter', () => toggleActive(true));
        element.addEventListener('mouseleave', () => toggleActive(false));
    });

    // resize 시에도 769px 이상에서만 적용
    window.addEventListener('resize', () => {
        if (window.innerWidth < 769) {
            // 화면이 769px 미만으로 줄어들 때 클래스 제거 및 배경 초기화
            menuOpen.classList.remove('active')
            header.classList.remove('on-mo')
            grandMenu.classList.remove('active', 'headerActive');
            header.style.background = '';
            enableScroll(); // 스크롤 활성화
        }
    });

    document.querySelector('.booking > a').addEventListener('click', function (e) {
        e.preventDefault(); // 기본 링크 동작 방지
        document.querySelector('.counsel-popup').classList.add('on');
    });

    // counsel > a 클릭 시 .counsel-popup에 on 클래스 추가
    document.querySelector('.counsel > a').addEventListener('click', function (e) {
        e.preventDefault(); // 기본 링크 동작 방지
        document.querySelector('.counsel-popup').classList.add('on');
    });

    // close-popup 클릭 시 .counsel-popup에서 on 클래스 제거
    document.querySelector('.close-popup').addEventListener('click', function () {
        document.querySelector('.counsel-popup').classList.remove('on');
    });

    // top > a 클릭 시 부드럽게 상단으로 이동
    document.querySelector('.top > a').addEventListener('click', function (e) {
        e.preventDefault(); // 기본 링크 동작 방지
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 부드럽게 이동
        });
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

    const selectToggleHandler = (dropItem) => {
        dropItem.addEventListener('click', () => {
            dropItem.classList.toggle('on');
        })
    }

    selectToggleHandler(familysite);

})