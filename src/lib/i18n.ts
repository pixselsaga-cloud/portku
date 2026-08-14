export type Language = 'uz' | 'ru' | 'en';

export const projectTranslations: Record<string, Record<Language, { title: string; description: string; processSteps?: { step: string; title: string; desc: string }[] }>> = {
  'mercedes-amg-cyberpunk': {
    uz: {
      title: 'Mercedes AMG — Kibermakon Giperkar Posteri',
      description: "Mercedes AMG brendi uchun yuqori bosimli vizual kampaniya. 3D rendering, neon yorug'lik va qorong'u estetikadagi brutalist poster dizayni.",
      processSteps: [
        { step: '01', title: 'Konsept va Moodboard', desc: "Mercedes AMG brend uslubini tahlil qilish, neon va qorong'u ranglar palitrasini tanlash." },
        { step: '02', title: '3D CAD va Yorug`lik', desc: "Blender 3D dasturida avtomobil modelini joylashtirish va volumetrik yorug'likni sozlash." },
        { step: '03', title: 'Rang va Tipografiya', desc: "Photoshop dasturida multi-pass renderlarni birlashtirish va brutalist tipografiya qo'shish." }
      ]
    },
    ru: {
      title: 'Mercedes AMG — Киберпанк Гиперкар Постер',
      description: 'Высокооктановая визуальная кампания для Mercedes AMG. 3D рендеринг, неоновое освещение и брутальный постер в темной эстетике.',
      processSteps: [
        { step: '01', title: 'Концепт и Мудборд', desc: 'Анализ брендбука Mercedes AMG, подбор неоновой палитры и объёмного света.' },
        { step: '02', title: '3D CAD и Освещение', desc: 'Позиционирование автомобиля в Blender 3D, настройка тумана и трассировки лучей.' },
        { step: '03', title: 'Цветокоррекция и Типографика', desc: 'Композитинг многопроходных рендеров в Photoshop и добавление шрифтов.' }
      ]
    },
    en: {
      title: 'Mercedes AMG — Cyberpunk Hypercar Poster',
      description: 'A cinematic high-octane visual campaign for Mercedes AMG. Blending 3D octane rendering, neon lighting, custom typography, and atmospheric dark aesthetics.',
      processSteps: [
        { step: '01', title: 'Concept & Moodboarding', desc: 'Analyzing Mercedes AMG brand guidelines, selecting neon magenta & emerald lighting highlights.' },
        { step: '02', title: '3D CAD Asset Import & Lighting', desc: 'Positioning vehicle in Blender 3D, configuring volumetric fog and glass raytracing.' },
        { step: '03', title: 'Color Grading & Typography', desc: 'Compositing multi-pass renders in Photoshop, adding custom brutalist typography.' }
      ]
    }
  },
  'aetheria-luxury-parfum-branding': {
    uz: {
      title: 'AETHERIA — Hashamatli Parfumeriya Brending Identikasi',
      description: "Aetheria Parfum Paris brendi uchun to'liq brend arxitekturasi va qadoqlash dizayni. Minimalist lyuks tipografiya va oltin bosmali brend belgisi.",
    },
    ru: {
      title: 'AETHERIA — Премиальный Брендинг Парфюмерии',
      description: 'Комплексная брендовая архитектура и дизайн упаковки для Aetheria Parfum Paris. Минималистичная премиальная типографика и тиснение золотом.',
    },
    en: {
      title: 'AETHERIA — Luxury Fragrance Brand Identity',
      description: 'Comprehensive brand architecture and packaging design for Aetheria Parfum Paris. Minimalist luxury typography and custom gold foil logo mark.',
    }
  },
  'neo-fintech-banking-app': {
    uz: {
      title: 'NEO-FINTECH — Yangi Avlod Bank Mobil Ilovasi UI/UX',
      description: "Kelajak bank paneli va mobil kripto hamyon. Glassmorphism qorong'u interfeys va biometrik auth oqimi.",
    },
    ru: {
      title: 'NEO-FINTECH — Мобильный Банкинг Нового Поколения',
      description: 'Футуристичный банковский дашборд и криптовалютный кошелек. Тёмный стеклянный интерфейс и биометрическая авторизация.',
    },
    en: {
      title: 'NEO-FINTECH — NextGen Banking Mobile App',
      description: 'Futuristic banking dashboard and mobile crypto wallet. Dark mode glassmorphism interface with micro-interactions.',
    }
  },
  'chronos-futuristic-watch-3d': {
    uz: {
      title: 'CHRONOS 3D — Kelajak Soati CGI Vizualizatsiyasi',
      description: "Chronos Shveysariya soatsozlari uchun yuqori aniqlikdagi 3D CGI mahsulot animatsiyasi va metall teksturalari.",
    },
    ru: {
      title: 'CHRONOS 3D — Футуристичная 3D Визуализация Часов',
      description: 'Высокопрецизионная 3D CGI анимация продукта для швейцарского часового бренда Chronos.',
    },
    en: {
      title: 'CHRONOS 3D — Futuristic Timepiece Motion Visualizer',
      description: 'High-precision 3D CGI product animation for Swiss watchmaker Chronos. Photorealistic metallic textures.',
    }
  }
};

export const serviceTranslations: Record<string, Record<Language, { title: string; desc: string }>> = {
  'Graphic Design': {
    uz: { title: 'Grafik Dizayn va Key Visual', desc: "Yuqori ta'sirga ega vizual konseptlar, brutalist poster art va reklama grafikasi." },
    ru: { title: 'Графический Дизайн и Ключевые Визуалы', desc: 'Высокоэффективные визуалы, брутальный постер-арт и рекламные материалы.' },
    en: { title: 'Graphic Design & Key Visuals', desc: 'High-impact key visuals, brutalist poster art, and advertising graphics.' }
  },
  'Branding': {
    uz: { title: 'Brending va Vizual Identika', desc: "To'liq brend tizimi, ko'rsatmalar, lyuks logo belgilari va qadoqlash dizayni." },
    ru: { title: 'Брендинг и Визуальная Айдентика', desc: 'Комплексные бренд-системы, руководства, премиальные логотипы и упаковка.' },
    en: { title: 'Branding & Visual Identity', desc: 'Complete brand systems, guidelines, luxury logo marks, and packaging.' }
  },
  'UI/UX': {
    uz: { title: 'UI/UX Dizayn va Veb Tizimlar', desc: "Futuristik qorong'u rejimdagi veb-interfeyslar, mobil ilovalar va Figma tizimlari." },
    ru: { title: 'UI/UX Дизайн и Веб-Системы', desc: 'Футуристичные темные веб-интерфейсы, мобильные приложения и дизайн-системы.' },
    en: { title: 'UI/UX Design & Web Systems', desc: 'Futuristic dark-mode web interfaces, mobile apps, and Figma design systems.' }
  },
  '3D Design': {
    uz: { title: '3D CGI va Mahsulot Renderingi', desc: 'Fotorealistik 3D renderlar, CGI muhitlar va Octane shaderlar.' },
    ru: { title: '3D CGI и Рендеринг Продуктов', desc: 'Фотореалистичный 3D рендеринг, CGI окружение и шейдеры Octane.' },
    en: { title: '3D Design & CGI Renders', desc: 'Photorealistic product rendering, CGI environments, and Octane shaders.' }
  },
  'Motion Design': {
    uz: { title: 'Motion Dizayn va Animatsiya', desc: 'Dinamik tijorat treylerlari, logo animatsiyalari va efir grafikasi.' },
    ru: { title: 'Моушн Дизайн и Анимация', desc: 'Динамичные рекламные трейлеры, анимация логотипов и эфирная графика.' },
    en: { title: 'Motion Design & Animation', desc: 'Dynamic commercial trailers, logo animation, and broadcast graphics.' }
  },
  'Video Editing': {
    uz: { title: 'Video Montaj va Rang Korreksiyasi', desc: "Kinematografik rang berish, tez sur'atli promo kadrlar va ovoz dizayni." },
    ru: { title: 'Видеомонтаж и Цветокоррекция', desc: 'Кинематографичная цветокоррекция, динамичные промо-ролики и саунд-дизайн.' },
    en: { title: 'Video Editing & Color Grading', desc: 'Cinematic color grading, fast-paced promo cuts, and sound design.' }
  },
  'Marketing Design': {
    uz: { title: 'Marketing va Reklama Dizayni', desc: "Konversiyaga yo'naltirilgan ijtimoiy tarmoq reklamalari, prezentatsiyalar va bannerlar." },
    ru: { title: 'Маркетинговый Дизайн', desc: 'Рекламные визуалы для соцсетей, питч-деки и баннеры для конверсии.' },
    en: { title: 'Marketing & Ad Design', desc: 'Conversion-driven social media ads, pitch decks, and digital banners.' }
  },
  'Creative Direction': {
    uz: { title: "Kreativ Yo'nalish va Art Direktsiya", desc: "Boshidan oxirigacha badiiy qarash, kampaniya pozitsionirovalash va strategiya." },
    ru: { title: 'Креативная Дирекция', desc: 'Комплексное арт-направление, позиционирование кампаний и стратегия.' },
    en: { title: 'Creative Direction', desc: 'End-to-end artistic vision, campaign positioning, and brand strategy.' }
  }
};

export const categoryTranslations: Record<string, Record<Language, string>> = {
  'All': { uz: 'Barchasi', ru: 'Все', en: 'All' },
  'Branding': { uz: 'Brending', ru: 'Брендинг', en: 'Branding' },
  'Graphic Design': { uz: 'Grafik Dizayn', ru: 'Граф. Дизайн', en: 'Graphic Design' },
  'Poster': { uz: 'Poster Art', ru: 'Постер Арт', en: 'Poster Art' },
  'UI/UX': { uz: 'UI/UX Dizayn', ru: 'UI/UX Дизайн', en: 'UI/UX Design' },
  '3D': { uz: '3D & CGI', ru: '3D & CGI', en: '3D & CGI' },
  'Motion': { uz: 'Motion Dizayn', ru: 'Моушн Дизайн', en: 'Motion Design' },
  'Video': { uz: 'Video Montaj', ru: 'Видеомонтаж', en: 'Video Editing' },
  'Photography': { uz: 'Fotosurat', ru: 'Фотография', en: 'Photography' },
  'Other': { uz: 'Boshqa', ru: 'Другое', en: 'Other' },
};

export const translations = {
  uz: {
    // Nav
    nav_home: "Bosh sahifa",
    nav_works: "Portfolio",
    nav_services: "Xizmatlar",
    nav_about: "Men haqimda",
    nav_contact: "Aloqa",
    nav_request: "Loyiha buyurtmasi",
    nav_client: "Mijoz portali",
    nav_admin: "Admin CMS",
    
    // Hero
    hero_badge: "Yangi loyihalar uchun ochiqman",
    hero_title_1: "GRAPHIC DESIGNER &",
    hero_title_2: "CREATIVE DIGITAL ARTIST",
    hero_subtitle: "Jahon darajasidagi vizual brending, 3D art va zamonaviy raqamli mahsulotlar yaratuvchi shaxsiy studio platformasi.",
    hero_cta_primary: "Ishlarimni ko'rish",
    hero_cta_secondary: "Loyiha boshlash",
    
    // Stats
    stat_experience: "Yillik tajriba",
    stat_projects: "Yakunlangan loyihalar",
    stat_clients: "Mamnun mijozlar",
    stat_directions: "Dizayn yo'nalishlari",
    
    // Services
    services_title: "Xizmatlarim",
    services_subtitle: "Zamonaviy bizneslar uchun vizual va raqamli studio yechimlari",
    
    // Works
    works_title: "Tanlangan loyihalar",
    works_subtitle: "Konseptdan yakuniy natijagacha premium case studylar",
    works_all: "Barchasi",
    works_search_placeholder: "Loyiha nomi bo'yicha qidirish...",
    works_sort_newest: "Eng yangi",
    works_sort_popular: "Eng ommabop",
    works_sort_likes: "Eng ko'p yoqqan",
    works_sort_views: "Eng ko'p ko'rilgan",
    works_empty: "Ushbu kategoriya bo'yicha loyihalar topilmadi",
    
    // Project Detail
    proj_client: "Mijoz",
    proj_year: "Yil",
    proj_category: "Kategoriya",
    proj_services: "Xizmatlar",
    proj_tools: "Ishlatilgan qurollar",
    proj_process: "Loyiha jarayoni",
    proj_before_after: "Oldin va Keyin taqqoslash",
    proj_final: "Yakuniy natija",
    proj_downloads: "Yuklab olish fayllari",
    proj_like: "Yoqdi",
    proj_save: "Saqlash",
    proj_saved: "Saqlandi",
    proj_share: "Ulashish",
    proj_download_btn: "Faylni yuklab olish",
    proj_download_disabled: "Yuklab olish cheklangan",
    proj_download_req_email: "Email orqali yuklash",
    proj_download_req_approval: "So'rov yuborish kerak",
    
    // Design Request & AI Brief
    request_title: "Yangi loyiha so'rovi",
    request_subtitle: "O'z g'oyangizni kiritib professional brief va taxminiy narx oling",
    request_tab_form: "Standart so'rovnoma",
    request_tab_ai: "AI Brief Yordamchisi",
    request_name: "Ismingiz",
    request_email: "Email manzilingiz",
    request_phone: "Telefon raqamingiz",
    request_services_needed: "Sizga nima kerak?",
    request_details: "Loyiha haqida batafsil",
    request_target: "Maqsadli auditoriya",
    request_style: "Kerakli stil va kayfiyat",
    request_deadline: "Muddat (Deadline)",
    request_budget: "Taxminiy byudjet ($)",
    request_submit: "So'rovni yuborish",
    request_ai_chat_placeholder: "G'oyangizni yozing (masalan: Mercedes AMG uchun premium Instagram poster kerak)...",
    request_ai_generate: "Professional Brief yaratish",
    request_ai_generated_brief: "AI Tomonidan Yaratilgan Project Brief",

    // Client Portal
    client_title: "Mijoz Portali",
    client_enter_code: "Maxfiy loyiha kodini kiriting",
    client_code_placeholder: "Masalan: AMG-2026",
    client_access_btn: "Portalga kirish",
    client_status_pending: "Kutilmoqda",
    client_status_in_progress: "Jarayonda",
    client_status_review: "Ko'rib chiqilmoqda",
    client_status_completed: "Yakunlandi",
    client_deliverables: "Loyiha fayllari",
    client_feedback_title: "Mijoz mulohazalari va feedback",
    client_send_feedback: "Mulohaza yuborish",
    client_approve_project: "Loyihani tasdiqlash va qabul qilish",

    // Analytics (Section 31)
    analytics_dashboard: "Executive Analytics Dashboard",
    analytics_overview: "Umumiy ko'rsatkichlar",
    analytics_views: "Jami ko'rishlar",
    analytics_unique: "Unique visitorlar",
    analytics_likes: "Jami likelar",
    analytics_saves: "Jami saqlashlar",
    analytics_downloads: "Yuklab olishlar",
    analytics_requests: "So'rovlar",
    analytics_messages: "Xabarlar",
    analytics_online: "Hozir saytda onlayn",
    analytics_top_liked: "Eng ko'p yoqqan loyihalar",
    analytics_top_viewed: "Eng ko'p ko'rilgan loyihalar",
    analytics_top_downloaded: "Eng ko'p yuklab olinganlar",
    analytics_top_saved: "Eng ko'p saqlanganlar",
    analytics_top_shared: "Eng ko'p ulashilganlar",
    analytics_traffic_sources: "Trafik manbalari",
    analytics_devices: "Qurilmalar va OS",
    analytics_browsers: "Brauzerlar",
    analytics_countries: "Mamlakatlar",
    analytics_export_csv: "CSV faylida yuklab olish",
    analytics_export_json: "JSON faylida yuklab olish",
    
    // Contact
    contact_title: "Bog'lanish",
    contact_subtitle: "Yangi loyihalar, kollaboratsiyalar yoki savollar uchun ochiqman",
    contact_send_now: "Hozir yuborish",
    contact_schedule: "Belgilangan vaqtga rejalashtirish",
    contact_phone_copied: "Telefon raqam nusxalandi!",
    contact_success_msg: "Xabaringiz muvaffaqiyatli yuborildi!",
    
    // General / Protection
    watermark_notice: "PORTFOLIO PREVIEW — OTAJON JAHONGIROV",
    protection_toast: "Visual mualliflik huquqi himoyalangan (Otajon Jahongirov Studio)",
    cv_download: "CV faylini yuklash",
    admin_access: "Admin paneli",
    tg_contact_btn: "Telegram orqali bog'lanish",
    tg_channel: "Telegram Kanal",
    tg_direct: "Telegram Lichka",
    about_role: "Kreativ Rahbar va Art Direktor",
    about_bio: "3+ yildan ortiq vaqt davomida vizual brending, 3D CGI art, giperkar posterlar va zamonaviy raqamli studiya yechimlarini yaratish bilan shug'ullanaman. Editorial aniqlik, dark-luxury va kinematografik motion-grafika bo'yicha e'tirof etilganman.",
    about_skills_title: "Asosiy mahorat va dasturlar",
    about_exp_title: "Tajriba va Faoliyat",
    contact_tg_title: "Telegram Orqali Murojaat",
    contact_tg_desc: "Savollaringiz bo'lsa darhol yozing — 10 daqiqada javob beraman",
    verified_studio: "Tasdiqlangan Kreativ Studio va Litsenziyalangan Assetlar"
  },
  ru: {
    // Nav
    nav_home: "Главная",
    nav_works: "Портфолио",
    nav_services: "Услуги",
    nav_about: "Обо мне",
    nav_contact: "Контакты",
    nav_request: "Заказать проект",
    nav_client: "Клиентский портал",
    nav_admin: "Админ CMS",
    
    // Hero
    hero_badge: "Открыт для новых проектов",
    hero_title_1: "GRAPHIC DESIGNER &",
    hero_title_2: "CREATIVE DIGITAL ARTIST",
    hero_subtitle: "Персональная студийная платформа по созданию премиального визуального брендинга, 3D арта и современных цифровых продуктов.",
    hero_cta_primary: "Смотреть работы",
    hero_cta_secondary: "Начать проект",
    
    // Stats
    stat_experience: "Опыт работы (лет)",
    stat_projects: "Завершенных проектов",
    stat_clients: "Довольных клиентов",
    stat_directions: "Направлений дизайна",
    
    // Services
    services_title: "Мои услуги",
    services_subtitle: "Визуальные и цифровые решения студийного уровня для современного бизнеса",
    
    // Works
    works_title: "Избранные работы",
    works_subtitle: "Премиальные кейсы от концепта до финального результата",
    works_all: "Все",
    works_search_placeholder: "Поиск по названию проекта...",
    works_sort_newest: "Сначала новые",
    works_sort_popular: "Популярные",
    works_sort_likes: "Больше лайков",
    works_sort_views: "Больше просмотров",
    works_empty: "Проекты в данной категории не найдены",
    
    // Project Detail
    proj_client: "Клиент",
    proj_year: "Год",
    proj_category: "Категория",
    proj_services: "Услуги",
    proj_tools: "Инструменты",
    proj_process: "Процесс работы",
    proj_before_after: "Сравнение До и После",
    proj_final: "Финальный результат",
    proj_downloads: "Файлы для скачивания",
    proj_like: "Нравится",
    proj_save: "Сохранить",
    proj_saved: "Сохранено",
    proj_share: "Поделиться",
    proj_download_btn: "Скачать файл",
    proj_download_disabled: "Скачивание ограничено",
    proj_download_req_email: "Скачать через Email",
    proj_download_req_approval: "Требуется запрос",
    
    // Design Request & AI Brief
    request_title: "Запрос на проект",
    request_subtitle: "Введите вашу идею и получите профессиональный бриф и оценку",
    request_tab_form: "Стандартная анкета",
    request_tab_ai: "AI Бриф Ассистент",
    request_name: "Ваше имя",
    request_email: "Ваш Email",
    request_phone: "Ваш телефон",
    request_services_needed: "Что вам требуется?",
    request_details: "Подробности о проекте",
    request_target: "Целевая аудитория",
    request_style: "Желаемый стиль и настроение",
    request_deadline: "Сроки (Deadline)",
    request_budget: "Примерный бюджет ($)",
    request_submit: "Отправить запрос",
    request_ai_chat_placeholder: "Опишите вашу идею (например: Нужен премиальный постер Mercedes AMG для Instagram)...",
    request_ai_generate: "Сгенерировать профессиональный бриф",
    request_ai_generated_brief: "Сгенерированный AI Project Brief",

    // Client Portal
    client_title: "Портал Клиента",
    client_enter_code: "Введите секретный код проекта",
    client_code_placeholder: "Например: AMG-2026",
    client_access_btn: "Войти в портал",
    client_status_pending: "В ожидании",
    client_status_in_progress: "В работе",
    client_status_review: "На проверке",
    client_status_completed: "Завершен",
    client_deliverables: "Файлы проекта",
    client_feedback_title: "Обратная связь и комментарии",
    client_send_feedback: "Отправить комментарий",
    client_approve_project: "Утвердить и принять проект",

    // Analytics (Section 31)
    analytics_dashboard: "Executive Analytics Dashboard",
    analytics_overview: "Общие показатели",
    analytics_views: "Всего просмотров",
    analytics_unique: "Уникальные посетители",
    analytics_likes: "Всего лайков",
    analytics_saves: "Всего сохранений",
    analytics_downloads: "Скачивания",
    analytics_requests: "Запросы",
    analytics_messages: "Сообщения",
    analytics_online: "Сейчас на сайте",
    analytics_top_liked: "Самые популярные работы",
    analytics_top_viewed: "Самые просматриваемые",
    analytics_top_downloaded: "Самые скачиваемые",
    analytics_top_saved: "Самые сохраняемые",
    analytics_top_shared: "Часто репостили",
    analytics_traffic_sources: "Источники трафика",
    analytics_devices: "Устройства и ОС",
    analytics_browsers: "Браузеры",
    analytics_countries: "Страны",
    analytics_export_csv: "Экспорт в CSV",
    analytics_export_json: "Экспорт в JSON",
    
    // Contact
    contact_title: "Контакты",
    contact_subtitle: "Открыт для интересных проектов, коллабораций и вопросов",
    contact_send_now: "Отправить сейчас",
    contact_schedule: "Запланировать отправку",
    contact_phone_copied: "Номер телефона скопирован!",
    contact_success_msg: "Ваше сообщение успешно отправлено!",
    
    // General / Protection
    watermark_notice: "PORTFOLIO PREVIEW — OTAJON JAHONGIROV",
    protection_toast: "Визуальные права защищены (Otajon Jahongirov Studio)",
    cv_download: "Скачать резюме (CV)",
    admin_access: "Панель администратора",
    tg_contact_btn: "Связаться через Telegram",
    tg_channel: "Канал Telegram",
    tg_direct: "Личный Telegram",
    about_role: "Креативный директор & Арт-директор",
    about_bio: "Более 3+ лет студийной практики в создании визуальной айдентики, 3D CGI арта, постеров гиперкаров и цифровых продуктов. Признание за редакционную точность, тёмный люкс и кинематографичный моушн-дизайн.",
    about_skills_title: "Ключевые навыки и ПО",
    about_exp_title: "Опыт работы",
    contact_tg_title: "Связаться в Telegram",
    contact_tg_desc: "Есть вопросы? Пишите напрямую — отвечу в течение 10 минут",
    verified_studio: "Верифицированная Креативная Студия & Лицензионные Ассеты"
  },
  en: {
    // Nav
    nav_home: "Home",
    nav_works: "Portfolio",
    nav_services: "Services",
    nav_about: "About Me",
    nav_contact: "Contact",
    nav_request: "Start Project",
    nav_client: "Client Portal",
    nav_admin: "Admin CMS",
    
    // Hero
    hero_badge: "Available for new projects",
    hero_title_1: "GRAPHIC DESIGNER &",
    hero_title_2: "CREATIVE DIGITAL ARTIST",
    hero_subtitle: "A world-class personal creative studio platform crafting visual brand identities, 3D artwork, and cutting-edge digital experiences.",
    hero_cta_primary: "Explore Work",
    hero_cta_secondary: "Start a Project",
    
    // Stats
    stat_experience: "Years Experience",
    stat_projects: "Projects Completed",
    stat_clients: "Satisfied Clients",
    stat_directions: "Design Disciplines",
    
    // Services
    services_title: "Creative Services",
    services_subtitle: "Studio-grade visual and digital solutions engineered for modern brands",
    
    // Works
    works_title: "Featured Works",
    works_subtitle: "Curated case studies from conceptualization to final execution",
    works_all: "All",
    works_search_placeholder: "Search projects by title...",
    works_sort_newest: "Newest First",
    works_sort_popular: "Most Popular",
    works_sort_likes: "Most Liked",
    works_sort_views: "Most Viewed",
    works_empty: "No projects found in this category",
    
    // Project Detail
    proj_client: "Client",
    proj_year: "Year",
    proj_category: "Category",
    proj_services: "Services",
    proj_tools: "Tools Used",
    proj_process: "Design Process",
    proj_before_after: "Before & After Comparison",
    proj_final: "Final Outcome",
    proj_downloads: "Downloadable Files",
    proj_like: "Like",
    proj_save: "Save",
    proj_saved: "Saved",
    proj_share: "Share",
    proj_download_btn: "Download Asset",
    proj_download_disabled: "Download Disabled",
    proj_download_req_email: "Download via Email",
    proj_download_req_approval: "Request Required",
    
    // Design Request & AI Brief
    request_title: "Project Inquiry",
    request_subtitle: "Submit your scope to receive a formal project brief & estimation",
    request_tab_form: "Interactive Form",
    request_tab_ai: "AI Brief Assistant",
    request_name: "Your Name",
    request_email: "Your Email",
    request_phone: "Your Phone",
    request_services_needed: "What do you need?",
    request_details: "Project Description",
    request_target: "Target Audience",
    request_style: "Desired Style & Mood",
    request_deadline: "Target Deadline",
    request_budget: "Estimated Budget ($)",
    request_submit: "Submit Inquiry",
    request_ai_chat_placeholder: "Describe your project idea (e.g. Need a dark luxury poster for Mercedes AMG on Instagram)...",
    request_ai_generate: "Generate Formal Brief",
    request_ai_generated_brief: "AI Generated Project Brief",

    // Client Portal
    client_title: "Client Portal",
    client_enter_code: "Enter your private project access code",
    client_code_placeholder: "e.g. AMG-2026",
    client_access_btn: "Access Portal",
    client_status_pending: "Pending",
    client_status_in_progress: "In Progress",
    client_status_review: "Under Review",
    client_status_completed: "Completed",
    client_deliverables: "Project Deliverables",
    client_feedback_title: "Client Feedback & Notes",
    client_send_feedback: "Submit Feedback",
    client_approve_project: "Approve & Accept Project",

    // Analytics (Section 31)
    analytics_dashboard: "Executive Analytics Dashboard",
    analytics_overview: "System Performance Overview",
    analytics_views: "Total Views",
    analytics_unique: "Unique Visitors",
    analytics_likes: "Total Likes",
    analytics_saves: "Total Saves",
    analytics_downloads: "Total Downloads",
    analytics_requests: "Inquiries",
    analytics_messages: "Messages",
    analytics_online: "Live Online Visitors",
    analytics_top_liked: "Top Liked Projects",
    analytics_top_viewed: "Most Viewed Projects",
    analytics_top_downloaded: "Most Downloaded",
    analytics_top_saved: "Most Saved Projects",
    analytics_top_shared: "Most Shared Projects",
    analytics_traffic_sources: "Traffic Acquisition Sources",
    analytics_devices: "Device & OS Breakdown",
    analytics_browsers: "Browser Distribution",
    analytics_countries: "Geographic Location",
    analytics_export_csv: "Export CSV Report",
    analytics_export_json: "Export JSON Data",
    
    // Contact
    contact_title: "Get in Touch",
    contact_subtitle: "Available for high-impact creative direction, branding & digital design commissions",
    contact_send_now: "Send Message Now",
    contact_schedule: "Schedule Message Delivery",
    contact_phone_copied: "Phone number copied to clipboard!",
    contact_success_msg: "Your message has been delivered successfully!",
    
    // General / Protection
    watermark_notice: "PORTFOLIO PREVIEW — OTAJON JAHONGIROV",
    protection_toast: "Visual intellectual property protected (Otajon Jahongirov Studio)",
    cv_download: "Download Resume (CV)",
    admin_access: "Admin Control Center",
    tg_contact_btn: "Contact via Telegram",
    tg_channel: "Telegram Channel",
    tg_direct: "Direct Telegram",
    about_role: "Creative Lead & Art Director",
    about_bio: "Over 3+ years of dedicated studio practice crafting visual identities, hypercar posters, photorealistic 3D artwork, and digital studio solutions. Recognized for editorial precision, dark luxury styling, and cinematic motion graphics.",
    about_skills_title: "Core Capabilities & Software Mastery",
    about_exp_title: "Professional Timeline",
    contact_tg_title: "Contact via Telegram",
    contact_tg_desc: "Have a project inquiry? Message directly — 10 min response time",
    verified_studio: "Verified Creative Studio & Licensed Digital Assets"
  }
};
