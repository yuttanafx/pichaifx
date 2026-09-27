export type Locale = "th" | "en" | "zh";

export const LOCALES: { code: Locale; label: string }[] = [
  { code: "th", label: "ไทย" },
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
];

export const LINE_OA_URL = "https://lin.ee/xhFwB2l";

export interface Dictionary {
  nav: {
    links: { href: string; label: string }[];
    login: string;
    start: string;
    openMenu: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    heroImageAlt: string;
    ctaSignal: string;
    ctaStart: string;
    ctaPerformance: string;
    stats: [string, string][];
    panelLive: string;
    panelOnline: string;
    goldGridAlt: string;
  };
  trustBar: { label: string; desc: string }[];
  performance: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    body: string;
    ctaMyfxbook: string;
    ctaHistory: string;
    metrics: { label: string; value: string }[];
    equityChartLabel: string;
  };
  products: {
    eyebrow: string;
    title: string;
    viewDetails: string;
    items: { name: string; desc: string; tag: string }[];
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    steps: { title: string; desc: string }[];
  };
  eaDownload: {
    badge: string;
    titleLine1: string;
    body: string;
    downloadBtn: string;
    connectBtn: string;
    stepsLabel: string;
    steps: string[];
  };
  connectAccount: {
    eyebrow: string;
    title: string;
    body: string;
    afterSubmitLabel: string;
    afterSubmitItems: string[];
    brokers: string[];
    successTitle: string;
    successBody: string;
    successAgain: string;
    labels: {
      name: string;
      namePlaceholder: string;
      contact: string;
      contactPlaceholder: string;
      broker: string;
      brokerPlaceholder: string;
      accountNumber: string;
      accountNumberPlaceholder: string;
      server: string;
      serverPlaceholder: string;
      note: string;
      notePlaceholder: string;
      consentPrefix: string;
      consentLinkText: string;
      consentSuffix: string;
      submit: string;
      submitting: string;
      genericError: string;
      networkError: string;
    };
  };
  copyTrading: {
    eyebrow: string;
    title: string;
    body: string;
    returnLabel: string;
    followersLabel: string;
    detailsBtn: string;
    riskLabels: Record<string, string>;
    strategies: {
      name: string;
      focus: string;
      ret: string;
      dd: string;
      risk: string;
      followers: string;
    }[];
  };
  pricing: {
    eyebrow: string;
    title: string;
    popular: string;
    sponsoredLabel: string;
    plans: {
      name: string;
      desc: string;
      price: string;
      period: string;
      features: string[];
      cta: string;
    }[];
  };
  academy: {
    eyebrow: string;
    title: string;
    viewAll: string;
    readArticle: string;
    articles: { tag: string; title: string }[];
  };
  faq: {
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  };
  contact: {
    title: string;
    body: string;
    lineButton: string;
    channels: { label: string; value: string; href?: string }[];
  };
  footer: {
    tagline: string;
    columns: { title: string; links: { label: string; href: string }[] }[];
    rights: string;
    cookieSettings: string;
    disclaimer: string;
    riskLinkText: string;
  };
  cookieConsent: {
    title: string;
    body: string;
    essentialTitle: string;
    essentialDesc: string;
    essentialAlwaysOn: string;
    analyticsTitle: string;
    analyticsDesc: string;
    acceptAll: string;
    settings: string;
    savePreferences: string;
    rejectNonEssential: string;
    privacyLink: string;
  };
  visitorCounter: { label: string };
  themeToggle: { toDark: string; toLight: string; darkMode: string; lightMode: string };
  legalShell: { backHome: string; updatedLabel: string };
  privacyPolicy: {
    metaTitle: string;
    metaDescription: string;
    pageTitle: string;
    updatedAt: string;
    noticeHtml: string;
    sections: { heading: string; bodyHtml: string }[];
  };
  terms: {
    metaTitle: string;
    metaDescription: string;
    pageTitle: string;
    updatedAt: string;
    noticeHtml: string;
    sections: { heading: string; bodyHtml: string }[];
  };
  riskWarning: {
    metaTitle: string;
    metaDescription: string;
    pageTitle: string;
    updatedAt: string;
    sections: { heading: string; bodyHtml: string }[];
    noticeHtml: string;
  };
}

const th: Dictionary = {
  nav: {
    links: [
      { href: "#platform", label: "แพลตฟอร์ม" },
      { href: "#products", label: "โปรดักต์" },
      { href: "#performance", label: "ผลการเทรด" },
      { href: "#ea-download", label: "EA เทรด" },
      { href: "#connect-account", label: "แจ้งบัญชีเทรด" },
      { href: "#academy", label: "อคาเดมี" },
      { href: "#pricing", label: "แพ็กเกจ" },
    ],
    login: "เข้าสู่ระบบ",
    start: "เริ่มต้นใช้งาน",
    openMenu: "เปิดเมนู",
  },
  hero: {
    badge: "รองรับ MT4 และ MT5 · เชื่อมต่อได้ทันที",
    titleLine1: "เทรดของคุณ ทำงานเอง",
    titleLine2: "ตลอด 24 ชั่วโมง",
    subtitle:
      "PichaiFX Autotrad เปลี่ยนกลยุทธ์การเทรดของคุณให้เป็นระบบอัตโนมัติที่ทำงานจริง พร้อมข้อมูลผลการเทรดที่ตรวจสอบได้ ไม่ใช่แค่คำโฆษณา",
    heroImageAlt:
      "Alpha AI Trading Signals — สัญญาณเทรดรายวันและรายเดือนจาก AI คลิกเพื่อดูสัญญาณล่าสุด",
    ctaSignal: "ซิกแนว AI",
    ctaStart: "เริ่มใช้งานฟรี",
    ctaPerformance: "ดูผลการเทรดจริง",
    stats: [
      ["MT4 / MT5", "รองรับเต็มรูปแบบ"],
      ["อัตโนมัติ", "ส่งคำสั่งทันที"],
      ["24/5", "ตลอดเวลาตลาดเปิด"],
      ["Risk Engine", "ควบคุมความเสี่ยง"],
    ],
    panelLive: "PICHAIFX ENGINE · LIVE",
    panelOnline: "ONLINE",
    goldGridAlt: "GoldGridTVE — Automated Trading System ทำงานอัตโนมัติตลอด 24/7",
  },
  trustBar: [
    { label: "Smart Algorithms", desc: "แม่นยำสูงกว่าเดิม" },
    { label: "Risk Management", desc: "ป้องกันในตัวระบบ" },
    { label: "24/7 Monitoring", desc: "ติดตามตลาดตลอดเวลา" },
    { label: "เทรดได้ทุกที่", desc: "ทุกเวลา ทุกอุปกรณ์" },
  ],
  performance: {
    eyebrow: "ผลการเทรด",
    titleLine1: "ตัวเลขที่ตรวจสอบได้",
    titleLine2: "จริง ไม่ใช่คำโฆษณา",
    body: "บัญชีทุกตัวของ PichaiFX Autotrad เชื่อมกับ Myfxbook เพื่อให้คุณตรวจสอบผลตอบแทน ความเสี่ยง และประวัติการเทรดได้ตลอดเวลา เราแยกผลการดำเนินงานจริงออกจากการคาดการณ์อย่างชัดเจน",
    ctaMyfxbook: "เปิดดู Myfxbook",
    ctaHistory: "ประวัติการเทรดทั้งหมด",
    metrics: [
      { label: "กำไรสุทธิ", value: "+$12,842" },
      { label: "Drawdown สูงสุด", value: "8.42%" },
      { label: "อัตราชนะ", value: "72.8%" },
      { label: "Profit Factor", value: "1.84" },
    ],
    equityChartLabel: "เส้นกราฟเงินทุนสะสม",
  },
  products: {
    eyebrow: "โปรดักต์",
    title: "เครื่องมือทั้งหมดที่ระบบเทรดของคุณต้องการ",
    viewDetails: "ดูรายละเอียด",
    items: [
      {
        name: "PichaiFX EA",
        desc: "หุ่นยนต์เทรดอัตโนมัติสำหรับ MT4 และ MT5 ทำงานตามกลยุทธ์ที่ตั้งไว้โดยไม่ต้องเฝ้าจอ",
        tag: "MT4 / MT5",
      },
      {
        name: "Copy Trading",
        desc: "เชื่อมบัญชีของคุณเข้ากับกลยุทธ์ที่เลือก แล้วให้คำสั่งซื้อขายทำงานตามแบบเรียลไทม์",
        tag: "อัตโนมัติ",
      },
      {
        name: "AI Analytics",
        desc: "วิเคราะห์แนวโน้มตลาดและความผันผวนจากข้อมูลราคาสด เพื่อประกอบการตัดสินใจ",
        tag: "เรียลไทม์",
      },
      {
        name: "Trading Tools",
        desc: "อินดิเคเตอร์และเครื่องมือเสริมสำหรับปรับแต่งระบบเทรดของคุณเอง",
        tag: "ยืดหยุ่น",
      },
    ],
  },
  howItWorks: {
    eyebrow: "วิธีใช้งาน",
    title: "เริ่มต้นได้ใน 4 ขั้นตอน",
    steps: [
      { title: "สร้างบัญชี", desc: "สมัครใช้งาน PichaiFX Autotrad ใช้เวลาไม่ถึง 2 นาที" },
      { title: "เชื่อมต่อ MT4 / MT5", desc: "กรอกเลขบัญชีเทรดของคุณเพื่อเชื่อมต่อระบบ" },
      { title: "เลือกกลยุทธ์", desc: "เลือก EA หรือกลยุทธ์ Copy Trading ที่เหมาะกับคุณ" },
      { title: "เริ่มระบบอัตโนมัติ", desc: "ระบบเริ่มทำงานทันที พร้อมติดตามผลได้ตลอดเวลา" },
    ],
  },
  eaDownload: {
    badge: "EA เทรด",
    titleLine1: "ดาวน์โหลดระบบเทรดอัตโนมัติ",
    body: "ไฟล์ EA พร้อมใช้งานสำหรับ MT4 / MT5 ดาวน์โหลดแล้วติดตั้งเข้ากับแพลตฟอร์มเทรดของคุณ จากนั้นแจ้งบัญชีเทรดให้แอดมินผ่านฟอร์มด้านล่าง เพื่อเปิดใช้งานระบบให้กับบัญชีของคุณ",
    downloadBtn: "ดาวน์โหลด EA",
    connectBtn: "แจ้งบัญชีเทรด",
    stepsLabel: "ขั้นตอนการใช้งาน",
    steps: [
      "ดาวน์โหลดไฟล์ EA จากลิงก์ด้านล่าง",
      "ติดตั้งไฟล์ EA เข้ากับ MT4 / MT5  กด tool/option/ติ้ก Allow WebRequest/เพิ่ม https://script.google.com/ รอปลดล็อค EA",
      "แจ้งบัญชีเทรดผ่านฟอร์มด้านล่างเพื่อให้แอดมินเปิดใช้งานให้",
    ],
  },
  connectAccount: {
    eyebrow: "สำหรับสมาชิก",
    title: "แจ้งบัญชีเทรดให้แอดมิน",
    body: "กรอกข้อมูลบัญชีเทรด MT4 / MT5 ที่คุณต้องการใช้งาน แอดมินจะติดต่อกลับ เพื่อยืนยันตัวตนและเปิดใช้งานระบบเทรดอัตโนมัติให้กับบัญชีของคุณ",
    afterSubmitLabel: "ขั้นตอนหลังจากส่งข้อมูล",
    afterSubmitItems: [
      "แอดมินตรวจสอบข้อมูลบัญชีและติดต่อกลับผ่านช่องทางที่คุณให้ไว้",
      "แอดมินจะแจ้งขั้นตอนการเปิดใช้งาน EA หรือ Copy Trading ให้ตรงกับบัญชีของคุณ",
      "ไม่ต้องส่งรหัสผ่านใด ๆ ในขั้นตอนนี้ แอดมินจะแจ้งวิธีเชื่อมต่อที่ปลอดภัยอีกครั้ง",
    ],
    brokers: ["OEXN", "Exness", "XM", "IC Markets", "FBS", "Pepperstone", "อื่น ๆ"],
    successTitle: "ส่งข้อมูลเรียบร้อยแล้ว",
    successBody:
      "ทีมงาน PichaiFX Autotrad ได้รับข้อมูลบัญชีของคุณแล้ว แอดมินจะติดต่อกลับผ่านช่องทางที่ให้ไว้ภายใน 24 ชั่วโมง",
    successAgain: "แจ้งอีกบัญชี",
    labels: {
      name: "ชื่อ-นามสกุล",
      namePlaceholder: "ชื่อของคุณ",
      contact: "ช่องทางติดต่อกลับ",
      contactPlaceholder: "LINE ID หรือเบอร์โทรศัพท์",
      broker: "โบรกเกอร์",
      brokerPlaceholder: "เลือกโบรกเกอร์ของคุณ",
      accountNumber: "เลขบัญชีเทรด",
      accountNumberPlaceholder: "เช่น 88421093",
      server: "เซิร์ฟเวอร์ (Server)",
      serverPlaceholder: "เช่น Exness-Real8",
      note: "ข้อความเพิ่มเติม (ถ้ามี)",
      notePlaceholder: "เช่น ต้องการใช้กลยุทธ์ PichaiFX Gold หรือสอบถามเพิ่มเติม",
      consentPrefix: "ฉันได้อ่านและยินยอมให้เก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลข้างต้น ตาม",
      consentLinkText: "นโยบายความเป็นส่วนตัว (PDPA)",
      consentSuffix: "ของ PichaiFX Autotrad",
      submit: "ส่งข้อมูลให้แอดมิน",
      submitting: "กำลังส่งข้อมูล...",
      genericError: "ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
      networkError: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง",
    },
  },
  copyTrading: {
    eyebrow: "Copy Trading",
    title: "เลือกกลยุทธ์ แล้วให้ระบบเทรดแทนคุณ",
    body: "ตัวเลขผลตอบแทนด้านล่างอ้างอิงจากบัญชีจริงย้อนหลัง 90 วัน ผลตอบแทนในอดีตไม่ได้เป็นการรับประกันผลตอบแทนในอนาคต",
    returnLabel: "ผลตอบแทน",
    followersLabel: "ผู้ติดตาม",
    detailsBtn: "ดูรายละเอียดกลยุทธ์",
    riskLabels: { "ปานกลาง": "ปานกลาง", "ต่ำ": "ต่ำ", "สูง": "สูง" },
    strategies: [
      {
        name: "PichaiFX Gold",
        focus: "XAUUSD Trend Following",
        ret: "+18.4%",
        dd: "6.2%",
        risk: "ปานกลาง",
        followers: "482",
      },
      {
        name: "PichaiFX Grid",
        focus: "Multi-pair Grid System",
        ret: "+11.9%",
        dd: "4.8%",
        risk: "ต่ำ",
        followers: "310",
      },
      {
        name: "PichaiFX Momentum",
        focus: "BTCUSD / ETHUSD",
        ret: "+27.1%",
        dd: "12.4%",
        risk: "สูง",
        followers: "196",
      },
    ],
  },
  pricing: {
    eyebrow: "แพ็กเกจ",
    title: "เลือกแพ็กเกจที่เหมาะกับสไตล์การเทรดของคุณ",
    popular: "ยอดนิยม",
    sponsoredLabel: "ผู้สนับสนุน",
    plans: [
      {
        name: "Starter",
        desc: "สำหรับผู้เริ่มต้นใช้ระบบอัตโนมัติ",
        price: "ฟรี",
        period: "",
        features: ["EA License พื้นฐาน 1 บัญชี", "Support ผ่าน Community", "อัปเดตกลยุทธ์รายเดือน"],
        cta: "สมัครใช้ฟรี 1 บัญชี",
      },
      {
        name: "Professional",
        desc: "สำหรับเทรดเดอร์ที่ต้องการผลลัพธ์เต็มรูปแบบ",
        price: "1,990",
        period: "บาท / เดือน",
        features: [
          "EA ทุกตัวไม่จำกัดบัญชี",
          "AI Analytics และสัญญาณเรียลไทม์",
          "รองรับ VPS ฟรี",
          "Support ผ่าน LINE ส่วนตัว",
        ],
        cta: "เลือกแพ็กเกจนี้",
      },
      {
        name: "Managed",
        desc: "ให้ทีม PichaiFX Autotrad ดูแลระบบให้ทั้งหมด",
        price: "ติดต่อทีมงาน",
        period: "",
        features: ["บริหารพอร์ตโดยทีมงาน", "รายงานผลรายสัปดาห์", "ปรับกลยุทธ์ตามความเสี่ยงของคุณ"],
        cta: "ติดต่อเรา",
      },
    ],
  },
  academy: {
    eyebrow: "อคาเดมี",
    title: "เรียนรู้ก่อนลงมือเทรดจริง",
    viewAll: "ดูบทความทั้งหมด",
    readArticle: "อ่านบทความ",
    articles: [
      { tag: "พื้นฐาน", title: "Forex คืออะไร เริ่มต้นอย่างไรให้ปลอดภัย" },
      { tag: "การวิเคราะห์", title: "หลักการทำงานของ Moving Average ในการหาแนวโน้ม" },
      { tag: "บริหารความเสี่ยง", title: "จัดการขนาดล็อตและ Stop Loss อย่างเป็นระบบ" },
      { tag: "EA", title: "ตั้งค่า EA บน MT4 / MT5 ให้ทำงานถูกต้องตั้งแต่ครั้งแรก" },
    ],
  },
  faq: {
    eyebrow: "คำถามที่พบบ่อย",
    title: "สิ่งที่ควรรู้ก่อนเริ่มต้น",
    items: [
      {
        q: "PichaiFX Autotrad คืออะไร",
        a: "PichaiFX Autotrad เป็นแพลตฟอร์มเทคโนโลยีสำหรับการเทรดอัตโนมัติ ให้บริการ EA, Copy Trading และเครื่องมือวิเคราะห์ตลาด สำหรับผู้ใช้ MT4 และ MT5",
      },
      {
        q: "รองรับ MT4 หรือ MT5 หรือไม่",
        a: "รองรับทั้งสองแพลตฟอร์ม คุณสามารถเชื่อมต่อบัญชีเทรดที่มีอยู่แล้วเข้ากับระบบได้ทันที",
      },
      {
        q: "จำเป็นต้องเปิด VPS หรือไม่",
        a: "ไม่จำเป็น แต่แนะนำให้ใช้ VPS เพื่อให้ระบบทำงานต่อเนื่องตลอด 24 ชั่วโมงโดยไม่ขึ้นกับคอมพิวเตอร์ส่วนตัว แพ็กเกจ Professional มี VPS ให้ฟรี",
      },
      {
        q: "ใช้ได้กับโบรกเกอร์ใดบ้าง",
        a: "ใช้ได้กับโบรกเกอร์ส่วนใหญ่ที่รองรับ MT4/MT5 มาตรฐาน ทีมงานจะตรวจสอบความเข้ากันได้ให้ก่อนเริ่มใช้งานจริง",
      },
      {
        q: "ถอนเงินได้เองหรือไม่",
        a: "ได้ เงินทุนทั้งหมดอยู่ในบัญชีเทรดของคุณเองที่โบรกเกอร์ PichaiFX Autotrad ไม่ได้ถือครองเงินทุนของผู้ใช้งาน",
      },
      {
        q: "มีความเสี่ยงอะไรบ้าง",
        a: "การเทรดมีความเสี่ยงต่อเงินทุนเสมอ ผลตอบแทนในอดีตไม่ได้รับประกันผลลัพธ์ในอนาคต ควรศึกษาและกำหนดขนาดความเสี่ยงที่ยอมรับได้ก่อนเริ่มใช้งาน",
      },
    ],
    ctaTitle: "ยังมีคำถามอื่นอีกไหม?",
    ctaBody: "ทักแชทหาแอดมินได้เลยผ่าน LINE Official Account ตอบไว ให้คำปรึกษาฟรี",
    ctaButton: "ติดต่อเราทาง LINE OA",
  },
  contact: {
    title: "มีคำถามเกี่ยวกับระบบ?",
    body: "ทีมงาน PichaiFX Autotrad พร้อมให้คำปรึกษาเรื่องการเชื่อมต่อบัญชี การเลือกกลยุทธ์ และการตั้งค่าระบบให้เหมาะกับคุณ",
    lineButton: "ติดต่อเราทาง LINE OA",
    channels: [
      { label: "LINE", value: "@pichaifx", href: LINE_OA_URL },
      { label: "Telegram", value: "t.me/pichaifx" },
      { label: "อีเมล", value: "support@pichaifx.com" },
    ],
  },
  footer: {
    tagline: "เทคโนโลยีสำหรับการเทรดอัตโนมัติ ออกแบบเพื่อความโปร่งใส ตรวจสอบได้ และควบคุมความเสี่ยงอย่างเป็นระบบ",
    columns: [
      {
        title: "แพลตฟอร์ม",
        links: [
          { label: "EA / Auto Trading", href: "#products" },
          { label: "MT4 / MT5", href: "#platform" },
          { label: "Risk Engine", href: "#platform" },
          { label: "Analytics", href: "#products" },
        ],
      },
      {
        title: "บริษัท",
        links: [
          { label: "เกี่ยวกับเรา", href: "#top" },
          { label: "ผลการเทรด", href: "#performance" },
          { label: "อคาเดมี", href: "#academy" },
          { label: "ติดต่อเรา", href: "#contact" },
        ],
      },
      {
        title: "กฎหมาย",
        links: [
          { label: "ข้อตกลงการใช้งาน", href: "/terms" },
          { label: "นโยบายความเป็นส่วนตัว (PDPA)", href: "/privacy-policy" },
          { label: "คำเตือนความเสี่ยง", href: "/risk-warning" },
        ],
      },
    ],
    rights: "สงวนลิขสิทธิ์ทุกประการ",
    cookieSettings: "ตั้งค่าคุกกี้",
    disclaimer:
      "การเทรดผลิตภัณฑ์ทางการเงินมีความเสี่ยง ผลตอบแทนในอดีตไม่ได้เป็น เครื่องยืนยันผลตอบแทนในอนาคต โปรดพิจารณาความเสี่ยงก่อนตัดสินใจลงทุน อ่านเพิ่มเติมที่",
    riskLinkText: "คำเตือนความเสี่ยง",
  },
  cookieConsent: {
    title: "การใช้คุกกี้บนเว็บไซต์นี้",
    body: "เราใช้คุกกี้ที่จำเป็นต่อการทำงานของเว็บไซต์ และคุกกี้เพื่อวิเคราะห์การใช้งาน (เช่น ยอดผู้เข้าชม) เพื่อพัฒนาบริการให้ดีขึ้น ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA) คุณสามารถเลือกยอมรับหรือปฏิเสธคุกกี้ที่ไม่จำเป็นได้",
    essentialTitle: "คุกกี้ที่จำเป็น",
    essentialDesc: "จำเป็นต่อการทำงานพื้นฐานของเว็บไซต์ ปิดการใช้งานไม่ได้",
    essentialAlwaysOn: "เปิดเสมอ",
    analyticsTitle: "คุกกี้วิเคราะห์การใช้งาน",
    analyticsDesc: "ใช้นับยอดผู้เข้าชมแบบไม่ระบุตัวตน เพื่อปรับปรุงเว็บไซต์",
    acceptAll: "ยอมรับทั้งหมด",
    settings: "ตั้งค่า",
    savePreferences: "บันทึกการตั้งค่า",
    rejectNonEssential: "ปฏิเสธที่ไม่จำเป็น",
    privacyLink: "อ่านนโยบายความเป็นส่วนตัว",
  },
  visitorCounter: { label: "ยอดผู้เข้าชม" },
  themeToggle: {
    toDark: "สลับเป็นโหมดกลางคืน",
    toLight: "สลับเป็นโหมดกลางวัน",
    darkMode: "โหมดกลางคืน",
    lightMode: "โหมดกลางวัน",
  },
  legalShell: { backHome: "← กลับหน้าแรก", updatedLabel: "อัปเดตล่าสุด" },
  privacyPolicy: {
    metaTitle: "นโยบายความเป็นส่วนตัว (PDPA) — PichaiFX Autotrad",
    metaDescription:
      "นโยบายความเป็นส่วนตัวของ PichaiFX Autotrad ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)",
    pageTitle: "นโยบายความเป็นส่วนตัว (Privacy Policy)",
    updatedAt: "27 กันยายน 2569",
    noticeHtml:
      "<strong>หมายเหตุสำคัญ:</strong> เนื้อหาในหน้านี้เป็นแม่แบบนโยบายความเป็นส่วนตัวทั่วไป จัดทำขึ้นให้สอดคล้องกับหลักการของพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) ของประเทศไทย และแนวทางสากลที่ใกล้เคียงกัน (เช่น GDPR) เพื่อใช้เป็นจุดเริ่มต้นเท่านั้น <u>ไม่ถือเป็นคำแนะนำทางกฎหมาย</u> ก่อนนำไปใช้งานจริง ควรให้ที่ปรึกษากฎหมายหรือผู้เชี่ยวชาญด้านการคุ้มครองข้อมูลส่วนบุคคลตรวจสอบ และแก้ไขข้อมูลนิติบุคคล ช่องทางติดต่อ และรายละเอียดการประมวลผลข้อมูลให้ตรงกับการดำเนินธุรกิจจริงของคุณ",
    sections: [
      {
        heading: "1. ข้อมูลทั่วไป",
        bodyHtml:
          "<p class='mt-3'>นโยบายความเป็นส่วนตัวฉบับนี้ (\"นโยบาย\") อธิบายวิธีที่ PichaiFX Autotrad (\"เรา\", \"บริษัท\") เก็บรวบรวม ใช้ เปิดเผย และดูแลรักษาข้อมูลส่วนบุคคลของผู้ใช้งานเว็บไซต์และบริการที่เกี่ยวข้อง (\"ท่าน\") ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 และมาตรฐานสากลที่เกี่ยวข้อง การใช้งานเว็บไซต์นี้ถือว่าท่านได้อ่านและยอมรับเงื่อนไขตามนโยบายฉบับนี้</p>",
      },
      {
        heading: "2. ข้อมูลส่วนบุคคลที่เราเก็บรวบรวม",
        bodyHtml:
          "<p class='mt-3'>เราเก็บรวบรวมข้อมูลส่วนบุคคลของท่านในกรณีดังต่อไปนี้</p><ul class='mt-3'><li><strong>ข้อมูลที่ท่านให้โดยตรง</strong> ผ่านแบบฟอร์ม \"แจ้งบัญชีเทรดให้แอดมิน\" ได้แก่ ชื่อ-นามสกุล ช่องทางติดต่อกลับ (LINE ID หรือเบอร์โทรศัพท์) ชื่อโบรกเกอร์ เลขบัญชีเทรด ชื่อเซิร์ฟเวอร์ และข้อความเพิ่มเติมที่ท่านระบุ</li><li><strong>ข้อมูลทางเทคนิค</strong> เช่น หมายเลข IP ประเภทอุปกรณ์และเบราว์เซอร์ และสถิติการเข้าชมเว็บไซต์แบบไม่ระบุตัวตน (เช่น ยอดผู้เข้าชมรวม) ซึ่งเก็บผ่านคุกกี้ที่จำเป็นและคุกกี้เพื่อการวิเคราะห์</li></ul><p class='mt-3'>เราไม่เก็บรหัสผ่านบัญชีเทรด (ไม่ว่าจะเป็นรหัสผ่านหลักหรือ Investor Password) ผ่านแบบฟอร์มบนเว็บไซต์นี้</p>",
      },
      {
        heading: "3. วัตถุประสงค์และฐานทางกฎหมายในการประมวลผลข้อมูล",
        bodyHtml:
          "<ul class='mt-3'><li>เพื่อติดต่อกลับและให้บริการเปิดใช้งานระบบเทรดอัตโนมัติตามที่ท่านร้องขอ (ฐานสัญญา/ความยินยอม)</li><li>เพื่อตอบข้อซักถามและให้การสนับสนุนลูกค้า (ฐานสัญญา/ความยินยอม)</li><li>เพื่อวิเคราะห์และปรับปรุงคุณภาพเว็บไซต์ เช่น สถิติผู้เข้าชม (ฐานความยินยอมและประโยชน์โดยชอบด้วยกฎหมาย)</li><li>เพื่อปฏิบัติตามกฎหมายหรือคำสั่งของหน่วยงานที่มีอำนาจ (ฐานหน้าที่ตามกฎหมาย)</li></ul>",
      },
      {
        heading: "4. คุกกี้ (Cookies)",
        bodyHtml:
          "<p class='mt-3'>เว็บไซต์นี้ใช้คุกกี้ 2 ประเภท</p><ul class='mt-3'><li><strong>คุกกี้ที่จำเป็น</strong> สำหรับการทำงานพื้นฐานของเว็บไซต์ เช่น การจดจำโหมดกลางวัน/กลางคืนที่ท่านเลือก ไม่สามารถปิดการใช้งานได้</li><li><strong>คุกกี้เพื่อการวิเคราะห์</strong> สำหรับนับยอดผู้เข้าชมเว็บไซต์แบบไม่ระบุตัวตน ท่านสามารถเลือกปฏิเสธคุกกี้ประเภทนี้ได้ผ่านแบนเนอร์คุกกี้ หรือปุ่ม \"ตั้งค่าคุกกี้\" ที่ท้ายเว็บไซต์</li></ul>",
      },
      {
        heading: "5. การเปิดเผยข้อมูลต่อบุคคลที่สาม",
        bodyHtml:
          "<p class='mt-3'>เราอาจเปิดเผยข้อมูลส่วนบุคคลของท่านให้แก่ผู้ให้บริการที่เราใช้ในการดำเนินธุรกิจเท่าที่จำเป็น เช่น ผู้ให้บริการส่งอีเมล ผู้ให้บริการโฮสติ้ง/คลาวด์ ซึ่งอาจตั้งอยู่นอกประเทศไทย โดยเราจะกำหนดให้ผู้ให้บริการดังกล่าวรักษาความลับและคุ้มครองข้อมูลส่วนบุคคลตามมาตรฐานที่เหมาะสม เราจะไม่ขายข้อมูลส่วนบุคคลของท่านให้แก่บุคคลภายนอกเพื่อวัตถุประสงค์ทางการตลาด</p>",
      },
      {
        heading: "6. การโอนข้อมูลไปต่างประเทศ",
        bodyHtml:
          "<p class='mt-3'>เนื่องจากผู้ให้บริการบางรายที่เราใช้งาน (เช่น ผู้ให้บริการอีเมลหรือโฮสติ้ง) อาจมีเซิร์ฟเวอร์ตั้งอยู่นอกประเทศไทย ข้อมูลของท่านอาจถูกโอนไปยังต่างประเทศ ในกรณีดังกล่าว เราจะดำเนินการให้มั่นใจว่าประเทศปลายทางหรือผู้รับข้อมูลมีมาตรฐานการคุ้มครองข้อมูลส่วนบุคคลที่เพียงพอตามที่กฎหมายกำหนด</p>",
      },
      {
        heading: "7. ระยะเวลาในการเก็บรักษาข้อมูล",
        bodyHtml:
          "<p class='mt-3'>เราจะเก็บรักษาข้อมูลส่วนบุคคลของท่านไว้เท่าที่จำเป็นตามวัตถุประสงค์ที่ระบุไว้ในนโยบายนี้ หรือตามระยะเวลาที่กฎหมายกำหนด เมื่อพ้นระยะเวลาดังกล่าว เราจะลบหรือทำลายข้อมูล หรือทำให้ข้อมูลไม่สามารถระบุตัวตนของท่านได้</p>",
      },
      {
        heading: "8. มาตรการรักษาความปลอดภัยของข้อมูล",
        bodyHtml:
          "<p class='mt-3'>เราจัดให้มีมาตรการทางเทคนิคและการบริหารจัดการที่เหมาะสม เพื่อป้องกันการเข้าถึง การใช้ การเปลี่ยนแปลง หรือการเปิดเผยข้อมูลส่วนบุคคลโดยไม่ได้รับอนุญาต เช่น การเข้ารหัสข้อมูลระหว่างการส่ง (HTTPS) และการจำกัดสิทธิ์การเข้าถึงข้อมูลเฉพาะบุคคลที่เกี่ยวข้อง</p>",
      },
      {
        heading: "9. สิทธิของเจ้าของข้อมูลส่วนบุคคล",
        bodyHtml:
          "<p class='mt-3'>ภายใต้ PDPA ท่านมีสิทธิดังต่อไปนี้เกี่ยวกับข้อมูลส่วนบุคคลของท่าน</p><ul class='mt-3'><li>สิทธิขอเข้าถึงและขอรับสำเนาข้อมูลส่วนบุคคล</li><li>สิทธิขอให้แก้ไขข้อมูลให้ถูกต้องและเป็นปัจจุบัน</li><li>สิทธิขอให้ลบหรือทำลายข้อมูล หรือทำให้ข้อมูลไม่สามารถระบุตัวตนได้</li><li>สิทธิขอให้ระงับการใช้ข้อมูลชั่วคราว</li><li>สิทธิคัดค้านการเก็บรวบรวม ใช้ หรือเปิดเผยข้อมูล</li><li>สิทธิขอให้โอนย้ายข้อมูล (Data Portability) ในกรณีที่กฎหมายกำหนด</li><li>สิทธิถอนความยินยอมได้ตลอดเวลา โดยไม่กระทบต่อการประมวลผลที่เกิดขึ้นก่อนหน้า</li></ul><p class='mt-3'>ท่านสามารถใช้สิทธิดังกล่าวได้โดยติดต่อเราผ่านช่องทางในหัวข้อที่ 11</p>",
      },
      {
        heading: "10. การเปลี่ยนแปลงนโยบาย",
        bodyHtml:
          "<p class='mt-3'>เราอาจปรับปรุงนโยบายฉบับนี้เป็นครั้งคราวเพื่อให้สอดคล้องกับการเปลี่ยนแปลงของกฎหมาย หรือแนวทางการดำเนินธุรกิจ โดยจะแจ้งวันที่ปรับปรุงล่าสุดไว้ด้านบนของหน้านี้</p>",
      },
      {
        heading: "11. ช่องทางติดต่อ",
        bodyHtml:
          "<p class='mt-3'>หากท่านมีข้อสงสัยเกี่ยวกับนโยบายความเป็นส่วนตัวฉบับนี้ หรือต้องการใช้สิทธิของเจ้าของข้อมูลส่วนบุคคล สามารถติดต่อเราได้ที่</p><ul class='mt-3'><li>อีเมล: <a href='mailto:privacy@pichaifxautotrad.com'>privacy@pichaifxautotrad.com</a> (โปรดแก้ไขเป็นอีเมลจริงของคุณ)</li><li>LINE: @pichaifxautotrad (โปรดแก้ไขเป็น LINE ID จริงของคุณ)</li></ul>",
      },
    ],
  },
  terms: {
    metaTitle: "ข้อตกลงการใช้งาน — PichaiFX Autotrad",
    metaDescription: "ข้อตกลงและเงื่อนไขการใช้งานเว็บไซต์และบริการของ PichaiFX Autotrad",
    pageTitle: "ข้อตกลงการใช้งาน (Terms of Use)",
    updatedAt: "27 กันยายน 2569",
    noticeHtml:
      "<strong>หมายเหตุสำคัญ:</strong> เนื้อหาในหน้านี้เป็นแม่แบบทั่วไป ไม่ถือเป็นคำแนะนำทางกฎหมาย ควรให้ที่ปรึกษากฎหมายตรวจสอบและปรับให้ตรงกับการดำเนินธุรกิจจริงก่อนใช้งาน",
    sections: [
      {
        heading: "1. การยอมรับข้อตกลง",
        bodyHtml:
          "<p class='mt-3'>การเข้าใช้งานเว็บไซต์นี้ถือว่าท่านยอมรับและตกลงปฏิบัติตามข้อตกลงการใช้งานฉบับนี้ หากท่านไม่เห็นด้วยกับข้อตกลงนี้ กรุณางดใช้งานเว็บไซต์</p>",
      },
      {
        heading: "2. ลักษณะของบริการ",
        bodyHtml:
          "<p class='mt-3'>PichaiFX Autotrad ให้ข้อมูลเกี่ยวกับระบบเทรดอัตโนมัติ (EA), บริการ Copy Trading และเนื้อหาให้ความรู้ด้านการเทรด เว็บไซต์นี้ไม่ถือเป็นการให้คำแนะนำการลงทุน และไม่รับประกันผลตอบแทนใด ๆ จากการใช้บริการ</p>",
      },
      {
        heading: "3. ความรับผิดชอบของผู้ใช้งาน",
        bodyHtml:
          "<ul class='mt-3'><li>ท่านต้องให้ข้อมูลที่ถูกต้องและเป็นจริงเมื่อกรอกแบบฟอร์มบนเว็บไซต์</li><li>ท่านต้องรักษาความปลอดภัยของบัญชีเทรดและรหัสผ่านของท่านเอง</li><li>ท่านรับทราบและยอมรับความเสี่ยงที่เกี่ยวข้องกับการเทรดผลิตภัณฑ์ทางการเงินด้วยตนเอง</li></ul>",
      },
      {
        heading: "4. ทรัพย์สินทางปัญญา",
        bodyHtml:
          "<p class='mt-3'>เนื้อหา โลโก้ และเครื่องหมายการค้าทั้งหมดบนเว็บไซต์นี้เป็นทรัพย์สินของ PichaiFX Autotrad ห้ามคัดลอก ทำซ้ำ หรือเผยแพร่โดยไม่ได้รับอนุญาตเป็นลายลักษณ์อักษร</p>",
      },
      {
        heading: "5. ข้อจำกัดความรับผิด",
        bodyHtml:
          "<p class='mt-3'>เราจะไม่รับผิดชอบต่อความเสียหายทางตรงหรือทางอ้อมที่เกิดจากการใช้งานเว็บไซต์ หรือการตัดสินใจลงทุนของท่าน โปรดศึกษา<a href='/risk-warning'> คำเตือนความเสี่ยง</a> ก่อนตัดสินใจใช้บริการ</p>",
      },
      {
        heading: "6. การเปลี่ยนแปลงข้อตกลง",
        bodyHtml:
          "<p class='mt-3'>เราขอสงวนสิทธิ์ในการปรับปรุงข้อตกลงฉบับนี้ได้ตลอดเวลา โดยจะแจ้งวันที่ปรับปรุงล่าสุดไว้ด้านบนของหน้านี้</p>",
      },
      {
        heading: "7. กฎหมายที่ใช้บังคับ",
        bodyHtml: "<p class='mt-3'>ข้อตกลงฉบับนี้อยู่ภายใต้บังคับของกฎหมายไทย</p>",
      },
    ],
  },
  riskWarning: {
    metaTitle: "คำเตือนความเสี่ยง — PichaiFX Autotrad",
    metaDescription: "คำเตือนความเสี่ยงเกี่ยวกับการเทรดผลิตภัณฑ์ทางการเงินและระบบเทรดอัตโนมัติ",
    pageTitle: "คำเตือนความเสี่ยง (Risk Warning)",
    updatedAt: "27 กันยายน 2569",
    sections: [
      {
        heading: "ความเสี่ยงจากการเทรด",
        bodyHtml:
          "<p class='mt-3'>การเทรดผลิตภัณฑ์ทางการเงิน เช่น Forex, ทองคำ และคริปโทเคอร์เรนซี มีความเสี่ยงสูงและอาจทำให้ท่านสูญเสียเงินลงทุนบางส่วนหรือทั้งหมดได้ ผลตอบแทนในอดีต ไม่ว่าจะเป็นของ EA กลยุทธ์ Copy Trading หรือบัญชีตัวอย่างใด ๆ ที่แสดงบนเว็บไซต์นี้ <strong>ไม่ได้เป็นเครื่องยืนยันผลตอบแทนในอนาคต</strong></p>",
      },
      {
        heading: "ความเสี่ยงของระบบเทรดอัตโนมัติ (EA)",
        bodyHtml:
          "<p class='mt-3'>ระบบเทรดอัตโนมัติทำงานตามเงื่อนไขและตรรกะที่ตั้งไว้ล่วงหน้า ซึ่งอาจได้รับผลกระทบจากสภาวะตลาดที่ผิดปกติ ความล่าช้าของอินเทอร์เน็ต ไฟฟ้าดับ หรือปัญหาทางเทคนิคอื่น ๆ ที่อยู่นอกเหนือการควบคุมของเรา ท่านควรติดตามการทำงานของระบบอย่างสม่ำเสมอ และตั้งค่าการบริหารความเสี่ยง (เช่น Stop Loss) ให้เหมาะสมกับระดับความเสี่ยงที่ท่านยอมรับได้</p>",
      },
      {
        heading: "ท่านเป็นผู้ตัดสินใจและควบคุมเงินทุนของท่านเอง",
        bodyHtml:
          "<p class='mt-3'>เงินทุนทั้งหมดของท่านอยู่ในบัญชีเทรดของท่านเองที่โบรกเกอร์ที่ท่านเลือกใช้ PichaiFX Autotrad ไม่ได้ถือครองหรือเข้าถึงเงินทุนของท่าน และไม่ได้เป็นโบรกเกอร์หรือที่ปรึกษาทางการเงินที่ได้รับอนุญาต การตัดสินใจลงทุนทั้งหมดเป็นความรับผิดชอบของท่านแต่เพียงผู้เดียว</p>",
      },
      {
        heading: "คำแนะนำ",
        bodyHtml:
          "<ul class='mt-3'><li>ลงทุนด้วยเงินที่ท่านยอมรับความเสี่ยงจากการสูญเสียได้เท่านั้น</li><li>ศึกษาข้อมูลและทำความเข้าใจกลยุทธ์ก่อนเริ่มใช้งานจริงทุกครั้ง</li><li>พิจารณาทดลองในบัญชีทดลอง (Demo) ก่อนใช้งานกับบัญชีจริง</li><li>ปรึกษาที่ปรึกษาทางการเงินที่ได้รับใบอนุญาตหากไม่แน่ใจ</li></ul>",
      },
    ],
    noticeHtml:
      "เนื้อหาในหน้านี้จัดทำขึ้นเพื่อวัตถุประสงค์ในการให้ข้อมูลทั่วไปเท่านั้น ไม่ถือเป็นคำแนะนำการลงทุนหรือคำแนะนำทางกฎหมาย",
  },
};

const en: Dictionary = {
  nav: {
    links: [
      { href: "#platform", label: "Platform" },
      { href: "#products", label: "Products" },
      { href: "#performance", label: "Performance" },
      { href: "#ea-download", label: "EA Download" },
      { href: "#connect-account", label: "Connect Account" },
      { href: "#academy", label: "Academy" },
      { href: "#pricing", label: "Pricing" },
    ],
    login: "Log in",
    start: "Get Started",
    openMenu: "Open menu",
  },
  hero: {
    badge: "Supports MT4 and MT5 · Connect instantly",
    titleLine1: "Your trading, running itself",
    titleLine2: "24 hours a day",
    subtitle:
      "PichaiFX Autotrad turns your trading strategy into a working automated system, with verifiable performance data — not just marketing claims.",
    heroImageAlt:
      "Alpha AI Trading Signals — daily and monthly AI-generated trading signals. Click to view the latest signals.",
    ctaSignal: "AI Signals",
    ctaStart: "Start Free",
    ctaPerformance: "View Live Results",
    stats: [
      ["MT4 / MT5", "Full support"],
      ["Automated", "Instant order execution"],
      ["24/5", "Whenever markets are open"],
      ["Risk Engine", "Built-in risk control"],
    ],
    panelLive: "PICHAIFX ENGINE · LIVE",
    panelOnline: "ONLINE",
    goldGridAlt: "GoldGridTVE — Automated trading system running 24/7",
  },
  trustBar: [
    { label: "Smart Algorithms", desc: "More accurate than ever" },
    { label: "Risk Management", desc: "Built into the system" },
    { label: "24/7 Monitoring", desc: "Markets watched around the clock" },
    { label: "Trade Anywhere", desc: "Any time, any device" },
  ],
  performance: {
    eyebrow: "Performance",
    titleLine1: "Verifiable numbers,",
    titleLine2: "not marketing claims",
    body: "Every PichaiFX Autotrad account is linked to Myfxbook so you can check returns, risk, and trade history at any time. We keep real performance clearly separated from projections.",
    ctaMyfxbook: "Open on Myfxbook",
    ctaHistory: "Full Trade History",
    metrics: [
      { label: "Net Profit", value: "+$12,842" },
      { label: "Max Drawdown", value: "8.42%" },
      { label: "Win Rate", value: "72.8%" },
      { label: "Profit Factor", value: "1.84" },
    ],
    equityChartLabel: "Cumulative equity curve",
  },
  products: {
    eyebrow: "Products",
    title: "Everything your trading system needs",
    viewDetails: "View details",
    items: [
      {
        name: "PichaiFX EA",
        desc: "An automated trading robot for MT4 and MT5 that runs your chosen strategy without you watching the screen.",
        tag: "MT4 / MT5",
      },
      {
        name: "Copy Trading",
        desc: "Link your account to a chosen strategy and let trades execute in real time.",
        tag: "Automated",
      },
      {
        name: "AI Analytics",
        desc: "Analyze market trends and volatility from live price data to support your decisions.",
        tag: "Real-time",
      },
      {
        name: "Trading Tools",
        desc: "Indicators and add-on tools to customize your own trading system.",
        tag: "Flexible",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How it works",
    title: "Get started in 4 steps",
    steps: [
      { title: "Create an account", desc: "Sign up for PichaiFX Autotrad in under 2 minutes." },
      { title: "Connect MT4 / MT5", desc: "Enter your trading account number to connect to the system." },
      { title: "Choose a strategy", desc: "Pick the EA or Copy Trading strategy that suits you." },
      { title: "Go live automatically", desc: "The system starts working right away, with results you can track anytime." },
    ],
  },
  eaDownload: {
    badge: "EA Download",
    titleLine1: "Download the automated trading system PichaiFX EA",
    body: "A ready-to-use EA file for MT4 / MT5. Download it, install it on your trading platform, then submit your account details to our admin using the form below so we can activate the system for you.",
    downloadBtn: "Download EA",
    connectBtn: "Connect Account",
    stepsLabel: "How to use it",
    steps: [
      "Download the EA file from the link below.",
      "Install the EA file on your MT4 / MT5 platform.",
      "Submit your trading account via the form below so our admin can activate it for you.",
    ],
  },
  connectAccount: {
    eyebrow: "For members",
    title: "Submit your trading account to our admin",
    body: "Enter the MT4 / MT5 account details you'd like to use. Our admin will contact you back to verify your identity and activate the automated trading system for your account.",
    afterSubmitLabel: "What happens after you submit",
    afterSubmitItems: [
      "Our admin reviews your account details and contacts you back through the channel you provided.",
      "Our admin will explain the steps to activate EA or Copy Trading that match your account.",
      "You don't need to send any password at this stage — our admin will share a secure connection method separately.",
    ],
    brokers: ["OEXN", "Exness", "XM", "IC Markets", "FBS", "Pepperstone", "Other"],
    successTitle: "Your details have been submitted",
    successBody:
      "The PichaiFX Autotrad team has received your account details. Our admin will contact you back through the channel you provided within 24 hours.",
    successAgain: "Submit another account",
    labels: {
      name: "Full name",
      namePlaceholder: "Your name",
      contact: "Contact channel",
      contactPlaceholder: "LINE ID or phone number",
      broker: "Broker",
      brokerPlaceholder: "Select your broker",
      accountNumber: "Trading account number",
      accountNumberPlaceholder: "e.g. 88421093",
      server: "Server",
      serverPlaceholder: "e.g. Exness-Real8",
      note: "Additional note (optional)",
      notePlaceholder: "e.g. I'd like to use the PichaiFX Gold strategy, or other questions",
      consentPrefix: "I have read and consent to the collection, use, and disclosure of the personal data above under the",
      consentLinkText: "Privacy Policy (PDPA)",
      consentSuffix: "of PichaiFX Autotrad",
      submit: "Submit to Admin",
      submitting: "Submitting...",
      genericError: "Submission failed. Please try again.",
      networkError: "Could not connect to the server. Please try again.",
    },
  },
  copyTrading: {
    eyebrow: "Copy Trading",
    title: "Pick a strategy and let the system trade for you",
    body: "Returns shown below are based on real accounts over the past 90 days. Past performance does not guarantee future results.",
    returnLabel: "Return",
    followersLabel: "Followers",
    detailsBtn: "View strategy details",
    riskLabels: { "ปานกลาง": "Medium", "ต่ำ": "Low", "สูง": "High" },
    strategies: [
      {
        name: "PichaiFX Gold",
        focus: "XAUUSD Trend Following",
        ret: "+18.4%",
        dd: "6.2%",
        risk: "ปานกลาง",
        followers: "482",
      },
      {
        name: "PichaiFX Grid",
        focus: "Multi-pair Grid System",
        ret: "+11.9%",
        dd: "4.8%",
        risk: "ต่ำ",
        followers: "310",
      },
      {
        name: "PichaiFX Momentum",
        focus: "BTCUSD / ETHUSD",
        ret: "+27.1%",
        dd: "12.4%",
        risk: "สูง",
        followers: "196",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Pick the plan that fits your trading style",
    popular: "Most popular",
    sponsoredLabel: "Sponsored",
    plans: [
      {
        name: "Starter",
        desc: "For those just starting with automated trading",
        price: "Free",
        period: "",
        features: ["1 basic EA license", "Community support", "Monthly strategy updates"],
        cta: "Start free with 1 account",
      },
      {
        name: "Professional",
        desc: "For traders who want the full experience",
        price: "1,990",
        period: "THB / month",
        features: [
          "All EAs, unlimited accounts",
          "AI Analytics and real-time signals",
          "Free VPS included",
          "Private LINE support",
        ],
        cta: "Choose this plan",
      },
      {
        name: "Managed",
        desc: "Let the PichaiFX Autotrad team manage everything",
        price: "Contact us",
        period: "",
        features: ["Portfolio managed by our team", "Weekly performance reports", "Strategy adjusted to your risk profile"],
        cta: "Contact Us",
      },
    ],
  },
  academy: {
    eyebrow: "Academy",
    title: "Learn before you start trading live",
    viewAll: "View all articles",
    readArticle: "Read article",
    articles: [
      { tag: "Basics", title: "What is Forex and how to get started safely" },
      { tag: "Analysis", title: "How Moving Averages work for spotting trends" },
      { tag: "Risk Management", title: "Managing lot size and Stop Loss systematically" },
      { tag: "EA", title: "Setting up an EA on MT4 / MT5 correctly the first time" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "What to know before you start",
    items: [
      {
        q: "What is PichaiFX Autotrad?",
        a: "PichaiFX Autotrad is a technology platform for automated trading, offering EAs, Copy Trading, and market analysis tools for MT4 and MT5 users.",
      },
      {
        q: "Does it support MT4 or MT5?",
        a: "Both platforms are supported. You can connect an existing trading account to the system right away.",
      },
      {
        q: "Do I need a VPS?",
        a: "Not required, but recommended so the system runs continuously 24 hours a day without depending on your personal computer. The Professional plan includes a free VPS.",
      },
      {
        q: "Which brokers can I use?",
        a: "It works with most brokers that support standard MT4/MT5. Our team will check compatibility before you start using it live.",
      },
      {
        q: "Can I withdraw my own funds?",
        a: "Yes. All funds stay in your own trading account at your broker. PichaiFX Autotrad never holds users' funds.",
      },
      {
        q: "What are the risks?",
        a: "Trading always carries a risk to your capital. Past performance does not guarantee future results. You should study and set an acceptable risk level before you begin.",
      },
    ],
    ctaTitle: "Still have other questions?",
    ctaBody: "Chat with our admin directly on our LINE Official Account — fast replies, free advice.",
    ctaButton: "Contact us on LINE OA",
  },
  contact: {
    title: "Have questions about the system?",
    body: "The PichaiFX Autotrad team is ready to advise you on account connection, choosing a strategy, and setting up the system to suit you.",
    lineButton: "Contact us on LINE OA",
    channels: [
      { label: "LINE", value: "@pichaifx", href: LINE_OA_URL },
      { label: "Telegram", value: "t.me/pichaifx" },
      { label: "Email", value: "support@pichaifx.com" },
    ],
  },
  footer: {
    tagline:
      "Technology for automated trading, designed for transparency, verifiability, and systematic risk control.",
    columns: [
      {
        title: "Platform",
        links: [
          { label: "EA / Auto Trading", href: "#products" },
          { label: "MT4 / MT5", href: "#platform" },
          { label: "Risk Engine", href: "#platform" },
          { label: "Analytics", href: "#products" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About Us", href: "#top" },
          { label: "Performance", href: "#performance" },
          { label: "Academy", href: "#academy" },
          { label: "Contact", href: "#contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Terms of Use", href: "/terms" },
          { label: "Privacy Policy (PDPA)", href: "/privacy-policy" },
          { label: "Risk Warning", href: "/risk-warning" },
        ],
      },
    ],
    rights: "All rights reserved.",
    cookieSettings: "Cookie Settings",
    disclaimer:
      "Trading financial products carries risk. Past performance is not a guarantee of future results. Please consider the risks before making an investment decision. Read more at",
    riskLinkText: "Risk Warning",
  },
  cookieConsent: {
    title: "Cookies on this website",
    body: "We use cookies that are necessary for the website to function, and analytics cookies (e.g. visitor counts) to help us improve our service, in line with Thailand's Personal Data Protection Act (PDPA). You can choose to accept or reject non-essential cookies.",
    essentialTitle: "Essential cookies",
    essentialDesc: "Required for basic site functionality. Cannot be turned off.",
    essentialAlwaysOn: "Always on",
    analyticsTitle: "Analytics cookies",
    analyticsDesc: "Used to count visitors anonymously, to help improve the website.",
    acceptAll: "Accept all",
    settings: "Settings",
    savePreferences: "Save preferences",
    rejectNonEssential: "Reject non-essential",
    privacyLink: "Read our privacy policy",
  },
  visitorCounter: { label: "Visitors" },
  themeToggle: {
    toDark: "Switch to dark mode",
    toLight: "Switch to light mode",
    darkMode: "Dark mode",
    lightMode: "Light mode",
  },
  legalShell: { backHome: "← Back to home", updatedLabel: "Last updated" },
  privacyPolicy: {
    metaTitle: "Privacy Policy (PDPA) — PichaiFX Autotrad",
    metaDescription:
      "PichaiFX Autotrad's privacy policy, in line with Thailand's Personal Data Protection Act B.E. 2562 (PDPA).",
    pageTitle: "Privacy Policy",
    updatedAt: "September 27, 2026",
    noticeHtml:
      "<strong>Important note:</strong> The content on this page is a general privacy policy template, prepared in line with the principles of Thailand's Personal Data Protection Act B.E. 2562 (PDPA) and comparable international frameworks (such as the GDPR), intended only as a starting point. <u>It does not constitute legal advice.</u> Before using it, have a lawyer or a data protection specialist review it and update the entity details, contact channels, and data-processing specifics to match your actual business.",
    sections: [
      {
        heading: "1. General Information",
        bodyHtml:
          "<p class='mt-3'>This Privacy Policy (\"Policy\") explains how PichaiFX Autotrad (\"we\", \"the company\") collects, uses, discloses, and safeguards the personal data of users of our website and related services (\"you\"), in accordance with the Personal Data Protection Act B.E. 2562 and relevant international standards. By using this website, you are deemed to have read and agreed to the terms of this Policy.</p>",
      },
      {
        heading: "2. Personal Data We Collect",
        bodyHtml:
          "<p class='mt-3'>We collect your personal data in the following circumstances:</p><ul class='mt-3'><li><strong>Data you provide directly</strong> through the \"Submit trading account\" form, including your full name, contact channel (LINE ID or phone number), broker name, trading account number, server name, and any additional notes you provide.</li><li><strong>Technical data</strong>, such as IP address, device and browser type, and anonymous website visit statistics (e.g. total visitor count), collected via essential and analytics cookies.</li></ul><p class='mt-3'>We do not collect trading account passwords (whether a main password or an Investor Password) through the forms on this website.</p>",
      },
      {
        heading: "3. Purposes and Legal Basis for Processing",
        bodyHtml:
          "<ul class='mt-3'><li>To contact you back and activate the automated trading system you requested (contractual / consent basis).</li><li>To respond to inquiries and provide customer support (contractual / consent basis).</li><li>To analyze and improve the quality of the website, such as visitor statistics (consent and legitimate interest basis).</li><li>To comply with the law or orders of competent authorities (legal obligation basis).</li></ul>",
      },
      {
        heading: "4. Cookies",
        bodyHtml:
          "<p class='mt-3'>This website uses two types of cookies:</p><ul class='mt-3'><li><strong>Essential cookies</strong>, required for the basic functioning of the website, such as remembering your chosen light/dark mode. These cannot be disabled.</li><li><strong>Analytics cookies</strong>, used to count website visitors anonymously. You may choose to reject this type of cookie via the cookie banner or the \"Cookie Settings\" button in the footer.</li></ul>",
      },
      {
        heading: "5. Disclosure to Third Parties",
        bodyHtml:
          "<p class='mt-3'>We may disclose your personal data to service providers we use to operate our business, only to the extent necessary — such as email service providers and hosting/cloud providers, which may be located outside Thailand. We require such providers to keep the data confidential and protect it to an appropriate standard. We do not sell your personal data to third parties for marketing purposes.</p>",
      },
      {
        heading: "6. Cross-Border Data Transfer",
        bodyHtml:
          "<p class='mt-3'>Because some of the service providers we use (such as email or hosting providers) may have servers located outside Thailand, your data may be transferred abroad. In such cases, we will take steps to ensure that the destination country or data recipient maintains an adequate standard of personal data protection as required by law.</p>",
      },
      {
        heading: "7. Data Retention Period",
        bodyHtml:
          "<p class='mt-3'>We retain your personal data only as long as necessary for the purposes stated in this Policy, or as required by law. Once that period has passed, we will delete or destroy the data, or render it unable to identify you.</p>",
      },
      {
        heading: "8. Data Security Measures",
        bodyHtml:
          "<p class='mt-3'>We maintain appropriate technical and organizational measures to prevent unauthorized access, use, alteration, or disclosure of personal data, such as encrypting data in transit (HTTPS) and restricting data access to relevant personnel only.</p>",
      },
      {
        heading: "9. Your Rights as a Data Subject",
        bodyHtml:
          "<p class='mt-3'>Under the PDPA, you have the following rights regarding your personal data:</p><ul class='mt-3'><li>The right to access and request a copy of your personal data.</li><li>The right to request correction to keep data accurate and up to date.</li><li>The right to request deletion, destruction, or anonymization of data.</li><li>The right to request temporary suspension of data use.</li><li>The right to object to the collection, use, or disclosure of data.</li><li>The right to request data portability, where required by law.</li><li>The right to withdraw consent at any time, without affecting processing carried out before withdrawal.</li></ul><p class='mt-3'>You may exercise these rights by contacting us through the channels listed in Section 11.</p>",
      },
      {
        heading: "10. Changes to This Policy",
        bodyHtml:
          "<p class='mt-3'>We may update this Policy from time to time to reflect changes in the law or in our business practices. The date of the latest update will be shown at the top of this page.</p>",
      },
      {
        heading: "11. Contact Channels",
        bodyHtml:
          "<p class='mt-3'>If you have questions about this Privacy Policy, or wish to exercise your rights as a data subject, you can reach us at:</p><ul class='mt-3'><li>Email: <a href='mailto:privacy@pichaifxautotrad.com'>privacy@pichaifxautotrad.com</a> (please replace with your actual email)</li><li>LINE: @pichaifxautotrad (please replace with your actual LINE ID)</li></ul>",
      },
    ],
  },
  terms: {
    metaTitle: "Terms of Use — PichaiFX Autotrad",
    metaDescription: "Terms and conditions for using the PichaiFX Autotrad website and services.",
    pageTitle: "Terms of Use",
    updatedAt: "September 27, 2026",
    noticeHtml:
      "<strong>Important note:</strong> The content on this page is a general template and does not constitute legal advice. Have a lawyer review and adapt it to match your actual business before use.",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        bodyHtml:
          "<p class='mt-3'>By accessing this website, you agree to comply with these Terms of Use. If you do not agree with these Terms, please refrain from using the website.</p>",
      },
      {
        heading: "2. Nature of the Service",
        bodyHtml:
          "<p class='mt-3'>PichaiFX Autotrad provides information about automated trading systems (EAs), Copy Trading services, and educational trading content. This website does not constitute investment advice and does not guarantee any returns from using the service.</p>",
      },
      {
        heading: "3. User Responsibilities",
        bodyHtml:
          "<ul class='mt-3'><li>You must provide accurate and truthful information when filling out forms on the website.</li><li>You are responsible for keeping your trading account and password secure.</li><li>You acknowledge and accept the risks associated with trading financial products on your own.</li></ul>",
      },
      {
        heading: "4. Intellectual Property",
        bodyHtml:
          "<p class='mt-3'>All content, logos, and trademarks on this website are the property of PichaiFX Autotrad. Copying, reproduction, or distribution without prior written permission is prohibited.</p>",
      },
      {
        heading: "5. Limitation of Liability",
        bodyHtml:
          "<p class='mt-3'>We are not liable for any direct or indirect damages arising from your use of the website or your investment decisions. Please review the<a href='/risk-warning'> Risk Warning</a> before deciding to use the service.</p>",
      },
      {
        heading: "6. Changes to These Terms",
        bodyHtml:
          "<p class='mt-3'>We reserve the right to update these Terms at any time. The date of the latest update will be shown at the top of this page.</p>",
      },
      {
        heading: "7. Governing Law",
        bodyHtml: "<p class='mt-3'>These Terms are governed by the laws of Thailand.</p>",
      },
    ],
  },
  riskWarning: {
    metaTitle: "Risk Warning — PichaiFX Autotrad",
    metaDescription: "Risk warning regarding trading financial products and automated trading systems.",
    pageTitle: "Risk Warning",
    updatedAt: "September 27, 2026",
    sections: [
      {
        heading: "Trading Risk",
        bodyHtml:
          "<p class='mt-3'>Trading financial products such as Forex, gold, and cryptocurrency carries a high level of risk and may result in the loss of some or all of your invested capital. Past performance — whether of an EA, a Copy Trading strategy, or any sample account shown on this website — <strong>does not guarantee future results.</strong></p>",
      },
      {
        heading: "Risks of Automated Trading Systems (EA)",
        bodyHtml:
          "<p class='mt-3'>Automated trading systems operate according to pre-set conditions and logic, which may be affected by abnormal market conditions, internet latency, power outages, or other technical issues beyond our control. You should monitor the system's operation regularly and set risk management measures (such as Stop Loss) appropriate to your acceptable risk level.</p>",
      },
      {
        heading: "You Decide and Control Your Own Funds",
        bodyHtml:
          "<p class='mt-3'>All of your funds remain in your own trading account with the broker of your choice. PichaiFX Autotrad does not hold or access your funds, and is not a licensed broker or financial advisor. All investment decisions are your sole responsibility.</p>",
      },
      {
        heading: "Recommendations",
        bodyHtml:
          "<ul class='mt-3'><li>Only invest money you can afford to lose.</li><li>Study and understand a strategy before using it with real funds.</li><li>Consider testing on a demo account before going live.</li><li>Consult a licensed financial advisor if you are unsure.</li></ul>",
      },
    ],
    noticeHtml:
      "The content on this page is provided for general informational purposes only and does not constitute investment or legal advice.",
  },
};

const zh: Dictionary = {
  nav: {
    links: [
      { href: "#platform", label: "平台" },
      { href: "#products", label: "产品" },
      { href: "#performance", label: "交易成绩" },
      { href: "#ea-download", label: "EA 下载" },
      { href: "#connect-account", label: "提交交易账户" },
      { href: "#academy", label: "学院" },
      { href: "#pricing", label: "套餐" },
    ],
    login: "登录",
    start: "立即开始",
    openMenu: "打开菜单",
  },
  hero: {
    badge: "支持 MT4 与 MT5 · 即刻连接",
    titleLine1: "让您的交易",
    titleLine2: "全天24小时自动运行",
    subtitle:
      "PichaiFX Autotrad 将您的交易策略转化为真正运行的自动化系统，并提供可验证的交易数据，而不只是宣传口号。",
    heroImageAlt: "Alpha AI 交易信号 — 每日及每月的 AI 交易信号，点击查看最新信号",
    ctaSignal: "AI 信号",
    ctaStart: "免费开始使用",
    ctaPerformance: "查看真实交易成绩",
    stats: [
      ["MT4 / MT5", "完全支持"],
      ["自动化", "即时下单"],
      ["24/5", "市场开盘时全程运行"],
      ["风控引擎", "自动风险控制"],
    ],
    panelLive: "PICHAIFX ENGINE · 实时",
    panelOnline: "在线",
    goldGridAlt: "GoldGridTVE — 全天候24/7自动运行的交易系统",
  },
  trustBar: [
    { label: "智能算法", desc: "精准度更上一层楼" },
    { label: "风险管理", desc: "系统内置防护机制" },
    { label: "24/7 监控", desc: "全天候紧盯市场" },
    { label: "随时随地交易", desc: "任何时间、任何设备" },
  ],
  performance: {
    eyebrow: "交易成绩",
    titleLine1: "真实可查证的数据",
    titleLine2: "而非广告宣传",
    body: "PichaiFX Autotrad 的每一个账户都连接至 Myfxbook，您可以随时查看收益、风险与交易记录。我们将真实运行结果与预测数据严格区分。",
    ctaMyfxbook: "前往 Myfxbook 查看",
    ctaHistory: "查看完整交易记录",
    metrics: [
      { label: "净利润", value: "+$12,842" },
      { label: "最大回撤", value: "8.42%" },
      { label: "胜率", value: "72.8%" },
      { label: "盈利因子", value: "1.84" },
    ],
    equityChartLabel: "累计资金曲线图",
  },
  products: {
    eyebrow: "产品",
    title: "您的交易系统所需要的一切工具",
    viewDetails: "查看详情",
    items: [
      {
        name: "PichaiFX EA",
        desc: "适用于 MT4 与 MT5 的自动交易机器人，按预设策略运行，无需守着屏幕。",
        tag: "MT4 / MT5",
      },
      {
        name: "跟单交易 (Copy Trading)",
        desc: "将您的账户连接到所选策略，让交易指令实时自动执行。",
        tag: "自动化",
      },
      {
        name: "AI 分析",
        desc: "根据实时行情数据分析市场趋势与波动性，辅助您做出决策。",
        tag: "实时",
      },
      {
        name: "交易工具",
        desc: "提供指标与辅助工具，供您自行定制交易系统。",
        tag: "灵活",
      },
    ],
  },
  howItWorks: {
    eyebrow: "使用方法",
    title: "4个步骤即可开始",
    steps: [
      { title: "创建账户", desc: "注册 PichaiFX Autotrad，不到2分钟即可完成。" },
      { title: "连接 MT4 / MT5", desc: "填写您的交易账户号码以连接系统。" },
      { title: "选择策略", desc: "选择适合您的 EA 或跟单交易策略。" },
      { title: "启动自动系统", desc: "系统立即开始运行，随时可查看运行结果。" },
    ],
  },
  eaDownload: {
    badge: "EA 下载",
    titleLine1: "下载自动交易系统 PichaiFX EA",
    body: "适用于 MT4 / MT5 的现成 EA 文件，下载后安装到您的交易平台，然后通过下方表单提交交易账户，我们的管理员将为您开通系统。",
    downloadBtn: "下载 EA",
    connectBtn: "提交交易账户",
    stepsLabel: "使用步骤",
    steps: [
      "从下方链接下载 EA 文件。",
      "将 EA 文件安装到您的 MT4 / MT5 平台。",
      "通过下方表单提交交易账户，由管理员为您开通。",
    ],
  },
  connectAccount: {
    eyebrow: "会员专区",
    title: "向管理员提交交易账户",
    body: "填写您想使用的 MT4 / MT5 账户信息，管理员将与您联系以核实身份，并为您的账户开通自动交易系统。",
    afterSubmitLabel: "提交后的处理流程",
    afterSubmitItems: [
      "管理员将核实您的账户信息，并通过您提供的联系方式回复您。",
      "管理员会告知与您账户相匹配的 EA 或跟单交易开通步骤。",
      "此阶段无需提供任何密码，管理员会另行说明安全的连接方式。",
    ],
    brokers: ["OEXN", "Exness", "XM", "IC Markets", "FBS", "Pepperstone", "其他"],
    successTitle: "信息已成功提交",
    successBody:
      "PichaiFX Autotrad 团队已收到您的账户信息，管理员将在24小时内通过您提供的联系方式与您联系。",
    successAgain: "提交另一个账户",
    labels: {
      name: "姓名",
      namePlaceholder: "您的姓名",
      contact: "联系方式",
      contactPlaceholder: "LINE ID 或电话号码",
      broker: "经纪商",
      brokerPlaceholder: "选择您的经纪商",
      accountNumber: "交易账户号码",
      accountNumberPlaceholder: "例如 88421093",
      server: "服务器 (Server)",
      serverPlaceholder: "例如 Exness-Real8",
      note: "补充说明（选填）",
      notePlaceholder: "例如：希望使用 PichaiFX Gold 策略，或其他问题",
      consentPrefix: "本人已阅读并同意根据以下",
      consentLinkText: "隐私政策 (PDPA)",
      consentSuffix: "收集、使用及披露上述个人信息，此为 PichaiFX Autotrad 的相关规定",
      submit: "提交给管理员",
      submitting: "正在提交...",
      genericError: "提交失败，请重试。",
      networkError: "无法连接服务器，请重试。",
    },
  },
  copyTrading: {
    eyebrow: "跟单交易",
    title: "选择策略，让系统替您交易",
    body: "以下收益数据基于过去90天的真实账户记录。历史表现不能保证未来收益。",
    returnLabel: "收益率",
    followersLabel: "跟随人数",
    detailsBtn: "查看策略详情",
    riskLabels: { "ปานกลาง": "中等", "ต่ำ": "低", "สูง": "高" },
    strategies: [
      {
        name: "PichaiFX Gold",
        focus: "XAUUSD 趋势跟踪",
        ret: "+18.4%",
        dd: "6.2%",
        risk: "ปานกลาง",
        followers: "482",
      },
      {
        name: "PichaiFX Grid",
        focus: "多货币对网格系统",
        ret: "+11.9%",
        dd: "4.8%",
        risk: "ต่ำ",
        followers: "310",
      },
      {
        name: "PichaiFX Momentum",
        focus: "BTCUSD / ETHUSD",
        ret: "+27.1%",
        dd: "12.4%",
        risk: "สูง",
        followers: "196",
      },
    ],
  },
  pricing: {
    eyebrow: "套餐",
    title: "选择适合您交易风格的套餐",
    popular: "最受欢迎",
    sponsoredLabel: "赞助商",
    plans: [
      {
        name: "入门版 (Starter)",
        desc: "适合刚开始使用自动化系统的用户",
        price: "免费",
        period: "",
        features: ["1个账户基础 EA 授权", "社区支持", "每月策略更新"],
        cta: "免费开通1个账户",
      },
      {
        name: "专业版 (Professional)",
        desc: "适合追求完整效果的交易者",
        price: "1,990",
        period: "泰铢 / 月",
        features: [
          "全部 EA，账户数量不限",
          "AI 分析与实时信号",
          "赠送免费 VPS",
          "专属 LINE 客服支持",
        ],
        cta: "选择此套餐",
      },
      {
        name: "托管版 (Managed)",
        desc: "由 PichaiFX Autotrad 团队全权代管",
        price: "联系客服",
        period: "",
        features: ["由团队管理投资组合", "每周绩效报告", "根据您的风险偏好调整策略"],
        cta: "联系我们",
      },
    ],
  },
  academy: {
    eyebrow: "学院",
    title: "实盘交易前先学习",
    viewAll: "查看全部文章",
    readArticle: "阅读文章",
    articles: [
      { tag: "基础知识", title: "什么是外汇？如何安全入门" },
      { tag: "行情分析", title: "移动平均线在判断趋势中的应用原理" },
      { tag: "风险管理", title: "系统化管理手数与止损" },
      { tag: "EA", title: "在 MT4 / MT5 上正确设置 EA，一次到位" },
    ],
  },
  faq: {
    eyebrow: "常见问题",
    title: "开始之前您应该了解的事",
    items: [
      {
        q: "PichaiFX Autotrad 是什么？",
        a: "PichaiFX Autotrad 是一个自动化交易技术平台，为 MT4 与 MT5 用户提供 EA、跟单交易以及市场分析工具。",
      },
      {
        q: "支持 MT4 还是 MT5？",
        a: "两个平台均支持，您可以立即将现有的交易账户连接到系统。",
      },
      {
        q: "是否必须使用 VPS？",
        a: "并非必须，但建议使用 VPS，以便系统全天24小时持续运行，不依赖您的个人电脑。专业版套餐赠送免费 VPS。",
      },
      {
        q: "可以使用哪些经纪商？",
        a: "适用于大多数支持标准 MT4/MT5 的经纪商，我们的团队会在您正式使用前确认兼容性。",
      },
      {
        q: "可以自行提款吗？",
        a: "可以。您的所有资金都保留在您自己在经纪商处开设的交易账户中，PichaiFX Autotrad 不会持有用户的资金。",
      },
      {
        q: "有哪些风险？",
        a: "交易始终存在资金风险，历史表现不能保证未来收益。开始使用前应充分了解并设定可接受的风险水平。",
      },
    ],
    ctaTitle: "还有其他问题吗？",
    ctaBody: "可直接通过 LINE 官方账号联系我们的管理员，快速回复，免费咨询。",
    ctaButton: "通过 LINE OA 联系我们",
  },
  contact: {
    title: "对系统有疑问吗？",
    body: "PichaiFX Autotrad 团队随时为您解答账户连接、策略选择以及系统设置等相关问题。",
    lineButton: "通过 LINE OA 联系我们",
    channels: [
      { label: "LINE", value: "@pichaifx", href: LINE_OA_URL },
      { label: "Telegram", value: "t.me/pichaifx" },
      { label: "邮箱", value: "support@pichaifx.com" },
    ],
  },
  footer: {
    tagline: "专注于自动化交易技术，追求透明、可验证，并进行系统化的风险控制。",
    columns: [
      {
        title: "平台",
        links: [
          { label: "EA / 自动交易", href: "#products" },
          { label: "MT4 / MT5", href: "#platform" },
          { label: "风控引擎", href: "#platform" },
          { label: "数据分析", href: "#products" },
        ],
      },
      {
        title: "公司",
        links: [
          { label: "关于我们", href: "#top" },
          { label: "交易成绩", href: "#performance" },
          { label: "学院", href: "#academy" },
          { label: "联系我们", href: "#contact" },
        ],
      },
      {
        title: "法律信息",
        links: [
          { label: "使用条款", href: "/terms" },
          { label: "隐私政策 (PDPA)", href: "/privacy-policy" },
          { label: "风险警示", href: "/risk-warning" },
        ],
      },
    ],
    rights: "版权所有，保留一切权利。",
    cookieSettings: "Cookie 设置",
    disclaimer:
      "交易金融产品存在风险，历史表现并不能保证未来收益。请在做出投资决定前充分考虑风险。详情请参阅",
    riskLinkText: "风险警示",
  },
  cookieConsent: {
    title: "本网站使用 Cookie",
    body: "我们使用网站正常运行所必需的 Cookie，以及用于分析使用情况的 Cookie（例如访客人数统计），以持续改善我们的服务，符合《个人数据保护法》(PDPA) 的相关规定。您可以选择接受或拒绝非必要 Cookie。",
    essentialTitle: "必要 Cookie",
    essentialDesc: "用于网站基本功能运行，无法关闭。",
    essentialAlwaysOn: "始终开启",
    analyticsTitle: "分析 Cookie",
    analyticsDesc: "用于匿名统计访客人数，以改进网站体验。",
    acceptAll: "全部接受",
    settings: "设置",
    savePreferences: "保存设置",
    rejectNonEssential: "拒绝非必要项",
    privacyLink: "阅读隐私政策",
  },
  visitorCounter: { label: "访客人数" },
  themeToggle: {
    toDark: "切换至夜间模式",
    toLight: "切换至日间模式",
    darkMode: "夜间模式",
    lightMode: "日间模式",
  },
  legalShell: { backHome: "← 返回首页", updatedLabel: "最近更新" },
  privacyPolicy: {
    metaTitle: "隐私政策 (PDPA) — PichaiFX Autotrad",
    metaDescription: "PichaiFX Autotrad 依据泰国《个人数据保护法》(B.E. 2562, PDPA) 制定的隐私政策。",
    pageTitle: "隐私政策 (Privacy Policy)",
    updatedAt: "2026年9月27日",
    noticeHtml:
      "<strong>重要提示：</strong>本页内容为通用隐私政策模板，参照泰国《个人数据保护法》(B.E. 2562, PDPA) 及类似国际规范（如 GDPR）的原则编写，仅作为起始参考。<u>不构成法律建议。</u>在实际使用前，请务必请法律顾问或数据保护专家审核，并根据您的实际业务情况修改企业信息、联系方式及数据处理细节。",
    sections: [
      {
        heading: "1. 一般信息",
        bodyHtml:
          "<p class='mt-3'>本隐私政策（\"本政策\"）说明 PichaiFX Autotrad（\"我们\"、\"本公司\"）如何依据泰国《个人数据保护法》B.E. 2562 及相关国际标准，收集、使用、披露并妥善保管本网站及相关服务用户（\"您\"）的个人数据。使用本网站即视为您已阅读并同意本政策的相关条款。</p>",
      },
      {
        heading: "2. 我们收集的个人数据",
        bodyHtml:
          "<p class='mt-3'>我们会在以下情况下收集您的个人数据：</p><ul class='mt-3'><li><strong>您直接提供的信息</strong>：通过\"提交交易账户\"表单填写的姓名、联系方式（LINE ID 或电话号码）、经纪商名称、交易账户号码、服务器名称，以及您填写的其他补充信息。</li><li><strong>技术信息</strong>：例如 IP 地址、设备与浏览器类型，以及通过必要 Cookie 与分析 Cookie 收集的匿名网站访问统计数据（如总访客数）。</li></ul><p class='mt-3'>我们不会通过本网站的表单收集交易账户密码（无论是主密码还是 Investor Password）。</p>",
      },
      {
        heading: "3. 数据处理的目的与法律依据",
        bodyHtml:
          "<ul class='mt-3'><li>为回复您并根据您的请求开通自动交易系统（合同履行/同意依据）</li><li>为回答咨询并提供客户支持（合同履行/同意依据）</li><li>为分析并改善网站质量，例如访客统计（同意及正当利益依据）</li><li>为遵守法律或主管机关的命令（法定义务依据）</li></ul>",
      },
      {
        heading: "4. Cookie（网络饼干）",
        bodyHtml:
          "<p class='mt-3'>本网站使用两种类型的 Cookie：</p><ul class='mt-3'><li><strong>必要 Cookie</strong>：用于网站基本功能，例如记住您选择的日间/夜间模式，此类 Cookie 无法关闭。</li><li><strong>分析 Cookie</strong>：用于匿名统计网站访客人数，您可以通过 Cookie 横幅或网站底部的\"Cookie 设置\"按钮选择拒绝此类 Cookie。</li></ul>",
      },
      {
        heading: "5. 向第三方披露信息",
        bodyHtml:
          "<p class='mt-3'>我们可能会在必要范围内，将您的个人数据披露给我们用于运营业务的服务提供商，例如邮件服务提供商、主机/云服务提供商，这些提供商可能位于泰国境外。我们将要求此类服务提供商对信息保密，并按适当标准保护个人数据。我们不会将您的个人数据出售给第三方用于营销目的。</p>",
      },
      {
        heading: "6. 数据的跨境传输",
        bodyHtml:
          "<p class='mt-3'>由于我们使用的部分服务提供商（如邮件或主机服务商）的服务器可能位于泰国境外，您的数据可能会被传输至境外。在此情况下，我们将确保接收数据的国家或接收方具备法律要求的充分个人数据保护标准。</p>",
      },
      {
        heading: "7. 数据保留期限",
        bodyHtml:
          "<p class='mt-3'>我们仅在实现本政策所述目的所必需的期限内，或依法律规定的期限内保留您的个人数据。期限届满后，我们将删除、销毁数据，或使数据无法识别您的身份。</p>",
      },
      {
        heading: "8. 数据安全措施",
        bodyHtml:
          "<p class='mt-3'>我们采取适当的技术与管理措施，以防止未经授权的访问、使用、更改或披露个人数据，例如在数据传输过程中进行加密（HTTPS），并将数据访问权限限制在相关人员范围内。</p>",
      },
      {
        heading: "9. 数据主体的权利",
        bodyHtml:
          "<p class='mt-3'>依据 PDPA，您对自己的个人数据享有以下权利：</p><ul class='mt-3'><li>查阅并索取个人数据副本的权利</li><li>要求更正数据使其准确、最新的权利</li><li>要求删除、销毁数据或使数据无法识别身份的权利</li><li>要求暂时中止数据使用的权利</li><li>反对收集、使用或披露数据的权利</li><li>在法律规定的情况下要求数据可携带（Data Portability）的权利</li><li>随时撤回同意的权利，且不影响撤回前已进行的处理</li></ul><p class='mt-3'>您可以通过第11条中的联系方式行使上述权利。</p>",
      },
      {
        heading: "10. 政策的变更",
        bodyHtml:
          "<p class='mt-3'>我们可能会不时更新本政策，以符合法律变化或业务运营方式的调整。最新更新日期将显示在本页面顶部。</p>",
      },
      {
        heading: "11. 联系方式",
        bodyHtml:
          "<p class='mt-3'>如您对本隐私政策有任何疑问，或希望行使数据主体的相关权利，可通过以下方式与我们联系：</p><ul class='mt-3'><li>邮箱：<a href='mailto:privacy@pichaifxautotrad.com'>privacy@pichaifxautotrad.com</a>（请替换为您的实际邮箱）</li><li>LINE：@pichaifxautotrad（请替换为您的实际 LINE ID）</li></ul>",
      },
    ],
  },
  terms: {
    metaTitle: "使用条款 — PichaiFX Autotrad",
    metaDescription: "PichaiFX Autotrad 网站及服务的使用条款与条件。",
    pageTitle: "使用条款 (Terms of Use)",
    updatedAt: "2026年9月27日",
    noticeHtml:
      "<strong>重要提示：</strong>本页内容为通用模板，不构成法律建议。使用前请务必请法律顾问审核并调整以符合您的实际业务。",
    sections: [
      {
        heading: "1. 条款的接受",
        bodyHtml: "<p class='mt-3'>访问本网站即表示您同意并接受遵守本使用条款。如您不同意本条款，请勿使用本网站。</p>",
      },
      {
        heading: "2. 服务性质",
        bodyHtml:
          "<p class='mt-3'>PichaiFX Autotrad 提供关于自动交易系统（EA）、跟单交易服务及交易知识内容的信息。本网站不构成投资建议，也不对使用本服务所产生的任何收益作出任何保证。</p>",
      },
      {
        heading: "3. 用户责任",
        bodyHtml:
          "<ul class='mt-3'><li>您必须在网站表单中填写真实准确的信息。</li><li>您需自行妥善保管交易账户及密码的安全。</li><li>您自行知悉并承担交易金融产品所涉及的相关风险。</li></ul>",
      },
      {
        heading: "4. 知识产权",
        bodyHtml:
          "<p class='mt-3'>本网站上的所有内容、标志及商标均为 PichaiFX Autotrad 的财产，未经书面许可不得复制、转载或传播。</p>",
      },
      {
        heading: "5. 责任限制",
        bodyHtml:
          "<p class='mt-3'>我们不对因使用本网站或您的投资决定而产生的任何直接或间接损失承担责任。在决定使用本服务前，请务必阅读<a href='/risk-warning'>风险警示</a>。</p>",
      },
      {
        heading: "6. 条款的变更",
        bodyHtml: "<p class='mt-3'>我们保留随时修改本条款的权利，最新更新日期将显示在本页面顶部。</p>",
      },
      {
        heading: "7. 适用法律",
        bodyHtml: "<p class='mt-3'>本条款受泰国法律管辖。</p>",
      },
    ],
  },
  riskWarning: {
    metaTitle: "风险警示 — PichaiFX Autotrad",
    metaDescription: "关于交易金融产品及自动交易系统的风险警示。",
    pageTitle: "风险警示 (Risk Warning)",
    updatedAt: "2026年9月27日",
    sections: [
      {
        heading: "交易风险",
        bodyHtml:
          "<p class='mt-3'>交易外汇、黄金及加密货币等金融产品存在较高风险，可能导致您损失部分或全部投资资金。本网站所展示的任何历史表现——无论是 EA、跟单交易策略，还是任何示例账户——<strong>均不能保证未来收益。</strong></p>",
      },
      {
        heading: "自动交易系统 (EA) 的风险",
        bodyHtml:
          "<p class='mt-3'>自动交易系统按照预先设定的条件与逻辑运行，可能受到异常市场状况、网络延迟、停电或其他超出我们控制范围的技术问题的影响。您应定期关注系统的运行情况，并根据自身可承受的风险水平设置相应的风险管理措施（如止损）。</p>",
      },
      {
        heading: "您自行决定并掌控自己的资金",
        bodyHtml:
          "<p class='mt-3'>您的全部资金均保留在您自行选择的经纪商处的交易账户中。PichaiFX Autotrad 不持有也无法接触您的资金，亦非持牌经纪商或财务顾问。所有投资决定均由您本人独自承担责任。</p>",
      },
      {
        heading: "建议",
        bodyHtml:
          "<ul class='mt-3'><li>仅使用您能够承受损失风险的资金进行投资。</li><li>在实盘操作前，务必先了解并掌握相关策略。</li><li>建议先在模拟账户 (Demo) 上进行测试，再使用真实账户。</li><li>如有疑问，请咨询持牌财务顾问。</li></ul>",
      },
    ],
    noticeHtml: "本页内容仅供一般信息参考之用，不构成投资建议或法律建议。",
  },
};

export const translations: Record<Locale, Dictionary> = { th, en, zh };
