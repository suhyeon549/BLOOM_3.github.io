import os
import urllib.request

assets = {
    "rectangle32.png": "http://localhost:3845/assets/7e0ccaa064a152741e04b6e240eeacb9525bcfa0.png",
    "rectangle34.png": "http://localhost:3845/assets/b49244dd9ff474dd3f70dd7bf39b6f9560ba4fb7.png",
    "rectangle35.png": "http://localhost:3845/assets/9ba49d597b093b11f59ffa00b8b4791ab5f4306d.png",
    "img1.png": "http://localhost:3845/assets/b003b0128df535eb1c3720a44ed7e4411b491008.png",
    "rectangle40.png": "http://localhost:3845/assets/b920c9374981b4bf3f2c959a1a02b15f52abcec1.png",
    "image363.png": "http://localhost:3845/assets/0f0586de20af1370591b4ab488e912168c1ae532.png",
    "rectangle36.png": "http://localhost:3845/assets/6aac7931b2952d616e72578afc4af948ac663ead.png",
    "image364.png": "http://localhost:3845/assets/e812d267d471893aa368e7a19f94e107b872c79d.png",
    "image331.png": "http://localhost:3845/assets/73fc3448cba6125e47f69b6fa52119efb9cfbbaf.png",
    "group111.png": "http://localhost:3845/assets/8b2a1f19e6af28330d562fc1475d0896e8becd6e.png",
    "group12.svg": "http://localhost:3845/assets/5d8ca2459e7b151d6334751bae70430184af934e.svg",
    "vector23.svg": "http://localhost:3845/assets/e3d78e786de8bf13a7343cb0147a1e3c4fe9af7f.svg",
    "vector24.svg": "http://localhost:3845/assets/2c6b75af5caf07eff3ffafd127b7805c16da8819.svg",
    "image362.svg": "http://localhost:3845/assets/1117b2ea00ab06f04115cedb89d1230cee5810c0.svg",
    "group13.svg": "http://localhost:3845/assets/7368a15cb9b3e14a190680fb18fb9a7c04316380.svg"
}

os.makedirs("assets", exist_ok=True)

for filename, url in assets.items():
    try:
        print(f"Downloading {filename}...")
        urllib.request.urlretrieve(url, os.path.join("assets", filename))
    except Exception as e:
        print(f"Failed to download {filename}: {e}")

print("Done.")
