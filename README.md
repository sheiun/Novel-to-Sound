# Novel to Sound

## Purpose

Rest your eyes and read novels with your ears.

## Flow

HTML (also web page) -- | Crawler | -> Text (texts folder) -- | Google TTS | -> Sound (sounds folder)

## Prerequirement

- Python 3.6+
  - gTTS
- Node.js (Stable)
  - node-fetch

## Install

```shell
npm install
pip install -r requirements.txt
```

## First

> Crawl texts

```shell
node novel_crawler.js
```

## Second

> Text to sound

```shell
python novel_tts.py
```
