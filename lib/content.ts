export type Locale = "ja" | "en";
export type PageKey =
    | "home"
    | "business"
    | "cad"
    | "jigs-service"
    | "engineers"
    | "mold"
    | "products"
    | "injection-products"
    | "welded-products"
    | "jigs-products"
    | "company"
    | "history"
    | "contact"
    | "careers"
    | "it-careers"
    | "apply"
    | "news"
    | "it-home"
    | "it-service";
export const paths: Record<PageKey, string> = {
    home: "",
    business: "business",
    cad: "services/cad-cam",
    "jigs-service": "services/vibration-welding-jigs",
    engineers: "services/molding-engineers",
    mold: "services/injection-mold",
    products: "products",
    "injection-products": "products/injection-molded",
    "welded-products": "products/vibration-welded",
    "jigs-products": "products/jigs",
    company: "company",
    history: "history",
    contact: "contact",
    careers: "careers/cad-cam",
    "it-careers": "careers/it-engineers",
    apply: "careers/apply",
    news: "news",
    "it-home": "it",
    "it-service": "services/it-engineers",
};
export const nav: {
    key: PageKey;
    ja: string;
    en: string;
    children?: PageKey[];
}[] = [
    { key: "home", ja: "ホーム", en: "Home" },
    { key: "business", ja: "事業内容", en: "Services", children: ["cad", "jigs-service", "engineers", "mold", "it-service"] },
    { key: "products", ja: "製品紹介", en: "Products", children: ["injection-products", "welded-products", "jigs-products"] },
    { key: "company", ja: "会社概要", en: "Company" },
    { key: "history", ja: "沿革", en: "History" },
    { key: "contact", ja: "お問い合わせ", en: "Contact" },
    { key: "apply", ja: "求人募集", en: "Careers", children: ["careers", "it-careers"] },
    { key: "news", ja: "お知らせ", en: "News" },
];
export const navLabels: Record<PageKey, { ja: string; en: string }> = {
    home: { ja: "ホーム 金型製作・射出成型", en: "Home · Moldmaking and injection molding" },
    business: { ja: "事業内容", en: "Services" },
    cad: { ja: "CAD・CAM 設計請負 人材派遣（株式会社プラネックス技研）", en: "CAD/CAM Design Outsourcing and Staffing (Planex Giken)" },
    "jigs-service": { ja: "振動溶着治具・治工具（株式会社プラネックス）", en: "Vibration-Welding Jigs and Tooling (Planex)" },
    engineers: { ja: "金型加工機・成形エンジニア人材派遣（株式会社プラネックス技研）", en: "Mold and Molding Engineer Staffing (Planex Giken)" },
    mold: { ja: "射出成形金型（株式会社プラネックス）", en: "Injection Molds (Planex)" },
    products: { ja: "製品紹介", en: "Products" },
    "injection-products": { ja: "射出成型品", en: "Injection-Molded Products" },
    "welded-products": { ja: "振動溶着品", en: "Vibration-Welded Products" },
    "jigs-products": { ja: "振動溶着治具・治工具", en: "Vibration-Welding Jigs and Tooling" },
    company: { ja: "会社概要", en: "Company Profile" },
    history: { ja: "沿革", en: "History" },
    contact: { ja: "お問い合わせ", en: "Contact" },
    careers: { ja: "求人募集 CAD・CAM", en: "CAD/CAM Recruitment" },
    "it-careers": { ja: "求人募集 ITエンジニア", en: "IT Engineer Recruitment" },
    apply: { ja: "求人応募 一般", en: "General Job Application" },
    news: { ja: "お知らせ", en: "News" },
    "it-home": { ja: "ホーム IT関連", en: "Home · IT-related" },
    "it-service": { ja: "アプリ開発・ITエンジニアの派遣業務（株式会社プラネックス技研）", en: "Application Development and IT Engineer Staffing (Planex Giken)" },
};
export const titles: Record<PageKey, {
    ja: string;
    en: string;
}> = {
    home: { ja: "ホーム 金型製作・射出成型", en: "Home · Moldmaking and injection molding" },
    business: { ja: "事業内容", en: "Our Services" },
    cad: { ja: "CAD・CAM 人材派遣 設計請負", en: "CAD/CAM Staffing and Design Outsourcing" },
    "jigs-service": { ja: "振動溶着治具・治工具", en: "Vibration-Welding Jigs and Tooling" },
    engineers: { ja: "金型加工・成形エンジニア 人材派遣", en: "Mold and Molding Engineer Staffing" },
    mold: { ja: "射出成形金型(簡易金型)", en: "Injection Molds (Prototype Molds)" },
    products: { ja: "製品紹介", en: "Products" },
    "injection-products": { ja: "成形品各種", en: "Injection-Molded Products" },
    "welded-products": { ja: "振動溶着品", en: "Vibration-Welded Products" },
    "jigs-products": { ja: "振動溶着治具・治工具", en: "Vibration-Welding Jigs and Tooling" },
    company: { ja: "会社概要", en: "Company Profile" },
    history: { ja: "これまでの軌跡", en: "Our History" },
    contact: { ja: "お問い合わせ", en: "Contact" },
    careers: { ja: "CAD/CAM設計者の募集", en: "CAD/CAM Designer Recruitment" },
    "it-careers": { ja: "ITエンジニアの募集", en: "IT Engineer Recruitment" },
    apply: { ja: "一緒に働きましょう", en: "Join Our Team" },
    news: { ja: "お知らせ", en: "News" },
    "it-home": { ja: "ホーム IT関連", en: "Home · IT-related" },
    "it-service": { ja: "アプリ開発・ITエンジニアの派遣業務", en: "Application Development and IT Engineer Staffing" },
};
export const seoDescriptions: Record<PageKey, { ja: string; en: string }> = {
    home: {
        ja: "株式会社プラネックスは、簡易金型製作、射出成形、CAD/CAM請負・派遣、振動溶着治具製作で商品開発を支援します。",
        en: "Planex supports product development with prototype moldmaking, injection molding, CAD/CAM services, staffing and vibration-welding jigs.",
    },
    business: {
        ja: "株式会社プラネックスグループの簡易金型、射出成形、治工具、CAD/CAM、人材派遣などの事業をご紹介します。",
        en: "Explore Planex Group services in prototype molds, injection molding, jigs and tools, CAD/CAM, and staffing.",
    },
    cad: {
        ja: "株式会社プラネックス技研のCAD/CAM設計請負、人材派遣、製品開発支援についてご紹介します。",
        en: "Learn about Planex Giken’s CAD/CAM design outsourcing, engineer staffing and product development support.",
    },
    "jigs-service": {
        ja: "株式会社プラネックスの振動溶着治具・治工具の設計、製作と試作品の溶着作業をご紹介します。",
        en: "Learn about Planex vibration-welding jig and tooling design, production, and prototype welding services.",
    },
    engineers: {
        ja: "金型加工・成形エンジニアなど、製造現場を支援する人材派遣サービスをご紹介します。",
        en: "Explore staffing services for moldmaking and molding engineers supporting manufacturing operations.",
    },
    mold: {
        ja: "簡易金型の製作から射出成形まで、株式会社プラネックスの金型製作サービスをご紹介します。",
        en: "Learn about Planex prototype moldmaking services, from mold production through injection molding.",
    },
    products: {
        ja: "株式会社プラネックスの射出成形品、振動溶着品、振動溶着治具・治工具をご紹介します。",
        en: "Browse Planex injection-molded products, vibration-welded products, jigs and tooling.",
    },
    "injection-products": {
        ja: "株式会社プラネックスが製作する射出成形品をご紹介します。",
        en: "View injection-molded products made by Planex.",
    },
    "welded-products": {
        ja: "振動溶着を必要とする自動車部品など、株式会社プラネックスの振動溶着品をご紹介します。",
        en: "View Planex vibration-welded products, including automotive components that use vibration welding.",
    },
    "jigs-products": {
        ja: "株式会社プラネックスの振動溶着治具・治工具をご紹介します。掲載写真の一部は準備中です。",
        en: "Learn about Planex vibration-welding jigs and tooling. Some product photos are still being prepared.",
    },
    company: {
        ja: "株式会社プラネックスと株式会社プラネックス技研の会社概要、所在地、連絡先をご案内します。",
        en: "Find company information, location and contact details for Planex and Planex Giken.",
    },
    history: {
        ja: "株式会社プラネックスの創業から現在までの沿革をご紹介します。",
    en: "Read about Planex’s history, from its founding to the present.",
    },
    contact: {
        ja: "株式会社プラネックスへのお問い合わせはこちら。",
        en: "Contact Planex.",
    },
    careers: {
        ja: "株式会社プラネックス技研のCAD/CAM設計者募集情報をご案内します。",
        en: "View CAD/CAM designer recruitment information for Planex Giken.",
    },
    "it-careers": {
        ja: "株式会社プラネックスのITエンジニア募集要項をご案内します。",
        en: "View the IT engineer vacancy details listed by Planex.",
    },
    apply: {
        ja: "株式会社プラネックスへの求人応募はこちら。",
        en: "Apply for a position at Planex.",
    },
    news: {
        ja: "株式会社プラネックスからのお知らせ、休業日などの情報をご案内します。",
        en: "Read Planex announcements, including information about scheduled closures.",
    },
    "it-home": {
        ja: "株式会社プラネックスのIT関連事業、アプリ開発、ネットワーク構築をご紹介します。",
        en: "Explore Planex IT services, including application development and network setup.",
    },
    "it-service": {
        ja: "アプリ開発とITエンジニア派遣など、株式会社プラネックスのIT関連業務をご紹介します。",
        en: "Learn about Planex IT services, including application development and IT engineer staffing.",
    },
};
export const tagline = {
    ja: "アプリ開発・派遣　CAD/CAM請負・派遣　簡易金型製作まで商品開発のベストパートナー",
    en: "Your product development partner — application development and staffing, CAD/CAM outsourcing and staffing, and prototype moldmaking.",
};

export const t = (locale: Locale, japanese: string, english: string) =>
  locale === "ja" ? japanese : english;
export const serviceCards = [
    { key: "cad" as const, ja: "CAD・CAM 設計請負 人材派遣（株式会社プラネックス技研）", en: "CAD/CAM Design Outsourcing and Staffing (Planex Giken)", descJa: "CAD・CAM 設計請負 人材派遣", descEn: "CAD/CAM design outsourcing and staffing." },
    { key: "jigs-service" as const, ja: "振動溶着治具・治工具（株式会社プラネックス）", en: "Vibration-Welding Jigs and Tooling (Planex)", descJa: "振動溶着治具・治工具", descEn: "Vibration-welding jigs and tooling." },
    { key: "engineers" as const, ja: "金型加工機・成形エンジニア人材派遣（株式会社プラネックス技研）", en: "Mold and Molding Engineer Staffing (Planex Giken)", descJa: "金型加工・成形エンジニア 人材派遣", descEn: "Mold and molding engineer staffing." },
    { key: "mold" as const, ja: "射出成形金型（株式会社プラネックス）", en: "Injection Molds (Planex)", descJa: "射出成形金型（簡易金型）", descEn: "Injection molds (prototype molds)." },
];
export const products = [
    { key: "injection-products" as const, ja: "射出成型品", en: "Injection-Molded Products", labels: ["cover", "インペラ", "クランプ2次成形品", "ケース.jpgの複製", "BOX", "振動溶着品"] },
    { key: "welded-products" as const, ja: "振動溶着品", en: "Vibration-Welded Products", labels: ["振動溶着品"] },
    { key: "jigs-products" as const, ja: "振動溶着治具・治工具", en: "Vibration-Welding Jigs and Tooling", labels: ["試作用振動溶着治具 UPPER", "試作用振動溶着治具 LOWER"] },
];
export const itCareerDetails = [
    {
        jaLabel: "業務内容",
        enLabel: "Responsibilities",
        ja: "ITエンジニア：社内・社外向けシステムの開発・構築・保守",
        en: "IT engineer: develop, build and maintain systems for internal and external users.",
    },
    {
        jaLabel: "要件",
        enLabel: "Qualifications",
        ja: "ITエンジニア：プログラミング言語（Python、C言語、PHP）のいずれかに多少の知識があればなお可。但し、なくても可。",
        en: "IT engineer: Some knowledge of at least one of Python, C or PHP is preferred, but is not required.",
    },
    {
        jaLabel: "勤務時間",
        enLabel: "Working hours",
        ja: "平日 8:30～17:30",
        en: "Weekdays, 8:30 a.m.–5:30 p.m.",
    },
    {
        jaLabel: "勤務地",
        enLabel: "Work locations",
        ja: "前橋事業本部・秋田事業所",
        en: "Maebashi Business Headquarters · Akita Office",
    },
    {
        jaLabel: "休日",
        enLabel: "Days off",
        ja: "土曜日・日曜日（第1土曜日は有給休暇取得を奨励）、ゴールデンウィーク、お盆、年末年始",
        en: "Saturdays and Sundays (paid leave is encouraged on the first Saturday), Golden Week, summer holidays and year-end/New Year holidays.",
    },
    {
        jaLabel: "給与（現行・見込）",
        enLabel: "Salary (current / expected)",
        ja: "月給：基本給180,000円、住宅手当20,000円、食事手当8,000円、精勤手当5,000円、残業手当（残業時間に応じて支給）。合計213,000円。",
        en: "Monthly pay: base salary ¥180,000; housing allowance ¥20,000; meal allowance ¥8,000; diligence allowance ¥5,000; overtime pay based on hours worked. Total: ¥213,000.",
    },
    {
        jaLabel: "交通費",
        enLabel: "Transportation",
        ja: "ガソリン券支給",
        en: "Gasoline vouchers provided.",
    },
    {
        jaLabel: "加入保険",
        enLabel: "Insurance",
        ja: "健康・厚生・雇用・労災",
        en: "Health, employees’ pension, employment and workers’ compensation insurance.",
    },
    {
        jaLabel: "退職金制度",
        enLabel: "Retirement benefits",
        ja: "有り",
        en: "Available.",
    },
    {
        jaLabel: "応募・選考要領",
        enLabel: "Application and selection",
        ja: "応募書類：履歴書・卒業見込証明書。選考方法：面接。受付期間：2026年2月1日以降。担当：梅山。",
        en: "Documents: résumé and certificate of expected graduation. Selection: interview. Applications accepted from February 1, 2026. Contact: 梅山.",
    },
] as const;
export const newsItems = [
    { date: "7月8日", dateEn: "8 July", title: "夏季休暇について", titleEn: "Summer Holiday Schedule", body: "2026年夏季休暇は 　2026年8月8日(土)～2026年8月16日(日)", bodyEn: "Summer holiday: Saturday, August 8 through Sunday, August 16, 2026." },
    { date: "2025年12月1日", dateEn: "1 December 2025", title: "年末年始休暇について", titleEn: "Year-End and New Year Holiday Schedule", body: "年末年始休暇 2025年12月27日～2026年1月4日", bodyEn: "Year-end and New Year holiday: December 27, 2025 through January 4, 2026." },
    { date: "2025年7月17日", dateEn: "17 July 2025", title: "夏季休暇について", titleEn: "Summer Holiday Schedule", body: "夏季休暇 2025年8月9日(土) ～ 8月17日(日)", bodyEn: "Summer holiday: Saturday, August 9 through Sunday, August 17, 2025." },
];
export function translate(locale: Locale, japanese: string, english: string) {
    return locale === "ja" ? japanese : english;
}

export const customerStory = {
    title: { ja: "お客様への思い", en: "Our Commitment to Customers" },
    paragraphs: [
        {
            ja: "製造業において、私たちは新たな技術やプロセスを探求し、日々進化しています。",
            en: "In manufacturing, we continue to evolve every day as we explore new technologies and processes.",
        },
        {
            ja: "私たちの手で生み出される製品は、社会に貢献し、人々の生活を豊かにする力を持っています。",
            en: "The products we create have the power to contribute to society and enrich people's lives.",
        },
        {
            ja: "私たちは、品質と効率を追求し、革新的なソリューションを提供することを使命としています。",
            en: "Our mission is to pursue quality and efficiency while providing innovative solutions.",
        },
        {
            ja: "製造ラインの最適化、材料の選定、環境への配慮など、さまざまな側面で挑戦に立ち向かっています。",
            en: "We take on challenges from many angles, including optimizing production lines, selecting materials, and caring for the environment.",
        },
        {
            ja: "未来への一歩は、私たちの仕事においても重要です。新たな技術を取り入れ、持続可能な方法で製造を行うことで、より良い未来を築いていきたいと考えています。",
            en: "Taking steps toward the future matters in our work, too. By adopting new technologies and manufacturing sustainably, we hope to help build a better future.",
        },
        {
            ja: "私たは、製造業のプロフェッショナルとして、誇りを持ち、使命感を胸に、未来への一歩を踏み出していきます。",
            en: "As manufacturing professionals, we move toward the future with pride and a strong sense of purpose.",
        },
    ],
    slideAlt: [
        { ja: "製造現場での加工の様子", en: "Machining work on the production floor" },
        { ja: "製造工程で使用する切削工具", en: "Cutting tool used in the manufacturing process" },
        { ja: "CAD/CAM設計作業の様子", en: "CAD/CAM design work" },
    ],
    videoLabel: { ja: "製造現場の動画", en: "Manufacturing video" },
} as const;
