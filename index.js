// index.js

// ==============================
// 1. BOSSES 定義
// ==============================
const BOSSES = [
  // id, name, respawn(min), type
  { id: 1, name: 'クイーンアント', respawn: 360, type: 'field' },
  { id: 2, name: 'ケルソス', respawn: 360, type: 'field' },
  { id: 3, name: 'サヴァン', respawn: 720, type: 'field' },
  { id: 4, name: 'チェルトゥバ', respawn: 180, type: 'field' },
  { id: 5, name: 'トロンバ', respawn: 270, type: 'field' },
  { id: 6, name: 'バシラ', respawn: 150, type: 'field' },
  { id: 7, name: 'エンクラ', respawn: 210, type: 'field' },
  { id: 8, name: 'カタン', respawn: 480, type: 'field' },
  { id: 9, name: 'ガレス', respawn: 360, type: 'field' },
  { id: 10, name: 'コアサセプタ', respawn: 720, type: 'field' },
  { id: 11, name: 'サルカ', respawn: 420, type: 'field' },
  { id: 12, name: 'スタン', respawn: 240, type: 'field' },
  { id: 13, name: 'タラキン', respawn: 420, type: 'field' },
  { id: 14, name: 'ティミトリス', respawn: 300, type: 'field' },
  { id: 15, name: 'テンペスト', respawn: 180, type: 'field' },
  { id: 16, name: 'パンドライド', respawn: 480, type: 'field' },
  { id: 17, name: 'フェリス', respawn: 120, type: 'field' },
  { id: 18, name: 'ミュータントクルマ', respawn: 480, type: 'field' },
  { id: 19, name: '汚染したクルマ', respawn: 480, type: 'field' },
  { id: 20, name: 'ドラゴンビースト', respawn: 720, type: 'field' },
  { id: 21, name: 'パンナロード', respawn: 180, type: 'field' },
  { id: 22, name: 'ブラックリリー', respawn: 720, type: 'field' },
  { id: 23, name: 'ブレカ', respawn: 240, type: 'field' },
  { id: 24, name: 'ベヒモス', respawn: 360, type: 'field' },
  { id: 25, name: 'マトゥラ', respawn: 240, type: 'field' },
  { id: 26, name: 'メデューサ', respawn: 420, type: 'field' },
  { id: 27, name: 'オルフェン', respawn: 1440, type: 'field' },
  { id: 28, name: 'コルーン', respawn: 600, type: 'field' },
  { id: 29, name: 'サミュエル', respawn: 720, type: 'field' },
  { id: 30, name: 'セル', respawn: 450, type: 'field' },
  { id: 31, name: 'タルキン', respawn: 300, type: 'field' },
  { id: 32, name: 'ティミニエル', respawn: 480, type: 'field' },
  { id: 33, name: 'バルボ', respawn: 480, type: 'field' },
  { id: 34, name: 'レピロ', respawn: 300, type: 'field' },
  { id: 35, name: 'アンドラス', respawn: 720, type: 'field' },
  { id: 36, name: 'オルクス', respawn: 1440, type: 'field' },
  { id: 37, name: 'カブリオ', respawn: 720, type: 'field' },
  { id: 38, name: 'グラーキ', respawn: 480, type: 'field' },
  { id: 39, name: 'タナトス', respawn: 1440, type: 'field' },
  { id: 40, name: 'ハーフ', respawn: 1440, type: 'field' },
  { id: 41, name: 'ヒシルローメ', respawn: 240, type: 'field' },
  { id: 42, name: 'フェニックス', respawn: 1440, type: 'field' },
  { id: 43, name: 'フリント', respawn: 480, type: 'field' },
  { id: 44, name: 'ランドール', respawn: 480, type: 'field' },
  { id: 45, name: 'ラーハ', respawn: 1980, type: 'field' },
  { id: 46, name: '忘却の鏡', respawn: 720, type: 'field' },
  { id: 47, name: 'サイラックス', respawn: 1440, type: 'field' },
  { id: 48, name: 'ナイアス', respawn: 720, type: 'field' },
  { id: 49, name: 'バラック', respawn: 1440, type: 'field' },
  { id: 50, name: 'モデウス', respawn: 1440, type: 'field' },
  { id: 51, name: 'バロン', respawn: 1440, type: 'field' },
  { id: 52, name: 'ヘカトン', respawn: 1440, type: 'field' },

  // ベオラの遺跡
  { id: 101, name: 'シーラー', respawn: 720, type: 'beora' },
  { id: 102, name: 'ムーフ', respawn: 720, type: 'beora' },
  { id: 103, name: 'ノルムス', respawn: 1080, type: 'beora' },
  { id: 104, name: 'ウカンバ', respawn: 1080, type: 'beora' }
];

// name / id から引けるようにマップ
const bossById = new Map(BOSSES.map(b => [b.id, b]));
const bossByName = new Map(BOSSES.map(b => [b.name, b]));

// ==============================
// 2. KILL_DATA 初期化
// ==============================
/**
 * KILL_DATA:
 * {
 *   bossId: number,
 *   lastKill: Date | null,
 *   nextSpawn: Date | null,
 *   notifyId: string | null,
 *   notifyTime: Date | null
 * }
 */
let KILL_DATA = initKillData();

function initKillData() {
  return BOSSES.map(b => ({
    bossId: b.id,
    lastKill: null,
    nextSpawn: null,
    notifyId: null,
    notifyTime: null
  }));
}

function getKillData(bossId) {
  return KILL_DATA.find(k => k.bossId === bossId);
}

// ==============================
// 3. 時間解析ロジック
// ==============================
/**
 * 入力例:
 *  - "1300"        → 今日の13:00
 *  - "130045"      → 今日の13:00:45
 *  - "0219 1845"   → 2/19 18:45
 *  - "0219 184512" → 2/19 18:45:12
 */
function parseTimeString(input) {
  if (!input) return { error: '❌ エラー：時間が空です。' };

  const parts = input.trim().split(/\s+/);
  const now = new Date();
  let month, day, hour, minute, second = 0;

  if (parts.length === 1) {
    const t = parts[0];
    if (!/^\d{4,6}$/.test(t)) {
      return { error: '❌ エラー：時間形式が不正です。' };
    }
    if (t.length === 4) {
      hour = Number(t.slice(0, 2));
      minute = Number(t.slice(2, 4));
    } else {
      hour = Number(t.slice(0, 2));
      minute = Number(t.slice(2, 4));
      second = Number(t.slice(4, 6));
    }
    month = now.getMonth(); // 0-based
    day = now.getDate();
  } else if (parts.length === 2) {
    const d = parts[0];
    const t = parts[1];
    if (!/^\d{4}$/.test(d)) {
      return { error: '❌ エラー：日付形式が不正です。' };
    }
    if (!/^\d{4,6}$/.test(t)) {
      return { error: '❌ エラー：時間形式が不正です。' };
    }
    month = Number(d.slice(0, 2)) - 1;
    day = Number(d.slice(2, 4));
    if (t.length === 4) {
      hour = Number(t.slice(0, 2));
      minute = Number(t.slice(2, 4));
    } else {
      hour = Number(t.slice(0, 2));
      minute = Number(t.slice(2, 4));
      second = Number(t.slice(4, 6));
    }
  } else {
    return { error: '❌ エラー：入力形式が不正です。' };
  }

  if (
    hour < 0 || hour > 23 ||
    minute < 0 || minute > 59 ||
    second < 0 || second > 59
  ) {
    return { error: '❌ エラー：時間形式が不正です。' };
  }

  const year = now.getFullYear();
  const date = new Date(year, month, day, hour, minute, second);
  if (isNaN(date.getTime())) {
    return { error: '❌ エラー：日付形式が不正です。' };
  }

  return { date };
}

// ==============================
// 4. 次湧き計算ロジック
// ==============================
function calcNextSpawnAndNotify(boss, killTime) {
  const nextSpawn = new Date(killTime.getTime() + boss.respawn * 60 * 1000);
  const notifyTime = new Date(nextSpawn.getTime() - 10 * 60 * 1000);
  return { nextSpawn, notifyTime };
}

function updateKill(boss, killTime) {
  const kd = getKillData(boss.id);
  if (!kd) return;

  const { nextSpawn, notifyTime } = calcNextSpawnAndNotify(boss, killTime);
  kd.lastKill = killTime;
  kd.nextSpawn = nextSpawn;
  kd.notifyTime = notifyTime;
  kd.notifyId = null; // まだ通知していない
}

// ==============================
// 5. 通知スケジューラー（1分ごと）
// ==============================

/**
 * 実際の通知送信処理はここで差し替える
 * 例: Discord チャンネルにメッセージ送信
 */
function sendNotify(boss, kd) {
  // ここは環境に合わせて実装する
  console.log(
    `🔔 10分前通知: ${boss.name} (次湧き: ${kd.nextSpawn?.toLocaleString()})`
  );
  // 戻り値を notifyId として保存する想定
  return `notify-${boss.id}-${Date.now()}`;
}

/**
 * リアクション監視はここで実装する想定（ダミー）
 */
function watchReactions(notifyId) {
  // 実際は 5 分間リアクションを監視する処理を入れる
  console.log(`👀 リアクション監視開始: ${notifyId} (5分間)`);
}

function startScheduler() {
  setInterval(() => {
    const now = new Date();
    KILL_DATA.forEach(kd => {
      if (!kd.notifyTime || !kd.nextSpawn) return;
      if (kd.notifyId) return; // すでに通知済み

      if (now >= kd.notifyTime) {
        const boss = bossById.get(kd.bossId);
        if (!boss) return;
        const notifyId = sendNotify(boss, kd);
        kd.notifyId = notifyId;
        watchReactions(notifyId);
      }
    });
  }, 60 * 1000);
}

// ==============================
// 6. コマンド処理
// ==============================

function formatBossStatus(kd) {
  const boss = bossById.get(kd.bossId);
  if (!boss) return '';
  const last = kd.lastKill ? kd.lastKill.toLocaleString() : '-';
  const next = kd.nextSpawn ? kd.nextSpawn.toLocaleString() : '-';
  return `${boss.id}. ${boss.name} | last: ${last} | next: ${next}`;
}

function handleCommand(input) {
  const content = input.trim();

  if (content.startsWith('/boss list')) {
    const lines = BOSSES.map(
      b => `${b.id}. ${b.name} [${b.type}] respawn: ${b.respawn}分`
    );
    return lines.join('\n');
  }

  if (content.startsWith('/list')) {
    const lines = KILL_DATA.map(formatBossStatus).filter(Boolean);
    return lines.length ? lines.join('\n') : '記録されている討伐情報はありません。';
  }

  if (content.startsWith('/next')) {
    const now = new Date();
    const upcoming = KILL_DATA
      .filter(kd => kd.nextSpawn && kd.nextSpawn > now)
      .sort((a, b) => a.nextSpawn - b.nextSpawn)
      .slice(0, 10);

    if (!upcoming.length) {
      return '次湧き予定のボスはありません。';
    }
    const lines = upcoming.map(formatBossStatus);
    return lines.join('\n');
  }

  if (content.startsWith('/reset')) {
    KILL_DATA = initKillData();
    return '全ボスの討伐データをリセットしました。';
  }

  // 通常メッセージ: 「ボス名 or 番号」＋「時間」
  // 例: "クイーンアント 1300" / "1 1300" / "オルフェン 0219 1845"
  const parts = content.split(/\s+/);
  if (parts.length < 2) {
    return '❌ エラー：入力形式が不正です。（「ボス名 or 番号」＋「時間」）';
  }

  const bossKey = parts[0];
  const timeStr = parts.slice(1).join(' ');

  let boss = null;
  if (/^\d+$/.test(bossKey)) {
    const id = Number(bossKey);
    boss = bossById.get(id);
  } else {
    boss = bossByName.get(bossKey);
  }

  if (!boss) {
    return '❌ エラー：ボス名/番号が存在しません。';
  }

  const parsed = parseTimeString(timeStr);
  if (parsed.error) {
    return parsed.error;
  }

  const killTime = parsed.date;
  updateKill(boss, killTime);

  const kd = getKillData(boss.id);
  return [
    `✅ 討伐登録: ${boss.name}`,
    `  lastKill: ${kd.lastKill.toLocaleString()}`,
    `  nextSpawn: ${kd.nextSpawn.toLocaleString()}`,
    `  notifyTime(10分前): ${kd.notifyTime.toLocaleString()}`
  ].join('\n');
}

// ==============================
// 7. エラー処理テンプレート（実際は上で使用）
// ==============================
// ここでは関数化しておく例
function errorBossNotFound() {
  return '❌ エラー：ボス名/番号が存在しません。';
}
function errorTimeFormat() {
  return '❌ エラー：時間形式が不正です。';
}
function errorDateFormat() {
  return '❌ エラー：日付形式が不正です。';
}
function errorInputFormat() {
  return '❌ エラー：入力形式が不正です。';
}
function errorNotifyTimeout() {
  return '❌ エラー：通知から5分超過しました。';
}

// ==============================
// モジュールとして使う場合のエクスポート
// ==============================
module.exports = {
  BOSSES,
  KILL_DATA,
  startScheduler,
  handleCommand,
  parseTimeString,
  initKillData
};

// 実行環境でそのまま動かしたい場合はここでスケジューラー開始
// startScheduler();
