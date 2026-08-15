export const pricing = {
  eyebrow: "투명한 요금",
  headlineLines: ["두 가지 방식,", "선택은 자유롭게."],
  intro: "보관 기간에 맞춰 선택하세요. 초과 크기 물품에는 고정 추가 요금이 붙는 것 외에는 추가 비용이 없습니다.",
  perBagNote:
    "요금은 인원이 아닌 가방 개수 기준입니다 — 보관하는 가방이나 물품 1개당 1건으로 계산됩니다. 여러 개를 맡기신다면 WhatsApp으로 알려주시면 함께 안내해 드립니다.",
  lane1: {
    label: "1번 — 자유 요금제",
    sublabel: "관광객 및 워크인 고객용",
    surchargeNote: "초과 크기 물품(28인치 이상 캐리어, 자전거, 서프보드, 대형 박스)은 +30,000₫ 추가",
  },
  lane2: {
    label: "2번 — 고정 요금제",
    sublabel: "주재원 및 디지털 노마드용",
    surchargeNote: "초과 크기 물품은 +50,000₫ 추가 · 조기 픽업 시에도 요금은 동일합니다",
  },
  plans: {
    hourly: { name: "시간제", unit: "/ 시간 / 가방", duration: "최소 1시간, 시간 단위 청구", tag: null as string | null },
    daily: { name: "일일 요금제", unit: "/ 일 / 가방", duration: "맡긴 시점부터 최대 24시간", tag: "가성비 최고" as string | null },
    mini: { name: "미니", unit: "고정 / 가방", duration: "최대 1주일", tag: null as string | null },
    strand: { name: "스트랜드", unit: "고정 / 가방", duration: "최대 1개월", tag: "가장 인기" as string | null },
    longstay: { name: "장기 보관", unit: "고정 / 가방", duration: "최대 4개월", tag: null as string | null },
  },
  cta: {
    button: "지금 예약하기",
    note: "회원가입 불필요 · 워크인 문의는 WhatsApp 0905 955 161",
  },
  faqLink: "요금이 궁금하신가요? FAQ에서 확인하세요",
} as const;
