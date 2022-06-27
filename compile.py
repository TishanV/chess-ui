import os
import shutil

SRC_DIR = 'assets'
OUT_DIR = 'dist/assets'


def copyFile(base, filename):
    to = base.replace(SRC_DIR, OUT_DIR, 1)
    if not os.path.exists(to):
        os.mkdir(to)
    shutil.copyfile(os.path.join(base, filename), os.path.join(to, filename))


for r, d, f in os.walk(SRC_DIR):
    [copyFile(r, file) for file in f]
