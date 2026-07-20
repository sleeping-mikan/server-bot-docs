---
name: design
description: server-bot docs サイトのデザインシステム。見た目の変更・新規ページ追加・CSS/JS 編集の前に必ず参照する。
---

# server-bot docs デザインシステム

このサイトは**ビルドなしの静的 HTML + 共有 CSS 1 枚(`assets/style.css`)+ 共有 JS 1 枚(`assets/site.js`)**で構成される。
フレームワーク・CDN・Web フォントは使わない。すべてのページが同じヘッダー / サイドバー / 本文 / ページ内目次 / フッターの骨格を持つ。

## デザインの核(変えてはいけないもの)

- **鮮やかなオレンジが主役**。`--orange-500: #f97316` / `--orange-600: #ea580c` を基調とし、
  くすんだ・柔らかいトーンへの全面的な置き換えは過去に差し戻された(NG)。
- **背景だけは温かいクリーム色** `--bg: #fdf6ec`。ここは彩度を上げない。
- **ライトモードのみ**。ダークモード対応はしない。
- カードに上縁のアクセントバーを付けない(過去に削除済み・NG)。
- コールアウト(`.note` / `.warn`)に左縁の太いアクセントボーダーを付けない(過去に削除済み・NG)。
  枠線は四辺とも同じ 1px。
- `--header-h` はヘッダーの実高さと、サイドバー / 目次(.toc)の sticky `top` のすべてで使う。
  片方だけ変えるとスクロール開始時に目次がズレて見える。必ずセットで扱う。

## カラートークン(:root)

| 用途 | 変数 | 値 |
|---|---|---|
| 主張色 | `--orange-500` / `--orange-600` | `#f97316` / `#ea580c` |
| 淡い面 | `--orange-50` / `--orange-100` | hover 背景・表ヘッダー・チップ |
| ページ背景 | `--bg` | `#fdf6ec`(温かいクリーム) |
| パネル | `--bg-panel` | `#ffffff` |
| コードブロック背景 | `--bg-code` | `#fff3e6` |
| インライン code 面 | `--bg-code-chip` | `rgba(249,115,22,.09)` |
| 本文 / 補足 | `--text` / `--text-sub` | `#2d2a26` / `#6b6357` |
| 罫線 | `--border` | `#f0e2d0` |
| リンク | `--link` | `--orange-700` |
| 警告系 | rose 系(`#be123c` など) | warn コールアウト専用。多用しない |

角丸は `--radius-s / -m / -l`(8 / 12 / 16px)、影は `--shadow`(通常)と `--shadow-hover` の 2 段階。
新しい色・寸法は必ず `:root` にトークンとして追加し、生の値を散らさない。

## レイアウト骨格

`.layout` は **grid の 3 カラム**: `220px(.sidebar) / minmax(0,1fr)(main) / 180px(.toc)`。

- `.toc` は「このページ」目次。各ページの h2(と主要な節)へのリンクを手書きし、
  `site.js` がスクロール連動で `.active` を付ける。1100px 以下で非表示。
- 840px 以下は 1 カラム。サイドバーはチップ状の横並びナビに変形する。
- 本文の行長はこの 3 カラムで約 750px に保たれている。カラム幅を広げて行長を戻さない。

## タイポグラフィ

- フォント: OS 標準スタック(Segoe UI Variable Text / Segoe UI / Hiragino Sans / Noto Sans JP / Meiryo)。Web フォント禁止。
- 本文 `line-height: 1.75`。日本語ドキュメントなので詰めすぎない。
- 見出し階層は 3 段まで:
  - `h1` — ページタイトル。短い丸角のオレンジグラデーションバー(`::after`)。1 ページに 1 つ。
    index の `.hero` 内ではバー非表示(ボタンがオレンジを担う)。
  - `h2` — セクション。左端の丸いオレンジバー。必ず `id` を振る(TOC・ページ内リンク用)。
  - `h3` — 小見出し。`--orange-700` の文字色のみ。
- 和文と欧文・数字の間には半角スペースを入れる(例: `Python 3.12 の`)。

## コンポーネント一覧(class 名)

| class | 用途 |
|---|---|
| `.site-header` + `.inner` / `.logo`(+`.logo-mark` / `.ver`) / `.gh-link` | 共通ヘッダー(半透明オレンジグラデ + blur)。アイコンは `.logo-mark`(白の角丸チップ)で包み、画像の透明余白補正と saturate/contrast フィルタで淡い線画を締めている。ロゴ横に v3 チップ |
| `.layout` > `.sidebar` + `main` + `.toc` | 3 カラム骨格。sidebar / toc は sticky |
| `.sidebar .group-title` / `a.active` | サイトナビ。現在ページに `class="active"` |
| `.toc` + `.toc-title` | ページ内目次。active は site.js が制御 |
| `.hero` + `.hero-actions` + `.btn-primary` / `.btn-ghost` | index 専用の導入バンドと CTA |
| `p.lead` | ページ冒頭のリード文 |
| `.note` / `.warn` | コールアウト。白面 + 1px 枠。NOTE=オレンジ、WARNING=ローズ |
| `.table-wrap > table` | 表は必ず `.table-wrap` で包む。th は orange-50 面 + 下 2px オレンジ罫線(ベタ塗り NG)。ゼブラなし・hover のみ |
| `.cmd-table` / `.cmd-group` / `.td-note` | commands のセクション分割表。識別子 code は nowrap、セル内注記は `.td-note` |
| `figure.code > figcaption + pre` | ファイル名ラベル付きコードブロック(「ファイル全体」を示すブロックだけに付ける) |
| `.pre-wrap` / `.copy-btn` | site.js が pre を包んで注入するコピーボタン(hover 表示、タッチ端末は常時) |
| `.card-grid > .card` | index の入口カード。2 列固定、奇数末尾はフルワイド |
| `.page-nav` + `.page-nav-prev` / `.page-nav-next` | 全ページ末尾の前後ページ送り |
| `.steps` | 番号付き手順。丸数字 + 縦の接続線 |
| `.search-wrap + .filter-box` / `.filter-count` / `.key-hint` | 絞り込み検索。`/` キーで site.js がフォーカス |
| `.lv` | 権限レベルバッジ |
| `.tips` | 補足の小さめテキスト |
| `.mdi` | インライン SVG アイコン(Material Design Icons のパスを直接埋め込む) |

アイコンは MDI の 24x24 パスを `<svg class="mdi" viewBox="0 0 24 24"><path d="..."/></svg>` として直接埋め込む。画像ファイルや icon font は使わない。

## 表の作法

- 識別子(コマンド名・設定キー)のチップ内改行は禁止(`table code { white-space: nowrap }`)。
  ドット区切りの長いキーは HTML 側でドット直後に `<wbr>` を入れ、セグメント境界でだけ折る。
- 収まらない表は `.table-wrap` の横スクロールに逃がす。mid-token 改行より横スクロールが正。
- セル内の補足(`*1` や「config で〜」)は `<small class="td-note">` に分離する。

## 品質の作法

- 影は `--shadow` / `--shadow-hover` の 2 段階まで。派手なグローは使わない。
- インタラクション: hover / focus には 0.12–0.2s の transition。`:focus-visible` に必ずフォーカスリング。
- `prefers-reduced-motion` ではアニメーションを止める。hover 依存の UI は `@media (hover: none)` で常時表示に。
- ページの h2 構成を変えたら、そのページの `.toc` も必ず同期する。

## 新規ページの追加手順

1. 既存ページ(例: `web.html`)を複製し、`<title>` を「ページ名 | server-bot ドキュメント」にする。
2. 全ページの `.sidebar` にリンクを追加し、新ページでは自分に `class="active"` を付ける。
   サイドバーは全ページにコピーされているので、**全 HTML を漏れなく更新**する。
3. `h1` は 1 つ、リード文は `p.lead`。セクション `h2` には `id` を振り、`.toc` に列挙する。
4. ページ順(ホーム→導入→Web→拡張→コマンド→.config)に合わせて、前後ページの `.page-nav` も更新する。
5. `</body>` 直前に `<script src="assets/site.js" defer></script>` を入れる。
6. スタイルはインラインで書かず `assets/style.css` に追加する。
