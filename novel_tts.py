from gtts import gTTS

index = 798

while True:
    try:
        tts = gTTS(open(f"texts/{index}.txt").read(), lang="zh-tw")
        tts.save(f"sounds/{index}.mp3")
    except FileNotFoundError:
        print(f"{index} Not Found")
        break
    except Exception:
        print(f"{index} Break")
    else:
        index += 1
        print(f"{index} Done")

print("All Done")
