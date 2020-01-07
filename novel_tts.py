import os
import re

from gtts import gTTS


def clean(text: str) -> str:
    text = re.sub(r"（.+）", "", text)
    return (
        "".join(
            filter(
                lambda l: "作者" not in l
                or "類別" not in l
                or "用戶名" not in l
                or "書名" not in l
                or ("第" not in l and "章" not in l),
                text.splitlines(),
            )
        )
        .split("<a")[0]
        .split("未完待續")[0]
        .split("  請記住:飛翔鳥中文小說網")[0]
        .split("手機站全新改版升級地址")[0]
        .replace("<p/>", "")
        .replace("“", " ")
        .strip()
    )


files = iter(
    sorted(
        filter(lambda f: f.endswith(".txt"), os.listdir("texts/")),
        key=lambda f: int(re.search(r"\d+", f).group()),
    )
)

file = next(files)
start = 0

while True:
    if int(re.search(r"\d+", file).group()) < start:
        file = next(files)
        continue
    try:
        tts = gTTS(clean(open(f"texts/{file}").read()), lang="zh-tw")
        tts.save(f"sounds/{file.replace('.txt', '')}.mp3")
    except FileNotFoundError:
        print(f"{file} Not Found")
        break
    except Exception as e:
        print(f"{file} Break, Cause: {e}")
    else:
        print(f"{file} Done")
        file = next(files)
