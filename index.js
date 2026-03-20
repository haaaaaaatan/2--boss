function parseTime(input) {
  const now = new Date();
  const parts = input.trim().split(" ");

  // 時刻のみ（HHMM or HHMMSS）
  if (parts.length === 1) {
    const t = parts[0];

    if (t.length === 4) {
      // HHMM
      const hh = parseInt(t.slice(0, 2));
      const mm = parseInt(t.slice(2, 4));
      return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, mm, 0);
    }

    if (t.length === 6) {
      // HHMMSS
      const hh = parseInt(t.slice(0, 2));
      const mm = parseInt(t.slice(2, 4));
      const ss = parseInt(t.slice(4, 6));
      return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hh, mm, ss);
    }
  }

  // 日付 + 時刻（MMDD HHMM or MMDD HHMMSS）
  if (parts.length === 2) {
    const d = parts[0];
    const t = parts[1];

    const month = parseInt(d.slice(0, 2)) - 1;
    const day = parseInt(d.slice(2, 4));

    if (t.length === 4) {
      const hh = parseInt(t.slice(0, 2));
      const mm = parseInt(t.slice(2, 4));
      return new Date(now.getFullYear(), month, day, hh, mm, 0);
    }

    if (t.length === 6) {
      const hh = parseInt(t.slice(0, 2));
      const mm = parseInt(t.slice(2, 4));
      const ss = parseInt(t.slice(4, 6));
      return new Date(now.getFullYear(), month, day, hh, mm, ss);
    }
  }

  return null;
}
const KILL_DATA = BOSSES.map(boss => ({
  bossId: boss.id,
  lastKill: null,
  nextSpawn: null,
  notifyId: null,
  notifyTime: null
}));
const BOSSES = [
  { id: 1, name: "クイーンアント", respawn: 360, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 2, name: "ケルソス", respawn: 360, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 3, name: "サヴァン", respawn: 720, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 4, name: "チェルトゥバ", respawn: 180, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 5, name: "トロンバ", respawn: 270, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 6, name: "バシラ", respawn: 150, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 7, name: "エンクラ", respawn: 210, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 8, name: "カタン", respawn: 480, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 9, name: "ガレス", respawn: 360, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 10, name: "コアサセプタ", respawn: 720, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 11, name: "サルカ", respawn: 420, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 12, name: "スタン", respawn: 240, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 13, name: "タラキン", respawn: 420, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 14, name: "ティミトリス", respawn: 300, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 15, name: "テンペスト", respawn: 180, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 16, name: "パンドライド", respawn: 480, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 17, name: "フェリス", respawn: 120, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 18, name: "ミュータントクルマ", respawn: 480, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 19, name: "汚染したクルマ", respawn: 480, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 20, name: "ドラゴンビースト", respawn: 720, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 21, name: "パンナロード", respawn: 180, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 22, name: "ブラックリリー", respawn: 720, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 23, name: "ブレカ", respawn: 240, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 24, name: "ベヒモス", respawn: 360, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 25, name: "マトゥラ", respawn: 240, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 26, name: "メデューサ", respawn: 420, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 27, name: "オルフェン", respawn: 1440, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 28, name: "コルーン", respawn: 600, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 29, name: "サミュエル", respawn: 720, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 30, name: "セル", respawn: 450, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 31, name: "タルキン", respawn: 300, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 32, name: "ティミニエル", respawn: 480, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 33, name: "バルボ", respawn: 480, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 34, name: "レピロ", respawn: 300, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 35, name: "アンドラス", respawn: 720, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 36, name: "オルクス", respawn: 1440, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 37, name: "カブリオ", respawn: 720, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 38, name: "グラーキ", respawn: 480, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 39, name: "タナトス", respawn: 1440, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 40, name: "ハーフ", respawn: 1440, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 41, name: "ヒシルローメ", respawn: 240, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 42, name: "フェニックス", respawn: 1440, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 43, name: "フリント", respawn: 480, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 44, name: "ランドール", respawn: 480, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 45, name: "ラーハ", respawn: 1980, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 46, name: "忘却の鏡", respawn: 720, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 47, name: "サイラックス", respawn: 1440, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 48, name: "ナイアス", respawn: 720, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 49, name: "バラック", respawn: 1440, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 50, name: "モデウス", respawn: 1440, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 51, name: "バロン", respawn: 1440, type: "field", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 52, name: "ヘカトン", respawn: 1440, type: "field", lastKill: null, nextSpawn: null, notifyId: null },

  // ベオラの遺跡
  { id: 101, name: "シーラー", respawn: 720, type: "beora", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 102, name: "ムーフ", respawn: 720, type: "beora", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 103, name: "ノルムス", respawn: 1080, type: "beora", lastKill: null, nextSpawn: null, notifyId: null },
  { id: 104, name: "ウカンバ", respawn: 1080, type: "beora", lastKill: null, nextSpawn: null, notifyId: null }
];

const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();

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

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  if (message.content === "/ping") {
    message.reply("Pong!");
  }
});

client.login(process.env.TOKEN);

