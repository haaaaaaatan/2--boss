const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

/* ----------------------------------------
   1. BOSSES（ボス一覧）
---------------------------------------- */
const BOSSES = [
  { id: 1, name: "クイーンアント", respawn: 360, type: "field" },
  { id: 2, name: "ケルソス", respawn: 360, type: "field" },
  { id: 3, name: "サヴァン", respawn: 720, type: "field" },
  { id: 4, name: "チェルトゥバ", respawn: 180, type: "field" },
  { id: 5, name: "トロンバ", respawn: 270, type: "field" },
  { id: 6, name: "バシラ", respawn: 150, type: "field" },
  { id: 7, name: "エンクラ", respawn: 210, type: "field" },
  { id: 8, name: "カタン", respawn: 480, type: "field" },
  { id: 9, name: "ガレス", respawn: 360, type: "field" },
  { id: 10, name: "コアサセプタ", respawn: 720, type: "field" },
  { id: 11, name: "サルカ", respawn: 420, type: "field" },
  { id: 12, name: "スタン", respawn: 240, type: "field" },
  { id: 13, name: "タラキン", respawn: 420, type: "field" },
  { id: 14, name: "ティミトリス", respawn: 300, type: "field" },
  { id: 15, name: "テンペスト", respawn: 180, type: "field" },
  { id: 16, name: "パンドライド", respawn: 480, type: "field" },
  { id: 17, name: "フェリス", respawn: 120, type: "field" },
  { id: 18, name: "ミュータントクルマ", respawn: 480, type: "field" },
  { id: 19, name: "汚染したクルマ", respawn: 480, type: "field" },
  { id: 20, name: "ドラゴンビースト", respawn: 720, type: "field" },
  { id: 21, name: "パンナロード", respawn: 180, type: "field" },
  { id: 22, name: "ブラックリリー", respawn: 720, type: "field" },
  { id: 23, name: "ブレカ", respawn: 240, type: "field" },
  { id: 24, name: "ベヒモス", respawn: 360, type: "field" },
  { id: 25, name: "マトゥラ", respawn: 240, type: "field" },
  { id: 26, name: "メデューサ", respawn: 420, type: "field" },
  { id: 27, name: "オルフェン", respawn: 1440, type: "field" },
  { id: 28, name: "コルーン", respawn: 600, type: "field" },
  { id: 29, name: "サミュエル", respawn: 720, type: "field" },
  { id: 30, name: "セル", respawn: 450, type: "field" },
  { id: 31, name: "タルキン", respawn: 300, type: "field" },
  { id: 32, name: "ティミニエル", respawn: 480, type: "field" },
  { id: 33, name: "バルボ", respawn: 480, type: "field" },
  { id: 34, name: "レピロ", respawn: 300, type: "field" },
  { id: 35, name: "アンドラス", respawn: 720, type: "field" },
  { id: 36, name: "オルクス", respawn: 1440, type: "field" },
  { id: 37, name: "カブリオ", respawn: 720, type: "field" },
  { id: 38, name: "グラーキ", respawn: 480, type: "field" },
  { id: 39, name: "タナトス", respawn: 1440, type: "field" },
  { id: 40, name: "ハーフ", respawn: 1440, type: "field" },
  { id: 41, name: "ヒシルローメ", respawn: 240, type: "field" },
  { id: 42, name: "フェニックス", respawn: 1440, type: "field" },
  { id: 43, name: "フリント", respawn: 480, type: "field" },
  { id: 44, name: "ランドール", respawn: 480, type: "field" },
  { id: 45, name: "ラーハ", respawn: 1980, type: "field" },
  { id: 46, name: "忘却の鏡", respawn: 720, type: "field" },
  { id: 47, name: "サイラックス", respawn: 1440, type: "field" },
  { id: 48, name: "ナイアス", respawn: 720, type: "field" },
  { id: 49, name: "バラック", respawn: 1440, type: "field" },
  { id: 50, name: "モデウス", respawn: 1440, type: "field" },
  { id: 51, name: "バロン", respawn: 1440, type: "field" },
  { id: 52, name: "ヘカトン", respawn: 1440, type: "field" },

  { id: 101, name: "シーラー", respawn: 720, type: "beora" },
  { id: 102, name: "ムーフ", respawn: 720, type: "beora" },
  { id: 103, name: "ノルムス", respawn: 1080, type: "beora" },
  { id: 104, name: "ウカンバ", respawn: 1080, type: "beora" }
];

/* ----------------------------------------
   2. KILL_DATA（討伐データ）
---------------------------------------- */
const KILL_DATA = BOSSES.map(boss => ({
  bossId: boss.id,
  lastKill: null,
  nextSpawn: null,
  notifyId: null,
  notifyTime: null
}));

/* ----------------------------------------
   3. 時間解析
---------------------------------------- */
function parseTime(input) {
  const now = new Date();
  const parts = input.trim().split(" ");

  if (parts.length === 1) {
    const t = parts[0];
    if (t.length === 4) {
      return new Date(now.getFullYear(), now.getMonth(), now.getDate(),
        parseInt(t.slice(0, 2)), parseInt(t.slice(2, 4)), 0);
    }
    if (t.length === 6) {
      return new Date(now.getFullFullYear(), now.getMonth(), now.getDate(),
        parseInt(t.slice(0, 2)), parseInt(t.slice(2, 4)), parseInt(t.slice(4, 6)));
    }
  }

  if (parts.length === 2) {
    const d = parts[0];
    const t = parts[1];
    const month = parseInt(d.slice(0, 2)) - 1;
    const day = parseInt(d.slice(2, 4));

    if (t.length === 4) {
      return new Date(now.getFullYear(), month, day,
        parseInt(t.slice(0, 2)), parseInt(t.slice(2, 4)), 0);
    }
    if (t.length === 6) {
      return new Date(now.getFullYear(), month, day,
        parseInt(t.slice(0, 2)), parseInt(t.slice(2, 4)), parseInt(t.slice(4, 6)));
    }
  }

  return null;
}

/* ----------------------------------------
   4. 次湧き計算
---------------------------------------- */
function calcNextSpawn(killTime, respawnMin) {
  const next = new Date(killTime.getTime() + respawnMin * 60000);
  const notify = new Date(next.getTime() - 10 * 60000);
  return { next, notify };
}

/* ----------------------------------------
   5. 通知スケジューラー
---------------------------------------- */
setInterval(() => {
  const now = new Date();

  KILL_DATA.forEach(data => {
    if (!data.notifyTime || data.notifyId) return;

    if (now >= data.notifyTime) {
      const boss = BOSSES.find(b => b.id === data.bossId);
      const channel = client.channels.cache.get("1484413223058018304");

      if (channel) {
        channel.send(`🔔 **${boss.name}** の湧き10分前です！`);
      }

      data.notifyId = "sent";
    }
  });
}, 60000);

/* ----------------------------------------
   6. Discord クライアント
---------------------------------------- */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once("ready", () => {
  console.log(`BOT 起動完了：${client.user.tag}`);
});

/* ----------------------------------------
   7. 手動討伐入力
---------------------------------------- */
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const parts = message.content.trim().split(" ");
  if (parts.length !== 2) return;

  const bossKey = parts[0];
  const timeStr = parts[1];

  const boss =
    BOSSES.find(b => b.name === bossKey) ||
    BOSSES.find(b => b.id == bossKey);

  if (!boss) return message.reply("❌ エラー：ボスが存在しません");

  const killTime = parseTime(timeStr);
  if (!killTime) return message.reply("❌ エラー：時間形式が不正です");

  const { next, notify } = calcNextSpawn(killTime, boss.respawn);

  const data = KILL_DATA.find(d => d.bossId === boss.id);
  data.lastKill = killTime;
  data.nextSpawn = next;
  data.notifyTime = notify;
  data.notifyId = null;

  message.reply(
    `✅ 記録しました\n討伐：${killTime}\n次湧き：${next}\n通知予定：${notify}`
  );
});

/* ----------------------------------------
   8. /list（時間版）
---------------------------------------- */
client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const parts = message.content.trim().split(" ");
  if (parts[0] !== "/list") return;

  // "/list" 単体 → 全ボス一覧
  if (parts.length === 1) {
    const list = KILL_DATA.map(d => {
      const boss = BOSSES.find(b => b.id === d.bossId);

      const last = d.lastKill ? d.lastKill.toLocaleString() : "未登録";
      const next = d.nextSpawn ? d.nextSpawn.toLocaleString() : "未登録";
      const notify = d.notifyTime ? d.notifyTime.toLocaleString() : "未設定";

      return `🔹 **${boss.name}**\n討伐：${last}\n次湧き：${next}\n通知：${notify}`;
    });

    return message.reply("📋 **ボス一覧**\n\n" + list.join("\n\n"));
  }

  // "/list 数字" → 数字時間以内に湧くボス
  const hours = parseInt(parts[1]);
  if (isNaN(hours)) {
    return message.reply("❌ エラー：数字を入力してください（例：/list 12）");
  }

  const now = new Date();
  const limit = new Date(now.getTime() + hours * 60 * 60 * 1000);

  const list = KILL_DATA
    .filter(d => d.nextSpawn && d.nextSpawn <= limit)
    .sort((a, b) => a.nextSpawn - b.nextSpawn)
    .map(d => {
      const boss = BOSSES.find(b => b.id === d.bossId);
      return `🕒 **${boss.name}** → ${d.nextSpawn.toLocaleString()}`;
    });

  if (list.length === 0) {
    return message.reply(`⏳ ${hours}時間以内に湧くボスはいません。`);
  }

  message.reply(
    `📌 **${hours}時間以内に湧くボス**\n` +
    list.join("\n")
  );
});

/* ----------------------------------------
   9. /next
---------------------------------------- */
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content !== "/next") return;

  const list = KILL_DATA
    .filter(d => d.nextSpawn)
    .sort((a, b) => a.nextSpawn - b.nextSpawn)
    .map(d => {
      const boss = BOSSES.find(b => b.id === d.bossId);
      return `🕒 **${boss.name}** → ${d.nextSpawn.toLocaleString()}`;
    });

  if (list.length === 0) {
    return message.reply("⚠️ 登録された次湧きがありません。");
  }

  message.reply("📌 **次湧き予定一覧**\n" + list.join("\n"));
});

/* ----------------------------------------
   10. /ping
---------------------------------------- */
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content === "/ping") message.reply("Pong!");
});

/* ----------------------------------------
   11. BOT 起動
---------------------------------------- */
client.login(process.env.TOKEN);
