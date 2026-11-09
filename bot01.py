import discord
from discord.ext import commands
import random
from datetime import datetime
import asyncio

print("MTUzMTUxMDc0MjcwMjg4Njk4Mw.Gk41TF.RmShLZwMCq6wZB1xftXPDRZfjM64t6jmiKRPOs")
TOKEN = input()
# MTUzMTUxMDc0MjcwMjg4Njk4Mw.Gk41TF.RmShLZwMCq6wZB1xftXPDRZfjM64t6jmiKRPOs
# 봇 감지 우회를 위해 임의의 고유한 접두사 사용 (예: 평범한 채팅과 섞이도록 설정)
bot = commands.Bot(command_prefix="쿠키야 ", self_bot=True, chunk_guilds_at_startup=False)

@bot.event
async def on_ready():
    # 불필요한 API 요청을 최소화하여 계정 감지 확률 낮춤
    print(f"로그인 완료: {bot.user.name}")

# 셀프봇 감지 우회를 위한 안전 딜레이 함수 (자동화 느낌 줄이기)
async def safe_delay(min_sec=1.0, max_sec=2.5):
    await asyncio.sleep(random.uniform(min_sec, max_sec))

# 0. 명령어 목록 (도움말)
@bot.command(name="명령어")
async def help_command(ctx):
    try:
        await ctx.message.delete()
    except:
        pass
    await safe_delay(0.5, 1.2)
    
    help_text = (
        "🤖 **[ 쿠키 명령어 목록 ]**\n\n"
        "🏓 `쿠키야 핑` - 봇의 지연 시간(핑)을 확인합니다.\n"
        "🆔 `쿠키야 내아이디` - 본인의 디스코드 ID를 확인합니다.\n"
        "⏰ `쿠키야 시간` - 현재 시각을 확인합니다.\n"
        "🎲 `쿠키야 주사위` - 1부터 6까지의 주사위를 굴립니다.\n"
        "🪙 `쿠키야 코인` - 동전 던지기 (앞면/뒷면)를 합니다.\n"
        "✨ `쿠키야 선택 [선택지1] [선택지2] ...` - 공백으로 구분된 항목 중 하나를 무작위로 고릅니다.\n"
        "🎲 `쿠키야 갈까말까` (또는 `ㄱ?`) - 갈까 말까 고민될 때 ㄱㄱ/ㄴㄴ 중 하나를 골라줍니다.\n"
        "🔁 `쿠키야 따라하기 [메시지]` - 입력한 메시지를 그대로 출력합니다.\n"
        "🧹 `쿠키야 청소 [개수]` - 내가 보낸 최근 메시지를 지정한 개수만큼 삭제합니다 (기본 5개, 최대 20개).\n"
        "🎮 `쿠키야 게임 [게임이름]` - '플레이 중' 상태 메시지를 설정합니다.\n"
        "📡 `쿠키야 스트리밍 [방송제목]` - '스트리밍 중' 상태 메시지를 설정합니다.\n"
        "🔄 `쿠키야 상태초기화` - 활동 상태를 초기화합니다.\n"
        "📝 `쿠키야 메모 [내용]` - 간단한 메모를 저장합니다.\n"
        "📋 `쿠키야 메모장` - 저장된 메모 목록을 확인합니다.\n"
        "🗑️ `쿠키야 메모삭제` - 저장된 모든 메모를 삭제합니다."
    )
    
    await ctx.send(help_text)

# 1. 핑 확인
@bot.command(name="핑")
async def ping(ctx):
    try:
        await ctx.message.delete()
    except:
        pass
    await safe_delay(0.5, 1.2)
    latency = round(bot.latency * 1000)
    await ctx.send(f"퐁! 🏓 지연 시간: {latency}ms")

# 2. 내 아이디 확인
@bot.command(name="내아이디")
async def my_id(ctx):
    try:
        await ctx.message.delete()
    except:
        pass
    await safe_delay(0.5, 1.2)
    await ctx.send(f"내 디스코드 ID: `{ctx.author.id}`")

# 3. 현재 시간
@bot.command(name="시간")
async def current_time(ctx):
    try:
        await ctx.message.delete()
    except:
        pass
    await safe_delay(0.5, 1.2)
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    await ctx.send(f"현재 시각: `{now}`")

# 4. 주사위 굴리기
@bot.command(name="주사위")
async def dice(ctx):
    try:
        await ctx.message.delete()
    except:
        pass
    await safe_delay(0.5, 1.2)
    result = random.randint(1, 6)
    await ctx.send(f"🎲 주사위 결과: **{result}**")

# 5. 동전 던지기
@bot.command(name="코인")
async def coin(ctx):
    try:
        await ctx.message.delete()
    except:
        pass
    await safe_delay(0.5, 1.2)
    result = random.choice(["앞면 (Heads)", "뒷면 (Tails)"])
    await ctx.send(f"🪙 동전 결과: **{result}**")

# 6. 무작위 선택
@bot.command(name="선택")
async def choose(ctx, *, options: str):
    try:
        await ctx.message.delete()
    except:
        pass
    await safe_delay(0.5, 1.2)
    choice_list = options.split()
    if len(choice_list) < 2:
        await ctx.send("❗ 공백으로 구분된 선택지를 2개 이상 입력해주세요.", delete_after=3)
        return
    chosen = random.choice(choice_list)
    await ctx.send(f"✨ 선택된 항목: **{chosen}**")

# 7. 갈까 말까 / ㄱ? 기능
@bot.command(name="갈까말까")
async def go_or_not(ctx, *, content: str = ""):
    try:
        await ctx.message.delete()
    except:
        pass
    await safe_delay(0.5, 1.2)
    result = random.choice(["ㄱㄱ", "ㄴㄴ"])
    await ctx.send(f"🎲 결과: **{result}**")

@bot.command(name="ㄱ?")
async def go_short(ctx, *, content: str = ""):
    try:
        await ctx.message.delete()
    except:
        pass
    await safe_delay(0.5, 1.2)
    result = random.choice(["ㄱㄱ", "ㄴㄴ"])
    await ctx.send(f"🎲 결과: **{result}**")

# 8. 따라하기
@bot.command(name="따라하기")
async def echo(ctx, *, message: str):
    try:
        await ctx.message.delete()
    except:
        pass
    await safe_delay(0.5, 1.2)
    await ctx.send(message)

# 9. 메시지 청소 (계정 밴 방지를 위해 처리 속도를 늦추고 안전장치 추가)
@bot.command(name="청소")
async def clear(ctx, limit: int = 5):
    try:
        await ctx.message.delete()
    except:
        pass
    deleted = 0
    # 한 번에 너무 많은 메시지 지우지 않도록 최대 개수 제한 (안전용)
    if limit > 20:
        limit = 20
    
    async for message in ctx.channel.history(limit=50):
        if message.author == bot.user:
            try:
                await message.delete()
                deleted += 1
                # 디스코드 API Rate Limit(제재)을 피하기 위한 필수 대기 시간
                await asyncio.sleep(1.2)
                if deleted >= limit:
                    break
            except:
                pass
    notice = await ctx.send(f"최근 메시지 {deleted}개를 안전하게 삭제했습니다.")
    await notice.delete(delay=3)

# 10. 상태 메시지 설정 (플레이 중)
@bot.command(name="게임")
async def status_game(ctx, *, game_name: str):
    try:
        await ctx.message.delete()
    except:
        pass
    await safe_delay(0.5, 1.2)
    await bot.change_presence(activity=discord.Game(name=game_name))
    await ctx.send(f"🎮 상태가 변경되었습니다: {game_name}", delete_after=3)

# 11. 상태 메시지 설정 (스트리밍 중)
@bot.command(name="스트리밍")
async def status_stream(ctx, *, stream_title: str):
    try:
        await ctx.message.delete()
    except:
        pass
    await safe_delay(0.5, 1.2)
    await bot.change_presence(activity=discord.Streaming(name=stream_title, url="https://www.twitch.tv/twitch"))
    await ctx.send(f"📡 스트리밍 상태로 변경되었습니다: {stream_title}", delete_after=3)

# 12. 상태 초기화
@bot.command(name="상태초기화")
async def status_clear(ctx):
    try:
        await ctx.message.delete()
    except:
        pass
    await safe_delay(0.5, 1.2)
    await bot.change_presence(activity=None)
    await ctx.send("🔄 활동 상태가 초기화되었습니다.", delete_after=3)

# 13. 간단한 메모 저장
notes = []
@bot.command(name="메모")
async def add_note(ctx, *, memo_text: str):
    try:
        await ctx.message.delete()
    except:
        pass
    await safe_delay(0.5, 1.2)
    notes.append(memo_text)
    await ctx.send(f"📝 메모가 저장되었습니다. (총 {len(notes)}개)", delete_after=3)

# 14. 메모장 확인
@bot.command(name="메모장")
async def show_notes(ctx):
    try:
        await ctx.message.delete()
    except:
        pass
    await safe_delay(0.5, 1.2)
    if not notes:
        await ctx.send("📭 저장된 메모가 없습니다.", delete_after=3)
        return
    note_list = "\n".join([f"{i+1}. {note}" for i, note in enumerate(notes)])
    await ctx.send(f"📋 **저장된 메모 목록**\n{note_list}")

# 15. 메모 초기화
@bot.command(name="메모삭제")
async def clear_notes(ctx):
    try:
        await ctx.message.delete()
    except:
        pass
    await safe_delay(0.5, 1.2)
    notes.clear()
    await ctx.send("🗑️ 모든 메모가 삭제되었습니다.", delete_after=3)

bot.run(TOKEN)