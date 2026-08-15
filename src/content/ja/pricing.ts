export const pricing = {
  eyebrow: "わかりやすい料金",
  headlineLines: ["2つのプラン。", "お好きな方を。"],
  intro:
    "お預かり期間に合わせてお選びください。サイズ超過の追加料金以外に、かかる費用はありません。",
  perBagNote:
    "料金は人数ではなく荷物1個ごとです — お預かりするバッグや荷物1点につき1件として計算します。複数お預けの場合はWhatsAppでお知らせください、まとめて手配します。",
  lane1: {
    label: "プラン1 — フレキシブル",
    sublabel: "観光・当日ご来店の方に",
    surchargeNote:
      "サイズ超過の荷物（28インチ以上のスーツケース、自転車、サーフボード、大型の箱）は +30,000 ₫",
  },
  lane2: {
    label: "プラン2 — 定額",
    sublabel: "駐在員・デジタルノマドの方に",
    surchargeNote: "サイズ超過の荷物は +50,000 ₫ · 早めにお受け取りでも料金は変わりません",
  },
  plans: {
    hourly: { name: "時間単位", unit: "/ 時間 / 個", duration: "最低1時間、1時間単位で計算", tag: null as string | null },
    daily: { name: "1日単位", unit: "/ 日 / 個", duration: "お預かりから最大24時間", tag: "お得" as string | null },
    mini: { name: "ミニ", unit: "定額 / 個", duration: "最大1週間", tag: null as string | null },
    strand: { name: "ストランド", unit: "定額 / 個", duration: "最大1か月", tag: "人気No.1" as string | null },
    longstay: { name: "長期", unit: "定額 / 個", duration: "最大4か月", tag: null as string | null },
  },
  cta: {
    button: "荷物を預ける",
    note: "会員登録は不要 · 当日のご相談は WhatsApp 0905 955 161 へ",
  },
} as const;
