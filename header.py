import os
STATEMENT = 'import React from "react"'


def prepend(file):
    with open(file, 'r+') as f:
        content = f.read()
        if content.find(STATEMENT) == -1:
            f.seek(0, 0)
            f.write(STATEMENT + '\n' + content)


# def find():
#     with open('./src/chessboard/index.tsx') as f:
#         print(f.read().find(STATEMENT))


for r, d, f in os.walk('./src'):
    [prepend(os.path.join(r, file)) for file in f if file.endswith('.tsx')]
