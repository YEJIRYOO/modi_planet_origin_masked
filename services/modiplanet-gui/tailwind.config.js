const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /** 메인컬러 */
        brand: '#FF4547',
        brand_dark: '#db2d2f',
        brand_1: '#FF7F6D',
        brand_2: '#FFB1A3',
        brand_3: '#FFE8E3',
        brand_4: '#FFF6F4',

        /** 럭스로보 메인컬러 , 사용하는 곳은 없지만 설정엔 넣어둠 */
        lx: '#45D6DF',
        lx_dark: '#00ADB8',
        lx_1: '#44EBEB',
        lx_2: '#93F9FF',
        lx_3: '#B7FBFF',
        lx_4: '#DEFDFF',

        /** 서브컬러 */
        navy: '#1B3852',
        navy_1: '#EBF3FB',

        /** 상태관련 */
        sub2_yellow: '#FFC629',
        sub2_green: '#00C08B',
        sub2_purple: '#7873F0',
        sub2_blue: '#484DED',
        amber: '#FF7A00',

        /** 폰트 */
        font: {
          main: '#2B2929',
          sub: '#4A4848',
          sub_1: '#666666',
          sub_2: '#999999',
          non: '#CACACA',
        },
        /** 그레이스케일 관련 */
        form: {
          gray: '#ACACAC',
          bg: '#FAFAFA',
          form: '#F4F3F5',
          border: '#DDDDDD',
          disable: '#DFDFDF',
        },
        black: '#000000',
        white: '#ffffff',
      },

      /**
       * 폰트사이즈 rem 단위는 디자인시스템과 연계되어 있음
       * px로 정의된 부분은 대체 하던지 정리 필요
       */
      fontSize: {
        10: '10px',
        11: '11px',
        22: '22px',
        28: '28px',
        32: '32px',
        36: '36px',

        12: '0.75rem',
        13: '0.812rem',
        14: '0.875rem',
        15: '0.938rem',
        16: '1rem',
        18: '1.125rem',
        20: '1.25rem',
        24: '1.5rem',
        26: '1.625rem',
        30: '1.875rem',
        34: '2.125rem',
        40: '2.5rem',
        50: '3.125rem',
      },

      fontWeight: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      borderRadius: {
        0: '0px',
        4: '4px',
        6: '6px',
        8: '8px',
        9: '9px',
        12: '12px',
        10: '10px',
        16: '16px',
        20: '20px',
        30: '30px',
      },
      boxShadow: {
        sm: '0 0 20px 0 rgba(214, 214, 214, 0.5)', // 템플릿
        popover: '0 0 20px 0 rgba(214,214,214,0.5)',
        'course-slider': '0 0 30px 0 rgba(23, 20, 54, 0.16)',
        'payment-card': '0 0 30px 0 rgba(171, 167, 187, 0.16)',
      },
      backgroundSize: {
        '55%': '55%',
      },
      backgroundImage: {
        section10: "url('/assets/main/section10/background.jpg')",
        section10_mobile:
          "url('/assets/main/section10/background_mobile.png')",
      },
      keyframes: {
        'move-forever': {
          '0%': { transform: 'translate3d(-90px, 0, 0)' },
          '100%': { transform: 'translate3d(85px, 0, 0)' },
        },
        fill: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'float-delay': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-center': {
          '0%, 100%': { transform: 'translateY(-50%)' },
          '50%': { transform: 'translateY(calc(-50% - 16px))' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '15%': { transform: 'rotate(-3deg)' },
          '30%': { transform: 'rotate(2.5deg)' },
          '45%': { transform: 'rotate(-2deg)' },
          '60%': { transform: 'rotate(1.5deg)' },
          '75%': { transform: 'rotate(-1deg)' },
          '90%': { transform: 'rotate(0.5deg)' },
        },
      },
      animation: {
        'bounce-slow': 'bounce-custom 2s infinite',
        wave: 'move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite',
        fill: 'fill 4s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite',
        float: 'float 3.5s ease-in-out infinite',
        'float-d1': 'float 3.5s ease-in-out 0.4s infinite',
        'float-d2': 'float 3.8s ease-in-out 0.9s infinite',
        'float-gentle-d1': 'float-gentle 5s ease-in-out 0.4s infinite',
        'float-gentle-d2': 'float-gentle 5.5s ease-in-out 0.9s infinite',
        'float-gentle-d3': 'float-gentle 6s ease-in-out 1.3s infinite',
        'float-d3': 'float-delay 4s ease-in-out 1.3s infinite',
        'float-delay': 'float-delay 4s ease-in-out 0.8s infinite',
        'float-center': 'float-center 3.5s ease-in-out infinite',
        shiver: 'shiver 2.5s ease-in-out infinite',
        wiggle: 'wiggle 2s ease-in-out infinite',
      },
      screens: {
        sm: { max: '900px' },
        md: { min: '901px', max: '1440px' },
        // => @media (min-width: 800px) { ... }
        lg: { max: '1579px' },
        // 변경된 뷰포트
        sd: { min: '1024px', max: '1279px' }, //small desktop
        tb: { min: '768px', max: '1023px' }, // tablet
        mb: { max: '767px' }, // mobile
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      layout: {
        // 버튼 때문에 10으로 고정했으나 필요에 따라 core/button컴포넌트에서 사이즈별로 따로 입력하는 방식으로 바꿔도 괜찮을 듯
        radius: {
          small: '10px',
          medium: '10px',
          large: '10px',
        },
        // sm사이즈 버튼은 tiny 폰트값부터 적용됨
        fontSize: {
          tiny: '0.75rem',
          small: '0.938rem',
          medium: '1.125rem',
        },
        borderWidth: {
          small: '1px',
          medium: '1px',
          large: '1px',
        },
        disabledOpacity: '1',
      },
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#FF4547',
              foreground: '#ffffff',
            },
            secondary: {
              DEFAULT: '#2B2929',
              foreground: '#ffffff',
            },
            default: {
              DEFAULT: '#DFDFDF',
              foreground: '#2B2929',
            },
          },
        },
      },
    }),
  ],
};
