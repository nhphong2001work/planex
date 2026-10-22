"use client";

import { useState } from "react";
import type { Locale } from "@/lib/content";
import { t } from "@/lib/content";
import { ui } from "@/lib/ui";

const entries = [
  ["1956", "「内山商会」として創業開始", "Founded as Uchiyama Shokai."],
  ["1970", "組織を有限会社とし、社名を「東協工業有限会社」と改める", "Incorporated as a limited company and renamed Tōkyō Kōgyō Yūgen Kaisha (東協工業有限会社)."],
  ["1977", "試作モデル製作のため、埼玉県朝霞市に工場を設立", "Established a factory in Asaka, Saitama, to produce prototype models."],
  ["1981", "埼玉県朝霞市の工場を埼玉県和光市に移転", "Moved the factory from Asaka to Wako, Saitama."],
  ["1984", "和光工場を増設。組織を株式会社とし、社名を「株式会社東協工業」に改める", "Expanded the Wako factory, incorporated as a joint-stock company, and renamed it Tōkyō Kōgyō Co., Ltd. (株式会社東協工業)."],
  ["1988", "社名を「株式会社プラネックス」と改め、工場を群馬県前橋市に移転しました。", "Renamed the company Planex and relocated the factory to Maebashi, Gunma."],
  ["1997", "前橋工場敷地内に新社屋増設", "Expanded the head office building on the Maebashi factory site."],
  ["2004", "フィリピンに「Planex Technology, Inc.」を設立しました。", "Established Planex Technology, Inc. in the Philippines."],
  ["2009", "CADエンジニア請負業務開始", "Started CAD engineering outsourcing services."],
  ["2011", "振動溶着機 導入", "Installed a vibration-welding machine."],
  ["2012", "「Planex T&M Inc.」設立。「Planex Technology Inc.」は、「Planex T&M Inc.」の工場内に移転", "Established Planex T&M Inc. Planex Technology Inc. relocated to its factory."],
  ["2015", "三次元測定機「ミツトヨ CRYSTA Apex S 574」 導入", "Installed a Mitutoyo CRYSTA-Apex S 574 coordinate measuring machine."],
  ["2018", "CAD/CAM部門を分社化し、「株式会社プラネックス技研」を設立しました。技術者派遣業務の本格参入", "Spun off the CAD/CAM division to establish Planex Giken Co., Ltd. and began full-scale technical staffing services."],
  ["2020", "「CADmeister」導入", "Introduced CADmeister."],
  ["2023", "CNC旋盤「TAKISAWA : TCC-1100」導入", "Installed a TAKISAWA TCC-1100 CNC lathe."],
  ["2024", "射出成型機「 TOYO: Si-130-6s」導入", "Installed a TOYO Si-130-6s injection molding machine."],
] as const;

const summaryYears = new Set(["1988", "2004", "2018"]);

export function HistoryTimeline({ locale }: { locale: Locale }) {
  const [showDetails, setShowDetails] = useState(false);
  const visibleEntries = showDetails ? entries : entries.filter(([year]) => summaryYears.has(year));

  return (
    <>
      <div className={ui.timeline} id="company-history-timeline">
        {visibleEntries.map(([year, japanese, english]) => (
          <div className={ui.timelineItem} key={year}>
            <div className={ui.timelineYear}>{year}</div>
            <div>{locale === "ja" ? japanese : english}</div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className={`${ui.buttonLight} mt-6`}
        aria-expanded={showDetails}
        aria-controls="company-history-timeline"
        onClick={() => setShowDetails((isExpanded) => !isExpanded)}
      >
        {showDetails
          ? t(locale, "沿革を短く表示", "Show summary")
          : t(locale, "詳しい沿革を見る", "View full history")}
      </button>
    </>
  );
}
