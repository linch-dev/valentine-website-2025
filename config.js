// ============================================
// 💝 CUSTOMIZE YOUR VALENTINE'S WEBSITE HERE 💝
// ============================================

const CONFIG = {
    // Your Valentine's name that will appear in the title
    // Example: "Jade", "Sarah", "Mike"
    valentineName: "Катя",

    // The title that appears in the browser tab
    // You can use emojis! 💝 💖 💗 💓 💞 💕
    pageTitle: "Валентинка лучшей Аричке 💝",

    // Floating emojis that appear in the background
    // Find more emojis at: https://emojipedia.org
    floatingEmojis: {
        hearts: ['❤️', '💖', '💝', '💗', '💓'],  // Heart emojis
        bears: ['🧸', '🐻']                       // Cute bear emojis
    },

    // Questions and answers
    // Customize each question and its possible responses
    questions: {
        first: {
            text: "Ценишь нашу дружбу?",                                    // First interaction
            yesBtn: "Да!",                                             // Text for "Yes" button
            noBtn: "Нет...",                                               // Text for "No" button
            secretAnswer: "я не ценю, я ею безумно дорожу!❤️"           // Secret hover message
        },
        second: {
            text: "Насколько сильно ты ценишь меня?",                          // For the love meter
            startText: "Вот на столько!",                                   // Text before the percentage
            nextBtn: "Продолжить..."                                         // Text for the next button
        },
        third: {
            text: "Ну, твоим валентином я не буду, но, будешь ли ты моей лучшей подругой?🌹", // The big question!
            yesBtn: "Да!",                                             // Text for "Yes" button
            noBtn: "Нет."                                                 // Text for "No" button
        }
    },

    // Love meter messages
    // They show up depending on how far they slide the meter
    loveMessages: {
        extreme: "Ну явно не наныл, сама столько выбираешь!!💝",  // Shows when they go past 5000%
        high: "А может больше?🚀",              // Shows when they go past 1000%
        normal: "Маловато конечно,  но ладно..."                           // Shows when they go past 100%
    },

    // Messages that appear after they say "Yes!"
    celebration: {
        title: "юпио! 🎉",
        message: "твой подарок на день святого валентина — это +1 месяц дружбы со мной! \n\n" + 
                 "а если серьезно, есть множество моментов, за которые можно выразить благодарства тебе, \n" +
                 "но одна из них - просто за то что ты умеешь поднять мое настроение. \n" +
                 "хоть мы и знакомы так мало, но буквально каждый проведенный момент в чате, посиделки в лиге, да и даже те же стебы наши ощущаются очень приятно! \n\n" +
                 "пусть в твоей жизни будет много радости, \n" +
                 "легкости и самое главное, людей которые ценят тебя так же сильно, как ценю тебя я(только попробуй тут увидеть сарказм). \n" +
                 "и пусть этот день будет еще одним поводом напомнить, то что ТЫ самая лучшая подруга!",
        emojis: "🎁💖🤗💝❤️💕" 
    },

    // Color scheme for the website
    // Use https://colorhunt.co or https://coolors.co to find beautiful color combinations
    colors: {
        backgroundStart: "#ffafbd",      // Gradient start (try pastel colors for a soft look)
        backgroundEnd: "#ffc3a0",        // Gradient end (should complement backgroundStart)
        buttonBackground: "#ff6b6b",     // Button color (should stand out against the background)
        buttonHover: "#ff8787",          // Button hover color (slightly lighter than buttonBackground)
        textColor: "#ff4757"             // Text color (make sure it's readable!)
    },

    // Animation settings
    // Adjust these if you want faster/slower animations
    animations: {
        floatDuration: "15s",           // How long it takes hearts to float up (10-20s recommended)
        floatDistance: "50px",          // How far hearts move sideways (30-70px recommended)
        bounceSpeed: "0.5s",            // Speed of bouncing animations (0.3-0.7s recommended)
        heartExplosionSize: 1.5         // Size of heart explosion effect (1.2-2.0 recommended)
    },

    // Background Music (Optional)
    // Add your own music URL after getting proper licenses
    music: {
        enabled: true,                     // Music feature is enabled
        autoplay: true,                    // Try to autoplay (note: some browsers may block this)
        musicUrl: "https://res.cloudinary.com/dap09r38d/video/upload/v1771037661/Stray_Kids_LEE_KNOW_CHANGBIN_FELIX_-_Surfin_%D0%9F%D0%95%D0%A0%D0%95%D0%92%D0%9E%D0%94_%D0%9D%D0%90_%D0%A0%D0%A3%D0%A1%D0%A1%D0%9A%D0%98%D0%99_%D0%9A%D0%98%D0%A0%D0%98%D0%9B%D0%9B%D0%98%D0%97%D0%90%D0%A6%D0%98%D0%AF_1_a1fos9.mp4", // Music streaming URL
        startText: "🎵 Включить музычку(твоя любимая)",        // Button text to start music
        stopText: "🔇 Остановить музыку",         // Button text to stop music
        volume: 0.5                        // Volume level (0.0 to 1.0)
    }
};

// Don't modify anything below this line unless you know what you're doing
window.VALENTINE_CONFIG = CONFIG; 
